import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainNone extends cc.Component {

    @property(cc.Texture2D)
    texture: cc.Texture2D = null;

    @property(DivWidget)
    divWidget: DivWidget = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.divWidget.div.innerHTML = `<img style="
        width: 100%;
        height: 100%;
        opacity: 0;
        " src=${this.texture.nativeUrl}></img>`;
    }

    // update (dt) {}
}
