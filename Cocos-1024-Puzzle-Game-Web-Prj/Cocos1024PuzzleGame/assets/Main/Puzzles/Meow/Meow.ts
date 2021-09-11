import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Meow extends cc.Component {

    @property(cc.Texture2D)
    texture: cc.Texture2D = null;

    @property(DivWidget)
    divWidget: DivWidget = null;

    time = 0;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.divWidget.div.innerHTML = `<img style="width: 100%;
        height: 100%;" src=${this.texture.nativeUrl}></img>`;
    }

    update(dt: number) {
        this.time += dt;

        this.divWidget.node.angle += 360 * Math.cos(this.time) * dt;
        this.divWidget.node.x += this.node.width / 4 * Math.cos(this.time) * dt;
    }
}
