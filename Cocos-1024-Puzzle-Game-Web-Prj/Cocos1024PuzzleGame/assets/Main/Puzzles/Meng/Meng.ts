import DivWidget from "../DivWidget";

const { ccclass, property } = cc._decorator;

const code = `==Qo/SumdWekIauCl2p5wiY5ayL5a6a5AiL55+L6HWa5K4Immvrpn/KmmrprlDIuk7IklvYukzJplH5upLoplParm/KmmbYvkrQh+Weiteegmiel9Suu4Suh6SOsuiOm/W+j7eus3WekIaOsIWOtbeuCF6b5J265oyZ50u55AiL5Rio5KIarmzZgl/4unL7tlT7lpb7lmvZvk/7ukrwinWOg8WOhaeupia+rYaejJaujQW+i5S+oCmOuui+n5SuCR+L6MCI6c+L6xS55wOa5l2q5aSI6qiL5AiL5A255sCZ5KoIukbbopHbslTomnrrukDIukD6lmrbqnjKnlDZnlvZvk/7ukHJimrgkGmuoNaekIauhwWuu6SOkfaOgdeeh+WeiteuCF6b5J265Lea5Ayb5Rio5vip5OqL5K8ZnmP5unrJvkvLgmbqomrLukD6mlrgpia+rYaej4Sem/iuCSCY5IW65qeI6Xqp5Rio5KM5unj4unnInmHqsm/ZukrwinWOg8WeicaeoyauCNGY6AiL5I+Y5NGY6AiL5KYqomrKukDIukrZgljKnlT7mnDIukHJimrwt1iutXael9Suj7Sepfeej4SuCKE6vkrZnlHJimrQhZmeqkWuh6Sui4Sup4W+sDaupiaOhaeekIauiKaumuWOg4SeulWuCK+Y5v+Y5NiL5HGp5vip5NaY5NiL56m65pSa5KcJklX7vl3JgmTomnHJimDLilf5jl/Jhm37gorQulWOhaeOl/eunjmer4SuupeeqkWOqcWuCKiL5rqL6Eq555Wa5oyZ5Ymo5E+a5vmp5nao5MKZ5byp5Mib5GCb5Jyp5q+Y5KEJimTomnDohoX4vnnInmHqsm7oukn7rlrQulWelFaeo+e+m6SeicauCnCZ5FWp5f6Y5Eq55MeY6jKY6oyZ5xSa5Iar5Pu75+up5KMbplHJslrKukPqgprLukD6ml/Kmm37go/6jlrgj+eevlWuupeeqkW+hJeem/i+l+WeiniekIauC3WL62ep5V2L5OuL5l+55NiL5`;

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
        background: #00000000;
        resize: none;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 40px;
        text-align: center;
    ">${code}</textarea>`;

    }

    onDisable() {
        cc.audioEngine.stopMusic();
    }

    // update (dt) {}
}
