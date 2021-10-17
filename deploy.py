import os
import shutil

if os.path.exists('./deploy/'):
    shutil.rmtree('./deploy/')

shutil.copytree(
    './Cocos-1024-Puzzle-Game-Web-Prj/Cocos1024PuzzleGame/build/web-mobile/', './deploy/')

ico_name = ''
splash_name = ''

for name in os.listdir('./deploy/'):
    if name.startswith('favicon'):
        os.remove('./deploy/'+name)
        ico_name = name
    elif name.startswith('splash'):
        os.remove('./deploy/'+name)
        splash_name = name

shutil.copyfile('./build-temp/logo-circle.ico', './deploy/'+ico_name)
shutil.copyfile('./build-temp/SocodingLOGO-White-P.png',
                './deploy/'+splash_name)

html = ''
with open('./deploy/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

os.remove('./deploy/index.html')

with open('./deploy/index.html', 'w+', encoding='utf-8') as f:
    html = html.replace('Cocos Creator | SoCoding1024PuzzleGame',
                '1024解密游戏 | SoCoding')
    f.write(html)
