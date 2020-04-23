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
var SpecialControl80 = (function (_super) {
    __extends(SpecialControl80, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function SpecialControl80(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    SpecialControl80.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.quanPos = [];
        this.wenhaoAry = [];
        this.curAnswerData = new Object;
        this.wenhaoObj = new Object;
        this.rigtData = new Object();
        this.hitCurRectIndexObj = new Object();
        this.curGameData = this.selfParent.curGameData;
        var id = this.curGameData.condition_id;
        for (var i = 0; i < 6; i++) {
            this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
            this.selfParent["r_" + i].visible = false;
            // 全部特殊处理 位置
            if (id == 80) {
                if (i < 1) {
                    this.selfParent["r_sort80_" + i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_sort80_" + i].x, this.selfParent["r_sort80_" + i].y));
                }
                this.quanPos.push(new egret.Point(this.selfParent["r_hit80_" + i].x, this.selfParent["r_hit80_" + i].y));
            }
            if (id == 81) {
                if (i < 1) {
                    this.quPos.push(new egret.Point(512, 300));
                }
                this.quanPos.push(new egret.Point(this.selfParent["r_hit81_" + i].x, this.selfParent["r_hit81_" + i].y));
            }
            if (id == 82) {
                if (i < 1) {
                    this.quPos.push(new egret.Point(512, 300));
                }
                this.quanPos.push(new egret.Point(this.selfParent["r_hit82_" + i].x, this.selfParent["r_hit82_" + i].y));
            }
            if (id == 83) {
                if (i < 1) {
                    this.quPos.push(new egret.Point(512, 300));
                }
                this.quanPos.push(new egret.Point(this.selfParent["r_hit83_" + i].x, this.selfParent["r_hit83_" + i].y));
            }
            if (id == 84) {
                if (i < 1) {
                    this.quPos.push(new egret.Point(512, 300));
                }
                this.quanPos.push(new egret.Point(this.selfParent["r_hit84_" + i].x, this.selfParent["r_hit84_" + i].y));
            }
        }
        this.creatImg();
    };
    SpecialControl80.prototype.showQuestionsView = function () {
        var p = this.selfParent["r_0"].parent;
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            p.addChild(obj);
        }
        for (var _b = 0, _c = this.opNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            p.addChild(obj);
        }
        // for(let obj of this.rectList){
        //     p.addChild(obj);
        // }
        for (var _d = 0, _e = this.rectList; _d < _e.length; _d++) {
            var obj = _e[_d];
            p.addChild(obj);
        }
        _super.prototype.initAddEvent.call(this);
    };
    // 最后的结果
    SpecialControl80.prototype.setGameOverData = function () {
        var b = true;
        var len = this.rectList.length;
        for (var k in this.rigtData) {
            var s1 = this.rigtData[k].name;
            var s2 = void 0;
            if (this.curAnswerData[k]) {
                s2 = this.curAnswerData[k].name;
                if (s2) {
                    s2 = (s2.split("img_num_"))[1];
                }
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
    SpecialControl80.prototype.showGameOverData = function () {
        var b = true;
        var len = this.rectList.length;
        for (var k in this.rigtData) {
            var s1 = this.rigtData[k].name;
            var s2 = void 0;
            if (this.curAnswerData[k]) {
                s2 = this.curAnswerData[k].name;
                if (s2) {
                    s2 = (s2.split("img_num_"))[1];
                }
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
    SpecialControl80.prototype.onDestroy = function () {
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
    SpecialControl80.prototype.creatImg = function () {
        // 操作类型
        var ary = this.curGameData.answer.split(",");
        var quName = this.curGameData.quetion;
        var opNameAry = this.curGameData.opertion.split(",");
        var opName = opNameAry[0];
        var hitObjAry = [];
        var id = parseInt(this.curGameData.condition_id);
        for (var j = 0; j < ary.length; j++) {
            var str = void 0;
            if (j == 0) {
                str = quName;
                var p = this.quPos[j];
                var img = CommonDragonBones.getInstance().getElementImg(str);
                img.x = p.x;
                img.y = p.y;
                this.quNumAry.push(img);
            }
            str = ary[j];
            var rec = new eui.Rect();
            var _p = this.quanPos[j];
            rec.width = rec.height = 60;
            rec.anchorOffsetX = rec.width / 2;
            rec.anchorOffsetY = rec.height / 2;
            rec.fillAlpha = 0;
            rec.name = str;
            rec.x = _p.x;
            rec.y = _p.y;
            hitObjAry.push(rec);
            this.rigtData["" + j] = rec;
            var key = str + (hitObjAry.length - 1);
            this.hitCurRectIndexObj[key] = "" + j;
            var opStr = opName + (j + 1);
            var opImg = CommonDragonBones.getInstance().getElementImg(opStr);
            opImg.x = this.opPos[j].x;
            opImg.y = this.opPos[j].y;
            this.opNumAry.push(opImg);
        }
        this.imgList = this.opNumAry;
        this.rectList = hitObjAry;
        this.showQuestionsView();
    };
    // 复制一个新的
    SpecialControl80.prototype.copyNewobj = function (rec) {
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
    SpecialControl80.prototype.clearAll = function () {
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
    return SpecialControl80;
}(CllickTouchScene));
__reflect(SpecialControl80.prototype, "SpecialControl80");
//# sourceMappingURL=SpecialControl80.js.map