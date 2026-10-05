"""Original Anvaya Palash glass study; run in isolated Blender --factory-startup.

No downloaded models, textures, or changes to an interactive Blender session.
Exports the lightweight web model and transparent fallback renders.
"""
import bpy
import math
from pathlib import Path
from mathutils import Vector, Euler

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "art"
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)


def material(name, color, transmission, roughness):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    node = mat.node_tree.nodes.get("Principled BSDF")
    node.inputs["Base Color"].default_value = (*color, 1)
    node.inputs["Roughness"].default_value = roughness
    node.inputs["Transmission Weight"].default_value = transmission
    node.inputs["IOR"].default_value = 1.44
    node.inputs["Coat Weight"].default_value = 0.35
    return mat


glass = material("Palash_Porcelain", (0.86, 0.74, 0.62), 0.67, 0.24)
warm = material("Palash_Vermilion", (0.69, 0.20, 0.08), 0.61, 0.22)
blush = material("Palash_Amber", (0.86, 0.49, 0.24), 0.76, 0.23)
stem_mat = material("Palash_Branch", (0.27, 0.26, 0.17), 0.22, 0.30)


def tube(name, points, radius, mat):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 16
    curve.bevel_depth = radius
    curve.bevel_resolution = 3
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for i, (p, co) in enumerate(zip(spline.bezier_points, points)):
        p.co = co
        p.handle_left_type = "AUTO"
        p.handle_right_type = "AUTO"
        p.radius = 1.0 - 0.48 * i / max(1, len(points) - 1)
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    obj.select_set(False)
    for polygon in obj.data.polygons:
        polygon.use_smooth = True
    return obj


def petal(name, position, rotation, length, width, curl, mat):
    # A thin, closed, creased petal with the recurved beak of a Palash bloom.
    rows, cols = 28, 14
    vertices, faces = [], []
    for side in (-1, 1):
        for i in range(rows + 1):
            t = i / rows
            w = width * (math.sin(math.pi * t) ** 0.78 + 0.012)
            center_y = curl * t * t - 0.48 * curl * t ** 5
            center_z = length * t - 0.35 * curl * t ** 5
            for j in range(cols + 1):
                s = 2 * j / cols - 1
                rib = 0.012 * math.cos(s * 9 * math.pi) * math.sin(math.pi * t)
                y = center_y + width * 0.46 * s * s * math.sin(math.pi * t) + rib
                y += side * 0.012 * math.sin(math.pi * t) + side * 0.003
                vertices.append((s * w, y, center_z + 0.04 * s * t))
    count = (rows + 1) * (cols + 1)
    for k in range(2):
        for i in range(rows):
            for j in range(cols):
                a = k * count + i * (cols + 1) + j
                face = (a, a + 1, a + cols + 2, a + cols + 1)
                faces.append(face if k else tuple(reversed(face)))
    for i in range(rows):
        for j in (0, cols):
            a = i * (cols + 1) + j
            b = (i + 1) * (cols + 1) + j
            faces.append((a, b, b + count, a + count))
    for i in (0, rows):
        for j in range(cols):
            a = i * (cols + 1) + j
            faces.append((a, a + count, a + count + 1, a + 1))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.location = position
    obj.rotation_euler = Euler(rotation, "XYZ")
    obj.data.materials.append(mat)
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    return obj


tube("branch", [(-0.6, 0.25, -1.9), (-0.50, 0.05, -0.7),
                (-0.12, 0.0, 0.5), (0.10, 0.02, 1.65), (0.14, 0.0, 2.5)], 0.029, stem_mat)

def bloom(index, position, angle, scale):
    # Asymmetric standard, wings, and curved keel; not a radial lotus or mandala.
    specs = [
        ((-0.18, 0.08, angle - 0.18), 1.28, 0.34, -0.92, glass),
        ((0.10, -0.43, angle + 0.18), 1.42, 0.25, 0.70, warm),
        ((0.35, 0.54, angle - 0.23), 1.10, 0.28, 0.48, glass),
        ((-0.34, 0.72, angle + 0.15), 0.98, 0.22, 0.36, blush),
        ((0.42, -0.15, angle - 0.52), 0.92, 0.21, 0.30, glass),
    ]
    for j, (rot, length, width, curl, mat) in enumerate(specs):
        petal(f"bloom_{index}_petal_{j}", position, rot,
              length * scale, width * scale, curl * scale, mat)


tube("left_pedicel", [(-0.1, 0, 0.42), (-0.47, 0.0, 0.69), (-0.85, -0.05, 0.93)], 0.022, stem_mat)
tube("right_pedicel", [(0.08, 0, 1.42), (0.38, 0.08, 1.57), (0.58, 0.12, 1.85)], 0.021, stem_mat)
bloom(0, (-0.85, -0.05, 0.93), 0.53, 1.1)
bloom(1, (0.58, 0.12, 1.85), -0.51, 0.92)
bloom(2, (0.10, 0.02, 2.5), 0.10, 0.69)
petal("bud", (-0.40, 0.08, -0.34), (0.1, -0.35, 0.6), 0.57, 0.15, 0.23, blush)

# Export only artwork; web lighting is generated locally in Three.js.
model_objects = list(bpy.context.scene.objects)
bpy.ops.object.select_all(action="DESELECT")
for obj in model_objects:
    obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(OUT / "palash.glb"), export_format="GLB",
                         use_selection=True, export_cameras=False, export_lights=False)

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 48
scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.world.color = (0.65, 0.60, 0.54)
scene.world.use_nodes = True
scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.78, 0.73, 0.64, 1)
scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.7
scene.view_settings.view_transform = "AgX"

def light(name, location, power, size, color):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = power
    data.shape = "DISK"
    data.size = size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = (Vector((0, 0, 1)) - obj.location).to_track_quat("-Z", "Y").to_euler()

light("softbox", (-4, -4, 7), 850, 4, (1, 0.92, 0.82))
light("rim", (3, 3, 6), 1200, 3, (1, 0.91, 0.79))
light("fill", (4, -1, 0), 550, 4, (0.90, 0.93, 1))
camera_data = bpy.data.cameras.new("poster_camera")
camera = bpy.data.objects.new("poster_camera", camera_data)
bpy.context.collection.objects.link(camera)
camera.location = (4.4, -9, 3.3)
target = Vector((0, 0, 0.76))
camera.rotation_euler = (target - camera.location).to_track_quat("-Z", "Y").to_euler()
camera_data.type = "ORTHO"
scene.camera = camera
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.quality = 88
for name, width, height, ortho in [("palash-desktop.webp", 1000, 1100, 5.9),
                                    ("palash-mobile.webp", 620, 900, 5.9)]:
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    camera_data.ortho_scale = ortho
    scene.render.filepath = str(OUT / name)
    bpy.ops.render.render(write_still=True)
print("ANVAYA_ARTWORK", [(p.name, p.stat().st_size) for p in OUT.iterdir()])
