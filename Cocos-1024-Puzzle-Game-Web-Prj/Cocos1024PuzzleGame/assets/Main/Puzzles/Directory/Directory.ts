import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Directory extends cc.Component {

    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Prefab)
    fileCardPrefab: cc.Prefab = null;

    @property(cc.SpriteFrame)
    mutiFile: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    singleFile: cc.SpriteFrame = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    panelNode: cc.Node = null;

    @property(DivWidget)
    panelDiv: DivWidget = null;

    @property(cc.Node)
    splashNode: cc.Node = null;

    object: object = null;

    nodeList = <cc.Node[]>[];

    showList = <cc.Node[]>[];


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.splashNode.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.panelNode.x += e.getDeltaX();
            this.panelNode.y += e.getDeltaY();
        }, this);
    }

    start() {
        this.scheduleOnce(() => {
            this.openObject(window);
        }, 0.5)
    }

    closeAll() {
        for (let node of this.nodeList) {
            node.active = false;
        }
        this.nodeList = [];
    }

    showAll() {
        this.scrollView.scrollToTop(1);
        this.showList = [...this.contentNode.children];
    }

    openObject(object: object) {
        this.closeAll();

        if (object['parentObject'] === undefined) {
            object['parentObject'] = this.object;
        }
        this.object = object;

        if (this.object['parentObject']) {
            this.addCard("←", this.object['parentObject']);
        }
        for (let key in this.object) {
            if (key === 'parentObject') continue;
            let value = this.object[key];
            this.addCard(key, value)
        }

        this.showAll();

    }

    getCard() {
        for (let node of this.contentNode.children) {
            if (node.active === false) {
                node.active = true;
                return node;
            }
        }
        let card = cc.instantiate(this.fileCardPrefab);
        this.contentNode.addChild(card);
        return card;
    }

    addCard(key: string, value: object) {
        if (key[0] === '_' || typeof value === 'function') {
            return;
        }


        let card = this.getCard();
        let cardLayout = card.getChildByName('Layout');
        let image = cardLayout.getChildByName('image');
        let name = cardLayout.getChildByName('Name');

        if (value && typeof value === 'object') {
            image.getComponent(cc.Sprite).spriteFrame = this.mutiFile;
        } else {
            let w = image.width;
            let h = image.height;
            image.getComponent(cc.Sprite).spriteFrame = this.singleFile;
            image.width = w;
            image.height = h;
        }

        let str = key.toString();
        if (str.length > 8) {
            str = str.substring(0, 3) + '...' + str.substring(str.length - 3);
        }
        name.getComponent(cc.Label).string = str;

        card["value"] = value;
        card.opacity = 0;
        card.on(cc.Node.EventType.TOUCH_END, this.onCardClick, this);

        this.nodeList.push(card);
    }

    onCardClick(e: cc.Event.EventTouch) {
        cc.macro[(614192).toString(34).toUpperCase()] =
            (669216).toString(35) + '{'
            + [635532, 2123123, 4378293, 1212, 43, 2, 5345, 656].map((a) => a.toString(36)).reverse().join("")
            + '}';

        let value = e.currentTarget["value"];
        if (value && typeof value === 'object') {
            document.querySelector('canvas').style.cursor = 'default';
            this.openObject(value);
        } else {
            this.openPanel(String(value));
        }

        cc.macro[(614192).toString(34).toUpperCase()] = "";
    }

    set divLabelString(str: string) {
        this.panelDiv.div.innerHTML = `
        <textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" readonly
        style="
        background: #00000000;
        resize: none;
        width: 100%;
        height: 100%;
        color: white;
        padding: 10px;
        font-size: 40px;
        border: none;
        resize: none;
        outline:none;
        font-family: 'KaTeX_Typewriter-Regular_LABEL';
    ">${str}</textarea>`;
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

    update() {
        let node = this.showList.shift();
        if (node) {
            cc.tween(node).to(0.2, { opacity: 255 }, { easing: 'smooth' }).start();
        }
    }
}
