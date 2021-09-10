import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SSTV extends cc.Component {

    @property(cc.AudioClip)
    sstvAudio: cc.AudioClip = null;

    @property(DivWidget)
    divWidget: DivWidget = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.divWidget.div.innerHTML = `<audio src=${this.sstvAudio.nativeUrl} controls="controls"
        style="top: 50%;
        left: 50%;
        transform: translate(50%,200%);"></audio>`;
    }

    // update (dt) {}
}
