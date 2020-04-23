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
var ztiledmap;
(function (ztiledmap) {
    var TiledMapWorld = (function (_super) {
        __extends(TiledMapWorld, _super);
        function TiledMapWorld(imgArr, libObj, mcName) {
            if (mcName === void 0) { mcName = null; }
            var _this = _super.call(this) || this;
            _this.size = NaN;
            _this.hsize = NaN;
            _this.px = NaN;
            _this.py = NaN;
            _this.downX = NaN;
            _this.downY = NaN;
            _this.srcX = NaN;
            _this.srcY = NaN;
            _this.sortID = 0;
            _this.gp = new egret.Point();
            var tmo = libObj.tileMap;
            if (null == tmo) {
                return _this;
            }
            var key;
            if (null == mcName) {
                for (key in tmo) {
                    mcName = key;
                    break;
                }
            }
            if (null == tmo[mcName]) {
                return _this;
            }
            _this.imgArr = imgArr;
            _this.mcName = mcName;
            _this.libObj = libObj;
            _this.mcObj = zmovie.Util.clone(tmo[mcName]);
            _this._floor = new egret.Sprite();
            _this.addChild(_this._floor);
            _this._world = new egret.Sprite();
            _this.addChild(_this._world);
            var xNum = _this.mcObj["xnum"];
            var yNum = _this.mcObj["ynum"];
            _this.size = _this.mcObj["size"];
            _this.hsize = _this.size * .5;
            var zmc = new zmovie.ZMovieClip(imgArr, _this.libObj, _this.mcObj.defT);
            if (1 == zmc.totalFrame && 1 == zmc.numChildren) {
                var b = zmc.getChildAt(0);
                if (null != b) {
                    _this.defT = b.getTexture();
                    _this.defTS = b.getScale();
                    _this.px = b.width >> 1;
                    _this.py = b.height >> 1;
                }
            }
            zmc.dispose();
            _this.pKeyObj = {};
            _this.showIdCatch = {};
            _this.tiledV = [];
            _this.currShow = [];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.stageHandle, _this);
            return _this;
        }
        TiledMapWorld.prototype.setTobj = function (x, y, o) {
            var tobj = this.mcObj.tobj[x];
            if (null == tobj) {
                tobj = {};
                this.mcObj.tobj[x] = tobj;
            }
            tobj[y] = o;
        };
        TiledMapWorld.prototype.removeTobj = function (x, y) {
            var tobj = this.mcObj.tobj[x];
            var retObj = null;
            if (null != tobj) {
                retObj = tobj[y];
                if (null != retObj) {
                    delete tobj[y];
                    if (!zmovie.Util.isObjContent(tobj)) {
                        delete this.mcObj.tobj[x];
                    }
                }
            }
            return retObj;
        };
        TiledMapWorld.prototype.checkIsShow = function (tmd) {
            if (null == this.currShowBuild) {
                return;
            }
            var num;
            var to = this.getFloorObjByPosition(tmd.tx, tmd.ty, false);
            if (null == to || null == to.d || null == to.d.parent) {
                if (null != tmd.parent) {
                    num = this.currShowBuild.indexOf(tmd);
                    if (0 <= num) {
                        this.currShowBuild.splice(num, 1);
                    }
                    tmd.parent.removeChild(tmd);
                    tmd.stop();
                }
            }
            else {
                if (null == tmd.parent) {
                    num = this.currShowBuild.indexOf(tmd);
                    if (0 > num) {
                        this.currShowBuild.push(tmd);
                    }
                    this._world.addChild(tmd);
                    if (tmd.isMovie()) {
                        tmd.play();
                    }
                }
            }
        };
        TiledMapWorld.prototype.astart = function (from, to) {
            if (null == this._astart) {
                this._astart = new ztiledmap.AStart(this);
            }
            return this._astart["search"](from, to);
        };
        TiledMapWorld.prototype.sort = function (delay) {
            if (delay === void 0) { delay = 10; }
            if (0 != delay && 0 != this.sortID) {
                return;
            }
            egret.clearTimeout(this.sortID);
            if (0 != delay) {
                this.sortID = egret.setTimeout(this.sort, this, delay, 0);
                return;
            }
            this.sortID = 0;
            if (null != this.currShowBuild) {
                this.currShowBuild.sort(this.sortDepth);
                this.checkNearDepth();
                var len = this.currShowBuild.length;
                for (var i = 0; i < len; i++) {
                    this._world.setChildIndex(this.currShowBuild[i], i);
                }
            }
        };
        TiledMapWorld.prototype.formatPoint = function (p) {
            var num = 0;
            if (0 != p.x % 1) {
                p.x = Math.ceil(p.x);
                if (0 > p.x) {
                    p.x -= 1;
                }
                p.x = Math.floor(p.x / this.size) * this.size;
            }
            if (0 != p.y % 1) {
                p.y = Math.ceil(p.y);
                if (0 > p.y) {
                    p.y -= 1;
                }
                p.y = Math.floor(p.y / this.hsize) * this.hsize;
            }
        };
        TiledMapWorld.prototype.opintToTiledPoint = function (p) {
            var pos = zmovie.Util.screenToIso(p);
            pos["x"] = Math.round(pos["x"] / this.size) * this.size;
            pos["y"] = Math.round(pos["y"] / this.size) * this.size;
            pos["z"] = Math.round(pos["z"] / this.size) * this.size;
            var xnum = Math.floor(pos["x"] / this.size);
            var ynum = Math.floor(pos["z"] / this.size);
            p = zmovie.Util.isoToScreen(pos);
            this.formatPoint(p);
            return p;
        };
        TiledMapWorld.prototype.getIsStopMove = function (x, y) {
            x = x;
            y = y;
            var o = this.getTobj(x, y);
            if (null != o) {
                var tmpO = this.getContentObjById(o);
                if (null != tmpO && null == tmpO["noStop"]) {
                    return true;
                }
            }
            return false;
        };
        TiledMapWorld.prototype.getTobj = function (x, y) {
            var tobj = this.mcObj.tobj[x];
            if (null != tobj) {
                return tobj[y];
            }
            return null;
        };
        TiledMapWorld.prototype.flush = function () {
            if (null == this.stage) {
                return;
            }
            var p = this.globalToLocal(this.gp.x, this.gp.y);
            var spx = 0, spy = 0;
            var p2 = this.globalToLocal(this.gp2.x, this.gp2.y);
            p.x -= this.size * 5;
            p.y -= this.hsize * 5;
            p2.x += this.size * 10;
            p2.y += this.hsize * 10;
            var showV = new Array();
            var showBV = new Array();
            var d;
            p = this.opintToTiledPoint(p);
            var yb = true;
            spy = p.y;
            spx = p.x;
            var isSort;
            while (true) {
                var to = this.getFloorObjByPosition(p.x, p.y);
                this.createTiledDisplay(to);
                d = to.d;
                if (null == d.parent) {
                    this._floor.addChild(d);
                }
                if (null != this.mcObj && null != this.mcObj["tobj"]) {
                    var tobj = this.mcObj["tobj"][p.x];
                    if (null != tobj) {
                        tobj = tobj[p.y];
                        if (null != tobj) {
                            var tmb = this.showContent(tobj);
                            if (null == tmb["parent"]) {
                                isSort = true;
                                this._world["addChild"](tmb);
                                if (tmb["isMovie"]()) {
                                    tmb["play"]();
                                }
                            }
                            if (0 > showBV.indexOf(tmb)) {
                                showBV.push(tmb);
                            }
                            if (null != this.currShowBuild) {
                                var cnum = this.currShowBuild.indexOf(tmb);
                                if (0 <= cnum) {
                                    this.currShowBuild.splice(cnum, 1);
                                }
                            }
                        }
                    }
                }
                if (null != this.currShow) {
                    var tnum = this.currShow.indexOf(to);
                    if (0 <= tnum) {
                        this.currShow.splice(tnum, 1);
                    }
                }
                showV.push(to);
                p.x += this.size;
                if (yb) {
                    p.y = spy + this.hsize;
                }
                else {
                    p.y = spy;
                }
                yb = !yb;
                if (p.x >= p2.x) {
                    p.x = spx;
                    spy += this.size;
                    p.y = spy;
                    yb = true;
                    if (p.y >= p2.y) {
                        break;
                    }
                }
            }
            var i = 0;
            if (null != this.currShow) {
                for (i = this.currShow.length - 1; i >= 0; i--) {
                    d = this.currShow[i].d;
                    if (null != d.parent) {
                        d.parent.removeChild(d);
                    }
                }
            }
            this.currShow = showV;
            if (null != this.currShowBuild) {
                for (i = this.currShowBuild.length - 1; i >= 0; i--) {
                    d = this.currShowBuild[i];
                    if (null != d.parent) {
                        d.parent.removeChild(d);
                        if (d instanceof zmovie.ZMovieClip) {
                            var zm = d;
                            zm.stop();
                        }
                    }
                }
            }
            this.currShowBuild = showBV;
            if (isSort) {
                this.sort();
            }
        };
        TiledMapWorld.prototype.createFloor = function (x, y) {
            var to = new ztiledmap.TiledObj(this.size);
            this.tiledV.push(to);
            var tmpO = this.pKeyObj[x];
            if (null == tmpO) {
                tmpO = {};
                this.pKeyObj[x] = tmpO;
            }
            tmpO[y] = to;
            to["x"] = x;
            to["y"] = y;
            return to;
        };
        TiledMapWorld.prototype.getContentObjById = function (id) {
            return this.mcObj.cont[id];
        };
        TiledMapWorld.prototype.getFloorObjById = function (id) {
            if (null != this.showIdCatch[id]) {
                return this.showIdCatch[id];
            }
            else {
                return this.showContent(id);
            }
        };
        TiledMapWorld.prototype.getFloorObjByPosition = function (x, y, isAutoCreate) {
            if (isAutoCreate === void 0) { isAutoCreate = true; }
            var ret = null;
            var tmpO = this.pKeyObj[x];
            if (null != tmpO) {
                ret = tmpO[y];
            }
            if (null == ret && isAutoCreate) {
                ret = this.createFloor(x, y);
            }
            return ret;
        };
        TiledMapWorld.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.stageHandle, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.stageHandle, this);
            if (null != this.parent) {
                this.parent.removeChild(this);
            }
            if (null != this.s) {
                this.s.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandle, this);
                this.s.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandle, this);
            }
        };
        TiledMapWorld.prototype.touchHandle = function (e) {
            if (egret.TouchEvent.TOUCH_BEGIN == e.type) {
                this.srcX = this.x;
                this.srcY = this.y;
                this.downX = e.stageX;
                this.downY = e.stageY;
                this.isMove = false;
            }
            else if (egret.TouchEvent.TOUCH_MOVE == e.type) {
                if (!this.isMove) {
                    if (5 < Math.abs(e.stageX - this.downX) || 5 < Math.abs(e.stageY - this.downY)) {
                        this.isMove = true;
                    }
                }
                this.x = this.srcX + (e.stageX - this.downX);
                this.y = this.srcY + (e.stageY - this.downY);
                this.flush();
            }
            else {
            }
        };
        TiledMapWorld.prototype.checkNearDepth = function () {
            var len = this.currShowBuild.length;
            for (var i = len - 1; i >= 0; i--) {
                for (var j = i - 1; j >= 0; j--) {
                    var ret = this.currShowBuild[i].checkNearDepth(this.currShowBuild[j]);
                    if (-1 == ret) {
                        var tmp = this.currShowBuild[i];
                        this.currShowBuild[i] = this.currShowBuild[j];
                        this.currShowBuild[j] = tmp;
                        i = len;
                        break;
                    }
                }
            }
        };
        TiledMapWorld.prototype.sortDepth = function (a, b) {
            if (a.depth > b.depth) {
                return 1;
            }
            else if (a.depth < b.depth) {
                return -1;
            }
            if (a.depthPos.x > b.depthPos.x) {
                return 1;
            }
            else if (a.depthPos.x < b.depthPos.x) {
                return -1;
            }
            return 0;
        };
        TiledMapWorld.prototype.stageHandle = function (e) {
            if (e.type == egret.Event.REMOVED_FROM_STAGE) {
                if (null != this.s) {
                    this.s.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandle, this);
                    this.s.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandle, this);
                }
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.stageHandle, this);
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.stageHandle, this);
            }
            else {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.stageHandle, this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.stageHandle, this);
                this.s = this.stage;
                this.s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandle, this);
                this.s.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandle, this);
                if (null == this.gp2) {
                    this.gp2 = new egret.Point(this.stage.stageWidth, this.stage.stageHeight);
                }
                this.flush();
            }
        };
        TiledMapWorld.prototype.createTiledDisplay = function (to) {
            if (null != to.d) {
                return;
            }
            var img;
            if (null != this.defT) {
                img = new egret.Bitmap(this.defT);
                img.scaleX /= this.defTS;
                img.scaleY /= this.defTS;
                img.anchorOffsetX = this.px;
                img.anchorOffsetY = this.py;
                img.x = to.x;
                img.y = to.y;
                to.d = img;
            }
            else {
                img = new egret.Bitmap();
                to.d = img;
            }
        };
        TiledMapWorld.prototype.showContent = function (id) {
            if (null != this.showIdCatch[id]) {
                return this.showIdCatch[id];
            }
            var ret;
            try {
                var ao = this.mcObj["cont"][id];
                ret = new ztiledmap.TiledMapDisplay(this.imgArr, this.libObj, ao["libName"]);
                ret["tiledObj"](ao, this, id);
                this.showIdCatch[id] = ret;
            }
            catch (err) { }
            return ret;
        };
        return TiledMapWorld;
    }(egret.DisplayObjectContainer));
    ztiledmap.TiledMapWorld = TiledMapWorld;
    __reflect(TiledMapWorld.prototype, "ztiledmap.TiledMapWorld");
})(ztiledmap || (ztiledmap = {}));
//# sourceMappingURL=TiledMapWorld.js.map