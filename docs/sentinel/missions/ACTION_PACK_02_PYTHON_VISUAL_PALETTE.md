# SENTINEL ACTION PACK 02: PYTHON AESTHETIC PALETTE EXTRACTOR
**Target Role:** Harika (`[SENTINEL]`)  
**Estimated Time:** 25 Minutes  
**Skill Focus:** Hands-on Python, Color Theory, Image Processing  
**Self-Verifying Success Gate:** A runnable Python script that takes any outfit/Pinterest image and automatically generates a graphic preview of the 5 dominant luxury hex colors.

---

## 🎯 The Mission
Forget dry mathematics. Code is a design superpower. In this mission, you will build your very own **Aesthetic Palette Extractor** in Python. You can drop in any fashion outfit, luxury interior, or architectural render, and your script will mathematically isolate the harmonious color palette.

---

## 🛠️ Step-by-Step Execution Guide

### Step 1: Install the Creative Tools (3 mins)
Open your terminal and install two lightweight visual packages:
```bash
pip install colorthief matplotlib pillow
```

---

### Step 2: Write the Extractor Script (10 mins)
Create a new file: `extract_palette.py`.

Paste this clean, runnable script:

```python
import os
from colorthief import ColorThief
import matplotlib.pyplot as plt

def extract_and_display_palette(image_path, num_colors=5):
    print(f"🎨 Analyzing color harmonies in: {image_path}...")
    
    # 1. Read the image and extract palette
    color_thief = ColorThief(image_path)
    palette = color_thief.get_palette(color_count=num_colors)
    
    # 2. Convert RGB to clean Web Hex strings
    hex_colors = [f"#{r:02x}{g:02x}{b:02x}" for r, g, b in palette]
    print("\n✨ Extracted Luxury Hex Tokens:")
    for idx, hex_code in enumerate(hex_colors, 1):
        print(f"  Color {idx}: {hex_code}")
        
    # 3. Create a beautiful visual swatch graphic
    fig, ax = plt.subplots(figsize=(8, 2))
    for i, color in enumerate(palette):
        # Normalize RGB from 0-255 to 0.0-1.0 for matplotlib
        norm_color = [c / 255.0 for c in color]
        ax.fill_between([i, i + 1], 0, 1, color=norm_color)
        ax.text(i + 0.5, 0.5, hex_colors[i], 
                ha='center', va='center', 
                color='white' if sum(color) < 400 else 'black', 
                fontfamily='monospace', fontweight='bold', fontsize=12)

    ax.set_xlim(0, num_colors)
    ax.set_ylim(0, 1)
    ax.axis('off')
    plt.title("Sentinel Palette Signature", fontsize=14, fontweight='bold', pad=10)
    
    # Save the output graphic
    output_filename = "extracted_palette.png"
    plt.savefig(output_filename, bbox_inches='tight', dpi=150)
    print(f"\n🖼️ Saved visual palette swatch to: {output_filename}")
    plt.show()

if __name__ == "__main__":
    # Test with any sample image on your computer
    sample_img = "test_image.jpg"
    if not os.path.exists(sample_img):
        # If no image exists, create a quick gradient test image
        from PIL import Image, ImageDraw
        img = Image.new('RGB', (400, 400), color='#090C15')
        draw = ImageDraw.Draw(img)
        draw.ellipse([50, 50, 350, 350], fill='#A855F7', outline='#00F5D4', width=8)
        img.save(sample_img)
        print("💡 Created temporary aesthetic test image: test_image.jpg")
        
    extract_and_display_palette(sample_img, num_colors=5)
```

---

### Step 3: Run and Observe (5 mins)
Run the script in your terminal:
```bash
python extract_palette.py
```
* **Success Gate:** Matplotlib opens a window displaying 5 elegant color swatches with their exact hex codes printed across each box, and saves `extracted_palette.png`!

---

### Step 4: Experiment with Your Own Visuals (7 mins)
1. Download any photo of an outfit you love, a scenic nature shot, or an architectural render.
2. Rename it `outfit.jpg`.
3. Change `sample_img = "outfit.jpg"` in the script and re-run.
4. Use the generated hex codes directly in your next Figma or Tailwind design!

**Mission Complete!** You just wrote your first real Python computer vision & design tool.
