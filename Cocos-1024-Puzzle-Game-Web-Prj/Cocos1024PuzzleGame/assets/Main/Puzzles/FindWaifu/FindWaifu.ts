const { ccclass, property } = cc._decorator;

@ccclass
export default class FindWaifu extends cc.Component {

    @property(cc.Layout)
    layout1: cc.Layout = null;

    toX = 0;
    toY = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.toX = this.layout1.node.x;
        this.toY = this.layout1.node.y;

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.toX += e.getDeltaX() / (this.node?.parent?.parent?.parent?.scale || 1);
            this.toY += e.getDeltaY() / (this.node?.parent?.parent?.parent?.scale || 1);
        }, this);

    }

    update(dt: number) {
        this.layout1.node.x += (this.toX - this.layout1.node.x) * dt * 10;
        this.layout1.node.y += (this.toY - this.layout1.node.y) * dt * 10;
    }
}
