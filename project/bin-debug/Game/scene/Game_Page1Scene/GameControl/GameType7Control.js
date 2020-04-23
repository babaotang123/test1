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
var GameType7Control = (function (_super) {
    __extends(GameType7Control, _super);
    function GameType7Control(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    GameType7Control.prototype.init = function () {
        var id = this.selfParent.curGameData.condition_id;
        switch (id) {
            case "73":
                this.curControl = new SpecialControl73(this.selfParent);
                break;
            case "74":
            case "75":
                this.curControl = new SpecialControl74(this.selfParent);
                break;
            case "76":
            case "77":
                this.curControl = new SpecialControl76(this.selfParent);
                break;
            case "80":
            case "81":
            case "82":
            case "83":
            case "84":
                this.curControl = new SpecialControl80(this.selfParent);
                break;
            default:
                this.curControl = new SpecialControl78(this.selfParent);
                break;
        }
        // this.opNumAry = [];
        // this.quNumAry = [];
        // this.opPos = [];
        // this.quPos = [];
        // this.wenhaoAry = [];
        // this.curAnswerData = new Object;
        // this.hitCurRectIndexObj = new Object();
        // this.wenhaoObj = new Object;
        // this.rigtData = new Object();
        // for(let i=0;i<18;i++){
        //     this.selfParent["r_"+i].visible = false;
        //     if(i<6){
        //         this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
        //     }else{
        //         this.quPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
        //     }
        // }
        // this.curGameData = this.selfParent.curGameData;
        // this.creatImg();
    };
    GameType7Control.prototype.showQuestionsView = function () {
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
    GameType7Control.prototype.setGameOverData = function () {
        this.curControl.setGameOverData();
    };
    GameType7Control.prototype.onDestroy = function () {
        this.curControl.onDestroy();
        // this.clearAll();
        // super.onDestroy();
        // this.opNumAry = [];
        // this.quNumAry = [];
        // this.opPos = [];
        // this.quPos = [];
        // this.wenhaoAry = [];
        //  this.rigtData = null;
        // this.wenhaoObj = null;
        // this.hitCurRectIndexObj = null;
    };
    GameType7Control.prototype.creatImg = function () {
        // 操作类型
        var ary = this.curGameData.answer.split(",");
        var elmName = ary[0];
        var quIndexAry = this.curGameData.quetion.split(",");
        var randomAry = this.creatRandomAry();
        this.showQuestionsView();
    };
    // 创建6个随机，存的是元素名称
    GameType7Control.prototype.creatRandomAry = function () {
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
    GameType7Control.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    GameType7Control.prototype.getRandomNumAry = function (n) {
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
    GameType7Control.prototype.clearAll = function () {
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
    return GameType7Control;
}(CllickTouchScene));
__reflect(GameType7Control.prototype, "GameType7Control");
//# sourceMappingURL=GameType7Control.js.map