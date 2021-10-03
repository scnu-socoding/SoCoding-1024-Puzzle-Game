const { ccclass, property } = cc._decorator;

@ccclass
export default class Algorithm extends cc.Component {

    openWebPage(e: cc.Event.EventTouch) {
        window.open(e.getCurrentTarget().getComponent(cc.Label).string);
    }
}
