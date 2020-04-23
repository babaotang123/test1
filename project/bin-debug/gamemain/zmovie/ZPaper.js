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
var ZPaper = (function (_super) {
    __extends(ZPaper, _super);
    function ZPaper(pa, pb, w, h) {
        var _this = _super.call(this) || this;
        _this.currentDir = "right";
        _this.MemoryDir = "right";
        _this.started = false;
        _this.pageA = pa;
        _this.pageB = pb;
        _this.w = w;
        _this.h = h;
        _this.img = ZPaper.getAlignTexture();
        var setW = Math.sqrt(w * w + h * h);
        var setH = setW * 2;
        _this.img.scaleX = setW / (_this.img.width * 0.5);
        _this.img.scaleY = setH / _this.img.height;
        _this.img.anchorOffsetX = _this.img.width * 0.5;
        _this.img.anchorOffsetY = _this.img.height * 0.5;
        _this.addChild(_this.img);
        _this.lp = new zmovie.LimitPoint();
        _this.lp.O = new egret.Point(0, h / 2);
        _this.lp.setSize(w, h, new egret.Point());
        _this.pageMC = new zmovie.ZPage(pa, pb, w, h);
        _this.pageMC.mask = _this.img;
        _this.addChild(_this.pageMC);
        _this.setCor("BR");
        return _this;
    }
    Object.defineProperty(ZPaper.prototype, "mask_rotation", {
        get: function () {
            return this.img["rotation"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZPaper.prototype, "mask_x", {
        get: function () {
            return this.img["x"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZPaper.prototype, "mask_y", {
        get: function () {
            return this.img["y"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZPaper.prototype, "page", {
        get: function () {
            return this.pageMC["_target"].getChildAt(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZPaper.prototype, "changedPageNum", {
        get: function () {
            var lpx = this.lp["point"].x;
            if (Math.abs(lpx - (-this.w)) < 3) {
                if (this.MemoryDir == "right") {
                    this.MemoryDir = "left";
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else if (Math.abs(lpx - this.w) < 3) {
                if (this.MemoryDir == "left") {
                    this.MemoryDir = "right";
                    return -1;
                }
                else {
                    return 0;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    ZPaper.getAlignTexture = function () {
        var r = 500;
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xff0000, 1);
        sp.graphics.moveTo(r, r);
        sp.graphics.lineTo(r * 2, r);
        sp.graphics.drawArc(r, r, r, Math.PI / 2, Math.PI / 2 * 3, false);
        sp.graphics.lineTo(r, r);
        sp.graphics.endFill();
        return sp;
    };
    ZPaper.prototype.setCor = function (Cor) {
        this.currentCor = Cor;
        this.pageMC["setCor"](Cor);
        this.targetPage = this.pageMC["_target"];
        if (Cor == "TR" || Cor == "BR") {
            this.currentDir = "right";
        }
        else {
            this.currentDir = "left";
        }
        if (Cor == "TL" || Cor == "TR") {
            this.img["y"] = 0;
            this.lp["changeTo"]("top");
        }
        else {
            this.lp["changeTo"]("bottom");
            this.img["y"] = this.h;
        }
        this.fix(Cor);
    };
    ZPaper.prototype.show = function () {
        this.img["visible"] = this.visible = true;
    };
    ZPaper.prototype.hide = function () {
        this.img["visible"] = this.visible = false;
    };
    ZPaper.prototype.start = function () {
        this.close();
        this.visible = true;
    };
    ZPaper.prototype.Update = function (point) {
        this.lp["update"](point.x, point.y);
        this.update();
    };
    ZPaper.prototype.close = function () {
        this.lp["close"]();
        this.update();
    };
    ZPaper.prototype.getPageA = function () {
        return this.pageA;
    };
    ZPaper.prototype.getPageB = function () {
        return this.pageB;
    };
    ZPaper.prototype.setPageA = function (a) {
        this.pageA = a;
        this.pageMC["setPageA"](a);
    };
    ZPaper.prototype.setPageB = function (b) {
        this.pageB = b;
        this.pageMC["setPageB"](b);
    };
    ZPaper.prototype.flushPageA = function () {
        this.pageMC["flush_pa"]();
    };
    ZPaper.prototype.flushPageB = function () {
        this.pageMC["flush_pb"]();
    };
    ZPaper.prototype.fix = function (Cor) {
        if (Cor == "TL") {
            this.img["x"] = -this.w;
            this.img["y"] = 0;
            this.img["rotation"] = 180;
            this.targetPage["rotation"] = 180 >> 1;
            this.targetPage["x"] = -this.w;
        }
        else if (Cor == "TR") {
            this.img["x"] = 0;
            this.img["y"] = 0;
            this.img["rotation"] = 180;
            this.targetPage["rotation"] = 0;
            this.targetPage["x"] = -this.w;
        }
        else if (Cor == "BL") {
            this.img["x"] = 0;
            this.img["rotation"] = 0;
            this.targetPage["rotation"] = 0;
            this.targetPage["x"] = this.w;
        }
        else if (Cor == "BR") {
            this.img["x"] = 0;
            this.img.rotation = 180;
            this.targetPage["rotation"] = 0;
            this.targetPage["x"] = -this.w;
        }
    };
    ZPaper.prototype.update = function () {
        this.targetPage["x"] = this.lp["point"].x;
        this.targetPage["y"] = this.lp["point"].y;
        this.pageMC["updateRotation"](this.lp["point"].x, this.lp["point"].y);
        var _sin = Math.sin(this.pageMC["angle"] * 2);
        var _x = 0;
        if (this.currentCor == "BR") {
            _x = this.w - (this.h - this.lp["point"].y) / _sin;
            if (!_sin) {
                this.img["x"] = this.w - (this.w - this.lp["point"].x) / 2;
            }
            else {
                this.img["x"] = _x;
            }
            this.img["rotation"] = this.pageMC["_rotation"] / 2;
        }
        else if (this.currentCor == "TR") {
            _x = this.w - (-this.lp["point"].y) / _sin;
            if (!_sin) {
                this.img["x"] = this.w - (this.w - this.lp["point"].x) / 2;
            }
            else {
                this.img["x"] = _x;
            }
            this.img["rotation"] = this.pageMC["_rotation"] / 2;
        }
        else if (this.currentCor == "TL") {
            _x = this.lp["point"].y / _sin - this.w;
            if (this.pageMC["angle"] == 180) {
                this.img["x"] = (-this.w - this.lp["point"].x) / 2 + this.lp["point"].x;
                this.img["rotation"] = this.pageMC["_rotation"] / 2;
            }
            else {
                if (_sin) {
                    this.img["x"] = _x;
                    this.img["rotation"] = this.pageMC["_rotation"] / 2;
                }
                else {
                    this.img["x"] = -this.w;
                    this.img["rotation"] = 180;
                }
            }
        }
        else if (this.currentCor == "BL") {
            _x = -this.w - (this.h - this.lp["point"].y) / _sin;
            if (this.pageMC["angle"] == 180) {
                this.img["x"] = (-this.w - this.lp["point"].x) / 2 + this.lp["point"].x;
                this.img["rotation"] = this.pageMC["_rotation"] / 2;
            }
            else {
                if (_sin) {
                    this.img["x"] = _x;
                    this.img["rotation"] = this.pageMC["_rotation"] / 2;
                }
                else {
                    this.img["x"] = -this.w;
                    this.img["rotation"] = 180;
                }
            }
        }
    };
    return ZPaper;
}(egret.DisplayObjectContainer));
__reflect(ZPaper.prototype, "ZPaper");
//# sourceMappingURL=ZPaper.js.map