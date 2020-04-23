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
var GameType1Control = (function (_super) {
    __extends(GameType1Control, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function GameType1Control(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    GameType1Control.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.wenhaoAry = [];
        this.curAnswerData = new Object;
        this.hitCurRectIndexObj = new Object();
        this.wenhaoObj = new Object;
        this.rigtData = new Object();
        for (var i = 0; i < 18; i++) {
            this.selfParent["r_" + i].visible = false;
            if (i < 6) {
                this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
            }
            else {
                this.quPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
            }
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    };
    GameType1Control.prototype.showQuestionsView = function () {
        var p = this.selfParent["r_0"].parent;
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            p.addChild(obj);
        }
        for (var _b = 0, _c = this.opNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            p.addChild(obj);
        }
        for (var _d = 0, _e = this.wenhaoAry; _d < _e.length; _d++) {
            var obj = _e[_d];
            p.addChild(obj);
        }
        _super.prototype.initAddEvent.call(this);
    };
    // 最后的结果
    // 最后的结果
    GameType1Control.prototype.setGameOverData = function () {
        var b = true;
        var len = this.rectList.length;
        for (var k in this.rigtData) {
            var s1 = this.rigtData[k].name;
            var s2 = void 0;
            if (this.curAnswerData[k]) {
                s2 = this.curAnswerData[k].name;
                if (!this.curAnswerData[k].name) {
                    b = false;
                    break;
                }
            }
            //  egret.log(s1+"    "+s2)
            if (s1 != s2) {
                b = false;
            }
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
    GameType1Control.prototype.showGameOverData = function () {
        var b = true;
        var len = this.rectList.length;
        for (var k in this.rigtData) {
            var s1 = this.rigtData[k].name;
            var s2 = void 0;
            if (this.curAnswerData[k]) {
                s2 = this.curAnswerData[k].name;
                if (!this.curAnswerData[k].name) {
                    b = false;
                    break;
                }
            }
            //  egret.log(s1+"    "+s2)
            if (s1 != s2) {
                b = false;
            }
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
    GameType1Control.prototype.onDestroy = function () {
        this.clearAll();
        _super.prototype.onDestroy.call(this);
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.wenhaoAry = [];
        this.rigtData = null;
        this.wenhaoObj = null;
        this.hitCurRectIndexObj = null;
    };
    GameType1Control.prototype.creatImg = function () {
        // 操作类型
        var id = this.curGameData.condition_id;
        var ary = this.curGameData.answer.split(",");
        var elmName = ary[0];
        var quIndexAry = this.curGameData.quetion.split(",");
        var randomAry = this.creatRandomAry();
        var hitObjAry = [];
        var nameIndex = 1;
        var s1;
        var n;
        for (var j = 0; j < quIndexAry.length; j++) {
            if (quIndexAry[j] == "?") {
                n = parseInt(ary[nameIndex]);
                nameIndex++;
            }
            else {
                n = parseInt(quIndexAry[j]);
            }
            var index = n - 1;
            s1 = randomAry[index];
            var str = elmName + s1;
            if (id == "11" || id == "12") {
                str = elmName + n;
            }
            var newimg = void 0;
            var rec = void 0;
            var p = this.quPos[j];
            //  egret.log("name   "+s1);
            if (quIndexAry[j] == "?") {
                var wen = CommonDragonBones.getInstance().getDrgoneDisplay("wen");
                wen.animation.play(1);
                wen.x = this.quPos[j].x;
                wen.y = this.quPos[j].y;
                this.wenhaoAry.push(wen);
                this.wenhaoObj["" + j] = wen;
                rec = new eui.Rect();
                rec.fillAlpha = 0;
                rec.name = str;
                rec.width = wen.width;
                rec.height = wen.height;
                rec.anchorOffsetX = wen.width / 2;
                rec.anchorOffsetY = wen.height / 2;
                rec.x = p.x;
                rec.y = p.y;
                hitObjAry.push(rec);
                var key = str + (hitObjAry.length - 1);
                this.hitCurRectIndexObj[key] = "" + j;
                this.rigtData["" + j] = rec;
            }
            else {
                newimg = CommonDragonBones.getInstance().getElementImg(str);
                newimg.x = p.x;
                newimg.y = p.y;
                this.quNumAry.push(newimg);
            }
        }
        randomAry = this.getRandomAry(randomAry);
        for (var _i = 0, randomAry_1 = randomAry; _i < randomAry_1.length; _i++) {
            var obj = randomAry_1[_i];
            var i = randomAry.indexOf(obj);
            var str = elmName + obj;
            var img = CommonDragonBones.getInstance().getElementImg(str);
            img.x = this.opPos[i].x;
            img.y = this.opPos[i].y;
            this.opNumAry.push(img);
        }
        this.imgList = this.opNumAry;
        this.rectList = hitObjAry;
        this.showQuestionsView();
    };
    // 创建6个随机，存的是元素名称
    GameType1Control.prototype.creatRandomAry = function () {
        var nary = this.selfParent.curGameData.opertion.split(",");
        var starn = parseInt(nary[0]);
        var endn = parseInt(nary[1]) + 1;
        var ary = [];
        for (var i = 1; i < endn; i++) {
            ary.push(i);
        }
        ary = this.getRandomAry(ary);
        return ary;
    };
    // 得到随机后的数组
    GameType1Control.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    GameType1Control.prototype.getRandomNumAry = function (n) {
        var numAry = [];
        for (var i = 0; i < n; i++) {
            numAry.push(i);
        }
        var ary = [];
        while (n > 0) {
            var rand = App.RandomUtils.limitInteger(0, numAry.length - 1);
            ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            n--;
        }
        return ary;
    };
    GameType1Control.prototype.clearAll = function () {
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        for (var _b = 0, _c = this.opNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        for (var _d = 0, _e = this.wenhaoAry; _d < _e.length; _d++) {
            var obj = _e[_d];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        this.clearImg();
    };
    return GameType1Control;
}(CllickTouchScene));
__reflect(GameType1Control.prototype, "GameType1Control");
//# sourceMappingURL=GameType1Control.js.map