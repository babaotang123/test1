var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CllickTouchScene = (function (_super) {
    __extends(CllickTouchScene, _super);
    function CllickTouchScene() {
        var _this = _super.call(this) || this;
        _this.curScoreCount = 0;
        _this.erroCount = 0;
        return _this;
    }
    /** 每次进入 */
    CllickTouchScene.prototype.onAdd = function () {
        this.putImgList = [];
        this.imgList = [];
        this.copyList = [];
        this.rectList = [];
        this.curMoveIndex = -1;
        this.isCopy = true;
        this._distance = new egret.Point();
        this.curPutinObj = new Object();
        // this.initAddEvent();
    };
    CllickTouchScene.prototype.initAddEvent = function () {
        for (var _i = 0, _a = this.imgList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            }
        }
        this.imgList[0].parent.addEventListener(egret.TouchEvent.TOUCH_END, this.touchImgEndEvent, this);
        this.imgList[0].parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveEvent, this);
    };
    CllickTouchScene.prototype.clearImg = function () {
        for (var _i = 0, _a = this.putImgList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj && obj.parent) {
                while (obj.numChildren > 0) {
                    obj.removeChildAt(0);
                }
                obj.parent.removeChild(obj);
            }
        }
        for (var _b = 0, _c = this.rectList; _b < _c.length; _b++) {
            var obj = _c[_b];
            if (obj && obj.parent) {
                while (obj.numChildren > 0) {
                    obj.removeChildAt(0);
                }
                obj.parent.removeChild(obj);
            }
        }
        for (var _d = 0, _e = this.imgList; _d < _e.length; _d++) {
            var obj = _e[_d];
            if (obj && obj.parent) {
                while (obj.numChildren > 0) {
                    obj.removeChildAt(0);
                }
                obj.parent.removeChild(obj);
            }
        }
        for (var _f = 0, _g = this.wenhaoAry; _f < _g.length; _f++) {
            var obj = _g[_f];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        if (this.curImg) {
            if (this.curImg.parent) {
                this.curImg.parent.removeChild(this.curImg);
            }
        }
        this.rectList = [];
        this.imgList = [];
        this.putImgList = [];
        this.putImgList = [];
    };
    CllickTouchScene.prototype.execMessage = function (data) {
    };
    /** 这里进行移出场景的处理 **/
    CllickTouchScene.prototype.onDestroy = function () {
        this.removeAllEvt();
        this.clearImg();
        this.curAnswerData = null;
        this.wenhaoObj = null;
        this.putImgList = [];
        this.imgList = [];
        this.copyList = [];
        this.rectList = [];
        this.curMoveIndex = -1;
        this.isCopy = true;
    };
    CllickTouchScene.prototype.getSiteIndexForGlobalPos = function (xGlobal, yGlobal) {
        var localPos = this.globalToLocal(xGlobal, yGlobal);
        var curX = localPos.x;
        var curY = localPos.y;
        var b = false;
        for (var _i = 0, _a = this.rectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            var i = this.rectList.indexOf(obj);
            if (obj) {
                b = obj.hitTestPoint(curX, curY);
                if (b) {
                    this.curHitIndex = i;
                    return b;
                }
            }
        }
        return b;
    };
    // 结束
    CllickTouchScene.prototype.touchImgEndEvent = function (event) {
        if (this.curMoveIndex >= 0) {
            this.touchEndHanle();
        }
    };
    CllickTouchScene.prototype.touchEndHanle = function () {
        this.hit();
        this.putImgList.push(this.curImg);
        this.curImg = null;
        this.isMove = false;
        this.curMoveIndex = -1;
        this.isCopy = true;
    };
    CllickTouchScene.prototype.hit = function () {
        var b = this.getSiteIndexForGlobalPos(this.curImg.x, this.curImg.y);
        if (b) {
            var str1 = this.rectList[this.curHitIndex].name + this.curHitIndex;
            var key = this.hitCurRectIndexObj[str1];
            var img = this.curAnswerData[key];
            var curIndex = -1;
            var _x = this.rectList[this.curHitIndex].x;
            var _y = this.rectList[this.curHitIndex].y;
            var p = new egret.Point(_x, _y);
            if (img) {
                if (img == this.curImg) {
                    this.curImg.x = this.rectList[this.curHitIndex].x;
                    this.curImg.y = this.rectList[this.curHitIndex].y;
                    egret.log("同一个位置的同一个元素");
                    return;
                }
                else {
                    for (var _key in this.curAnswerData) {
                        if (this.curImg == this.curAnswerData[_key]) {
                            // 更新这个元素在其他位置上的数据
                            this.curAnswerData[_key] = "";
                            delete this.curAnswerData[_key];
                            img.parent.removeChild(img);
                            break;
                        }
                    }
                    egret.log("这个位置上已有元素");
                }
            }
            else {
                // 没有元素
                for (var _key in this.curAnswerData) {
                    if (this.curImg == this.curAnswerData[_key]) {
                        // 更新这个元素在其他位置上的数据
                        // let _img = this.curAnswerData[key]
                        // _img.parent.removeChild(img);
                        this.curAnswerData[_key] = "";
                        delete this.curAnswerData[_key];
                        break;
                    }
                }
            }
            this.curImg.x = p.x;
            this.curImg.y = p.y;
            if (img) {
                var oldx = img.x;
                var oldy = img.y;
                if (oldx == this.curImg.x && oldy == this.curImg.y) {
                    if (img.parent) {
                        img.parent.removeChild(img);
                    }
                }
            }
            this.curImg.scaleX = this.curImg.scaleY = 1;
            this.curAnswerData[key] = this.curImg;
        }
        else {
            if (this.curImg && this.curImg.parent) {
                this.curImg.parent.removeChild(this.curImg);
            }
            for (var _key in this.curAnswerData) {
                if (this.curImg == this.curAnswerData[_key]) {
                    // 更新这个元素在其他位置上的数据
                    this.curAnswerData[_key] = "";
                    delete this.curAnswerData[_key];
                    break;
                }
            }
            // let str1 = this.rectList[this.curHitIndex].name+this.curHitIndex;
            // let key = this.hitCurRectIndexObj[str1];
            // let img = this.curAnswerData[key];
            // this.curAnswerData[key] = "";
            // delete this.curAnswerData[key];
            // for(let obj of this.wenhaoAry){
            //     if(obj.x ==this.oldX &&obj.y == this.oldY){
            //         obj.visible = true;
            //     }
            // }
            // if(this.oldImg == this.curImg){
            //     for(let key in this.curAnswerData){
            //         if(this.curAnswerData[key] == this.oldImg){
            //            //有相同的
            //            this.wenhaoObj[key].visible = true;
            //         }
            //     }
            //     this.oldImg =null;
            // }
        }
    };
    CllickTouchScene.prototype.touchMoveEvent = function (event) {
        if (this.curMoveIndex >= 0) {
            this.curImg.x = event.stageX - this._distance.x;
            this.curImg.y = event.stageY - this._distance.y;
            this.isMove = true;
        }
    };
    CllickTouchScene.prototype.onClickTouch = function (event) {
        if (!Game_Page1Scene.isGameBegin) {
            return;
        }
        if (this.isCopy) {
            var index = this.imgList.indexOf(event.currentTarget);
            if (index >= 0) {
                if (!this.curImg) {
                    this.clickIndex = index;
                    this.curImg = this.copyImg();
                    this.curMoveIndex = 1;
                    this._distance.x = event.stageX - this.curImg.x;
                    this._distance.y = event.stageY - this.curImg.y;
                }
            }
        }
    };
    CllickTouchScene.prototype.touchImgBeginEvent = function (event) {
        var index = this.copyList.indexOf(event.currentTarget);
        if (index >= 0) {
            var img = event.currentTarget;
            this.curMoveIndex = index;
            this.curImg = img;
            this.oldX = this.curImg.x;
            this.oldY = this.curImg.y;
            this._distance.x = event.stageX - img.x;
            this._distance.y = event.stageY - img.y;
            this.setCurImgChildIndex();
        }
    };
    CllickTouchScene.prototype.setCurImgChildIndex = function () {
        if (this.curImg.parent) {
            this.curImg.parent.addChild(this.curImg);
        }
    };
    CllickTouchScene.prototype.copyImg = function () {
        this.scaleX;
        var obj = this.imgList[this.clickIndex];
        var img;
        if (obj.texture) {
            var path = obj.texture;
            img = new eui.Image(path);
            img.x = obj.x;
            img.y = obj.y;
            img.anchorOffsetX = obj.anchorOffsetX;
            img.anchorOffsetY = obj.anchorOffsetY;
            img.rotation = obj.rotation;
            img.scaleX = obj.scaleX;
            img.scaleY = obj.scaleY;
            img.name = obj.name;
            obj.parent.addChild(img);
        }
        else {
            img = new eui.Group();
            var label = new egret.TextField();
            var t = (obj.$children)[0];
            label.text = t.text;
            label.size = t.size;
            label.textAlign = egret.HorizontalAlign.CENTER;
            label.verticalAlign = egret.VerticalAlign.MIDDLE;
            label.strokeColor = 0xFFFF00; // 描边颜色
            label.fontFamily = "ziti";
            img.width = img.height = label.width = label.height = t.width;
            img.addChild(label);
            obj.parent.addChild(img);
            img.x = obj.x;
            img.y = obj.y;
            img.anchorOffsetX = img.anchorOffsetY = t.width / 2;
            img.name = obj.name;
        }
        this.isCopy = false;
        this.copyList.push(img);
        img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchImgBeginEvent, this);
        return img;
    };
    CllickTouchScene.prototype.removeAllEvt = function () {
        for (var _i = 0, _a = this.putImgList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchImgBeginEvent, this);
            }
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        if (this.imgList[0]) {
            this.imgList[0].parent.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchImgEndEvent, this);
            this.imgList[0].parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveEvent, this);
        }
    };
    return CllickTouchScene;
}(UIObject));
__reflect(CllickTouchScene.prototype, "CllickTouchScene");
//# sourceMappingURL=CllickTouchScene.js.map