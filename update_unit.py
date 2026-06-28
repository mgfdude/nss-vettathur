import os
import glob
import re

project_dir = r"c:\Users\HP\OneDrive\Desktop\nss\web"
html_files = glob.glob(os.path.join(project_dir, "**/*.html"), recursive=True)

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the text inside the span that comes after "NSS VETTATHUR"
    new_content = re.sub(
        r'(<span class="font-bold text-lg text-slate-800 block tracking-tight leading-tight group-hover:text-primary transition-colors font-display">NSS VETTATHUR</span>\s*<span class="text-\[10px\] uppercase font-semibold text-slate-400 tracking-widest block leading-none">)Kerala Unit(</span>)',
        r'\1Unit:NSS/SFU/HSE/MPM/81\2',
        content,
        flags=re.IGNORECASE
    )
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
