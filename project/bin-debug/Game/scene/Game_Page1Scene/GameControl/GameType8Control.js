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
var GameType8Control = (function (_super) {
    __extends(GameType8Control, _super);
    function GameType8Control(data) {
        var _this = _super.call(this) || this;
        _this.selfParent = data;
        _this.init();
        return _this;
    }
    GameType8Control.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.wenhaoAry = [];
        this.rightNameAry = [];
        this.selectedAry = [];
        this.curPosNum = [3, 5, 9, 16, 25];
        this.posDataObj = new Object();
        this.rightData = new Object();
        this.curGameData = this.selfParent.curGameData;
        this.selfParent.op_bg.visible = false;
        this.initPos();
        this.creatImg();
    };
    GameType8Control.prototype.showQuestionsView = function () {
        var p = this.selfParent["r_0"].parent;
        for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            p.addChild(obj);
        }
        for (var _b = 0, _c = this.quNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            p.addChild(obj);
        }
    };
    // 最后的结果
    GameType8Control.prototype.setGameOverData = function () {
        var b = true;
        if (this.selectedAry.length == this.rightNameAry.length) {
            for (var _i = 0, _a = this.selectedAry; _i < _a.length; _i++) {
                var obj = _a[_i];
                var i = this.selectedAry.indexOf(obj);
                if (obj && this.rightNameAry[i]) {
                    if (obj == this.selectedAry[i]) {
                        b = true;
                    }
                    else {
                        b = false;
                        break;
                    }
                }
            }
        }
        else {
            b = false;
        }
        if (b) {
            egret.log("回答正确" + b);
            this.selfParent.testurl0.text = "正确";
        }
        else {
            egret.log("回答错误" + b);
            this.selfParent.testurl0.text = "错误";
        }
        var evt = new GlobalEvent(GlobalEvent.evt);
        evt.b = b;
        this.selfParent.dispatchEvent(evt);
    };
    // 测试专用
    GameType8Control.prototype.showGameOverData = function () {
        var b = true;
        if (this.selectedAry.length == this.rightNameAry.length) {
            for (var _i = 0, _a = this.selectedAry; _i < _a.length; _i++) {
                var obj = _a[_i];
                var i = this.selectedAry.indexOf(obj);
                if (obj && this.rightNameAry[i]) {
                    if (obj == this.selectedAry[i]) {
                        b = true;
                    }
                    else {
                        b = false;
                        break;
                    }
                }
            }
        }
        else {
            b = false;
        }
        if (b) {
            egret.log("回答正确" + b);
            this.selfParent.testurl0.text = "正确";
        }
        else {
            egret.log("回答错误" + b);
            this.selfParent.testurl0.text = "错误";
        }
    };
    GameType8Control.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.rightData = null;
        Game_Page1Scene.isGameBegin = false;
    };
    GameType8Control.prototype.initPos = function () {
        var key = "";
        for (var i = 0; i < this.curPosNum.length; i++) {
            var str = "txt" + this.curPosNum[i] + "_";
            var len = this.curPosNum[i];
            var _ary = [];
            for (var j = 0; j < len; j++) {
                var p = new egret.Point(this.selfParent[str + j].x, this.selfParent[str + j].y);
                _ary.push(p);
            }
            var key_1 = i + 1;
            this.posDataObj[key_1] = _ary;
        }
    };
    GameType8Control.prototype.creatImg = function () {
        var id = parseInt(this.curGameData.condition_id);
        var op = this.curGameData.opertion;
        var qu = this.curGameData.quetion.split(",");
        var an = parseInt(this.curGameData.answer);
        // 背景
        var opImg = CommonDragonBones.getInstance().getElementImg(op);
        opImg.x = 512;
        opImg.y = 329;
        this.opNumAry.push(opImg);
        var key = (op.split("img_sufg"))[1];
        var curQupos = this.posDataObj[key];
        var numAllAry = [];
        var startIndex;
        var endIndex;
        var qn1;
        var qn2;
        if (id < 94) {
            qn1 = parseInt(qu[0]);
            qn2 = parseInt(qu[1]);
            if (qn1 < qn2) {
                startIndex = parseInt(qu[0]);
                endIndex = parseInt(qu[1]) + 1;
            }
            else {
                startIndex = parseInt(qu[1]);
                endIndex = parseInt(qu[0]) + 1;
            }
            for (var i = startIndex; i < endIndex; i++) {
                numAllAry.push(i); // 生成范围内的数字
            }
        }
        else {
            numAllAry = qu;
        }
        // 取出固定的数字
        var len = an;
        // 随机取出固定数量的数字
        var quNameAry = [];
        while (len) {
            var rand = App.RandomUtils.limitInteger(0, numAllAry.length - 1);
            quNameAry.push(numAllAry[rand]);
            numAllAry.splice(rand, 1);
            len--;
        }
        if (id < 94) {
            this.rightNameAry = this.sortNum(quNameAry, qn1, qn2);
        }
        else {
            this.rightNameAry = this.sortNum(quNameAry, 1, 2);
        }
        var _w;
        var _h;
        switch (an) {
            case 3:
                _w = 100;
                _h = 100;
                break;
            case 5:
                _w = 100;
                _h = 100;
                break;
            case 9:
                _w = 214;
                _h = 100;
                break;
            case 16:
                _w = 162;
                _h = 82;
                break;
            case 25:
                _w = 130;
                _h = 69;
                break;
        }
        quNameAry = this.creatRandomAry(quNameAry);
        for (var _i = 0, quNameAry_1 = quNameAry; _i < quNameAry_1.length; _i++) {
            var obj = quNameAry_1[_i];
            var j = quNameAry.indexOf(obj);
            var s1 = quNameAry[j] + "";
            var gp = new eui.Group();
            var p = curQupos[j];
            if (an == 16 && obj == this.curStartNum) {
                var bgImg = CommonDragonBones.getInstance().getElementImg("img_31");
                bgImg.x = p.x;
                bgImg.y = p.y;
                bgImg.pixelHitTest = true;
                this.selfParent.addChild(bgImg);
            }
            if (an == 25 && obj == this.curStartNum) {
                var bgImg = CommonDragonBones.getInstance().getElementImg("img_32");
                bgImg.x = p.x;
                bgImg.y = p.y;
                bgImg.pixelHitTest = true;
                this.selfParent.addChild(bgImg);
            }
            var label = new egret.TextField();
            label.text = s1;
            label.size = 40;
            label.textAlign = egret.HorizontalAlign.CENTER;
            label.verticalAlign = egret.VerticalAlign.MIDDLE;
            label.strokeColor = 0xFFFF00; // 描边颜色
            label.fontFamily = "ziti";
            gp.width = label.width = _w;
            gp.height = label.height = _h;
            gp.addChild(label);
            this.selfParent.addChild(gp);
            gp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            gp.x = p.x;
            gp.y = p.y;
            gp.name = s1;
            gp.anchorOffsetX = _w / 2;
            gp.anchorOffsetY = _h / 2;
            this.quNumAry.push(gp);
        }
        this.showQuestionsView();
    };
    GameType8Control.prototype.sortNum = function (arr, n1, n2) {
        var max;
        var num1;
        var num2;
        var _ary = JSON.parse(JSON.stringify(arr));
        for (var i = 0; i < _ary.length; i++) {
            for (var j = i; j < _ary.length; j++) {
                num1 = eval(_ary[i]);
                num2 = eval(_ary[j]);
                if (n1 < n2) {
                    if (num1 > num2) {
                        max = _ary[j];
                        _ary[j] = _ary[i];
                        _ary[i] = max;
                    }
                }
                else {
                    if (num1 < num2) {
                        max = _ary[j];
                        _ary[j] = _ary[i];
                        _ary[i] = max;
                    }
                }
            }
        }
        if (n1 < n2) {
            this.curStartNum = _ary[0];
        }
        else {
            this.curStartNum = _ary[_ary.length - 1];
        }
        return _ary;
    };
    GameType8Control.prototype.creatRandomAry = function (ary) {
        //  let anAry = this.curGameData.opertion.split(",");
        var len = ary.length;
        var _ary = [];
        while (len) {
            var rand = App.RandomUtils.limitInteger(0, ary.length - 1);
            _ary.push(ary[rand]);
            ary.splice(rand, 1);
            len--;
        }
        return _ary;
    };
    GameType8Control.prototype.clearAll = function () {
        for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        for (var _b = 0, _c = this.quNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        var img_1 = this.selfParent.getChildByName("img_31");
        if (img_1) {
            this.selfParent.removeChild(img_1);
        }
        var img_2 = this.selfParent.getChildByName("img_32");
        if (img_2) {
            this.selfParent.removeChild(img_2);
        }
    };
    GameType8Control.prototype.onClickTouch = function (event) {
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        if (!Game_Page1Scene.isGameBegin) {
            return;
        }
        var index = this.quNumAry.indexOf(event.currentTarget);
        if (index >= 0) {
            var obj = event.currentTarget;
            if (obj.name) {
                this.selectedAry.push(obj.name);
            }
        }
    };
    return GameType8Control;
}(UIObject));
__reflect(GameType8Control.prototype, "GameType8Control");
//# sourceMappingURL=GameType8Control.js.map