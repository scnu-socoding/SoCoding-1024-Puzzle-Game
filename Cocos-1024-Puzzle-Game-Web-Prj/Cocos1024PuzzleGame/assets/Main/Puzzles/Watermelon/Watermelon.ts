const { ccclass, property } = cc._decorator;

@ccclass
export default class Watermelon extends cc.Component {

    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    onSlide() {
        this.label.string =
            `炎炎夏日，小强骑着摩托路过西瓜摊，打算买一个西瓜回家吃。
小强下了车，瞅了一眼摊主，问道：“哥们儿，这瓜多少钱一斤呐？”
摊主答道：“ ${this.slider.progress * 10} 块钱一斤。”`;

        this.editBox.string = 'flag{' + (114514114514 * (1 + 10 * this.slider.progress)).toString(36) + '}';
    }

    onEdit() {
        let len = this.editBox.string.length;
        let number = this.editBox.string.substring(5, len - 1);
        let num = parseInt(number, 36);
        if (!Number.isNaN(num)) {
            this.slider.progress = (num / 114514114514 - 1) / 10;
            this.onSlide();
        }
    }

    // update (dt) {}
}
