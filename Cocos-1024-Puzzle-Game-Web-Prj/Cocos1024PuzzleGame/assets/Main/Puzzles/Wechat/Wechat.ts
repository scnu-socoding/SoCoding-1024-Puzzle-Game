import Main from "../../Main";
import Panel from "../../Panel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Wechat extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    panel: Panel = null;

    start() {
        let main: Main = window['Main1024'];
        if (main) {
            main.openPanel(`去 SoCoding 微信公众号看看吧！`, `一条提示`).then((panel: Panel) => {
                this.panel = panel;
            });
        }
    }

    onDestroy() {
        if (this.panel) {
            this.panel.closePanel();
        }
    }

    // update (dt) {}
}
