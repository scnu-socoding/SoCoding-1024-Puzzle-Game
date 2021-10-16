const { ccclass, property } = cc._decorator;

@ccclass
export default class Qin extends cc.Component {

    @property(cc.Asset)
    midi: cc.Asset = null;

    @property(cc.Label)
    label: cc.Label = null;

    start() {
        this.label.string = this.midi.toString();
    }

    download() {
        let anchor = document.createElement("a");
        anchor.href = this.midi.nativeUrl;
        anchor.download = "number.mid";
        anchor.click();
        anchor.remove();
    }

    // update (dt) {}
}
