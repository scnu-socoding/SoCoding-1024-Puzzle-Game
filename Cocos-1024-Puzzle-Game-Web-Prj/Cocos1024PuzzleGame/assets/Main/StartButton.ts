const { ccclass, property } = cc._decorator;

@ccclass
export default class StartButton extends cc.Component {

    @property(cc.Node)
    titleNode: cc.Node = null;

    @property(cc.Node)
    cardNode: cc.Node = null;

    contacting = false;
    rigidbody: cc.RigidBody = null;
    collider: cc.PhysicsBoxCollider = null;

    onLoad() {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.collider = this.node.getComponent(cc.PhysicsBoxCollider);

        this.node.on(cc.Node.EventType.TOUCH_START, this.buttonMove, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.buttonMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.buttonClick, this);
    }

    onBeginContact() {
        this.rigidbody.gravityScale = 1.2;
        this.contacting = true;
    }

    onEndContact() {
        this.contacting = false;
    }

    getRandomPosition() {
        let x = 0, y = 0;
        for (let i = 0; i < 100; i++) {
            x = (Math.random() - 0.5) * this.node.parent.width * 0.6;
            y = (Math.random() - 0.5) * this.node.parent.height * 0.6;
            if (this.node.getPosition().sub(cc.v2(x, y)).len() > 300) {
                return { x: x, y: y }
            }
        }
        return { x: x, y: y }
    }

    buttonClick() {
        this.collider.destroy();
        this.cardNode.active = true;
        cc.tween(this.titleNode).to(0.2, { x: 0 }, { easing: 'smooth' }).start();
    }

    buttonMove() {
        if (!this.contacting || this.node.y > this.titleNode.y) {
            cc.tween(this.node).to(0.2, this.getRandomPosition(), { easing: 'circOut' }).start();
        }
    }
}
