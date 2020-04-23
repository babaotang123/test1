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
var SpecialControl74 = (function (_super) {
    __extends(SpecialControl74, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function SpecialControl74(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    SpecialControl74.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.rightData = new Object();
        for (var i = 0; i < 6; i++) {
            this.selfParent["r_" + i].visible = false;
            if (i < 6) {
                this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
            }
            if (i == 0) {
                this.quPos.push(new egret.Point(495, 299));
            }
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    };
    SpecialControl74.prototype.showQuestionsView = function () {
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
    SpecialControl74.prototype.setGameOverData = function () {
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
    SpecialControl74.prototype.showGameOverData = function () {
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
    // private getGlowFilter():egret.GlowFilter{
    //     var color:number = 0xffffff;        /// 光晕的颜色，十六进制，不包含透明度
    //     var alpha:number = 0.5;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
    //     var blurX:number = 4;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
    //     var blurY:number = 4;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
    //     var strength:number = 100;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255
    //     var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
    //     var inner:boolean = true;            /// 指定发光是否为内侧发光
    //     var knockout:boolean = false;            /// 指定对象是否具有挖空效果
    //     let glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
    //         strength, quality, inner, knockout );
    //     return glowFilter;
    // }
    SpecialControl74.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.rightData = null;
        Game_Page1Scene.isGameBegin = false;
    };
    SpecialControl74.prototype.creatImg = function () {
        var id = parseInt(this.selfParent.curGameData.condition_id);
        var _quNumAry = this.curGameData.quetion.split(","); // 题目
        var randomAry = this.creatRandomAry(); // 取出选项
        this.rightName = this.curGameData.answer;
        for (var _i = 0, _quNumAry_1 = _quNumAry; _i < _quNumAry_1.length; _i++) {
            var obj = _quNumAry_1[_i];
            var i = _quNumAry.indexOf(obj);
            var img = CommonDragonBones.getInstance().getElementImg(obj);
            img.x = this.quPos[i].x;
            img.y = this.quPos[i].y;
            this.quNumAry.push(img);
        }
        for (var _a = 0, randomAry_1 = randomAry; _a < randomAry_1.length; _a++) {
            var obj = randomAry_1[_a];
            var i = randomAry.indexOf(obj);
            var img = CommonDragonBones.getInstance().getElementImg(obj, 1);
            img.x = this.opPos[i].x;
            img.y = this.opPos[i].y + 33;
            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            img.scaleX = img.scaleY = 0.5;
            this.opNumAry.push(img);
        }
        this.showQuestionsView();
    };
    SpecialControl74.prototype.creatRandomAry = function () {
        var opary = this.curGameData.opertion.split(",");
        var anAry = this.curGameData.answer.split(",");
        var str = opary[0];
        var starIndex = parseInt(opary[1]);
        var endIndex = parseInt(opary[2]) + 1;
        var elmentAry = [];
        var _ary = [];
        for (var _i = 0, anAry_1 = anAry; _i < anAry_1.length; _i++) {
            var obj = anAry_1[_i];
            if (obj) {
                _ary.push(obj);
            }
        }
        for (var i = starIndex; i < endIndex; i++) {
            var s1 = str + i;
            elmentAry.push(s1);
        }
        for (var _a = 0, _ary_1 = _ary; _a < _ary_1.length; _a++) {
            var obj = _ary_1[_a];
            for (var _b = 0, elmentAry_1 = elmentAry; _b < elmentAry_1.length; _b++) {
                var _obj = elmentAry_1[_b];
                var i = elmentAry.indexOf(_obj);
                if (obj == _obj) {
                    elmentAry.splice(i, 1);
                }
            }
        }
        var len = 6 - anAry.length;
        while (len) {
            var rand = App.RandomUtils.limitInteger(0, elmentAry.length - 1);
            _ary.push(elmentAry[rand]);
            elmentAry.splice(rand, 1);
            len--;
        }
        _ary = this.getRandomAry(_ary);
        return _ary;
    };
    // 得到随机后的数组
    SpecialControl74.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    SpecialControl74.prototype.getRandomNumAry = function (n) {
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
    SpecialControl74.prototype.clearAll = function () {
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
    SpecialControl74.prototype.onClickTouch = function (event) {
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        if (!Game_Page1Scene.isGameBegin) {
            return;
        }
        var index = this.opNumAry.indexOf(event.currentTarget);
        if (index >= 0) {
            this.selectImg = event.currentTarget;
            this.setColor();
        }
    };
    SpecialControl74.prototype.setColor = function () {
        for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                // obj.filters = null;
                obj.scaleX = obj.scaleY = 0.5;
            }
        }
        this.selectImg.scaleX = this.selectImg.scaleY = 0.8;
    };
    return SpecialControl74;
}(UIObject));
__reflect(SpecialControl74.prototype, "SpecialControl74");
//# sourceMappingURL=SpecialControl74.js.map