const { ccclass, property } = cc._decorator;

@ccclass
export default class MSJump extends cc.Component {

    @property(cc.RigidBody)
    sprite: cc.RigidBody = null;

    @property(cc.Node)
    levelNode: cc.Node = null;

    @property(cc.Node)
    touchNode: cc.Node = null;

    @property(cc.Node)
    cameraNode: cc.Node = null;

    @property(cc.Node)
    backNode: cc.Node = null;



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onkeyDown, this);

        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            if (e.getDeltaX() < 0 && this.sprite.node.opacity !== 0) {
                this.moveLevelNode(cc.v2(-1000, 700));
            } else {
                this.moveLevelNode(cc.v2(1000, 700));
            }
        }, this);
    }

    start() {
        cc.Camera.main.zoomRatio = 2;
        cc.tween(cc.Camera.main).to(1, { zoomRatio: 1 }, { easing: 'circOut' }).start();
    }

    moveLevelNode(vec2: cc.Vec2) {
        this.sprite.getComponent(cc.RigidBody).linearVelocity = vec2;
    }

    moveLevelNodeP(vec2: cc.Vec2) {
        for (let node of this.levelNode.children) {
            for (let child of node.children) {
                child.x = vec2.x;
                child.y = vec2.y;
            }
        }
    }

    onkeyDown(e: cc.Event.EventKeyboard) {
        switch (e.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.moveLevelNode(cc.v2(-1000, 700));
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.moveLevelNode(cc.v2(1000, 700));
                break;
        }
    }

    update(dt: number) {
        this.cameraNode.x += (this.sprite.node.x - this.cameraNode.x) * dt * 10;
        this.backNode.x += (this.sprite.node.x - this.backNode.x) * dt;

        this.cameraNode.y += (this.sprite.node.y - this.cameraNode.y) * dt * 10;
        this.backNode.y += (this.sprite.node.y - this.backNode.y) * dt;
    }

}
