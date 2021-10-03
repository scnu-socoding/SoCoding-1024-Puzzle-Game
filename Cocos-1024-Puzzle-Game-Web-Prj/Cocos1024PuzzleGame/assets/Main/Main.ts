const { ccclass, property } = cc._decorator;

const payload =
    [{ puzzleName: "签到", prefabIndex: 0 },
    { puzzleName: "买瓜", prefabIndex: 1 },
    { puzzleName: "()+[]!", prefabIndex: 2 },
    { puzzleName: "太空的声音", prefabIndex: 3 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 4 },
    { puzzleName: "记错的梦", prefabIndex: 5 },
    { puzzleName: "Anime", prefabIndex: 6 },
    { puzzleName: "QR", prefabIndex: 7 },
    { puzzleName: "Meow", prefabIndex: 8 },
    { puzzleName: "手电筒", prefabIndex: 9 },
    { puzzleName: "null", prefabIndex: 10 },
    { puzzleName: "Character", prefabIndex: 11 },
    { puzzleName: "指针", prefabIndex: 12 },
    { puzzleName: "闪烁", prefabIndex: 13 },
    { puzzleName: "目录", prefabIndex: 14 },
    { puzzleName: "算法1", prefabIndex: 15 },
    { puzzleName: "算法2", prefabIndex: 16 },
    { puzzleName: "7", prefabIndex: 17 },
    { puzzleName: "12点", prefabIndex: 18 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 },
    { puzzleName: "丘丘人的宝箱", prefabIndex: 9 }];

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

    @property(cc.Node)
    leftNode: cc.Node = null;

    @property(cc.Node)
    rightNode: cc.Node = null;

    @property(cc.Node)
    cardContent: cc.Node = null;

    currentLevelID = 0;
    toLevelFuns = <Function[]>[];

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

        this.card.getChildByName('TitleBackground').zIndex = 999;

        for (let puzzle of payload) {
            let node = cc.instantiate(this.cardPrefab);
            node.getChildByName("Name").getComponent(cc.Label).string = puzzle.puzzleName;
            node.getChildByName("ID").getComponent(cc.Label).string =
                (1 + puzzle.prefabIndex).toString().padStart(2, '0');

            this.scrollContentNode.addChild(node);

            let fun = () => {
                this.currentLevelID = fun['levelID'];

                if (typeof this.toLevelFuns[this.currentLevelID - 1] === 'function') {
                    this.leftNode.active = true;
                    cc.tween(this.leftNode).to(0.2, { opacity: 255 }, { easing: 'smooth' }).start();
                } else {
                    cc.tween(this.leftNode).to(0.2, { opacity: 0 }, { easing: 'smooth' }).call(() => {
                        this.leftNode.active = false;
                    }).start();
                }

                if (typeof this.toLevelFuns[this.currentLevelID + 1] === 'function') {
                    this.rightNode.active = true;
                    cc.tween(this.rightNode).to(0.2, { opacity: 255 }, { easing: 'smooth' }).start();
                } else {
                    cc.tween(this.rightNode).to(0.2, { opacity: 0 }, { easing: 'smooth' }).call(() => {
                        this.rightNode.active = false;
                    }).start();
                }

                if (puzzle.prefabIndex === undefined) return;
                let prefab = this.puzzlePrefabs[puzzle.prefabIndex];
                if (!prefab) return;
                let node = cc.instantiate(prefab);

                this.cardContent.addChild(node);
                this.card.active = true;
                this.cardTitle.string = "Cocos 1024 Puzzle - " + puzzle.puzzleName;

                cc.tween(this.card).to(0.2, { opacity: 255, scale: 1, x: 0, y: 0 }, { easing: 'smooth' }).start();
            };

            fun['levelID'] = this.toLevelFuns.length;
            this.toLevelFuns.push(fun);

            node.on(cc.Node.EventType.TOUCH_END, fun, this);
        }
    }

    start() {
        for (let dot of this.dots) {
            dot.on(cc.Node.EventType.TOUCH_END, () => {
                cc.tween(dot).to(0.2, { scale: 0 }, { easing: 'smooth' }).call(() => dot.destroy()).start();
            }, this);
        }

        this.node.opacity = 0;
        cc.tween(this.node).to(0.5, { opacity: 255 }, { easing: 'circOut' }).start();

        cc.tween(cc.Camera.main).to(0.5, { zoomRatio: 1 }, { easing: 'circOut' }).start();
    }

    get levelCardNode() {
        return this.cardContent.children[this.cardContent.childrenCount - 1];
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

    openOJ() {
        window.open("https://oj.socoding.cn/");
    }

    toLastLevel() {
        let oldNode = this.levelCardNode;
        oldNode.setParent(this.cardContent.parent);
        let fun = this.toLevelFuns[this.currentLevelID - 1];
        if (typeof fun === 'function') fun();
        this.cardContent.x = -this.cardContent.width;

        cc.tween(oldNode).to(0.46, { x: oldNode.width }, { easing: 'circOut' })
            .call(() => { oldNode.destroy(); })
            .start();
        cc.tween(this.cardContent).to(0.5, { x: 0 }, { easing: 'circOut' }).start();
    }

    toNextLevel() {
        let oldNode = this.levelCardNode;
        oldNode.setParent(this.cardContent.parent);

        let fun = this.toLevelFuns[this.currentLevelID + 1];
        if (typeof fun === 'function') fun();
        this.cardContent.x = this.cardContent.width;

        cc.tween(oldNode).to(0.46, { x: -oldNode.width }, { easing: 'circOut' })
            .call(() => { oldNode.destroy(); })
            .start();
        cc.tween(this.cardContent).to(0.5, { x: 0 }, { easing: 'circOut' }).start();
    }


    // update (dt) {}
}
