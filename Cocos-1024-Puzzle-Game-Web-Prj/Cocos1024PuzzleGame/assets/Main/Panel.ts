const { ccclass, property } = cc._decorator;

@ccclass
export default class Panel extends cc.Component {

    @property(cc.Node)
    panelNode: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Node)
    splashNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let camera = cc.Camera.main;
        this.splashNode.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.panelNode.x += e.getDeltaX() / camera.zoomRatio;
            this.panelNode.y += e.getDeltaY() / camera.zoomRatio;
        }, this);

        this.panelNode.on(cc.Node.EventType.TOUCH_START, () => {
            let maxZIndex = 0;
            for (let node of this.panelNode.parent.children) {
                maxZIndex = Math.max(maxZIndex, node.zIndex);
            }
            this.panelNode.zIndex = maxZIndex + 1;
        }, this)

        this.panelNode.active = false;
    }

    start() {

    }

    set divLabelString(str: string) {
        this.label.string = str;
    }

    openPanel(str: string, title?: string) {
        this.panelNode.active = true;
        this.divLabelString = str;
        if (title) {
            this.title.string = title;
        }
        this.panelNode.scale = 0;
        this.panelNode.opacity = 0;
        this.panelNode.x = 0;
        this.panelNode.y = 0;

        let maxZIndex = 0;
        let maxZIndexPanel: cc.Node = null;
        for (let node of this.panelNode.parent.children) {
            if (node.name === 'Panel' && maxZIndex < node.zIndex) {
                maxZIndex = node.zIndex;
                maxZIndexPanel = node;
            }
        }
        this.panelNode.zIndex = maxZIndex + 1;
        if (maxZIndexPanel) {
            this.panelNode.x = maxZIndexPanel.x + 30;
            this.panelNode.y = maxZIndexPanel.y - 30;
        }

        return new Promise((resolve, reject) => {
            cc.tween(this.panelNode).to(0.2, { scale: 1, opacity: 253 }, { easing: 'smooth' }).call(() => {
                resolve(this);
            }).start();
        });
    }

    closePanel() {
        return new Promise((resolve, reject) => {
            if (this.panelNode && this.panelNode.active) {
                cc.tween(this.panelNode).to(0.2, { scale: 0, opacity: 0 }, { easing: 'smooth' }).call(() => {
                    this.panelNode.destroy();
                    resolve(this);
                }).start();
            }
        });
    }

    // update (dt) {}
}
