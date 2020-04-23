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
var SpecialControl73 = (function (_super) {
    __extends(SpecialControl73, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function SpecialControl73(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    SpecialControl73.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.wenhaoAry = [];
        this.rightData = new Object();
        for (var i = 0; i < 6; i++) {
            this.selfParent["r_" + i].visible = false;
            this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
            if (i < 3) {
                this.selfParent["r_73_" + i].visible = false;
                this.quPos.push(new egret.Point(this.selfParent["r_73_" + i].x, this.selfParent["r_73_" + i].y));
            }
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    };
    SpecialControl73.prototype.showQuestionsView = function () {
        var p = this.selfParent["r_0"].parent;
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            p.addChild(obj);
        }
        for (var _b = 0, _c = this.opNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            p.addChild(obj);
        }
    };
    // 最后的结果
    SpecialControl73.prototype.setGameOverData = function () {
        var b = false;
        if (this.selectImg) {
            if (this.selectImg.name == this.rightName) {
                // 回答正确
                this.selectImg = null;
                this.selfParent.testurl0.text = "正确";
                b = true;
            }
            else {
                this.selfParent.testurl0.text = "错误";
                b = false;
            }
        }
        var evt = new GlobalEvent(GlobalEvent.evt);
        evt.b = b;
        this.selfParent.dispatchEvent(evt);
    };
    SpecialControl73.prototype.showGameOverData = function () {
        var b = false;
        if (this.selectImg) {
            if (this.selectImg.name == this.rightName) {
                // 回答正确
                this.selectImg = null;
                this.selfParent.testurl0.text = "正确";
                b = true;
            }
            else {
                this.selfParent.testurl0.text = "错误";
                b = false;
            }
        }
    };
    // private setColor():void{
    //     if(this.selectImg.filters!=null){
    //         return
    //     }
    //     for(let obj of this.opNumAry){
    //         if(obj){
    //             obj.filters = null;
    //         }
    //     }
    //     var colorMatrix = [ 1,0,0,0,100,
    //                         0,1,0,0,100,
    //                         0,0,1,0,0,
    //                         0,0,0,1,0 ];
    //     var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
    //     this.selectImg.filters = [colorFlilter];
    // }
    SpecialControl73.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.rightData = null;
        Game_Page1Scene.isGameBegin = false;
    };
    SpecialControl73.prototype.creatImg = function () {
        var id = parseInt(this.selfParent.curGameData.condition_id);
        var _quNumAry = this.curGameData.quetion.split(","); // 当前配的数量
        var _opertion = this.curGameData.opertion.split(","); // 元素范围
        var strName = _opertion[0];
        var n1 = parseInt(_opertion[1]);
        var n2 = parseInt(_opertion[2]);
        var n = parseInt(_quNumAry[0]);
        var numAry = [];
        for (var i = n1; i < n2; i++) {
            numAry.push(i);
        }
        var _ary = [];
        while (n > 0) {
            var rand = App.RandomUtils.limitInteger(1, numAry.length - 1);
            _ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            n--;
        }
        // 找到正确答案
        _ary = this.sortNum(_ary, 1, 2);
        this.rightName = strName + _ary[_ary.length - 1] + "";
        // 题目
        _ary = this.getRandomAry(_ary);
        for (var _i = 0, _ary_1 = _ary; _i < _ary_1.length; _i++) {
            var obj = _ary_1[_i];
            var i = _ary.indexOf(obj);
            var p = this.quPos[i];
            var str = strName + obj;
            var img = CommonDragonBones.getInstance().getElementImg(str, 1);
            img.x = p.x;
            img.y = p.y;
            this.quNumAry.push(img);
        }
        // 选项
        var len = 6 - _ary.length;
        while (len > 0) {
            var rand = App.RandomUtils.limitInteger(1, numAry.length - 1);
            _ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            len--;
        }
        _ary = this.getRandomAry(_ary);
        for (var _a = 0, _ary_2 = _ary; _a < _ary_2.length; _a++) {
            var obj = _ary_2[_a];
            var i = _ary.indexOf(obj);
            var p = this.opPos[i];
            var str = strName + obj;
            var img = CommonDragonBones.getInstance().getElementImg(str, 1);
            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            img.x = p.x;
            img.y = p.y + 33;
            img.scaleX = img.scaleY = 0.6;
            this.opNumAry.push(img);
        }
        this.showQuestionsView();
    };
    // 得到随机后的数组
    SpecialControl73.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    SpecialControl73.prototype.getRandomNumAry = function (n) {
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
    // 排序
    SpecialControl73.prototype.sortNum = function (arr, n1, n2) {
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
        return _ary;
    };
    SpecialControl73.prototype.clearAll = function () {
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
    };
    SpecialControl73.prototype.onClickTouch = function (event) {
        if (!Game_Page1Scene.isGameBegin) {
            return;
        }
        var index = this.opNumAry.indexOf(event.currentTarget);
        if (index >= 0) {
            CommonSoundManage.getInstance().playSoundEffect("click_mp3");
            this.selectImg = event.currentTarget;
            this.setColor();
        }
    };
    SpecialControl73.prototype.setColor = function () {
        for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                // obj.filters = null;
                obj.scaleX = obj.scaleY = 0.6;
            }
        }
        this.selectImg.scaleX = this.selectImg.scaleY = 0.8;
    };
    return SpecialControl73;
}(UIObject));
__reflect(SpecialControl73.prototype, "SpecialControl73");
//# sourceMappingURL=SpecialControl73.js.map