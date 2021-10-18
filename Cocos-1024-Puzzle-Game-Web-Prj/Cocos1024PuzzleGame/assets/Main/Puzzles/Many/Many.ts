const { ccclass, property } = cc._decorator;

@ccclass
export default class Many extends cc.Component {

    @property(cc.Node)
    dot: cc.Node = null;

    @property(cc.Layout)
    gird: cc.Layout = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for (let i = 0; i < 347; i++) {
            let dot = cc.instantiate(this.dot);
            dot.color = cc.color(256 * Math.random(), 256 * Math.random(), 256 * Math.random());
            this.gird.node.addChild(dot);
        }

        for (let i of [12, 25, 150, 300]) {
            this.gird.node.children[i]['zx'] = true;
        }
    }

    start() {
        setTimeout(() => {
            this.gird.enabled = false;
        }, 500)
    }

    update() {
        if (Math.random() < 0.1 && this.gird.enabled === false) {
            let nodes = <cc.Node[]>[];

            for (let node of this.gird.node.children) {
                if (Math.random() < 0.1) {
                    nodes.push(node);
                }
            }

            while (nodes.length !== 0) {
                let node1 = nodes.pop();
                let node2 = nodes.shift();

                if (node1 && node2 && !node1['tweening'] && !node2['tweening'] && !node1['zx'] && !node2['zx']) {
                    node1['tweening'] = cc.tween(node1)
                        .to(0.5, { position: cc.v3(node2.x, node2.y) }, { easing: 'smooth' })
                        .call(() => {
                            node1['tweening'] = false;
                        })
                        .start();
                    node2['tweening'] = cc.tween(node2)
                        .to(0.5, { position: cc.v3(node1.x, node1.y) }, { easing: 'smooth' })
                        .call(() => {
                            node2['tweening'] = false;
                        })
                        .start();
                }
            }
        }
    }
}
