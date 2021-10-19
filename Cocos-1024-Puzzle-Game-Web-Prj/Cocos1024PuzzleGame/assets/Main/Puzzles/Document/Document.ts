const { ccclass, property } = cc._decorator;

@ccclass
export default class Document extends cc.Component {

    @property(cc.Asset)
    file: cc.Asset = null;

    download() {
        let anchor = document.createElement("a");
        anchor.href = this.file.nativeUrl;
        anchor.download = "document.rar";
        anchor.click();
        anchor.remove();
    }

    // update (dt) {}
}
