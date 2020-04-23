var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zmovie;
(function (zmovie) {
    var LimitPoint = (function () {
        function LimitPoint() {
            this.isTop = false;
            this.width = NaN;
            this.height = NaN;
            this.topR = NaN;
            this.bottomR = NaN;
            this.tPoint = new egret.Point();
            this.bPoint = new egret.Point();
            this.Op = new egret.Point();
            this.mPoint = new egret.Point();
            this.dia = NaN;
            this.speed = 1;
            this.tmpSpeed = 1;
        }
        Object.defineProperty(LimitPoint.prototype, "O", {
            set: function (_p) {
                this.Op = _p;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitPoint.prototype, "point", {
            get: function () {
                return this._point;
            },
            enumerable: true,
            configurable: true
        });
        LimitPoint.prototype.setSize = function (wid, hei, initPoint) {
            this._point = new egret.Point();
            this.width = wid;
            this.height = hei;
            this.topR = Math.sqrt(wid * wid + hei * hei);
            this.tPoint = new egret.Point(this.Op.x, this.Op.y - hei / 2);
            this.bPoint = new egret.Point(this.Op.x, this.Op.y + hei / 2);
            this.dia = Math.sqrt(this.width * this.width + this.height * this.height);
            this.update(initPoint.x, initPoint.y);
            this.speed = this.tmpSpeed;
        };
        LimitPoint.prototype.changeTo = function (_str) {
            if (_str == "top") {
                if (!this.isTop) {
                    this.change();
                }
            }
            else if (_str == "bottom") {
                if (this.isTop) {
                    this.change();
                }
            }
        };
        LimitPoint.prototype.close = function () {
            this._point.x = this.width;
            this._point.y = this.height;
        };
        LimitPoint.prototype.update = function (_x, _y) {
            var angle = 0;
            this.mPoint.x = _x;
            this.mPoint.y = _y;
            if ((!this.isTop && _y <= this.Op.y + this.height / 2) || (this.isTop && _y >= this.Op.y - this.height / 2)) {
                if (this.getDis(this.bPoint.x, this.bPoint.y, _x, _y) <= this.width) {
                    this._point.x = _x;
                    this._point.y = _y;
                }
                else {
                    angle = this.getAngleByPoint(this.bPoint.x, this.bPoint.y, _x, _y);
                    this._point.x = Math.cos(angle) * this.width + this.bPoint.x;
                    this._point.y = Math.sin(angle) * this.width + this.bPoint.y;
                }
            }
            else {
                if (this.getDis(this.tPoint.x, this.tPoint.y, _x, _y) <= this.dia) {
                    this._point.x = _x;
                    this._point.y = _y;
                }
                else {
                    angle = this.getAngleByPoint(this.tPoint.x, this.tPoint.y, _x, _y);
                    this._point.x = Math.cos(angle) * this.dia + this.tPoint.x;
                    this._point.y = Math.sin(angle) * this.dia + this.tPoint.y;
                }
            }
            if (this._point.x < this.Op.x - this.width) {
                this._point.x = this.Op.x - this.width;
                this.isTop ? this._point.y = this.Op.y - this.height / 2 : this._point.y = this.Op.y + this.height / 2;
            }
            if (this._point.x > this.Op.x + this.width) {
                this._point.x = this.Op.x + this.width;
                this.isTop ? this._point.y = this.Op.y - this.height / 2 : this._point.y = this.Op.y + this.height / 2;
            }
        };
        LimitPoint.prototype.change = function () {
            var tmp = new egret.Point(this.tPoint.x, this.tPoint.y);
            this.tPoint.x = this.bPoint.x;
            this.tPoint.y = this.bPoint.y;
            this.bPoint.x = tmp.x;
            this.bPoint.y = tmp.y;
            this.isTop = !this.isTop;
            return this.isTop;
        };
        LimitPoint.prototype.getDis = function (p1x, p1y, p2x, p2y) {
            var a = Math.abs(p1x - p2x);
            var b = Math.abs(p1y - p2y);
            return Math.sqrt(a * a + b * b);
        };
        LimitPoint.prototype.getAngleByPoint = function (p1x, p1y, p2x, p2y) {
            return Math.atan2(p2y - p1y, p2x - p1x);
        };
        return LimitPoint;
    }());
    zmovie.LimitPoint = LimitPoint;
    __reflect(LimitPoint.prototype, "zmovie.LimitPoint");
})(zmovie || (zmovie = {}));
//# sourceMappingURL=LimitPoint.js.map