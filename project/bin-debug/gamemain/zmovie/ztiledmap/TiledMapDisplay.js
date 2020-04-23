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
    var TiledMapDisplay = (function (_super) {
        __extends(TiledMapDisplay, _super);
        function TiledMapDisplay(imgArr, libObj, mcName, scale_) {
            if (mcName === void 0) { mcName = null; }
            if (scale_ === void 0) { scale_ = 1; }
            var _this = _super.call(this, imgArr, libObj, mcName, scale_) || this;
            _this.tx = NaN;
            _this.ty = NaN;
            _this.size = 0;
            _this.hsize = 0;
            _this.nsize = 0;
            _this.p = new egret.Point();
            return _this;
        }
        Object.defineProperty(TiledMapDisplay.prototype, "x", {
            get: function () {
                return _super.prototype.$getX.call(this);
            },
            set: function (value) {
                if (value == _super.prototype.$getX.call(this)) {
                    return;
                }
                this._depth = NaN;
                _super.prototype.$setX.call(this, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TiledMapDisplay.prototype, "y", {
            get: function () {
                return _super.prototype.$getY.call(this);
            },
            set: function (value) {
                if (value == _super.prototype.$getY.call(this)) {
                    return;
                }
                this._depth = NaN;
                _super.prototype.$setY.call(this, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TiledMapDisplay.prototype, "depth", {
            get: function () {
                if (isNaN(this._depth)) {
                    var pos = zmovie.Util.screenToIso(new egret.Point(this.x, this.y));
                    pos.x = Math.round(pos.x / this.size) * this.size;
                    pos.y = Math.round(pos.y / this.size) * this.size;
                    pos.z = Math.round(pos.z / this.size) * this.size;
                    this._depth = (pos.x + pos.z) * .866 - pos.y * .707;
                    this.depthPos = pos;
                }
                return this._depth;
            },
            enumerable: true,
            configurable: true
        });
        TiledMapDisplay.prototype.moveTo = function (to) {
            if (null == this.tml) {
                this.tml = new ztiledmap.TiledMoveLogic(this);
            }
            this.tml.moveTo(to);
        };
        TiledMapDisplay.prototype.tiledObj = function (o, tmw, id) {
            this.id = id;
            this.tmw = tmw;
            var tmo = this.mcObj.tmo;
            if (null != tmo) {
                this.anchorOffsetX = tmo["px"];
                this.anchorOffsetY = tmo["py"];
                this.size = tmo["size"];
                this.hsize = this.size * .5;
                this.nsize = this.size * 3;
            }
            this.x = o["x"];
            this.y = o["y"];
            this.tx = o["x"];
            this.ty = o["y"];
            this.tiv = null;
        };
        TiledMapDisplay.prototype.getTiledV = function () {
            if (null == this.tiv) {
                this.tiv = new Array();
                var tmo = this.mcObj.tmo;
                var tmox = this.tx - tmo.px + tmo.x;
                var tmoy = this.ty - tmo.py + tmo.y;
                var p = new egret.Point(tmox, tmoy);
                // 貌似没有这个必要
                // p = tmw.opintToTiledPoint(p);
                var xnum = tmo.xnum;
                var ynum = tmo.ynum;
                var spy = p.y;
                var spx = p.x;
                while (true) {
                    var to = this.tmw.getFloorObjByPosition(p.x, p.y);
                    this.tiv.push(to);
                    p.x -= this.size;
                    p.y += this.hsize;
                    ynum -= 1;
                    if (0 >= ynum) {
                        xnum -= 1;
                        if (0 >= xnum) {
                            break;
                        }
                        else {
                            ynum = tmo.ynum;
                            spx += this.size;
                            p.x = spx;
                            spy += this.hsize;
                            p.y = spy;
                        }
                    }
                }
            }
            return this.tiv;
        };
        TiledMapDisplay.prototype.checkNearDepth = function (tmt) {
            if (null != this.checkDepthCatch) {
                var o = this.checkDepthCatch[tmt.id];
                if (null != o && o.x == tmt.tx && o.y == tmt.ty && o.ix == this.tx && o.iy == this.ty) {
                    return o.depth;
                }
            }
            var v1 = this.getTiledV();
            var v2 = tmt.getTiledV();
            var minJL = NaN;
            var minO1, minO2;
            for (var i = v1.length - 1; i >= 0; i--) {
                var o1 = v1[i];
                for (var j = v2.length - 1; j >= 0; j--) {
                    var o2 = v2[j];
                    var jl = zmovie.Util.getDist(o1.x, o1.y, o2.x, o2.y);
                    if (isNaN(minJL) || jl < minJL) {
                        minJL = jl;
                        minO1 = o1;
                        minO2 = o2;
                    }
                }
            }
            if (this.nsize > minJL) {
                if (minO1.depth > minO2.depth) {
                    return this.setCatch(tmt, 1);
                }
                else if (minO1.depth < minO2.depth) {
                    return this.setCatch(tmt, -1);
                }
            }
            return this.setCatch(tmt, 0);
        };
        TiledMapDisplay.prototype.setCatch = function (tmt, ret, isSetOther) {
            if (isSetOther === void 0) { isSetOther = true; }
            if (null == this.checkDepthCatch) {
                this.checkDepthCatch = {};
            }
            var o = this.checkDepthCatch[tmt.id];
            if (null == o) {
                o = {};
                this.checkDepthCatch[tmt.id] = o;
            }
            o.x = tmt.tx;
            o.y = tmt.ty;
            o.ix = this.tx;
            o.iy = this.ty;
            o.depth = ret;
            if (isSetOther) {
                tmt.setCatch(this, ret * -1, false);
            }
            return ret;
        };
        return TiledMapDisplay;
    }(zmovie.ZMovieClip));
    ztiledmap.TiledMapDisplay = TiledMapDisplay;
    __reflect(TiledMapDisplay.prototype, "ztiledmap.TiledMapDisplay");
})(ztiledmap || (ztiledmap = {}));
//# sourceMappingURL=TiledMapDisplay.js.map