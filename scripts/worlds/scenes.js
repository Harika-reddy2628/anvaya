// Original procedural scenes for the four Anvaya practices. Rendered offline to WebP stills by
// scripts/render-worlds.mjs; nothing here ships to the browser at runtime.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const INK = 0x0b0a09, ACCENT = 0xd27245;
const params = new URLSearchParams(location.search);
const world = Number(params.get("world")), view = params.get("view") || "wide";
const width = Number(params.get("w")), height = Number(params.get("h"));

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(width, height);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(INK);
scene.fog = new THREE.Fog(INK, 13, 34);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
scene.environmentIntensity = .22;
const camera = new THREE.PerspectiveCamera(34, width / height, .1, 120);

const mat = (color, roughness = .86, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra });
const M = {
  plaster: mat(0x8f8070), plasterLight: mat(0xcdbfae), clay: mat(0x7a4c36), stone: mat(0xb09b83), ivory: mat(0xe9ddcb, .72),
  wood: mat(0x3a281e, .58), oak: mat(0x6b4a33, .55), dark: mat(0x16130f, .8), rug: mat(0x5a3626, .95),
  floor: new THREE.MeshPhysicalMaterial({ color: 0x1b1814, roughness: .4, clearcoat: .35, clearcoatRoughness: .45 }),
  warmFloor: new THREE.MeshPhysicalMaterial({ color: 0x3a2b21, roughness: .45, clearcoat: .25, clearcoatRoughness: .5 }),
  thread: mat(ACCENT, .4, { emissive: ACCENT, emissiveIntensity: 2.6 }),
  glow: mat(0xfff1dc, .5, { emissive: 0xffdcb0, emissiveIntensity: 2.2 }),
  screen: mat(0x231e1a, .5, { emissive: 0xf2e2cc, emissiveIntensity: .06 }),
  sky: mat(0xffe9cc, 1, { emissive: 0xffe2bf, emissiveIntensity: .75 }),
};

function add(geometry, material, x = 0, y = 0, z = 0, { rot, cast = true } = {}) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z); if (rot) mesh.rotation.set(...rot);
  mesh.castShadow = cast; mesh.receiveShadow = true; scene.add(mesh); return mesh;
}
const box = (w, h, d, material, x, y, z, options) => add(new THREE.BoxGeometry(w, h, d), material, x, y, z, options);
function thread(points, radius = .024) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, "catmullrom", .15);
  add(new THREE.TubeGeometry(curve, 600, radius, 12, false), M.thread, 0, 0, 0, { cast: false });
  const end = curve.getPoint(1);
  add(new THREE.SphereGeometry(radius * 3.4, 32, 16), M.thread, end.x, end.y, end.z, { cast: false });
}
function arch(width, height, depth, thickness, material, x, y, z, rotY = 0) {
  const r = width / 2, spring = height - r, shape = new THREE.Shape();
  shape.moveTo(-r, 0); shape.lineTo(-r, spring); shape.absarc(0, spring, r, Math.PI, 0, true); shape.lineTo(r, 0); shape.lineTo(-r, 0);
  const hole = new THREE.Path(), inner = r - thickness;
  hole.moveTo(-inner, 0); hole.lineTo(inner, 0); hole.lineTo(inner, spring); hole.absarc(0, spring, inner, 0, Math.PI, false); hole.lineTo(-inner, 0);
  shape.holes.push(hole);
  return add(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .03, bevelThickness: .03, bevelSegments: 3, curveSegments: 64 }), material, x, y, z, { rot: [0, rotY, 0] });
}
function floor(material = M.floor) { add(new THREE.PlaneGeometry(120, 120), material, 0, 0, 0, { rot: [-Math.PI / 2, 0, 0], cast: false }); }
function sun(x, y, z, intensity, color = 0xffe6c4, target = [0, 0, 0], size = 14) {
  const light = new THREE.DirectionalLight(color, intensity); light.position.set(x, y, z); light.target.position.set(...target);
  light.castShadow = true; light.shadow.mapSize.set(4096, 4096); light.shadow.bias = -.0004; light.shadow.normalBias = .02;
  Object.assign(light.shadow.camera, { left: -size, right: size, top: size, bottom: -size, near: .5, far: 60 });
  scene.add(light, light.target); return light;
}
const fill = (sky = 0x8a7a68, ground = INK, intensity = .35) => scene.add(new THREE.HemisphereLight(sky, ground, intensity));
function lamp(x, y, z, intensity = 6, distance = 9, color = 0xffd2a0) { const light = new THREE.PointLight(color, intensity, distance, 2); light.position.set(x, y, z); light.castShadow = true; light.shadow.mapSize.set(1024, 1024); scene.add(light); }

// 01 Digital Presence: a gallery wall where an interface is hung like a work, with the thread arriving at it.
function presence() {
  floor();
  box(30, 10, .3, M.plaster, 0, 5, -5.15);
  box(.3, 10, 20, M.plaster, -7.2, 5, 2);
  box(6.6, 4, .2, M.dark, .6, 3, -4.9);
  box(6.2, 3.6, .04, M.screen, .6, 3, -4.78, { cast: false });
  box(6.2, .34, .06, M.plaster, .6, 4.63, -4.74);
  [[-1.7, 3.95, 2.2], [-2.05, 3.62, 1.5], [-2.15, 3.3, 1.3], [-2.2, 2.25, .9]].forEach(([, y, w]) => box(w, .07, .05, M.plasterLight, -2.0 + w / 2, y, -4.74, { cast: false }));
  box(1.9, 1.5, .08, M.clay, 2.3, 2.85, -4.72);
  box(1.1, .32, .08, M.thread, -1.05, 1.75, -4.72, { cast: false });
  add(new THREE.SphereGeometry(.06, 16, 16), M.thread, -2.2, 4.63, -4.69, { cast: false });
  box(2.2, .95, 1.2, M.stone, -3.4, .475, -2.4);
  arch(.9, 1.4, .18, .14, M.ivory, -3.4, .95, -2.5);
  box(3.2, .42, .85, M.wood, 3.3, .21, -1.2);
  sun(-7, 11, 7, 2.4, 0xffe6c4, [0, 1, -3]);
  const wash = new THREE.SpotLight(0xffe2bd, 22, 16, .55, .7, 1.4); wash.position.set(.6, 8.5, -.5); wash.target.position.set(.6, 2.8, -4.9); wash.castShadow = true; scene.add(wash, wash.target);
  fill();
  thread([[-11, .03, 2.4], [-5, .03, 1.6], [-1.6, .03, .2], [-.4, .03, -2.6], [-.4, .03, -4.55], [-.4, 1.3, -4.62], [-.3, 1.62, -4.66]]);
  return view === "wide" ? [[6.2, 2.5, 7.8], [-.4, 2.2, -3]] : [[-4.4, 1.7, 2.4], [1.2, 2.9, -4.8]];
}

// 02 Digital Products: interface layers held in space, the thread stitching them into one product.
function products() {
  floor();
  const grid = new THREE.GridHelper(60, 60, 0x2c2621, 0x1f1b17); grid.position.y = .005; scene.add(grid);
  box(40, 12, .3, M.dark, 0, 6, -10);
  const slabs = [
    [-3, 2.1, -1.4, .38, M.ivory], [-.8, 2.9, -2.8, .22, M.plasterLight], [1.5, 2.05, -1.1, -.14, M.clay], [3.5, 3.05, -3.3, -.32, M.dark], [.7, 1.05, .6, .08, M.stone],
  ];
  slabs.forEach(([x, y, z, ry, material], index) => {
    const group = new THREE.Group(); group.position.set(x, y, z); group.rotation.set(-.06, ry, 0); scene.add(group);
    const slab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.7, .06), material); slab.castShadow = slab.receiveShadow = true; group.add(slab);
    const ui = material === M.dark || material === M.clay ? M.plasterLight : M.plaster;
    [[0, .55, 1], [0, .38, .7], [0, .21, .6]].forEach(([, uy, w]) => { const bar = new THREE.Mesh(new THREE.BoxGeometry(w, .05, .02), ui); bar.position.set(-1.1 + w / 2, uy, .04); group.add(bar); });
    const card = new THREE.Mesh(new THREE.BoxGeometry(.9, .65, .02), index % 2 ? M.clay : M.wood); card.position.set(.6, -.25, .04); group.add(card);
    if (index === 2) { const dot = new THREE.Mesh(new THREE.BoxGeometry(.18, .18, .03), M.thread); dot.position.set(-.95, -.5, .05); group.add(dot); }
  });
  sun(-5, 12, 8, 2.2, 0xffe6c4, [0, 1, -1.5]);
  const rim = new THREE.DirectionalLight(0xd9a27e, 1.1); rim.position.set(8, 4, -6); scene.add(rim);
  fill(0x7a6c5e, INK, .4);
  thread([[-10, .03, 3], [-5.6, .03, 1.4], [-3.4, 1.4, -1.1], [-1.1, 2.6, -2.55], [1.2, 2.2, -1.0], [3.2, 2.85, -3.05], [4.6, 3.6, -4.6]]);
  return view === "wide" ? [[.6, 3.2, 9.4], [.3, 2.0, -1.4]] : [[5.4, 1.2, 3.4], [-.6, 2.5, -2.2]];
}

// 03 Intelligent Operations: a sequence of stations; the thread carries work across them and forks at a decision.
function operations() {
  floor();
  const grid = new THREE.GridHelper(80, 40, 0x2a241f, 0x1c1915); grid.position.y = .005; scene.add(grid);
  const stations = [[-6, -.6, 1.1], [-3.6, .5, 1.7], [-1.2, -.4, 1.3], [1.4, .3, 2.3], [3.9, -1.3, 1.6], [4.2, 1.8, 1.9]];
  stations.forEach(([x, z, h], index) => {
    add(new THREE.CylinderGeometry(.42, .46, h, 48), index === 3 ? M.clay : M.stone, x, h / 2, z);
    add(new THREE.SphereGeometry(.2, 32, 16), index === 3 ? M.thread : M.ivory, x, h + .2, z, { cast: index !== 3 });
    if (index === 3) add(new THREE.TorusGeometry(.42, .018, 12, 96), M.thread, x, h + .2, z, { rot: [Math.PI / 2, 0, 0], cast: false });
  });
  arch(1.7, 2.7, .3, .22, M.plasterLight, 2.7, 0, .2, -.35);
  [[-7.6, .2], [-7.1, -1.2], [-8.1, 1.4]].forEach(([x, z]) => box(.7, .05, .7, M.plaster, x, .025, z));
  sun(-6, 12, 9, 2.3, 0xffe6c4, [0, 0, 0], 16);
  const rim = new THREE.DirectionalLight(0xd9a27e, .9); rim.position.set(9, 5, -8); scene.add(rim);
  fill(0x7a6c5e, INK, .38);
  const top = (index, lift = .55) => { const [x, z, h] = stations[index]; return [x, h + lift, z]; };
  thread([[-7.6, .06, .2], [-6.6, .6, -.4], top(0), [-4.8, 2.5, .0], top(1), [-2.4, 2.4, .1], top(2), [.1, 2.6, -.2], top(3), [2.6, 2.6, .25], [3.6, 2.2, -.6], top(4)]);
  thread([[2.6, 2.6, .25], [3.4, 2.9, 1.1], top(5)]);
  return view === "wide" ? [[-1.5, 5.4, 11.5], [.2, 1.2, 0]] : [[-9.2, 1.3, 4.2], [1.6, 1.7, -.2]];
}

// 04 Spatial Visuals: a quiet interior, light falling through arched openings onto the floor.
function spatial() {
  floor(M.warmFloor);
  const wall = new THREE.Shape(); wall.moveTo(-9, 0); wall.lineTo(9, 0); wall.lineTo(9, 7); wall.lineTo(-9, 7); wall.lineTo(-9, 0);
  [[-1.6, 1.7, 4.2], [2.2, 1.7, 4.2]].forEach(([cx, w, h]) => { const r = w / 2, spring = h - r, hole = new THREE.Path(); hole.moveTo(cx - r, 0); hole.lineTo(cx + r, 0); hole.lineTo(cx + r, spring); hole.absarc(cx, spring, r, 0, Math.PI, false); hole.lineTo(cx - r, 0); wall.holes.push(hole); });
  add(new THREE.ExtrudeGeometry(wall, { depth: .45, bevelEnabled: false, curveSegments: 64 }), M.plasterLight, 0, 0, -4.45);
  box(.3, 7, 14, M.plaster, -6.4, 3.5, 2.5);
  box(24, .3, 16, M.plaster, 0, 7.15, 2, { cast: true });
  box(30, 12, .2, M.sky, 0, 4, -11, { cast: false });
  add(new THREE.PlaneGeometry(4.4, 3), M.rug, -1.4, .01, .4, { rot: [-Math.PI / 2, 0, 0], cast: false });
  box(3.2, .42, 1.05, M.ivory, -1.7, .21, -1.3); box(3.2, .62, .26, M.ivory, -1.7, .62, -1.72);
  box(1.4, .16, .8, M.plasterLight, -2.45, .5, -1.25); box(1.4, .16, .8, M.plasterLight, -.95, .5, -1.25);
  add(new THREE.CylinderGeometry(.34, .34, .56, 48), M.oak, .55, .28, -1.3);
  add(new THREE.CylinderGeometry(.03, .05, .34, 16), M.wood, .55, .73, -1.3);
  add(new THREE.SphereGeometry(.2, 32, 16), M.glow, .55, 1.02, -1.3, { cast: false });
  lamp(.55, 1.05, -1.1, 5, 7);
  box(1.6, .7, .5, M.oak, -4.6, .35, -3.9);
  arch(.55, .9, .12, .08, M.clay, -4.9, .7, -3.95);
  sun(1.2, 13, -12, 5.2, 0xffe2bf, [0, 0, .5], 12);
  fill(0x6e6052, INK, .32);
  thread([[-8, .03, 4.2], [-3.6, .03, 2.2], [.4, .03, 1.2], [2.2, .03, -1.4], [2.2, .03, -4.2], [2.25, .03, -6.6]]);
  return view === "wide" ? [[4.6, 1.75, 6.4], [-.8, 1.6, -3]] : [[-5.2, 1.5, 4.2], [1.6, 1.6, -4.4]];
}

const [position, target] = [presence, products, operations, spatial][world]();
camera.position.set(...position); camera.lookAt(...target);
let triangles = 0; scene.traverse(object => { if (object.isMesh) triangles += (object.geometry.index ? object.geometry.index.count : object.geometry.attributes.position.count) / 3; });
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), .5, .5, .9));
composer.addPass(new OutputPass());
composer.render();
window.__done = { triangles: Math.round(triangles), calls: scene.children.filter(child => child.isMesh).length };
