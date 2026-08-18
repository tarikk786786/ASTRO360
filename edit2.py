import sys

path = r'c:\Users\tarik\Downloads\Documents\ASTRO\src\App.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('{/* Top Bar */}', '      {/* Main Content */}\n      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">\n        {/* Top Bar */}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
