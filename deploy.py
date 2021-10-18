import os
import shutil

if os.path.exists('../deploy/'):
    shutil.rmtree('../deploy/')

shutil.copytree(
    './Cocos-1024-Puzzle-Game-Web-Prj/Cocos1024PuzzleGame/build/web-mobile/', '../deploy/')

ico_name = ''
splash_name = ''

for name in os.listdir('../deploy/'):
    if name.startswith('favicon'):
        os.remove('../deploy/'+name)
        ico_name = name
    elif name.startswith('splash'):
        os.remove('../deploy/'+name)
        splash_name = name

shutil.copyfile('./build-temp/logo-circle.ico', '../deploy/'+ico_name)
shutil.copyfile('./build-temp/SocodingLOGO-White-P.png',
                '../deploy/'+splash_name)

html = ''
with open('../deploy/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

os.remove('../deploy/index.html')

with open('../deploy/index.html', 'w+', encoding='utf-8') as f:
    html = html.replace('Cocos Creator | SoCoding1024PuzzleGame',
                        '1024解密游戏 | SoCoding')
    html = html.replace('<script type="text/javascript">', """<script type="text/javascript">
!function(){
    var _0x1cbb = ["tor", "struc", "call", "ger", "con", "bug", "de", "apply"];
    setInterval(check, 500);
    function check() {
        function doCheck(_0x1834ff) {
            if (('' + _0x1834ff / _0x1834ff)['length'] !== 0x1 || _0x1834ff % 0x14 === 0x0) {
                (function() {return !![]}[
                    _0x1cbb[0x4] + _0x1cbb[0x1] + _0x1cbb[0x0]
                ](
                    _0x1cbb[0x6] + _0x1cbb[0x5] + _0x1cbb[0x3]
                )[_0x1cbb[0x2]]());
            } else {
                (function() {return ![]}[
                    _0x1cbb[0x4] + _0x1cbb[0x1] + _0x1cbb[0x0]
                ](
                    _0x1cbb[0x6] + _0x1cbb[0x5] + _0x1cbb[0x3]
                )[_0x1cbb[0x7]]());
            }
            doCheck(++_0x1834ff);
        }
        try {
            doCheck(0)
        } catch(err) { }
    };
}();""")
    f.write(html)
