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
var SpecialControl78 = (function (_super) {
    __extends(SpecialControl78, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function SpecialControl78(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    SpecialControl78.prototype.init = function () {
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
            if (len == 4) {
                if (i < 4) {
                    this.selfParent["r_76_" + i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_76_" + i].x, this.selfParent["r_76_" + i].y));
                    this.opPos.push(new egret.Point(this.selfParent["r_78_" + i].x, this.selfParent["r_78_" + i].y));
                }
            }
            else if (len == 5) {
                if (i > 3) {
                    this.selfParent["r_76_" + i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_76_" + i].x, this.selfParent["r_76_" + i].y));
                }
            }
            if (len == 7) {
                // this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
                if (i < 7) {
                    this.quPos.push(new egret.Point(this.selfParent["r_sidai_" + i].x, this.selfParent["r_sidai_" + i].y));
                    this.selfParent["r_sidai_" + i].visible = false;
                }
                if (i < 6) {
                    this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
                    this.selfParent["r_" + i].visible = false;
                }
            }
            // if(len == 7){
            //     if(i<7){
            //         this.quPos.push(new egret.Point(this.selfParent["r_sidai_"+i].x,this.selfParent["r_sidai_"+i].y));
            //         this.selfParent["r_sidai_"+i].visible = false;
            //         this.opPos.push(new egret.Point(this.selfParent["r_numsidai_"+i].x,this.selfParent["r_numsidai_"+i].y));
            //         this.selfParent["r_numsidai_"+i].visible = false;
            //     }
            // }
        }
        this.creatImg();
    };
    SpecialControl78.prototype.showQuestionsView = function () {
        var p = this.selfParent["r_0"].parent;
        for (var _i = 0, _a = this.rectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            p.addChild(obj);
        }
        for (var _b = 0, _c = this.quNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            p.addChild(obj);
        }
        for (var _d = 0, _e = this.opNumAry; _d < _e.length; _d++) {
            var obj = _e[_d];
            p.addChild(obj);
        }
        _super.prototype.initAddEvent.call(this);
    };
    // 最后的结果
    SpecialControl78.prototype.setGameOverData = function () {
        var b = true;
        var len = this.rectList.length;
        var opNameAry = this.curGameData.opertion.split(",");
        var quName = this.curGameData.answer;
        var opName = opNameAry[0];
        for (var k in this.rigtData) {
            var s1 = ((this.rigtData[k]).split(quName))[1];
            ;
            var s2 = void 0;
            if (this.curAnswerData[k]) {
                if (!this.curAnswerData[k].name) {
                    b = false;
                    break;
                }
                else {
                    s2 = ((this.curAnswerData[k].name).split(opName))[1];
                }
            }
            else {
                b = false;
                break;
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
    SpecialControl78.prototype.showGameOverData = function () {
        var b = true;
        var len = this.rectList.length;
        var opNameAry = this.curGameData.opertion.split(",");
        var quName = this.curGameData.answer;
        var opName = opNameAry[0];
        for (var k in this.rigtData) {
            var s1 = ((this.rigtData[k]).split(quName))[1];
            ;
            var s2 = void 0;
            if (this.curAnswerData[k]) {
                if (!this.curAnswerData[k].name) {
                    b = false;
                    break;
                }
                else {
                    s2 = ((this.curAnswerData[k].name).split(opName))[1];
                }
            }
            else {
                b = false;
                break;
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
    SpecialControl78.prototype.onDestroy = function () {
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
    SpecialControl78.prototype.creatImg = function () {
        // 操作类型
        var ary = this.curGameData.answer.split(",");
        var quName = this.curGameData.answer;
        var quAry = this.curGameData.quetion.split(",");
        var opNameAry = this.curGameData.opertion.split(",");
        var opName = opNameAry[0];
        var randomAry = this.creatRandomAry(); // 乱序的
        var hitObjAry = [];
        var id = parseInt(this.curGameData.condition_id);
        var _s1x = 0;
        var _s1y = 0;
        for (var j = 0; j < randomAry.length; j++) {
            var str = quName + randomAry[j];
            var p = this.quPos[j];
            var img = CommonDragonBones.getInstance().getElementImg(str);
            img.x = p.x;
            img.y = p.y;
            this.quNumAry.push(img);
            var bgname = "img_quan_bg";
            var putBg = CommonDragonBones.getInstance().getElementImg(bgname);
            putBg.x = img.x;
            if (randomAry.length == 7) {
                putBg.y = img.y + 192;
            }
            else {
                putBg.y = img.y + 142;
            }
            putBg.name = str;
            this.wenhaoAry.push(putBg);
            if (randomAry[j] == "1" && randomAry.length == 7) {
                _s1x = putBg.x;
                _s1y = putBg.y;
            }
            else {
                hitObjAry.push(putBg);
                var key = str + (hitObjAry.length - 1);
                this.rigtData["" + (hitObjAry.length - 1)] = str;
                this.hitCurRectIndexObj[key] = "" + j;
            }
            if (quAry.length == 7) {
                var opStr = opName + (j + 1);
                var opImg = CommonDragonBones.getInstance().getElementImg(opStr);
                this.opNumAry.push(opImg);
            }
            else {
                var opStr = opName + (j + 1);
                var opImg = CommonDragonBones.getInstance().getElementImg(opStr);
                opImg.x = this.opPos[j].x;
                opImg.y = this.opPos[j].y;
                this.opNumAry.push(opImg);
            }
        }
        // 7特殊处理
        var curOP = [];
        if (quAry.length == 7) {
            for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
                var obj = _a[_i];
                var i = this.opNumAry.indexOf(obj);
                var s = (obj.name.split(opName))[1];
                if (s != "1") {
                    curOP.push(obj);
                }
                else {
                    obj.x = _s1x;
                    obj.y = _s1y;
                }
            }
            for (var _b = 0, curOP_1 = curOP; _b < curOP_1.length; _b++) {
                var obj = curOP_1[_b];
                var i = curOP.indexOf(obj);
                obj.x = this.opPos[i].x;
                obj.y = this.opPos[i].y;
            }
            this.imgList = curOP;
        }
        else {
            this.imgList = this.opNumAry;
        }
        this.rectList = hitObjAry;
        this.showQuestionsView();
    };
    // 复制一个新的
    SpecialControl78.prototype.copyNewobj = function (rec) {
        var re = new eui.Rect;
        re.fillAlpha = 0;
        re.name = rec.name;
        re.width = rec.width;
        re.height = rec.height;
        re.anchorOffsetX = rec.width / 2;
        re.anchorOffsetY = rec.height / 2;
        re.x = rec.x;
        re.y = rec.y;
        return re;
    };
    // 根据配置的数量
    SpecialControl78.prototype.creatRandomAry = function () {
        var nary = this.selfParent.curGameData.quetion.split(",");
        var ary = [];
        for (var i = 1; i < nary.length + 1; i++) {
            ary.push(i);
        }
        ary = this.getRandomAry(ary);
        return ary;
    };
    // 得到随机后的数组
    SpecialControl78.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    SpecialControl78.prototype.getRandomNumAry = function (n) {
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
    SpecialControl78.prototype.clearAll = function () {
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
        for (var _d = 0, _e = this.rectList; _d < _e.length; _d++) {
            var obj = _e[_d];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
    };
    return SpecialControl78;
}(CllickTouchScene));
__reflect(SpecialControl78.prototype, "SpecialControl78");
//# sourceMappingURL=SpecialControl78.js.map