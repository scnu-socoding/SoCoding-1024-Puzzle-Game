const { ccclass, property } = cc._decorator;

@ccclass
export default class Jump extends cc.Component {

    @property(cc.Node)
    layout: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        let node = this.layout.children[Math.floor(this.layout.childrenCount * Math.random())];
        node.opacity = 255 - node.opacity;
    }
}
