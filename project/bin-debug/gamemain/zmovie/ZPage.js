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
var zmovie;
(function (zmovie) {
    var ZPage = (function (_super) {
        __extends(ZPage, _super);
        function ZPage(pa, pb, w, h) {
            var _this = _super.call(this) || this;
            _this._rotation = NaN;
            _this.angle = NaN;
            _this.wid = NaN;
            _this.hei = NaN;
            _this.targetPoint = new egret.Point();
            _this.pa = pa;
            _this.pb = pb;
            _this.wid = w;
            _this.hei = h;
            _this.c_mc1 = new egret.Sprite();
            _this.c_mc2 = new egret.Sprite();
            _this.addChild(_this.c_mc1);
            _this.addChild(_this.c_mc2);
            _this.c_mc1["addChild"](pa);
            _this.c_mc2["addChild"](pb);
            _this.target = _this.c_mc2;
            return _this;
        }
        Object.defineProperty(ZPage.prototype, "_target", {
            get: function () {
                return this.target;
            },
            enumerable: true,
            configurable: true
        });
        ZPage.prototype.setPageA = function (a) {
            if (null != this.pa["parent"]) {
                this.pa["parent"].removeChild(this.pa);
            }
            this.pa = a;
            this.c_mc1["addChild"](a);
        };
        ZPage.prototype.setPageB = function (b) {
            if (null != this.pb["parent"]) {
                this.pb["parent"].removeChild(this.pb);
            }
            this.pb = b;
            this.c_mc2["addChild"](b);
        };
        ZPage.prototype.flush_pa = function () {
            this.c_mc1["addChild"](this.pa);
        };
        ZPage.prototype.flush_pb = function () {
            this.c_mc2["addChild"](this.pb);
        };
        ZPage.prototype.updateRotation = function (_x, _y) {
            this.angle = Math.atan2(this.targetPoint.y - _y, this.targetPoint.x - _x);
            this._rotation = this.target["rotation"] = 2 * this.angle;
        };
        ZPage.prototype.setCor = function (_str) {
            switch (_str) {
                case "TL":
                    this.pb["x"] = -this.wid;
                    this.pb["y"] = 0;
                    this.pa["x"] = -this.wid;
                    this.pa["y"] = 0;
                    this.target = this.c_mc1;
                    this.targetPoint.x = -this.wid;
                    this.targetPoint.y = 0;
                    this.c_mc2["rotation"] = 0;
                    this.c_mc2["y"] = 0;
                    this.c_mc2["x"] = 0;
                    this.setChildIndex(this.c_mc1, this.numChildren - 1);
                    break;
                case "TR":
                    this.pa["x"] = 0;
                    this.pa["y"] = 0;
                    this.c_mc1["x"] = 0;
                    this.c_mc1["y"] = 0;
                    this.pb["x"] = 0;
                    this.pb["y"] = 0;
                    this.target = this.c_mc2;
                    this.targetPoint.x = this.wid;
                    this.targetPoint.y = 0;
                    this.c_mc1["rotation"] = 0;
                    this.setChildIndex(this.c_mc2, this.numChildren - 1);
                    break;
                case "BL":
                    this.pb["x"] = -this.wid;
                    this.pb["y"] = 0;
                    this.pa["x"] = -this.wid;
                    this.pa["y"] = -this.hei;
                    this.target = this.c_mc1;
                    this.targetPoint.x = -this.wid;
                    this.targetPoint.y = this.hei;
                    this.c_mc2["rotation"] = 0;
                    this.c_mc2["y"] = 0;
                    this.c_mc2["x"] = 0;
                    this.setChildIndex(this.c_mc1, this.numChildren - 1);
                    break;
                case "BR":
                    this.pa["x"] = 0;
                    this.pa["y"] = 0;
                    this.c_mc1["x"] = 0;
                    this.c_mc1["y"] = 0;
                    this.pb["x"] = 0;
                    this.pb["y"] = -this.hei;
                    this.target = this.c_mc2;
                    this.targetPoint.x = this.wid;
                    this.targetPoint.y = this.hei;
                    this.c_mc1["rotation"] = 0;
                    this.c_mc1["y"] = 0;
                    this.c_mc1["x"] = 0;
                    this.setChildIndex(this.c_mc2, this.numChildren - 1);
                    break;
            }
        };
        return ZPage;
    }(egret.Sprite));
    zmovie.ZPage = ZPage;
    __reflect(ZPage.prototype, "zmovie.ZPage");
})(zmovie || (zmovie = {}));
//# sourceMappingURL=ZPage.js.map