import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

const code = `wlvAf86kRSKdiCQ4Vbqe/KdTZVBD19o6TXhThxA30ak=`;
@ccclass
export default class AESECB extends cc.Component {

    @property(DivWidget)
    divWidget: DivWidget = null;

    // LIFE-CYCLE CALLBACKS:

    start() {
        this.divWidget.div.innerHTML = `
        <textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" 
        style="
        background: #0000;
        resize: none;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 40px;
        text-align: center;
    ">${code}</textarea>`;
    }


    // update (dt) {}
}
