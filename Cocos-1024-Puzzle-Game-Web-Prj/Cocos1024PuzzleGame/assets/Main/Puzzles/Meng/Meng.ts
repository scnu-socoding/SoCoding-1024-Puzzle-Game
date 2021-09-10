import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Meng extends cc.Component {

    @property(cc.AudioClip)
    mengAudio: cc.AudioClip = null;

    @property(DivWidget)
    divWidget: DivWidget = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        cc.audioEngine.setMusicVolume(0.1);
        cc.audioEngine.playMusic(this.mengAudio, true);

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
    ">不知从何时起
我觉得这片天空好美
可能是因为那个少女
曾经消失在那里的原故吧
有些羡慕她
对于没有翅膀的我
只有将希望和憧景寄托在她的身上
在天空中飞翔的她
能感受到我的思念吗
天空不再是摇不可及
她一定把我的梦想带上了天际
我坚信

不知从何时起
我一直在做一个梦
一遍又一遍
没有开始
也没有终结
我暗自祈倒
这不是梦
因为梦总会结束
于是我开始等待
等待着某人将我换醒
我仿佛坐在空无一人的山顶上
听着一个脚步声由远而近
也许那之后才是梦的开始
仿佛时间已经停止
我一直在等待
直到我已经忘记了为何要等待
但是正如黑夜之后一定是离明
奇迹一定会到来
我坚信</textarea>`;

    }

    onDisable() {
        cc.audioEngine.stopMusic();
    }

    // update (dt) {}
}
