const { ccclass, property } = cc._decorator;

@ccclass
export default class Index extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    @property(cc.Sprite)
    image: cc.Sprite = null;

    @property(cc.Node)
    logo: cc.Node = null;

    onLoad() {
        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1200);
    }

    getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
    }

    start() {
        cc.tween(this.logo).to(0.5, { scale: 1 }, { easing: 'smooth' }).start();


        let scene = this.getQueryVariable('scene') || "Main";

        cc.director.preloadScene(scene, (completedCount: number, totalCount: number, item: any) => {
            this.label.string = `${completedCount} / ${totalCount} 正在加载`;
            this.label2.string = item.uuid;
            this.image.fillRange = completedCount / totalCount;
        }, (error: Error) => {
            if (error) {
                this.label.string = `无法加载场景 ${scene}`;
            } else {
                cc.director.loadScene(scene);
            }
        });

    }

    // update (dt) {}
}
