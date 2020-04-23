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
var GameType5Control = (function (_super) {
    __extends(GameType5Control, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function GameType5Control(data) {
        var _this = _super.call(this) || this;
        _this.curScal = 1;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    GameType5Control.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.wenhaoAry = [];
        this.rightData = new Object();
        for (var i = 0; i < 6; i++) {
            this.selfParent["r_" + i].visible = false;
            this.selfParent["sh_" + i].visible = false;
            if (i < 6) {
                this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
                this.quPos.push(new egret.Point(this.selfParent["sh_" + i].x, this.selfParent["sh_" + i].y));
            }
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    };
    GameType5Control.prototype.showQuestionsView = function () {
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
    GameType5Control.prototype.setGameOverData = function () {
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
    GameType5Control.prototype.showGameOverData = function () {
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
    GameType5Control.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.rightData = null;
        Game_Page1Scene.isGameBegin = false;
    };
    GameType5Control.prototype.creatImg = function () {
        var id = parseInt(this.selfParent.curGameData.condition_id);
        var _quNumAry = this.curGameData.quetion.split(","); // 题目
        var randomAry = this.creatRandomAry(); // 取出选项
        var an = this.curGameData.answer.split(",");
        this.rightName = an[0] + an[1];
        var strName = an[0];
        // 特殊处理
        if (id == 53) {
            this.quPos = [];
            for (var i = 6; i < 11; i++) {
                this.quPos.push(new egret.Point(this.selfParent["sh_" + i].x, this.selfParent["sh_" + i].y));
            }
        }
        for (var j = 0; j < _quNumAry.length; j++) {
            var obj = _quNumAry[j];
            if (obj == "?") {
                var wen = CommonDragonBones.getInstance().getDrgoneDisplay("wen");
                wen.animation.play(1);
                wen.name = "wen";
                wen.x = this.quPos[j].x;
                wen.y = this.quPos[j].y;
                this.quNumAry.push(wen);
            }
            else {
                obj = strName + obj;
                var img = CommonDragonBones.getInstance().getElementImg(obj);
                img.x = this.quPos[j].x;
                img.y = this.quPos[j].y;
                this.quNumAry.push(img);
            }
        }
        for (var _i = 0, randomAry_1 = randomAry; _i < randomAry_1.length; _i++) {
            var obj = randomAry_1[_i];
            var i = randomAry.indexOf(obj);
            obj = strName + obj;
            var img = CommonDragonBones.getInstance().getElementImg(obj);
            img.x = this.opPos[i].x;
            img.y = this.opPos[i].y;
            if (id != 58) {
                img.pixelHitTest = true;
            }
            this.setScale(id, img);
            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            this.opNumAry.push(img);
        }
        this.showQuestionsView();
    };
    GameType5Control.prototype.setScale = function (id, img) {
        var n = 0;
        switch (id) {
            case 49:
                n = 0.4;
                break;
            case 50:
                n = 0.9;
                break;
            case 51:
                n = 0.6;
                break;
            case 52:
                n = 0.4;
                break;
            case 53:
                n = 0.6;
                break;
            case 54:
                n = 0.6;
                break;
            case 55:
                n = 0.8;
                break;
            case 56:
                n = 0.6;
                break;
            case 57:
                n = 0.5;
                break;
            case 58:
                n = 1;
                break;
            case 59:
                n = 0.7;
                break;
            case 60:
                n = 0.6;
                break;
        }
        this.curScal = n;
        img.scaleX = img.scaleY = n;
    };
    GameType5Control.prototype.creatRandomAry = function () {
        var anAry = this.curGameData.opertion.split(",");
        var len = anAry.length;
        var _ary = [];
        while (len) {
            var rand = App.RandomUtils.limitInteger(0, anAry.length - 1);
            _ary.push(anAry[rand]);
            anAry.splice(rand, 1);
            len--;
        }
        _ary = this.getRandomAry(_ary);
        return _ary;
    };
    // 得到随机后的数组
    GameType5Control.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    GameType5Control.prototype.getRandomNumAry = function (n) {
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
    GameType5Control.prototype.clearAll = function () {
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
    GameType5Control.prototype.onClickTouch = function (event) {
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
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
    GameType5Control.prototype.setColor = function () {
        // if(this.selectImg.scaleX ==  this.curScal){
        //     return
        // }
        for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                // obj.filters = null;
                obj.scaleX = obj.scaleY = this.curScal;
            }
        }
        var n = this.curScal + 0.4;
        // if( n>1){
        //      n = 1;
        // }else{
        //      n =  this.curScal+0.4
        // }
        this.selectImg.scaleX = this.selectImg.scaleY = n;
    };
    return GameType5Control;
}(UIObject));
__reflect(GameType5Control.prototype, "GameType5Control");
//# sourceMappingURL=GameType5Control.js.map