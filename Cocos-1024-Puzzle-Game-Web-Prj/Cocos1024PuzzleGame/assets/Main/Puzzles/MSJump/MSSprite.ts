const { ccclass, property } = cc._decorator;

@ccclass
export default class MSSprite extends cc.Component {

    @property(cc.Node)
    lossNode: cc.Node = null;

    onBeginContact() {
        this.lossNode.active = true;
        cc.tween(this.node).to(0.3, { opacity: 0 }, { easing: 'circOut' }).call(() => {
            this.node.active = false;
        }).start();
    }

    refresh() {
        cc.director.loadScene(cc.director.getScene().name);
    }

}
