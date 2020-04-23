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
var GameType3Control = (function (_super) {
    __extends(GameType3Control, _super);
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    function GameType3Control(data) {
        var _this = _super.call(this) || this;
        _super.prototype.onAdd.call(_this);
        _this.selfParent = data;
        _this.init();
        return _this;
        //   egret.log(this.selfParent);
    }
    GameType3Control.prototype.init = function () {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.rightData = new Object();
        for (var i = 0; i < 20; i++) {
            this.selfParent["r_" + i].visible = false;
            if (i < 6) {
                this.opPos.push(new egret.Point(this.selfParent["r_" + i].x, this.selfParent["r_" + i].y));
            }
            this.quPos.push(new egret.Point(this.selfParent["fru_" + i].x, this.selfParent["fru_" + i].y));
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    };
    GameType3Control.prototype.showQuestionsView = function () {
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
    GameType3Control.prototype.setGameOverData = function () {
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
    GameType3Control.prototype.showGameOverData = function () {
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
    GameType3Control.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.idTimeout = [];
        this.rightData = null;
        // 测试
        this.selfParent.testurl0.text = "";
    };
    GameType3Control.prototype.creatImg = function () {
        var id = parseInt(this.selfParent.curGameData.condition_id);
        var eleName = this.selfParent.curGameData.answer;
        // 操作类型
        var _quNumAry = this.curGameData.quetion.split(","); // 数量
        _quNumAry = _quNumAry.sort(); // 从小到大排序了
        var randomAry = this.creatRandomAry(); // 取出了题目元素
        // 创建了题目元素
        var str = "";
        var totalNum = 0;
        // 总数
        for (var i = 0; i < _quNumAry.length; i++) {
            var num = parseInt(_quNumAry[i]);
            totalNum = totalNum + num;
        }
        var count1 = 0;
        var count2 = 0;
        // 第32题专用
        var opAry1 = [];
        var opAry2 = [];
        if (id > 30 && id < 35 && id != 32) {
            for (var i = 0; i < randomAry.length; i++) {
                str = randomAry[i];
                var img = CommonDragonBones.getInstance().getElementImg(str);
                img.rotation = App.RandomUtils.limitInteger(0, 180); // 每个元素旋转方向
                img.pixelHitTest = true;
                var name_1 = img.name;
                if (this.rightData[name_1] == "img_sortmore16") {
                    count1++;
                }
                else {
                    count2++;
                }
                this.quNumAry.push(img);
            }
        }
        else if (id == 32) {
            for (var i = 0; i < randomAry.length; i++) {
                str = randomAry[i];
                var img = CommonDragonBones.getInstance().getElementImg(str);
                img.rotation = App.RandomUtils.limitInteger(0, 180); // 每个元素旋转方向
                img.pixelHitTest = true;
                var name_2 = img.name;
                if (this.rightData[name_2] == "left") {
                    count1++;
                    opAry1.push(img);
                }
                else {
                    count2++;
                    opAry2.push(img);
                }
                this.quNumAry.push(img);
            }
        }
        else {
            for (var i = 0; i < _quNumAry.length; i++) {
                var num = parseInt(_quNumAry[i]);
                // totalNum = totalNum+num;
                str = randomAry[i];
                for (var i_1 = 0; i_1 < num; i_1++) {
                    var img = CommonDragonBones.getInstance().getElementImg(str);
                    img.rotation = App.RandomUtils.limitInteger(0, 180); // 每个元素旋转方向
                    img.pixelHitTest = true;
                    var name_3 = img.name;
                    if (this.rightData[name_3] == "img_sortmore16") {
                        count1++;
                    }
                    else {
                        count2++;
                    }
                    this.quNumAry.push(img);
                }
                if (id != 35 && id != 36) {
                    if (i == _quNumAry.length - 1) {
                        this.rightName = str;
                    }
                }
            }
        }
        // 蔬菜多 水果多
        if (id == 35 || id == 36 || id == 31 || id == 33 || id == 34) {
            if (count1 < count2) {
                this.rightName = "img_sortmore13";
            }
            else {
                this.rightName = "img_sortmore16";
            }
        }
        // 创建选项 包含题目
        if (id == 32) {
            var opAry = [];
            var n1Ary = void 0;
            var n2Ary = void 0;
            n1Ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            n2Ary = [11, 12, 13, 14, 15, 16, 17, 18];
            if (count1 > count2) {
                var rand = App.RandomUtils.limitInteger(0, opAry1.length - 1);
                opAry.push(opAry1[rand].name);
                this.rightName = opAry1[rand].name;
                var n = 5;
                var len = opAry2.length - 1;
                egret.log(opAry2);
                while (n > 0) {
                    var rand_1 = App.RandomUtils.limitInteger(0, len);
                    var _str = eleName + n2Ary[rand_1];
                    opAry.push(_str);
                    n2Ary.splice(rand_1, 1);
                    n--;
                }
            }
            else {
                var rand = App.RandomUtils.limitInteger(0, opAry2.length - 1);
                opAry.push(opAry2[rand].name);
                this.rightName = opAry2[rand].name;
                var n = 5;
                var len = opAry1.length - 1;
                while (n > 0) {
                    var rand_2 = App.RandomUtils.limitInteger(0, len);
                    var _str = eleName + n1Ary[rand_2];
                    opAry.push(_str);
                    n1Ary.splice(rand_2, 1);
                    n--;
                }
            }
            randomAry = [];
            randomAry = opAry;
        }
        else if (id == 31 || id == 33 || id == 34 || id == 35 || id == 36) {
            var a1 = this.selfParent.curGameData.opertion.split("_");
            var starIndx = parseInt(a1[0]);
            var endIndx = parseInt(a1[1]) + 1;
            randomAry = []; // 清空重新存放
            for (var i = starIndx; i < endIndx; i++) {
                var _str = eleName + i;
                // let newopimg = CommonDragonBones.getInstance().getElementImg(_str);
                randomAry.push(_str);
            }
        }
        else {
            var n = 6 - randomAry.length;
            while (n > 0) {
                var rand = App.RandomUtils.limitInteger(0, this.elemNameAry.length - 1);
                randomAry.push(this.elemNameAry[rand]);
                this.elemNameAry.splice(rand, 1);
                n--;
            }
        }
        // 随机题目位置
        var _qupos = [];
        while (totalNum > 0) {
            var rand = App.RandomUtils.limitInteger(0, this.quPos.length - 1);
            _qupos.push(this.quPos[rand]);
            var index = totalNum - 1;
            var p = this.quPos[rand];
            this.quNumAry[index].x = p.x;
            this.quNumAry[index].y = p.y;
            this.quPos.splice(rand, 1);
            totalNum--;
        }
        // 随机选项位置
        randomAry = this.getRandomAry(randomAry);
        for (var _i = 0, randomAry_1 = randomAry; _i < randomAry_1.length; _i++) {
            var obj = randomAry_1[_i];
            var i = randomAry.indexOf(obj);
            var p = this.opPos[i];
            str = obj;
            var img = CommonDragonBones.getInstance().getElementImg(str);
            img.x = p.x;
            img.y = p.y;
            img.scaleX = img.scaleY = 0.5;
            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            this.opNumAry.push(img);
        }
        if (id == 35 || id == 36) {
            this.moveElmentAuto();
        }
        this.showQuestionsView();
    };
    // 创建6个随机，存的是元素名称
    GameType3Control.prototype.creatRandomAry = function () {
        var id = parseInt(this.selfParent.curGameData.condition_id);
        var quNumAry = this.selfParent.curGameData.quetion.split(","); // 配的个数
        var qulen = quNumAry.length;
        var elmAry = this.selfParent.curGameData.opertion.split("_"); // 元素选项
        var str = this.selfParent.curGameData.answer; // 元素前缀
        var elmLen = 0;
        if (id == 31 || id == 33 || id == 34 || id == 35 || id == 36) {
            elmLen = parseInt(elmAry[0]);
        }
        else {
            elmLen = parseInt(elmAry[1]) + 1;
        }
        this.elemNameAry = [];
        // 创建所有元素
        for (var i = 1; i < elmLen; i++) {
            var s = str + i; // 元素的真实名字
            this.elemNameAry.push(s);
        }
        var _ary = [];
        if (id == 32) {
            // 左右手个数
            quNumAry = this.getRandomAry(quNumAry);
            var n1Ary = void 0;
            var n2Ary = void 0;
            n1Ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            n2Ary = [11, 12, 13, 14, 15, 16, 17, 18];
            var lNum = parseInt(quNumAry[0]);
            var rNum = parseInt(quNumAry[1]);
            var lAry = this.countNumAry(n1Ary, lNum, str);
            var rAry = this.countNumAry(n2Ary, rNum, str);
            // 再次随机存放
            _ary = this.getRandomAry(lAry.concat(rAry));
            var nameAry = [];
            for (var _i = 0, _ary_1 = _ary; _i < _ary_1.length; _i++) {
                var obj = _ary_1[_i];
                var name_4 = str + obj;
                nameAry.push(name_4);
            }
            _ary = nameAry;
            var count1 = 0;
            var count2 = 0;
            for (var _a = 0, _ary_2 = _ary; _a < _ary_2.length; _a++) {
                var obj = _ary_2[_a];
                var a1 = obj.split(str);
                var n1 = parseInt(a1[1]);
                var key = str + n1;
                if (n1 < 11) {
                    // 左手
                    this.rightData[key] = "left";
                    count1++;
                }
                else {
                    // 右手
                    this.rightData[key] = "right";
                    count2++;
                }
            }
        }
        else {
            if (id == 31 || id == 33 || id == 34) {
                // 先随机蔬菜水果的个数
                quNumAry = this.getRandomAry(quNumAry);
                // 随机出来的0 1 选择数量 蔬菜
                // 顺序分别取出蔬菜和水果
                var n1Ary = void 0;
                var n2Ary = void 0;
                n1Ary = [1, 2, 3, 4, 5];
                n2Ary = [6, 7, 8, 9, 10];
                var sucaiNum = parseInt(quNumAry[0]);
                var shuiguoNum = parseInt(quNumAry[1]);
                var sucaiAry = this.countNumAry(n1Ary, sucaiNum, str);
                var shuiguoAry = this.countNumAry(n2Ary, shuiguoNum, str);
                // 再次随机存放
                _ary = this.getRandomAry(sucaiAry.concat(shuiguoAry));
                var nameAry = [];
                for (var _b = 0, _ary_3 = _ary; _b < _ary_3.length; _b++) {
                    var obj = _ary_3[_b];
                    var name_5 = str + obj;
                    nameAry.push(name_5);
                }
                _ary = nameAry;
            }
            else {
                // 先随机取出长度数量的元素
                while (qulen > 0) {
                    var rand = App.RandomUtils.limitInteger(0, this.elemNameAry.length - 1);
                    _ary.push(this.elemNameAry[rand]);
                    this.elemNameAry.splice(rand, 1);
                    qulen--;
                }
            }
            // 设定对应关系
            for (var _c = 0, _ary_4 = _ary; _c < _ary_4.length; _c++) {
                var obj = _ary_4[_c];
                var a1 = obj.split(str);
                var n1 = parseInt(a1[1]);
                var key = str + n1;
                if (n1 < 6) {
                    // 蔬菜
                    this.rightData[key] = "img_sortmore16";
                }
                else {
                    // 水果
                    this.rightData[key] = "img_sortmore13";
                }
            }
        }
        return _ary;
    };
    // 分类取值
    GameType3Control.prototype.countNumAry = function (ary, n, sname) {
        var _ary = [];
        var a = ary;
        if (n >= ary.length) {
            var count = n - ary.length;
            while (count) {
                var rand = App.RandomUtils.limitInteger(0, ary.length - 1);
                _ary.push(ary[rand]);
                count--;
            }
            a = a.concat(_ary);
        }
        else {
            while (n) {
                var rand = App.RandomUtils.limitInteger(0, ary.length - 1);
                _ary.push(a[rand]);
                a.splice(rand, 1);
                n--;
            }
            a = _ary;
        }
        return a;
    };
    // 得到随机后的数组
    GameType3Control.prototype.getRandomAry = function (ary) {
        var ramNumAry = this.getRandomNumAry(ary.length);
        var _Ary = [];
        for (var _i = 0, ramNumAry_1 = ramNumAry; _i < ramNumAry_1.length; _i++) {
            var obj = ramNumAry_1[_i];
            _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    };
    GameType3Control.prototype.getRandomNumAry = function (n) {
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
    GameType3Control.prototype.moveElmentAuto = function () {
        this.idTimeout = [];
        var self = this;
        var _loop_1 = function (obj) {
            var i = this_1.quNumAry.indexOf(obj);
            var time = 200 * Math.random();
            var id = setTimeout(function () {
                var move = new RandomMove();
                move.play(obj);
                self.idTimeout.push(id);
            }, time);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            _loop_1(obj);
        }
    };
    GameType3Control.prototype.clearAll = function () {
        if (this.idTimeout) {
            for (var _i = 0, _a = this.idTimeout; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj) {
                    egret.clearTimeout(obj);
                }
            }
        }
        for (var _b = 0, _c = this.quNumAry; _b < _c.length; _b++) {
            var obj = _c[_b];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        for (var _d = 0, _e = this.opNumAry; _d < _e.length; _d++) {
            var obj = _e[_d];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
    };
    GameType3Control.prototype.onClickTouch = function (event) {
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
    GameType3Control.prototype.setColor = function () {
        for (var _i = 0, _a = this.opNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj) {
                // obj.filters = null;
                obj.scaleX = obj.scaleY = 0.5;
            }
        }
        this.selectImg.scaleX = this.selectImg.scaleY = 0.8;
    };
    return GameType3Control;
}(UIObject));
__reflect(GameType3Control.prototype, "GameType3Control");
//# sourceMappingURL=GameType3Control.js.map