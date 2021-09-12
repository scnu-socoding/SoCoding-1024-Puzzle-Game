import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

const code = `+8[>2+2>+4>+6>+8>+10>+12>+14>+16>+18>+20>+22>+24>+26>+28>+30<16-]>7+6.>-4.<-5.>-5.>-5.<5+3.+4.-6.+7.>3+2.<3+.>3+.-3.<3-8.-.>+4.<+2.>5+2.`;
@ccclass
export default class Pointer extends cc.Component {

    @property(DivWidget)
    divWidget: DivWidget = null;

    // LIFE-CYCLE CALLBACKS:

    start() {
        this.divWidget.div.innerHTML = `
        <textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" 
        style="
        background: #00000000;
        resize: none;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 52px;
        text-align: center;
        font-family: 'HARRYP_LABEL', 'KaTeX_Typewriter-Regular_LABEL';
    ">${code}</textarea>`;
    }


    // update (dt) {}
}
