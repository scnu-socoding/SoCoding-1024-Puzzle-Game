const { ccclass, property } = cc._decorator;

@ccclass
export default class Twelve extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    update() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        if ((hours === 0 || hours === 12) && minutes < 1) {
            this.label.string = (562270).toString(33) + '{' +
                (Math.floor(minutes) * 527352).toString(35) + ((1 + Math.floor(hours) % 12) * 1111).toString(36)
                + '}';
        } else {
            this.label.string = `The FLAG appears when the hour hand is less than 0.5 degrees.`;
        }
    }
}
