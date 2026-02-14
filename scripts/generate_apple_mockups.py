#!/usr/bin/env python3
"""
Generate Apple Store-aesthetic landing page mockups for OpenClaw Reseller.
Uses Leonardo.ai (Nano Banana Pro = Gemini 3 Pro Image).
"""

import subprocess
import sys
import time
from pathlib import Path

# Leonardo API key
API_KEY = "88946c39-7322-40b8-81bb-02fa01ddad1f"

# Skill script path
SKILL_SCRIPT = "/Users/alvelda/clawdbot-ref/skills/nano-banana-pro/scripts/generate_image.py"

# Output directory
OUTPUT_DIR = Path("/Users/alvelda/clawd/projects/openclaw-reseller/mockups-apple")

# Apple Store aesthetic base prompt
APPLE_BASE = """
Ultra-minimalist Apple Store website aesthetic. Clean white background with subtle gray gradients.
San Francisco Pro typography. Generous white space. Premium product photography style.
Hero section with large centered product image. Elegant thin sans-serif headlines.
No clutter. No busy graphics. Breathable layout. High-end luxury tech feel.
Inspired by apple.com product pages. Modern elite web design. 4K render quality.
"""

# Value propositions with Apple-style prompts
MOCKUPS = {
    "privacy": {
        "tagline": "Your Data Never Leaves Your Mac",
        "prompts": [
            f"Landing page mockup: {APPLE_BASE} Hero showing sleek Mac Mini with glowing privacy shield icon. Headline 'Your Data. Your Mac. Period.' Subtle lock iconography. Trust-focused.",
            f"Landing page mockup: {APPLE_BASE} Split screen: elegant Mac on left, flowing data visualization staying contained within the device. 'Privacy by Design' headline. Serene, secure feeling.",
            f"Landing page mockup: {APPLE_BASE} Minimalist hero with Mac Mini surrounded by subtle concentric circles suggesting protection. 'What happens on your Mac, stays on your Mac.' Clean and confident.",
            f"Landing page mockup: {APPLE_BASE} Dark mode variant. Sleek Mac against black gradient. Small glowing green privacy indicator. 'Zero Cloud. Zero Compromise.' Dramatic and premium.",
            f"Landing page mockup: {APPLE_BASE} Abstract visualization of data as light particles contained within a crystalline Mac shape. 'True Privacy. True Power.' Ethereal and sophisticated.",
            f"Landing page mockup: {APPLE_BASE} Side profile of Mac Mini with transparent view showing data staying inside. 'Your AI. Your Rules.' Technical but elegant.",
            f"Landing page mockup: {APPLE_BASE} Hero with Mac Mini on pedestal, shield-like glow. Feature grid below with privacy icons. Enterprise-grade feel. 'Privacy Without Compromise.'",
            f"Landing page mockup: {APPLE_BASE} Artistic shot of Mac Mini with soft shadows, paired with 'No uploads. No leaks. No worries.' Peaceful, trustworthy vibe.",
        ]
    },
    "zero-setup": {
        "tagline": "Works Out of the Box",
        "prompts": [
            f"Landing page mockup: {APPLE_BASE} Hero showing Mac Mini emerging from elegant white packaging. 'Plug in. Power on. That's it.' Unboxing moment captured beautifully.",
            f"Landing page mockup: {APPLE_BASE} Single cable connecting to Mac Mini, everything else wireless. 'One cable. Infinite possibilities.' Extreme simplicity showcased.",
            f"Landing page mockup: {APPLE_BASE} Timeline graphic: Unbox, Plug In, Create - three simple icons. Mac Mini centered. 'Ready in 60 Seconds.' Clean process visualization.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini floating with soft shadow, single power indicator glowing. 'No configuration. No complexity. Just AI.' Zen-like simplicity.",
            f"Landing page mockup: {APPLE_BASE} Split hero: closed box on left, running AI interface on right. Arrow between them. '5 Minutes from Box to Brilliance.'",
            f"Landing page mockup: {APPLE_BASE} Overhead shot of pristine desk with just Mac Mini and display. 'Your AI workspace. Instantly.' Aspirational lifestyle shot.",
            f"Landing page mockup: {APPLE_BASE} Hand placing Mac Mini on desk, soft motion blur. 'Set it down. Get to work.' Human touch, warm but minimal.",
            f"Landing page mockup: {APPLE_BASE} Comparison: complex server rack crossed out vs single Mac Mini. 'From this to this.' Dramatic simplification story.",
        ]
    },
    "own-forever": {
        "tagline": "Buy Once, No Monthly Fees",
        "prompts": [
            f"Landing page mockup: {APPLE_BASE} Mac Mini with subtle golden accent suggesting value. 'Own your AI. Forever.' No subscriptions messaging. Investment-worthy feel.",
            f"Landing page mockup: {APPLE_BASE} Price tag visualization fading away, Mac Mini remains solid. 'No subscriptions. No surprises.' Freedom from recurring costs.",
            f"Landing page mockup: {APPLE_BASE} Timeline showing years of ownership: Year 1, Year 2, Year 5... Mac Mini stays constant. 'Yours for life.' Long-term value.",
            f"Landing page mockup: {APPLE_BASE} Split: subscription bills stacking up vs single Mac Mini. 'Stop renting. Start owning.' Clear value proposition.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini on minimalist shelf like a cherished possession. 'Your AI. Your asset.' Ownership pride.",
            f"Landing page mockup: {APPLE_BASE} Calculator showing $0 monthly next to Mac Mini. 'The last AI purchase you'll make.' Financial freedom angle.",
            f"Landing page mockup: {APPLE_BASE} Elegant certificate-style graphic: 'Lifetime Ownership' with Mac Mini. Premium, exclusive feel.",
            f"Landing page mockup: {APPLE_BASE} Clean comparison chart: Them (monthly fees) vs Us (one-time). Mac Mini hero above. 'The math is simple.'",
        ]
    },
    "local-power": {
        "tagline": "Run 70B Models on Your Desk",
        "prompts": [
            f"Landing page mockup: {APPLE_BASE} Mac Mini with subtle heat waves suggesting power. '70 Billion Parameters. Zero Cloud.' Raw capability, refined presentation.",
            f"Landing page mockup: {APPLE_BASE} Artistic neural network visualization emanating from Mac Mini. 'Supercomputer power. Desktop size.' Technical elegance.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini with abstract representation of AI processing - flowing light trails. 'Local AI. Global capability.'",
            f"Landing page mockup: {APPLE_BASE} Side-by-side: data center building vs Mac Mini. Same output arrow. 'Data center in your den.' Scale contrast.",
            f"Landing page mockup: {APPLE_BASE} Benchmark bars showing performance, Mac Mini product shot. 'Faster than you'd believe.' Performance-focused.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini with M-series chip visualization glowing inside. 'Apple Silicon. AI Optimized.' Technical showcase.",
            f"Landing page mockup: {APPLE_BASE} Developer's perspective: code on screen, Mac Mini below. 'Run the models the pros use.' Capability story.",
            f"Landing page mockup: {APPLE_BASE} Abstract visualization: tiny Mac Mini, massive AI brain projection above. 'Small footprint. Massive intelligence.'",
        ]
    },
    "hackers-edge": {
        "tagline": "The Cutting Edge AI Rig",
        "prompts": [
            f"Landing page mockup: {APPLE_BASE} Mac Mini with subtle tech-forward glow, dark mode. 'For those who build the future.' Innovator-focused, still Apple-clean.",
            f"Landing page mockup: {APPLE_BASE} Terminal window reflection on Mac Mini surface. 'Hackable. Extensible. Yours.' Developer appeal, premium execution.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini with subtle matrix-style data rain in background. 'Where AI pioneers start.' Cutting edge but sophisticated.",
            f"Landing page mockup: {APPLE_BASE} Split: consumer AI chat vs raw model access. Mac Mini bridges both. 'Go deeper.' Power user appeal.",
            f"Landing page mockup: {APPLE_BASE} Dark gradient hero, Mac Mini with green terminal glow. 'The rig that runs everything.' Hacker aesthetic, Apple polish.",
            f"Landing page mockup: {APPLE_BASE} API documentation snippets floating around Mac Mini. 'Full access. Full control.' Developer-centric.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini with 'root access' subtle badge. 'Your hardware. Your rules.' Ownership and control theme.",
            f"Landing page mockup: {APPLE_BASE} Early adopter badge style hero. Mac Mini as the centerpiece. 'Join the AI frontier.' Community angle.",
        ]
    },
    "instant-access": {
        "tagline": "Skip the 54-Day Wait",
        "prompts": [
            f"Landing page mockup: {APPLE_BASE} Split hero: grayed out Mac Mini with '54 Days' shipping delay vs bright cloud server rack 'Available Now'. 'Why wait?' Urgency and availability.",
            f"Landing page mockup: {APPLE_BASE} Calendar showing 54 days crossed out, instant 'Start Today' button glowing. 'Skip the line.' Clean comparison visual.",
            f"Landing page mockup: {APPLE_BASE} Hourglass fading out, server infrastructure glowing. 'Instant AI Power. No Shipping Delays.' Time-sensitive messaging.",
            f"Landing page mockup: {APPLE_BASE} Mac Mini with 'Ships in 54 Days' badge dimmed, cloud Mac bright with 'Ready Now'. 'Get started while they wait.'",
            f"Landing page mockup: {APPLE_BASE} Timeline showing: Order → 54 Days → Delivery vs Order → Instant Access. 'Two paths. One is faster.' Clean infographic style.",
            f"Landing page mockup: {APPLE_BASE} Person waiting (subtle silhouette) vs person working (bright). 'They're waiting. You're working.' Competitive advantage angle.",
            f"Landing page mockup: {APPLE_BASE} Cloud data center with Apple aesthetic, 'Hosted Mac Power. Zero Wait Time.' Enterprise-grade immediate availability.",
            f"Landing page mockup: {APPLE_BASE} Rocket launch imagery, subtle. 'Launch Today, Not in 54 Days.' Startup speed, premium feel.",
        ]
    }
}


def generate_image(prompt: str, output_path: Path) -> bool:
    """Generate a single image using nano-banana-pro via Leonardo."""
    cmd = [
        "uv", "run", SKILL_SCRIPT,
        "--prompt", prompt,
        "--filename", str(output_path),
        "--provider", "leonardo",
        "--api-key", API_KEY,
        "--resolution", "1K"
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        if result.returncode == 0 and output_path.exists():
            print(f"  ✅ Generated: {output_path.name}")
            return True
        else:
            print(f"  ❌ Failed: {output_path.name}")
            if result.stderr:
                print(f"     Error: {result.stderr[:200]}")
            return False
    except subprocess.TimeoutExpired:
        print(f"  ⏱️ Timeout: {output_path.name}")
        return False
    except Exception as e:
        print(f"  ❌ Exception: {e}")
        return False


def main():
    print("🍎 Generating Apple Store-aesthetic mockups via Leonardo (Nano Banana Pro)")
    print("=" * 70)
    
    total = 0
    success = 0
    
    for category, data in MOCKUPS.items():
        category_dir = OUTPUT_DIR / category
        category_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n📁 {category.upper()} - '{data['tagline']}'")
        print("-" * 50)
        
        for i, prompt in enumerate(data["prompts"], 1):
            filename = f"{category}-{i:02d}.png"
            output_path = category_dir / filename
            
            # Skip if already exists
            if output_path.exists():
                print(f"  ⏭️ Skipping (exists): {filename}")
                success += 1
                total += 1
                continue
            
            total += 1
            print(f"  🎨 Generating {i}/8: {filename}")
            
            if generate_image(prompt, output_path):
                success += 1
            
            # Rate limit: Leonardo has concurrency limits
            time.sleep(3)
    
    print("\n" + "=" * 70)
    print(f"✨ Complete: {success}/{total} images generated")
    print(f"📁 Output: {OUTPUT_DIR}")
    
    # Generate HTML gallery
    generate_gallery()


def generate_gallery():
    """Generate HTML gallery for the mockups."""
    html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenClaw Reseller - Apple Aesthetic Mockups</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
            background: #000;
            color: #f5f5f7;
            line-height: 1.5;
        }
        header {
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(180deg, #1d1d1f 0%, #000 100%);
        }
        h1 {
            font-size: 48px;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 21px;
            color: #86868b;
            font-weight: 400;
        }
        .section {
            padding: 60px 20px;
            border-bottom: 1px solid #1d1d1f;
        }
        .section h2 {
            font-size: 32px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 10px;
        }
        .tagline {
            text-align: center;
            font-size: 18px;
            color: #86868b;
            margin-bottom: 40px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 30px;
            max-width: 1800px;
            margin: 0 auto;
        }
        .card {
            background: #1d1d1f;
            border-radius: 18px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .card:hover {
            transform: scale(1.02);
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .card img {
            width: 100%;
            height: auto;
            display: block;
        }
        .card-label {
            padding: 15px 20px;
            font-size: 14px;
            color: #86868b;
            text-align: center;
        }
        .lightbox {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.95);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            padding: 40px;
        }
        .lightbox.active { display: flex; }
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
        }
        .lightbox-close {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 32px;
            color: #fff;
            cursor: pointer;
            background: none;
            border: none;
        }
        footer {
            text-align: center;
            padding: 40px;
            color: #86868b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <header>
        <h1>OpenClaw Reseller</h1>
        <p class="subtitle">Apple Store Aesthetic Mockups • Nano Banana Pro</p>
    </header>
'''
    
    sections = [
        ("privacy", "Privacy First", "Your Data Never Leaves Your Mac"),
        ("zero-setup", "Zero Setup", "Works Out of the Box"),
        ("own-forever", "Own Forever", "Buy Once, No Monthly Fees"),
        ("local-power", "Local Power", "Run 70B Models on Your Desk"),
        ("hackers-edge", "Hacker's Edge", "The Cutting Edge AI Rig"),
        ("instant-access", "Instant Access", "Skip the 54-Day Wait"),
    ]
    
    for folder, title, tagline in sections:
        html += f'''
    <section class="section" id="{folder}">
        <h2>{title}</h2>
        <p class="tagline">{tagline}</p>
        <div class="grid">
'''
        folder_path = OUTPUT_DIR / folder
        if folder_path.exists():
            for img in sorted(folder_path.glob("*.png")):
                html += f'''            <div class="card" onclick="openLightbox('{folder}/{img.name}')">
                <img src="{folder}/{img.name}" alt="{title} mockup" loading="lazy">
                <div class="card-label">{img.stem}</div>
            </div>
'''
        html += '''        </div>
    </section>
'''
    
    html += '''
    <footer>
        <p>Generated with Nano Banana Pro (Gemini 3 Pro Image) via Leonardo.ai</p>
        <p>OpenClaw Mac Reseller Project • February 2026</p>
    </footer>
    
    <div class="lightbox" id="lightbox" onclick="closeLightbox()">
        <button class="lightbox-close">&times;</button>
        <img id="lightbox-img" src="" alt="">
    </div>
    
    <script>
        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox').classList.add('active');
        }
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeLightbox();
        });
    </script>
</body>
</html>
'''
    
    gallery_path = OUTPUT_DIR / "gallery.html"
    gallery_path.write_text(html)
    print(f"📄 Gallery created: {gallery_path}")


if __name__ == "__main__":
    main()
