const { ccclass, property } = cc._decorator;

const payload = [{ puzzleName: "买瓜", prefabIndex: 0 },
{ puzzleName: "()+[]!", prefabIndex: 1 }];

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    cardNode: cc.Node = null;

    @property([cc.Node])
    dots: cc.Node[] = [];

    @property(cc.Node)
    scrollContentNode: cc.Node = null;

    @property(cc.Prefab)
    cardPrefab: cc.Prefab = null;

    @property([cc.Prefab])
    puzzlePrefabs: cc.Prefab[] = [];

    @property(cc.Node)
    card: cc.Node = null;

    @property(cc.Label)
    cardTitle: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1200);

        this.cardNode.y = this.node.height / 2 + this.cardNode.height / 2;
        this.cardNode.active = false;

        this.card.opacity = 0;
        this.card.scale = 0;
        this.card.active = false;

        for (let puzzle of payload) {
            let node = cc.instantiate(this.cardPrefab);
            node.children[0].getComponent(cc.Label).string = puzzle.puzzleName;
            this.scrollContentNode.addChild(node);
            node.on(cc.Node.EventType.TOUCH_END, () => {
                let prefab = this.puzzlePrefabs[puzzle.prefabIndex];
                let node = cc.instantiate(prefab);
                this.card.addChild(node);
                this.card.active = true;
                this.cardTitle.string = "Cocos 1024 Puzzle - " + puzzle.puzzleName;
                cc.tween(this.card).to(0.2, { opacity: 255, scale: 1 }, { easing: 'smooth' }).start();
            }, this);
        }
    }

    start() {
        for (let dot of this.dots) {
            dot.on(cc.Node.EventType.TOUCH_END, () => {
                cc.tween(dot).to(0.2, { scale: 0 }, { easing: 'smooth' }).call(() => dot.destroy()).start();
            }, this);
        }
    }

    closeCard() {
        cc.tween(this.card).to(0.2, { opacity: 0, scale: 0 }, { easing: 'smooth' }).call(() => {
            this.card.active = false;
            this.card.children[this.card.childrenCount - 1].destroy();
        }).start();
    }


    // update (dt) {}
}
