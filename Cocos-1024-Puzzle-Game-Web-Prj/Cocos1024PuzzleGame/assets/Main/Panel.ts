const { ccclass, property } = cc._decorator;

@ccclass
export default class Panel extends cc.Component {

    @property(cc.Node)
    panelNode: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    splashNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.splashNode.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.panelNode.x += e.getDeltaX();
            this.panelNode.y += e.getDeltaY();
        }, this);

        this.panelNode.on(cc.Node.EventType.TOUCH_START, () => {
            let maxZIndex = 0;
            for (let node of this.panelNode.parent.children) {
                maxZIndex = Math.max(maxZIndex, node.zIndex);
            }
            this.panelNode.zIndex = maxZIndex + 1;
        }, this)
    }

    start() {

    }

    set divLabelString(str: string) {
        this.label.string = str;
    }

    async openPanel(str: string) {
        if (this.panelNode.active === true) {
            await this.closePanel();
        }
        this.panelNode.active = true;
        this.divLabelString = str;
        this.panelNode.scale = 0;
        this.panelNode.opacity = 0;
        this.panelNode.x = 0;
        this.panelNode.y = 0;

        return new Promise((resolve, reject) => {
            cc.tween(this.panelNode).to(0.2, { scale: 1, opacity: 253 }, { easing: 'smooth' }).call(() => {
                resolve(undefined);
            }).start();
        });
    }

    closePanel() {
        return new Promise((resolve, reject) => {
            cc.tween(this.panelNode).to(0.2, { scale: 0, opacity: 0 }, { easing: 'smooth' }).call(() => {
                this.panelNode.active = false;
                resolve(undefined);
            }).start();
        });
    }

    // update (dt) {}
}
