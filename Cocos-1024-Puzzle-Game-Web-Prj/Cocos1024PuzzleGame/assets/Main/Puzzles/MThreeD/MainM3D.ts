const { ccclass, property } = cc._decorator;

@ccclass
export default class MainM3D extends cc.Component {

    @property(cc.Light)
    light: cc.Light = null;

    @property(cc.Node)
    model: cc.Node = null;

    time = 0;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.model.eulerAngles = this.model.eulerAngles.add(cc.v3(e.getDeltaY(), 0, 0));
        }, this);
    }

    update(dt: number) {
        this.time += dt;

        this.light.node.x += this.node.width / 2 * Math.cos(this.time) * dt;
    }
}
