const { ccclass } = cc._decorator;

@ccclass
export default class DivWidget extends cc.Component {

    public div: HTMLDivElement = null;

    private _mat4_temp = cc.mat4();
    private _visible = false;
    private _forceUpdate = false;

    // update matrix cache
    private _m00 = 0;
    private _m01 = 0;
    private _m04 = 0;
    private _m05 = 0;
    private _m12 = 0;
    private _m13 = 0;
    private _w = 0;
    private _h = 0;

    // LIFE-CYCLE CALLBACKS:

    onEnable() {
        this.createDomElementIfNeeded(this.node.width, this.node.height);
        this.setVisible(true);
    }

    onDisable() {
        this.setVisible(false);
    }

    onDestroy() {
        this.removeDom();
    }

    update(_dt) {
        this.updateMatrix(this.node);
    }

    _updateVisibility() {
        if (!this.div) return;

        if (this._visible) {
            this.div.style.visibility = 'visible';
        }
        else {
            this.div.style.visibility = 'hidden';
        }
    }

    _updateSize(w, h) {

        if (this.div) {
            this.div.style.width = w + "px";
            this.div.style.height = h + "px";
        }
    }

    _initStyle() {
        if (!this.div) return;

        this.div.style.position = "absolute";
        this.div.style.bottom = "0px";
        this.div.style.left = "0px";
    }

    _setOpacity(opacity) {
        if (this.div && this.div.style) {
            this.div.style.opacity = (opacity / 255).toString();
        }
    }

    _createDom(w, h) {
        this.div = document.createElement("div");

        this.div.style.height = h + "px";
        this.div.style.width = w + "px";
        this.div.style.overflow = "none";
        this.div.style.border = "none";

        cc.game.container.appendChild(this.div);
        this._updateVisibility();
    }

    _createNativeControl(w, h) {
        this._createDom(w, h);
        this._initStyle();
    }

    createDomElementIfNeeded(w, h) {
        if (!this.div) {
            this._createNativeControl(w, h);
        }
        else {
            this._updateSize(w, h);
        }
    }

    removeDom() {

        if (this.div) {
            cc.game.container.removeChild(this.div);
            this.div = null;
        }

    }

    setVisible(visible) {
        if (this._visible !== visible) {
            this._visible = !!visible;
            this._updateVisibility();
        }
    }

    updateMatrix(node) {
        if (!this.div || !this._visible) return;

        node.getWorldMatrix(this._mat4_temp);

        let renderCamera = cc.Camera['_findRendererCamera'](node);
        if (renderCamera) {
            renderCamera.worldMatrixToScreen(this._mat4_temp, this._mat4_temp, cc.game.canvas.width, cc.game.canvas.height);
        }

        let _mat4_tempm = this._mat4_temp.m;
        if (!this._forceUpdate &&
            this._m00 === _mat4_tempm[0] && this._m01 === _mat4_tempm[1] &&
            this._m04 === _mat4_tempm[4] && this._m05 === _mat4_tempm[5] &&
            this._m12 === _mat4_tempm[12] && this._m13 === _mat4_tempm[13] &&
            this._w === node._contentSize.width && this._h === node._contentSize.height) {
            return;
        }

        // update matrix cache
        this._m00 = _mat4_tempm[0];
        this._m01 = _mat4_tempm[1];
        this._m04 = _mat4_tempm[4];
        this._m05 = _mat4_tempm[5];
        this._m12 = _mat4_tempm[12];
        this._m13 = _mat4_tempm[13];
        this._w = node._contentSize.width;
        this._h = node._contentSize.height;

        let dpr = cc.view['_devicePixelRatio'];
        let scaleX = 1 / dpr;
        let scaleY = 1 / dpr;

        let container = cc.game.container;
        let a = _mat4_tempm[0] * scaleX, b = _mat4_tempm[1], c = _mat4_tempm[4], d = _mat4_tempm[5] * scaleY;

        let offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
        let offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
        this._updateSize(this._w, this._h);
        let w = this._w * scaleX;
        let h = this._h * scaleY;

        let appx = (w * _mat4_tempm[0]) * node._anchorPoint.x;
        let appy = (h * _mat4_tempm[5]) * node._anchorPoint.y;


        let tx = _mat4_tempm[12] * scaleX - appx + offsetX, ty = _mat4_tempm[13] * scaleY - appy + offsetY;

        let matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
        this.div.style['transform'] = matrix;
        this.div.style['-webkit-transform'] = matrix;
        this.div.style['transform-origin'] = '0px 100% 0px';
        this.div.style['-webkit-transform-origin'] = '0px 100% 0px';

        // chagned this.div opacity
        this._setOpacity(node.opacity);
        this._forceUpdate = false;
    }
}
