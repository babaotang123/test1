var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zmovie;
(function (zmovie) {
    var ZPool = (function () {
        function ZPool() {
        }
        ZPool.getObject = function () {
            if (null != ZPool.poolObj && 0 != ZPool.poolObj.length) {
                return ZPool.poolObj.pop();
            }
            return {};
        };
        ZPool.putObject = function (o) {
            if (null == ZPool.poolObj) {
                ZPool.poolObj = [];
            }
            for (var k in o) {
                delete o[k];
            }
            ZPool.poolObj.push(o);
        };
        ZPool.getPoint = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (0 == ZPool.sPoints.length) {
                return new egret.Point(x, y);
            }
            else {
                var point = ZPool.sPoints.pop();
                point.x = x;
                point.y = y;
                return point;
            }
        };
        /** Stores a Point instance in the pool.
         *  Don't keep any references to the object after moving it to the pool! */
        ZPool.putPoint = function (point) {
            if (point) {
                ZPool.sPoints.push(point);
            }
        };
        ZPool.sPoints = [];
        return ZPool;
    }());
    zmovie.ZPool = ZPool;
    __reflect(ZPool.prototype, "zmovie.ZPool");
})(zmovie || (zmovie = {}));
//# sourceMappingURL=ZPool.js.map