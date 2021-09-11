const { ccclass, property } = cc._decorator;

const payload =
    [{ puzzleName: "签到", prefabIndex: 0, score: 200 },
    { puzzleName: "买瓜", prefabIndex: 1, score: 200 },
    { puzzleName: "()+[]!", prefabIndex: 2, score: 200 },
    { puzzleName: "来自太空的声音", prefabIndex: 3, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 4, score: 200 },
    { puzzleName: "记错的梦", prefabIndex: 5, score: 200 },
    { puzzleName: "Anime", prefabIndex: 6, score: 200 },
    { puzzleName: "QR", prefabIndex: 7, score: 200 },
    { puzzleName: "Meow", prefabIndex: 8, score: 200 },
    { puzzleName: "手电筒", prefabIndex: 9, score: 200 },
    { puzzleName: "什么也没有", prefabIndex: 10, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9, score: 200 }];

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
        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1200);

        this.cardNode.y = this.node.height / 2 + this.cardNode.height / 2;
        this.cardNode.active = false;

        this.card.opacity = 0;
        this.card.scale = 0;
        this.card.active = false;

        this.card.children[0].zIndex = 999;

        for (let puzzle of payload) {
            let node = cc.instantiate(this.cardPrefab);
            node.getChildByName("Name").getComponent(cc.Label).string = puzzle.puzzleName;
            node.getChildByName("ID").getComponent(cc.Label).string =
                (1 + puzzle.prefabIndex).toString().padStart(2, '0');
            node.getChildByName("Score").getComponent(cc.Label).string = 'score: ' + puzzle.score.toString();
            this.scrollContentNode.addChild(node);

            node.on(cc.Node.EventType.TOUCH_END, () => {
                let prefab = this.puzzlePrefabs[puzzle.prefabIndex];
                if (!prefab) return;
                let node = cc.instantiate(prefab);
                this.levelCardNode = node;
                this.card.addChild(node);
                this.card.active = true;
                this.cardTitle.string = "Cocos 1024 Puzzle - " + puzzle.puzzleName;

                cc.tween(this.card).to(0.2, { opacity: 255, scale: 1, x: 0, y: 0 }, { easing: 'smooth' }).start();
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
