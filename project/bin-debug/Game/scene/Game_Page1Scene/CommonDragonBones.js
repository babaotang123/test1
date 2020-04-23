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
var CommonDragonBones = (function (_super) {
    __extends(CommonDragonBones, _super);
    function CommonDragonBones() {
        var _this = _super.call(this) || this;
        _this.displayDataAry = [];
        _this.animationDataAry = new Object();
        return _this;
    }
    CommonDragonBones.getInstance = function () {
        if (!CommonDragonBones.instance) {
            CommonDragonBones.instance = new CommonDragonBones();
        }
        return CommonDragonBones.instance;
    };
    // 取出一个已经创建的单个动作动画
    CommonDragonBones.prototype.getDrgoneDisplay = function (s) {
        var dragonbonesData = RES.getRes(s + "_ske_json");
        var textureData = RES.getRes(s + "_tex_json");
        var texture = RES.getRes(s + "_tex_png");
        var facA;
        if (dragonbonesData && textureData && texture) {
            facA = new dragonBones.EgretFactory();
            facA.parseDragonBonesData(dragonbonesData);
            facA.parseTextureAtlasData(textureData, texture);
            var obj = facA.buildArmatureDisplay("Sprite");
            obj.name = s;
            return obj;
        }
        else {
            return null;
        }
    };
    // 根据配置获取已经组装的默认动画
    CommonDragonBones.prototype.getfactoryAry = function (s, n) {
        if (n === void 0) { n = ""; }
        // [老虎]=[老虎眨眼，老虎答对，老虎打错];
        var sAry = s.split(",");
        var ary = [];
        this.displayDataAry = [];
        for (var i = 0; i < 3; i++) {
            // 生成当前的一组动画
            sAry.length == 1 ? s = sAry[0] : s = sAry[i];
            var s1 = s + "_yan";
            var s2 = s + "_r";
            var s3 = s + "_err";
            var facA = this.getDrgoneDisplay(s1);
            var facB = this.getDrgoneDisplay(s2);
            var facC = this.getDrgoneDisplay(s3);
            var facAry = [facA, facB, facC];
            this.displayDataAry.push(facAry);
        }
        return this.displayDataAry;
    };
    // 隐藏当前动画，显示相应的动画  curIndex 当前动画索引  播放正确的， 播放错误的
    CommonDragonBones.prototype.hideCurDisplayObj = function (self, curIndex, rn, err) {
        if (rn === void 0) { rn = false; }
        if (err === void 0) { err = false; }
        var displayObj = this.displayDataAry[curIndex];
        this.curIndex = curIndex;
        var _x;
        var _y;
        for (var _i = 0, displayObj_1 = displayObj; _i < displayObj_1.length; _i++) {
            var _obj = displayObj_1[_i];
            if (_obj) {
                _obj.animation.stop();
                _obj.visible = false;
            }
        }
        var obj;
        _x = displayObj[0].x;
        _y = displayObj[0].y;
        if (rn) {
            obj = displayObj[1];
        }
        if (err) {
            obj = displayObj[2];
        }
        obj.x = _x;
        obj.y = _y;
        obj.visible = true;
        self.addChild(obj);
        obj.animation.play(1, 1);
        obj.addEventListener(egret.Event.COMPLETE, this.loopComplete, this);
    };
    // public dragondestroy():void{
    //     for(let obj of this.displayDataAry){
    //         if(obj){
    //             for(let db of obj){
    //                 db.animation.stop();
    //                 if(db.parent){
    //                     db.parent.removeChild(db);
    //                 }
    //                 db.dispose();
    //                 db = null;
    //             }
    //         }
    //     }
    //     this.displayDataAry = [];
    // }
    CommonDragonBones.prototype.getMoviclip = function (resoucrNme) {
        var data = RES.getRes(resoucrNme + "_json");
        var txtr = RES.getRes(resoucrNme + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(resoucrNme));
        return mc;
    };
    // 纹理集播放类
    CommonDragonBones.prototype.textureSAnimation = function (resoucrNme) {
    };
    // 从元素对象池里面取出数据
    CommonDragonBones.prototype.getElementImg = function (s, type) {
        if (type === void 0) { type = 0; }
        var img = new eui.Image();
        img.texture = RES.getRes(s);
        if (img.texture == null) {
            return null;
        }
        if (type == 0) {
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
        }
        else if (type == 1) {
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height;
        }
        // img.scaleX = img.scaleY = 0.7;
        img.name = s;
        return img;
    };
    CommonDragonBones.prototype.getDisplayObj = function (s, n) {
        var facAry = [];
        // 生成当前的一组动画
        var s1 = s + "_yan";
        var s2 = s + "_r";
        var s3 = s + "_err";
        var facA = this.getDrgoneDisplay(s1);
        var facB = this.getDrgoneDisplay(s2);
        var facC = this.getDrgoneDisplay(s3);
        if (facA) {
            // facA.scaleX = facA.scaleY = 0.7;
            facAry.push(facA);
        }
        if (facB) {
            //   facB.scaleX = facB.scaleY = 0.7;
            facAry.push(facB);
        }
        if (facC) {
            //   facB.scaleX = facB.scaleY = 0.7;
            facAry.push(facC);
        }
        this.animationDataAry[(n + "")] = facAry;
        return facAry;
    };
    CommonDragonBones.prototype.playChangeAnimatin = function (self, key, index, isImage) {
        if (index === void 0) { index = 1; }
        if (isImage === void 0) { isImage = false; }
        var ary = this.animationDataAry[key];
        if (!ary) {
            return;
        }
        this.curKey = key;
        var _x = ary[0].x;
        var _y = ary[0].y;
        for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
            var _obj = ary_1[_i];
            if (_obj && _obj.animation) {
                _obj.animation.stop();
                _obj.visible = false;
            }
        }
        var obj = ary[index];
        obj.x = _x;
        obj.y = _y;
        obj.visible = true;
        self.addChild(obj);
        obj.animation.play(1, -1);
        if (self.moveImg) {
            self.addChild(self.moveImg);
            self.addChild(self["img_che"]);
        }
        // let id = egret.Tween.get(obj).to({x:1138,y:372},3000).call(function(){
        //     egret.Tween.removeTweens(id);
        // })
        obj.addEventListener(egret.Event.COMPLETE, this.changeloopComplete, this);
    };
    CommonDragonBones.prototype.playImgAnimation = function (img) {
        img.visible = false;
        this.curImg = img;
        var s = img.name + "_r";
        var fac = this.getDrgoneDisplay(s);
        this.curImgAnimation = fac;
        if (fac) {
            fac.x = img.x;
            fac.y = img.y;
            fac.scaleX = fac.scaleY = 0.7;
            fac.visible = true;
            img.parent.addChild(fac);
            fac.animation.play(1, 1);
            fac.addEventListener(egret.Event.COMPLETE, this.onImgComplete, this);
        }
    };
    CommonDragonBones.prototype.dragondestroy = function () {
        for (var obj in this.animationDataAry) {
            var ary = this.animationDataAry[obj];
            if (obj) {
                for (var _i = 0, ary_2 = ary; _i < ary_2.length; _i++) {
                    var _obj = ary_2[_i];
                    if (_obj.animation) {
                        _obj.animation.stop();
                    }
                    if (_obj.parent) {
                        _obj.parent.removeChild(_obj);
                    }
                    _obj.dispose();
                    _obj = null;
                }
            }
            delete this.animationDataAry[obj];
        }
    };
    // 数字对应关系
    CommonDragonBones.prototype.getDisplayName = function (s) {
        var str = "";
        switch (s) {
            case "1":
                str = "laohu";
                break;
            case "2":
                str = "laohu";
                break;
            case "3":
                str = "laohu";
                break;
            case "4":
                str = "laohu";
                break;
        }
        return s;
    };
    CommonDragonBones.prototype.loopComplete = function () {
        var displayObj = this.displayDataAry[this.curIndex];
        for (var _i = 0, displayObj_2 = displayObj; _i < displayObj_2.length; _i++) {
            var obj = displayObj_2[_i];
            if (obj) {
                obj.animation.stop();
                obj.visible = false;
            }
        }
        displayObj[0].visible = true;
        displayObj[0].animation.play(1, -1);
    };
    CommonDragonBones.prototype.onImgComplete = function () {
        this.curImg.visible = true;
        if (this.curImgAnimation && this.curImgAnimation.parent) {
            this.curImgAnimation.animation.stop();
            this.curImgAnimation.visible = false;
            this.curImgAnimation.parent.removeChild(this.curImgAnimation);
            this.curImgAnimation.dispose();
            this.curImgAnimation = null;
        }
    };
    CommonDragonBones.prototype.changeloopComplete = function () {
        var ary = this.animationDataAry[this.curKey];
        for (var _i = 0, ary_3 = ary; _i < ary_3.length; _i++) {
            var obj = ary_3[_i];
            if (obj) {
                obj.animation.stop();
                obj.visible = false;
            }
            if (obj.hasEventListener(egret.Event.COMPLETE)) {
                obj.removeEventListener(egret.Event.COMPLETE, this.changeloopComplete, this);
            }
        }
        ary[0].visible = true;
        egret.Tween.get(ary[0], { loop: true }).wait(2000).call(function () {
            ary[0].animation.play();
        });
    };
    return CommonDragonBones;
}(UIObject));
__reflect(CommonDragonBones.prototype, "CommonDragonBones");
//# sourceMappingURL=CommonDragonBones.js.map