import Panel from "./Panel";

const { ccclass, property } = cc._decorator;

const payload =
    [
        { puzzleName: "签到", prefabIndex: 0 },
        { puzzleName: "手电筒", prefabIndex: 9 },
        { puzzleName: "闪烁", prefabIndex: 13 },
        { puzzleName: "Wechat", prefabIndex: 27 },
        { puzzleName: "null", prefabIndex: 10 },
        { puzzleName: "QR", prefabIndex: 7 },
        { puzzleName: "目录", prefabIndex: 14 },
        { puzzleName: "()+[]!", prefabIndex: 2 },
        { puzzleName: "12", prefabIndex: 18 },
        { puzzleName: "柱", prefabIndex: 24 },
        { puzzleName: "绑架", prefabIndex: 25 },
        { puzzleName: "./Flag", prefabIndex: 21 },
        { puzzleName: "买瓜", prefabIndex: 1 },
        { puzzleName: "Anime", prefabIndex: 6 },
        { puzzleName: "Character", prefabIndex: 11 },
        { puzzleName: "FindWaifu", prefabIndex: 22 },
        { puzzleName: "丘丘人的宝箱", prefabIndex: 4 },
        { puzzleName: "太空的声音", prefabIndex: 3 },
        { puzzleName: "Meow", prefabIndex: 8 },
        { puzzleName: "Document", prefabIndex: 26 },
        { puzzleName: "0b01", prefabIndex: 15 },
        { puzzleName: "0b10", prefabIndex: 16 },
        { puzzleName: "指针", prefabIndex: 12 },
        { puzzleName: "7", prefabIndex: 17 },
        { puzzleName: "琴声", prefabIndex: 20 },
        { puzzleName: "wDream", prefabIndex: 5 },
        { puzzleName: "Dot", prefabIndex: 23 },
        { puzzleName: "MSJump", prefabIndex: 19 },
    ];



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

    @property(cc.Node)
    socodingNode: cc.Node = null;

    @property(cc.Node)
    socodingNodeP: cc.Node = null;

    @property(cc.Prefab)
    panelPrefab: cc.Prefab = null;

    currentLevelID = 0;
    toLevelFuns = <Function[]>[];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window['Main1024'] = this;

        this.cardNode.y = this.node.height / 2 + this.cardNode.height / 2;
        this.cardNode.active = false;

        this.card.opacity = 0;
        this.card.scale = 0;
        this.card.active = false;

        this.card.getChildByName('CardMain').getChildByName('TitleBackground').zIndex = 999;

        for (let i = 0; i < payload.length; i++) {
            let puzzle = payload[i];

            let node = cc.instantiate(this.cardPrefab);
            node.getChildByName("Name").getComponent(cc.Label).string = puzzle.puzzleName;
            node.getChildByName("ID").getComponent(cc.Label).string =
                (1 + i).toString().padStart(2, '0');

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

                for (let chid of this.cardContent.children) {
                    chid.destroy();
                }

                this.cardContent.addChild(node);
                this.card.active = true;
                this.cardTitle.string = "SoCoding 1024 Puzzle - " + puzzle.puzzleName;

                if (this.card.opacity !== 255) {
                    cc.tween(this.card).to(0.2, { opacity: 255, scale: 1, x: 0, y: 0 }, { easing: 'smooth' }).start();
                }
            };

            fun['levelID'] = this.toLevelFuns.length;
            this.toLevelFuns.push(fun);

            node.on(cc.Node.EventType.TOUCH_END, fun, this);
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onkeyDown, this);
    }

    start() {
        this.cardTitle.node.parent.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.card.x += e.getDeltaX();
            this.card.y += e.getDeltaY();
        }, this);

        let lastTouchEndTime = 0;
        this.cardTitle.node.parent.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            let touchEndTime = Date.now();
            if (touchEndTime - lastTouchEndTime < 200) {
                if (this.card.scale > 0.75)
                    cc.tween(this.card).to(0.3, { scale: 0.5 }, { easing: 'circOut' }).start();
                else
                    cc.tween(this.card).to(0.3, { scale: 1, x: 0, y: 0 }, { easing: 'circOut' }).start();
            }
            lastTouchEndTime = touchEndTime;
        }, this);


        for (let dot of this.dots) {
            dot.on(cc.Node.EventType.TOUCH_END, () => {
                cc.tween(dot).to(0.2, { scale: 0 }, { easing: 'smooth' }).call(() => dot.destroy()).start();
            }, this);
        }

        this.node.opacity = 0;
        cc.tween(this.node).to(0.5, { opacity: 255 }, { easing: 'circOut' }).start();

        cc.tween(cc.Camera.main).to(0.5, { zoomRatio: 1 }, { easing: 'circOut' }).start();

        let a = this.socodingNode;
        let b = this.socodingNodeP;

        let pos = b.parent.convertToWorldSpaceAR(b.position);
        let targetPos = a.parent.convertToNodeSpaceAR(pos);

        let tween1 = cc.tween(a).to(0.5, { scale: 2 }, { easing: 'smooth' });
        let tween2 = cc.tween(a).to(1, { position: targetPos, scale: b.scale }, { easing: 'circOut' });
        cc.tween(a).sequence(tween1, tween2).start();
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
        window.open("https://oj-puzzle.socoding.cn/contest/view?id=3");
    }

    openCocos() {
        window.open("https://www.cocos.com/");
    }

    toLastLevel() {
        let fun = this.toLevelFuns[this.currentLevelID - 1];
        if (typeof fun !== 'function') return;

        let oldNode = this.levelCardNode;
        oldNode.setParent(this.cardContent.parent);
        fun();
        this.cardContent.x = -this.cardContent.width;

        cc.tween(oldNode).to(0.46, { x: oldNode.width }, { easing: 'circOut' })
            .call(() => { oldNode.destroy(); })
            .start();
        cc.tween(this.cardContent).to(0.5, { x: 0 }, { easing: 'circOut' }).start();
    }

    toNextLevel() {
        let fun = this.toLevelFuns[this.currentLevelID + 1];
        if (typeof fun !== 'function') return;

        let oldNode = this.levelCardNode;
        oldNode.setParent(this.cardContent.parent);
        fun();
        this.cardContent.x = this.cardContent.width;

        cc.tween(oldNode).to(0.46, { x: -oldNode.width }, { easing: 'circOut' })
            .call(() => { oldNode.destroy(); })
            .start();
        cc.tween(this.cardContent).to(0.5, { x: 0 }, { easing: 'circOut' }).start();
    }

    onkeyDown(e: cc.Event.EventKeyboard) {
        switch (e.keyCode) {
            case cc.macro.KEY.left:
                cc.tween(cc.Camera.main.node).by(0.3, { x: -200 / cc.Camera.main.zoomRatio }, { easing: 'circOut' }).start();
                break;
            case cc.macro.KEY.right:
                cc.tween(cc.Camera.main.node).by(0.3, { x: 200 / cc.Camera.main.zoomRatio }, { easing: 'circOut' }).start();
                break;
            case cc.macro.KEY.up:
                cc.tween(cc.Camera.main.node).by(0.3, { y: 200 / cc.Camera.main.zoomRatio }, { easing: 'circOut' }).start();
                break;
            case cc.macro.KEY.down:
                cc.tween(cc.Camera.main.node).by(0.3, { y: -200 / cc.Camera.main.zoomRatio }, { easing: 'circOut' }).start();
                break;
            case cc.macro.KEY.pagedown:
                cc.tween(cc.Camera.main).by(0.3, { zoomRatio: -0.2 * cc.Camera.main.zoomRatio }, { easing: 'circOut' }).start();
                break;
            case cc.macro.KEY.pageup:
                cc.tween(cc.Camera.main).by(0.3, { zoomRatio: 0.2 * cc.Camera.main.zoomRatio }, { easing: 'circOut' }).start();
                break;
            case cc.macro.KEY.backspace:
                cc.tween(cc.Camera.main).to(0.3, { zoomRatio: 1 }, { easing: 'circOut' }).start();
                cc.tween(cc.Camera.main.node).to(0.3, { position: cc.v3() }, { easing: 'circOut' }).start();
                break;
        }
    }

    openHelp() {
        this.openPanel(`这里是 SoCoding 的 1024 解谜游戏！\n\n你的任务是寻找 🔎 Flag (一串字符串)！找到后进入 SCNU 1024 OJ 提交就好啦！\n\n游戏内还藏了若干个彩蛋，你能找到它们吗？\n\n祝你玩得愉快~~`);
    }

    openPanel(str: string, title?: string) {
        let panel = cc.instantiate(this.panelPrefab);
        this.node.parent.addChild(panel);
        return panel.getComponent(Panel).openPanel(str, title);
    }


    // update (dt) {}
}
