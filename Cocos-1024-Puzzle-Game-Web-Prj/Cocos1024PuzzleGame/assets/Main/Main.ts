const { ccclass, property } = cc._decorator;

const payload =
    [{ puzzleName: "签到", prefabIndex: 0 },
    { puzzleName: "买瓜", prefabIndex: 1 },
    { puzzleName: "()+[]!", prefabIndex: 2 },
    { puzzleName: "来自太空的声音", prefabIndex: 3 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 4 },
    { puzzleName: "错误的梦", prefabIndex: 5 },
    { puzzleName: "Anime", prefabIndex: 6 },
    { puzzleName: "QR", prefabIndex: 7 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 8 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }, { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },];

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

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    levelCardNode: cc.Node = null;

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
                if (!prefab) return;
                let node = cc.instantiate(prefab);
                this.levelCardNode = node;
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

        this.scrollView.scrollToRight(2);
    }

    closeCard() {
        cc.tween(this.card).to(0.2, { opacity: 0, scale: 0 }, { easing: 'smooth' }).call(() => {
            this.card.active = false;
            this.levelCardNode && this.levelCardNode.destroy();
        }).start();
    }

    toSoCoding() {
        window.open("https://socoding.cn/");
    }


    // update (dt) {}
}
