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
/**
 * Created by zringhost on 14-12-14.
 */
var zmovie;
(function (zmovie) {
    var ZMovieClip = (function (_super) {
        __extends(ZMovieClip, _super);
        function ZMovieClip(imgArr, libObj, mcName, scale_) {
            if (mcName === void 0) { mcName = null; }
            if (scale_ === void 0) { scale_ = 1; }
            var _this = _super.call(this) || this;
            _this.isPlay = false;
            _this.setMovieObject(imgArr, libObj, mcName, scale_);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStageHandle, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStageHandle, _this);
            return _this;
        }
        Object.defineProperty(ZMovieClip.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (num) {
                this._direction = num;
                this.scaleX = Math.abs(this.scaleX) * this._direction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZMovieClip.prototype, "color", {
            set: function (c) {
                if (null == this.colorFlilter) {
                    this.colorFlilter = new egret.ColorMatrixFilter();
                }
                var r = (c >> 16);
                var g = (c - (r << 16)) >> 8;
                var b = c - (r << 16) - (g << 8);
                var bl = r / 255;
                r = 510 * bl - 255;
                bl = g / 255;
                g = 510 * bl - 255;
                bl = b / 255;
                b = 510 * bl - 255;
                var colorMatrix = [
                    1, 0, 0, 0, r,
                    0, 1, 0, 0, g,
                    0, 0, 1, 0, b,
                    0, 0, 0, 1, 0
                ];
                this.colorFlilter.matrix = colorMatrix;
                var farr = this.filters;
                if (null == farr) {
                    farr = [this.colorFlilter];
                }
                else {
                    var isfind = false;
                    for (var i = farr.length - 1; i >= 0; i--) {
                        if (farr[i] == this.colorFlilter) {
                            isfind = true;
                            break;
                        }
                    }
                    if (!isfind) {
                        farr.push(this.colorFlilter);
                    }
                }
                this.filters = farr;
            },
            enumerable: true,
            configurable: true
        });
        ZMovieClip.getFrameMovieObject = function (o, frameI) {
            if (null == o.f_arr) {
                o.f_arr = [];
            }
            o.f_arr.unshift(o);
            return o;
        };
        ZMovieClip.prototype.isMovie = function () {
            if (1 < this.totalFrame) {
                return true;
            }
            for (var i = this.numChildren - 1; i >= 0; i--) {
                if (this.getChildAt(i) instanceof ZMovieClip) {
                    var zm = this.getChildAt(i);
                    if (zm.isMovie()) {
                        return true;
                    }
                }
            }
            return false;
        };
        ZMovieClip.prototype.dispose = function () {
            this.stop();
            if (null != this.parent) {
                this.parent.removeChild(this);
            }
        };
        ZMovieClip.prototype.formatScale = function () {
            this.isFormatScale = true;
            if (null == this.stage) {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStageHandle, this);
                return;
            }
            var screenH = this.mcObj.screenH;
            var bl;
            if (this.stage.stageWidth > this.stage.stageHeight) {
                bl = this.stage.stageHeight / screenH;
            }
            else {
                bl = this.stage.stageWidth / screenH;
            }
            this.scaleX = bl;
            this.scaleY = bl;
        };
        ZMovieClip.prototype.getTotalFrame = function () {
            return this.totalFrame;
        };
        ZMovieClip.prototype.getCurrPlayLabel = function () {
            return this.currPlaylabel;
        };
        ZMovieClip.prototype.getCurrFrame = function () {
            return this.currFrame;
        };
        ZMovieClip.prototype.getIsPlay = function () {
            return this.isPlay;
        };
        ZMovieClip.prototype.setTimeScale = function (num) {
            if (0 >= num) {
                num = 0.01;
            }
            this._timeScale = num;
            if (null != this.mcObj) {
                this.frameTime = this.mcObj.frameTime / num;
            }
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var mc = null;
                if (this.getChildAt(i) instanceof ZMovieClip) {
                    mc = this.getChildAt(i);
                }
                if (null != mc) {
                    mc.setTimeScale(num);
                }
            }
            if (!this.isPlay) {
                if (this.parent instanceof ZMovieClip) {
                    var pzm = this.parent;
                    if (null != pzm) {
                        if (pzm.getTimeScale() != this._timeScale && pzm.getIsPlay()) {
                            this.play();
                        }
                    }
                }
            }
        };
        ZMovieClip.prototype.getTimeScale = function () {
            return this._timeScale;
        };
        ZMovieClip.prototype.getLabels = function () {
            return this.mcObj.frameLabels;
        };
        ZMovieClip.prototype.getIsExistLabel = function (l_name) {
            if (null != this.mcObj.frameLabels && null != this.mcObj.frameLabels[l_name]) {
                return true;
            }
            return false;
        };
        ZMovieClip.prototype.getCurrLabelObj = function () {
            var label_obj = this.getLabels();
            if (null != label_obj) {
                for (var name_1 in label_obj) {
                    if (this.currFrame >= label_obj[name_1].begin) {
                        if (null != label_obj[name_1].end && this.currFrame >= label_obj[name_1].end) {
                            continue;
                        }
                        return label_obj[name_1];
                    }
                }
            }
            return null;
        };
        ZMovieClip.prototype.gotoAndPlayLabel = function (label, isPlayToEnd) {
            if (isPlayToEnd === void 0) { isPlayToEnd = false; }
            var labelObj;
            if (null != this.mcObj.frameLabels) {
                labelObj = this.mcObj.frameLabels[label];
                if (null != labelObj) {
                    this.currPlaylabel = label;
                    this.beginFrame = labelObj.begin;
                    if (null == labelObj.end || isPlayToEnd) {
                        this.endFrame = -1;
                    }
                    else {
                        this.endFrame = labelObj.end - 1;
                    }
                    this.gotoAndPlay(this.beginFrame);
                }
                else {
                    this.beginFrame = 0;
                    this.endFrame = -1;
                    this.currPlaylabel = null;
                    this.gotoAndPlay(this.beginFrame);
                }
                this.dispatchEventWith(ZMovieClip.EVENT_GOTOANDPLAYLABEL, false, label);
            }
            return labelObj;
        };
        ZMovieClip.prototype.disposeLayerImg = function () {
            if (null != this.layerArr) {
                for (var l = this.layerArr.length - 1; l >= 0; l--) {
                    var img = this.layerArr[l].img;
                    if (null != img) {
                        if (null != img.parent) {
                            img.parent.removeChild(img);
                        }
                    }
                    var mc = this.layerArr[l].mc;
                    if (null != mc) {
                        if (null != mc.parent) {
                            mc.parent.removeChild(mc);
                        }
                    }
                    var sp = this.layerArr[l].sp;
                    if (null != sp) {
                        if (null != sp.parent) {
                            sp.parent.removeChild(sp);
                        }
                    }
                    var li = this.layerArr[l].li;
                    if (null != li) {
                        if (null != li.parent) {
                            li.parent.removeChild(li);
                        }
                    }
                }
            }
        };
        ZMovieClip.prototype.setMovieObject = function (imgArr, libObj, mcName, scale_) {
            if (scale_ === void 0) { scale_ = 1; }
            if (null == mcName) {
                mcName = "root";
            }
            this.imgArr = imgArr;
            this.libObj = libObj;
            this.mcName = mcName;
            this.mcObj = libObj.mcObjs[mcName];
            this.areaObj = this.mcObj.areaObject;
            this.libScale = 1;
            this._direction = 1;
            this.fmObj = this.mcObj.frameMoveObj;
            // var screenH:number = this.mcObj.screenH;
            this.currFrame = -1;
            this.totalFrame = this.mcObj.totalFrame;
            this.frameTime = this.mcObj.frameTime;
            this.beginFrame = 0;
            this.endFrame = -1;
            this._timeScale = 1;
            this.isLoop = true;
            this.disposeLayerImg();
            this.parentCFOObj = {};
            this.layerArr = new Array();
            this.currArea = null;
            var arr = this.mcObj.layers;
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var frameArr = new Array();
                var f_arr = arr[i];
                var f_len = f_arr.length;
                var pcfo = null;
                var k = void 0;
                for (var j = 0; j < f_len; j++) {
                    var cfo = f_arr[j];
                    var obj3d = null;
                    if (null == cfo.matrix) {
                        var frameNum = cfo.frameNum;
                        if (null != cfo.igd) {
                        }
                        else if (null == cfo.libName && null != pcfo) {
                            if (null != cfo.x) {
                                cfo.libName = pcfo.libName;
                            }
                        }
                        if (null == cfo.a) {
                            cfo.a = 1;
                        }
                        if (null == cfo.b) {
                            cfo.b = 0;
                        }
                        if (null == cfo.c) {
                            cfo.c = 0;
                        }
                        if (null == cfo.d) {
                            cfo.d = 1;
                        }
                        if (null == cfo.al) {
                            cfo.al = 1;
                        }
                        if (null == cfo.cx) {
                            cfo.cx = 0;
                        }
                        else {
                            cfo.cx *= -1;
                        }
                        if (null == cfo.cy) {
                            cfo.cy = 0;
                        }
                        else {
                            cfo.cy *= -1;
                        }
                        if (null == cfo.r) {
                            cfo.r = 0;
                        }
                        if (null == cfo.sx) {
                            cfo.sx = 1;
                        }
                        if (null == cfo.sy) {
                            cfo.sy = 1;
                        }
                        if (null != cfo.scaleX || null != cfo.scaleY || null != cfo.scaleZ || null != cfo.rotationX || null != cfo.rotationY || null != cfo.rotationZ) {
                            obj3d = {};
                            obj3d.scaleX = cfo.scaleX;
                            obj3d.scaleY = cfo.scaleY;
                            obj3d.scaleZ = cfo.scaleZ;
                            obj3d.x = cfo.x;
                            obj3d.y = cfo.y;
                            obj3d.cx = cfo.cx;
                            obj3d.cy = cfo.cy;
                            cfo.cx = 0;
                            cfo.cy = 0;
                            cfo.x = 0;
                            cfo.y = 0;
                            obj3d.rotationX = cfo.rotationX;
                            obj3d.rotationY = cfo.rotationY;
                            obj3d.rotationZ = cfo.rotationZ;
                            if (null == obj3d.scaleX) {
                                obj3d.scaleX = 1;
                            }
                            if (null == obj3d.scaleY) {
                                obj3d.scaleY = 1;
                            }
                            if (null == obj3d.scaleZ) {
                                obj3d.scaleZ = 1;
                            }
                            if (null == obj3d.rotationX) {
                                obj3d.rotationX = 0;
                            }
                            if (null == obj3d.rotationY) {
                                obj3d.rotationY = 0;
                            }
                            if (null == obj3d.rotationZ) {
                                obj3d.rotationZ = 0;
                            }
                        }
                        cfo.matrix = new egret.Matrix(cfo.a, cfo.b, cfo.c, cfo.d, cfo.x, cfo.y);
                        for (k = 0; k < frameNum; k++) {
                            ZMovieClip.getFrameMovieObject(cfo, k + 1);
                        }
                        for (var o_name in cfo) {
                            if ("filters" != o_name && "text" != o_name && "igd" != o_name && "id" != o_name && "maskID" != o_name && "op" != o_name && "mcName" != o_name && "matrix" != o_name && "al" != o_name && "libName" != o_name && "f_arr" != o_name && "cx" != o_name && "cy" != o_name && "r" != o_name && "sx" != o_name && "sy" != o_name) {
                                delete cfo[o_name];
                            }
                        }
                        if (null != obj3d) {
                            cfo.obj3d = obj3d;
                        }
                    }
                    frameArr.push(cfo);
                    var inFrameArr = cfo.f_arr;
                    if (null != inFrameArr) {
                        for (k = inFrameArr.length - 1; k >= 0; k--) {
                            frameArr.push(inFrameArr[k]);
                        }
                    }
                    pcfo = cfo;
                }
                this.layerArr.push({ frames: frameArr });
            }
            this.parentPlayTime = 0;
            this.scaleNum = scale_;
            this.advanceTime();
        };
        ZMovieClip.prototype.nextFrame = function () {
            this.stop();
            this.parentPlayTime = 0;
            this.isPlay = true;
            this.advanceTime();
            this.isPlay = false;
        };
        ZMovieClip.prototype.prevFrame = function () {
            this.stop();
            this.currFrame -= 2;
            if (-1 > this.currFrame) {
                this.currFrame = this.totalFrame - 2;
            }
            if (-1 > this.currFrame) {
                this.currFrame = -1;
            }
            this.parentPlayTime = 0;
            this.isPlay = true;
            this.advanceTime();
            this.isPlay = false;
        };
        ZMovieClip.prototype.stopChild = function () {
            this.childStop = true;
            this.stop();
        };
        ZMovieClip.prototype.playChild = function () {
            this.childStop = false;
            this.play();
        };
        ZMovieClip.prototype.stop = function () {
            if (this.isPlay) {
                this.isPlay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    if (this.getChildAt(i) instanceof ZMovieClip) {
                        var fmc = this.getChildAt(i);
                        fmc.stop();
                    }
                }
            }
        };
        ZMovieClip.prototype.play = function () {
            if (this.childStop) {
                return;
            }
            if (!this.isPlay) {
                this.isPlay = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    if (this.getChildAt(i) instanceof ZMovieClip) {
                        var fmc = this.getChildAt(i);
                        if (this.mcObj.frameTime != fmc.mcObj.frameTime || fmc.getTimeScale() != this._timeScale) {
                            fmc.play();
                        }
                    }
                }
            }
        };
        ZMovieClip.prototype.gotoAndStop = function (frame) {
            this.stop();
            this.currFrame = frame - 1;
            this.parentPlayTime = 0;
            this.isPlay = true;
            this.advanceTime();
            this.isPlay = false;
        };
        ZMovieClip.prototype.gotoAndPlay = function (frame) {
            this.currFrame = frame - 1;
            this.parentPlayTime = 0;
            this.advanceTime();
            this.play();
        };
        ZMovieClip.prototype.advanceTime = function () {
            var now = new Date().getTime();
            if (this.frameTime < now - this.parentPlayTime) {
                this.parentMask = null;
                this.parentPlayTime = now;
                this.currFrame++;
                if (this.currFrame >= this.totalFrame || (-1 != this.endFrame && this.currFrame > this.endFrame)) {
                    if (!this.isLoop) {
                        this.currFrame -= 1;
                        this.stop();
                        this.frameComplete();
                        return;
                    }
                    this.frameComplete();
                    if (!this.isPlay) {
                        return;
                    }
                    this.currFrame = this.beginFrame;
                }
                var maskObj = void 0;
                var len = this.layerArr.length;
                for (var i = 0; i < len; i++) {
                    try {
                        var l_obj = this.layerArr[i];
                        var frames_1 = l_obj.frames;
                        var cfo = void 0;
                        var img = null;
                        var mc = null;
                        var li = null;
                        var sp = null;
                        var tf = null;
                        if (l_obj.img instanceof zmovie.ZImage) {
                            img = l_obj.img;
                        }
                        if (l_obj.mc instanceof ZMovieClip) {
                            mc = l_obj.mc;
                        }
                        if (l_obj.li instanceof zmovie.LargeImage) {
                            li = l_obj.li;
                        }
                        if (l_obj.sp instanceof ZShap) {
                            sp = l_obj.sp;
                        }
                        if (l_obj.tf instanceof ZTextField) {
                            tf = l_obj.tf;
                        }
                        try {
                            cfo = frames_1[this.currFrame];
                            if (this.parentCFOObj[i] == cfo || null == cfo) {
                                if (null != mc && null != mc.parent && this.mcObj.frameTime == mc.mcObj.frameTime && this._timeScale == mc.getTimeScale() && !mc.childStop) {
                                    mc.nextFrame();
                                }
                                continue;
                            }
                            this.parentCFOObj[i] = cfo;
                        }
                        catch (err) {
                            if (null != img && this == img.parent) {
                                this.removeChild(img);
                            }
                            if (null != mc && null != mc.parent) {
                                mc.stop();
                                mc.parent.removeChild(mc);
                            }
                            if (null != li && this == li.parent) {
                                this.removeChild(li);
                            }
                            continue;
                        }
                        if (null == cfo.libName) {
                            if (null != cfo.igd) {
                                if (null == sp) {
                                    sp = new ZShap();
                                    sp.touchEnabled = false;
                                    l_obj.sp = sp;
                                }
                                sp.img_depth = i;
                                sp.draw(cfo.igd);
                                this.addChildToDepth(sp);
                            }
                            else if (null != cfo.text) {
                                var text = cfo.text;
                                var tfObj = text.tf;
                                if (null == tf) {
                                    tf = new ZTextField(text.val, tfObj.size, tfObj.color, text.w, tfObj.bold, tfObj.font, text.farr, tfObj.leading, text.h, false, text);
                                }
                                else {
                                    tf.text = text.val;
                                }
                                tf.matrix = cfo.matrix;
                                tf.touchEnabled = this.touchEnabled;
                                tf.img_depth = i;
                                this.addChildToDepth(tf);
                            }
                            if (null != img && this == img.parent) {
                                this.removeChild(img);
                            }
                            if (null != mc && null != mc.parent) {
                                mc.stop();
                                mc.parent.removeChild(mc);
                            }
                            if (null != li && this == li.parent) {
                                this.removeChild(li);
                            }
                        }
                        else {
                            if (null != sp && this == sp.parent) {
                                this.removeChild(sp);
                            }
                            if (null != tf && this == tf.parent) {
                                this.removeChild(tf);
                            }
                            var t = zmovie.Util.getTextureByName(this.imgArr, cfo.libName);
                            // console.log("debug:"+cfo.libName+" "+t);
                            if (null == t) {
                                var showDisplay = void 0;
                                if (null == this.libObj.mcObjs[cfo.libName]) {
                                    if (null == li) {
                                        li = new zmovie.LargeImage(this.imgArr, this.libObj, cfo.libName);
                                        li.touchEnabled = false;
                                        l_obj.li = li;
                                        li.img_depth = i;
                                    }
                                    else {
                                        li.setObject(this.imgArr, this.libObj, cfo.libName);
                                    }
                                    showDisplay = li;
                                    li.matrix = cfo.matrix;
                                    if (null == li.parent) {
                                        this.addChildToDepth(li);
                                    }
                                    if (null != mc && this == mc.parent) {
                                        this.removeChild(mc);
                                        mc.visible = false;
                                    }
                                }
                                else {
                                    if (null == mc) {
                                        mc = new ZMovieClip(this.imgArr, this.libObj, cfo.libName);
                                        mc.touchEnabled = false;
                                        l_obj.mc = mc;
                                        mc.img_depth = i;
                                    }
                                    else {
                                        if (cfo.libName != mc.mcName) {
                                            mc.setMovieObject(this.imgArr, this.libObj, cfo.libName);
                                        }
                                    }
                                    showDisplay = mc;
                                    if (null == mc.parent) {
                                        if (this.isPlay) {
                                            if (this.mcObj.frameTime == mc.mcObj.frameTime) {
                                                mc.gotoAndStop(0);
                                            }
                                            else {
                                                mc.gotoAndPlay(0);
                                            }
                                        }
                                        else {
                                            mc.gotoAndStop(0);
                                        }
                                        mc.setTimeScale(this._timeScale);
                                        this.addChildToDepth(mc);
                                    }
                                    else {
                                        if (this.mcObj.frameTime == mc.mcObj.frameTime && !mc.childStop) {
                                            mc.nextFrame();
                                        }
                                    }
                                    if (this == mc.parent) {
                                        mc.matrix = cfo.matrix;
                                    }
                                    if (null != li && this == li.parent) {
                                        this.removeChild(li);
                                    }
                                }
                                // showDisplay._anchorOffsetX = cfo.cx;
                                // showDisplay._anchorOffsetY = cfo.cy;
                                showDisplay.anchorOffsetX = cfo.cx;
                                showDisplay.anchorOffsetY = cfo.cy;
                                showDisplay.alpha = cfo.al;
                                if (null != img && this == img.parent) {
                                    this.removeChild(img);
                                }
                            }
                            else {
                                if (null == img) {
                                    img = new zmovie.ZImage(t);
                                    img.img_depth = i;
                                    img.touchEnabled = false;
                                    l_obj.img = img;
                                }
                                else {
                                    img.setTexture(t);
                                }
                                if (null != this.libObj.imgP) {
                                    img.setP(this.libObj.imgP[cfo.libName]);
                                }
                                if (null != this.libObj.imgScale && null != this.libObj.imgScale[cfo.libName]) {
                                    img.setScale(this.libObj.scale * this.libObj.imgScale[cfo.libName]);
                                }
                                else {
                                    img.setScale(this.libObj.scale);
                                }
                                img.displayLibName = cfo.libName;
                                img.matrix = cfo.matrix;
                                // img._anchorOffsetX = cfo.cx;
                                // img._anchorOffsetY = cfo.cy;
                                img.anchorOffsetX = cfo.cx;
                                img.anchorOffsetY = cfo.cy;
                                img.alpha = cfo.al;
                                if (null == img.parent) {
                                    this.addChildToDepth(img);
                                }
                                if (null != mc && null != mc.parent) {
                                    mc.stop();
                                    mc.parent.removeChild(mc);
                                }
                                if (null != li && this == li.parent) {
                                    this.removeChild(li);
                                }
                            }
                        }
                        var d = null;
                        if (null != tf && null != tf.parent) {
                            d = tf;
                        }
                        else if (null != img && null != img.parent) {
                            d = img;
                        }
                        else if (null != mc && null != mc.parent) {
                            d = mc;
                        }
                        else if (null != li && null != li.parent) {
                            d = li;
                        }
                        else if (null != sp && null != sp.parent) {
                            d = sp;
                        }
                        if (null != d) {
                            if (null != cfo.filters) {
                                try {
                                    d.filters = zmovie.Util.getFilters(cfo.filters);
                                }
                                catch (err) { }
                            }
                            if (null != this.parentMask) {
                                d.mask = this.parentMask;
                                --this.parentMaskI;
                                if (0 >= this.parentMaskI) {
                                    this.parentMask = null;
                                }
                            }
                            if (null != this.mcObj.maskObj) {
                                var mobj = this.mcObj.maskObj;
                                if (d.parent == this) {
                                    mobj = mobj[this.currFrame];
                                    if (null != mobj) {
                                        mobj = mobj[this.getChildIndex(d)];
                                        if (null != mobj) {
                                            this.parentMask = d;
                                            this.parentMaskI = mobj.num;
                                        }
                                    }
                                }
                            }
                            /*var sp3d:ZSprite3D = l_obj.sp3d;
 
                             var obj3d:any = cfo.obj3d;
                             if(null != obj3d){
                                 if(d.parent != sp3d){
                                     if(null == sp3d){
                                         sp3d = new ZSprite3D();
                                         l_obj.sp3d = sp3d;
                                     }
                                     sp3d.addIDisplay(<IDisplay><any> d);
                                     this.addChildToDepth(sp3d);
                                 }
 
                                 sp3d.pivotX = obj3d.cx;
                                 sp3d.pivotY = obj3d.cy;
 
                                 sp3d.x = obj3d.x;
                                 sp3d.y = obj3d.y;
                                 sp3d.scaleX = obj3d.scaleX;
                                 sp3d.scaleY = obj3d.scaleY;
                                 sp3d.scaleZ = obj3d.scaleZ;
                                 sp3d.rotationX = obj3d.rotationX;
                                 sp3d.rotationY = obj3d.rotationY;
                                 sp3d.rotationZ = obj3d.rotationZ;
 
                             }else{
                                 if(d.parent == sp3d){
                                     if(null != sp3d.parent){
                                         sp3d.parent.removeChild(sp3d);
                                     }
                                     this.addChildToDepth(<IDisplay><any> d);
                                 }
                             }*/
                            if (null != cfo.maskID) {
                                if (null != maskObj && null != maskObj[cfo.maskID] && null == d.parent.mask) {
                                    var maskD = maskObj[cfo.maskID];
                                    var maskRect = new egret.Rectangle(maskD.x, maskD.y, maskD.width, maskD.height);
                                    // d.mask = maskRect;
                                    d.parent.mask = maskRect;
                                }
                            }
                            else if (null != cfo.id) {
                                if (null == maskObj) {
                                    maskObj = {};
                                }
                                maskObj[cfo.id] = d;
                                d.visible = false;
                            }
                            if (null != cfo.mcName) {
                                d.name = cfo.mcName;
                                this.dispatchEventWith(ZMovieClip.EVENT_MC_NAME, false, d);
                            }
                        }
                    }
                    catch (err) {
                    }
                }
                if (null != this.fmObj) {
                    var mo = this.fmObj[this.currFrame];
                    if (null != mo) {
                        if (null == mo[this._scale]) {
                            mo[this._scale] = {};
                            mo[this._scale].x = mo.x * this._scale;
                            mo[this._scale].y = mo.y * this._scale;
                            mo[this._scale].moveType = mo.moveType;
                        }
                        this.dispatchEventWith(ZMovieClip.EVENT_MOVE, false, mo[this._scale]);
                    }
                }
                this.framePlay();
            }
        };
        ZMovieClip.prototype.removeStageHandle = function (event) {
            this.stop();
        };
        ZMovieClip.prototype.addStageHandle = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStageHandle, this);
            if (this.isFormatScale) {
                this.formatScale();
            }
            if (null == zmovie.Util.stage) {
                zmovie.Util.setStage(this.stage);
            }
        };
        ZMovieClip.prototype.frameComplete = function () {
            this.dispatchEventWith(ZMovieClip.EVENT_FRAME_COMPLETE, false);
        };
        ZMovieClip.prototype.framePlay = function () {
            if (null != this.areaObj) {
                this.currArea = this.areaObj[this.currFrame];
                if (null != this.currArea) {
                    this.dispatchEventWith(ZMovieClip.EVENT_AREA, false, this.currArea);
                }
            }
            this.dispatchEventWith(ZMovieClip.EVENT_ENTER_FRAME);
        };
        ZMovieClip.prototype.addChildToDepth = function (id) {
            var children = this.numChildren;
            if (0 == children) {
                this.addChild(id);
                return;
            }
            for (var i = children - 1; i >= 0; i--) {
                try {
                    var t_id = this.getChildAt(i);
                    if (null != t_id) {
                        if (t_id.img_depth < id.img_depth) {
                            if (children == i) {
                                this.addChild(id);
                            }
                            else {
                                this.addChildAt(id, i + 1);
                            }
                            return;
                        }
                    }
                }
                catch (err) { }
            }
            this.addChildAt(id, 0);
        };
        ZMovieClip.EVENT_FRAME_COMPLETE = "zframeComplete";
        ZMovieClip.EVENT_MOVE = "move";
        ZMovieClip.EVENT_ENTER_FRAME = "zenterFrame";
        ZMovieClip.EVENT_MC_NAME = "mcName";
        ZMovieClip.EVENT_AREA = "area";
        ZMovieClip.EVENT_GOTOANDPLAYLABEL = "gotoAndPlayLabel";
        return ZMovieClip;
    }(egret.DisplayObjectContainer));
    zmovie.ZMovieClip = ZMovieClip;
    __reflect(ZMovieClip.prototype, "zmovie.ZMovieClip");
})(zmovie || (zmovie = {}));
//# sourceMappingURL=ZMovieClip.js.map