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
var SpecialControl76 = (function (_super) {
    __extends(SpecialControl76, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function SpecialControl76(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    SpecialControl76.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.wenhaoAry = [];
        this.curAnswerData = new Object;
        this.wenhaoObj = new Object;
        this.rigtData = new Object();
        this.hitCurRectIndexObj = new Object();
        this.curGameData = this.selfParent.curGameData;
        var ary = this.curGameData.quetion.split(",");
        var len = ary.length;
        for (var i = 0; i < 9; i++) {
            if (i < 6) {
                this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
                this.selfParent["r_" + i].visible = false;
            }
            if (len == 4) {
                if (i < 4) {
                    this.selfParent["r_76_" + i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_76_" + i].x, this.selfParent["r_76_" + i].y));
                }
            }
            else if (len == 5) {
                if (i > 3) {
                    this.selfParent["r_76_" + i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_76_" + i].x, this.selfParent["r_76_" + i].y));
                }
            }
        }
        this.creatImg();
    };
    SpecialControl76.prototype.showQuestionsView = function () {
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
        for (var _f = 0, _g = this.rectList; _f < _g.length; _f++) {
            var obj = _g[_f];
            p.addChild(obj);
        }
        _super.prototype.initAddEvent.call(this);
    };
    // 最后的结果
    SpecialControl76.prototype.setGameOverData = function () {
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
                break;
            }
            else {
                b = true;
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
    SpecialControl76.prototype.showGameOverData = function () {
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
                break;
            }
            else {
                b = true;
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
    SpecialControl76.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.wenhaoAry = [];
        this.rigtData = null;
        this.wenhaoObj = null;
        this.hitCurRectIndexObj = null;
    };
    SpecialControl76.prototype.creatImg = function () {
        // 操作类型
        var ary = this.curGameData.answer.split(",");
        var elmName = ary[0];
        var quIndexAry = this.curGameData.quetion.split(",");
        var randomAry = this.creatRandomAry();
        var hitObjAry = [];
        var nameIndex = 1;
        var s1;
        var n;
        var id = parseInt(this.curGameData.condition_id);
        var str;
        var newimg;
        var rec;
        for (var j = 0; j < quIndexAry.length; j++) {
            if (quIndexAry[j] == "?") {
                n = parseInt(ary[nameIndex]);
                nameIndex++;
            }
            else {
                n = parseInt(quIndexAry[j]);
            }
            str = elmName + n;
            var p = this.quPos[j];
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
                rec.width = 186;
                rec.height = 167;
                rec.anchorOffsetX = rec.width / 2;
                rec.anchorOffsetY = rec.height / 2;
                rec.x = p.x;
                rec.y = p.y;
                hitObjAry.push(rec);
                this.rigtData["" + j] = rec;
                var key = str + (hitObjAry.length - 1);
                this.hitCurRectIndexObj[key] = "" + j;
                // 索引和名字
                // this.curAnswerData[""+j] = this.copyNewobj(rec);
            }
            else {
                newimg = CommonDragonBones.getInstance().getElementImg(str);
                newimg.x = p.x;
                newimg.y = p.y;
                this.quNumAry.push(newimg);
            }
        }
        randomAry = this.getAppointNumAry(randomAry);
        for (var _i = 0, randomAry_1 = randomAry; _i < randomAry_1.length; _i++) {
            var obj = randomAry_1[_i];
            var i = randomAry.indexOf(obj);
            var str_1 = elmName + obj;
            var img = CommonDragonBones.getInstance().getElementImg(str_1);
            img.x = this.opPos[i].x;
            if (id == 76) {
                img.y = this.opPos[i].y - 15;
                img.scaleX = img.scaleY = 0.6;
            }
            if (id == 77) {
                img.y = this.opPos[i].y - 30;
                img.scaleX = img.scaleY = 0.5;
            }
            this.opNumAry.push(img);
        }
        this.imgList = this.opNumAry;
        this.rectList = hitObjAry;
        this.showQuestionsView();
    };
    // 抽取正确答案然后随机其中的几个
    SpecialControl76.prototype.getAppointNumAry = function (data) {
        var r = data;
        var ary = [];
        var _ary = this.curGameData.answer.split(",");
        for (var i = 1; i < _ary.length; i++) {
            ary.push(_ary[i]);
        }
        var nary = this.selfParent.curGameData.opertion.split(",");
        var starn = parseInt(nary[1]);
        var len = 6 - ary.length;
        // 找出剩余的
        var count = r.length;
        while (count > 0) {
            for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                var obj = ary_1[_i];
                var index = count - 1;
                if (obj == r[index]) {
                    r.splice(index, 1);
                }
            }
            count--;
        }
        egret.log(r.length);
        // 把剩余的添加到新数组里
        while (len > 0) {
            var rand = App.RandomUtils.limitInteger(0, len - 1);
            ary.push(r[rand]);
            r.splice(rand, 1);
            len--;
        }
        // 最后随机打乱
        var n = ary.length;
        var newAry = [];
        while (n > 0) {
            var rand = App.RandomUtils.limitInteger(0, ary.length - 1);
            newAry.push(ary[rand]);
            ary.splice(rand, 1);
            n--;
        }
        egret.log(newAry.length);
        return newAry;
    };
    // 创建6个随机，存的是元素名称
    SpecialControl76.prototype.creatRandomAry = function () {
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
    SpecialControl76.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    SpecialControl76.prototype.getRandomNumAry = function (n) {
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
    SpecialControl76.prototype.clearAll = function () {
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj && obj.parent) {
                // while(obj.numChildren>0){
                //     obj.removeChildAt(0);
                // }
                obj.parent.removeChild(obj);
            }
        }
    };
    return SpecialControl76;
}(CllickTouchScene));
__reflect(SpecialControl76.prototype, "SpecialControl76");
//# sourceMappingURL=SpecialControl76.js.map