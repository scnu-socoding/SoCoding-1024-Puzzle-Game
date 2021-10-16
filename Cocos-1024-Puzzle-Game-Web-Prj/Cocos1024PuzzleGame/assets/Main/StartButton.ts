import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartButton extends cc.Component {

    @property(cc.Node)
    titleNode: cc.Node = null;

    @property(cc.Node)
    cardNode: cc.Node = null;

    @property(Main)
    main: Main = null;

    @property(cc.Node)
    cocosNode: cc.Node = null;


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

    start() {
        if (cc.sys.localStorage.getItem('c01In') === 'true') {
            this.node.targetOff(this.node);

            for (let dot of this.main.dots) {
                cc.tween(dot).to(0.2, { scale: 0 }, { easing: 'smooth' }).call(() => dot.destroy()).start();
            }

            this.onBeginContact();
            this.buttonClick();
        }
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
        cc.tween(this.node).to(2, { opacity: 0 }, { easing: 'smooth' }).call(() => this.node.destroy()).start();
        let tween1 = cc.tween(this.titleNode).to(0.3, { x: 0 }, { easing: 'smooth' });
        let tween2 = cc.tween(this.titleNode).to(10, { x: 0 }, { easing: 'smooth' });
        cc.tween(this.titleNode).sequence(tween1, tween2).start();

        this.main.scrollView.scrollToLeft(1);

        this.cocosNode.opacity = 0;
        this.cocosNode.active = true;
        cc.tween(this.cocosNode).to(0.5, { opacity: 255 }, { easing: 'smooth' }).start();

        cc.sys.localStorage.setItem('c01In', true);

    }

    buttonMove() {
        if (!this.contacting || this.node.y > this.titleNode.y) {
            cc.tween(this.node).to(0.2, this.getRandomPosition(), { easing: 'circOut' }).start();
        }
    }
}
