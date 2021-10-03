const { ccclass, property } = cc._decorator;

@ccclass
export default class Lang7 extends cc.Component {

    @property(cc.Node)
    imageNode: cc.Node = null;

    time = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt: number) {
        this.time += dt;
        this.imageNode.opacity = 255 * Math.sin(this.time);
    }
}
