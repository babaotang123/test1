var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ztiledmap;
(function (ztiledmap) {
    var TiledObj = (function () {
        function TiledObj(size) {
            this.size = size;
        }
        Object.defineProperty(TiledObj.prototype, "depth", {
            get: function () {
                if (!isNaN(this._depth)) {
                    return this._depth;
                }
                var pos = zmovie.Util.screenToIso(new egret.Point(this.x, this.y));
                pos.x = Math.round(pos.x / this.size) * this.size;
                pos.y = Math.round(pos.y / this.size) * this.size;
                pos.z = Math.round(pos.z / this.size) * this.size;
                this._depth = (pos.x + pos.z) * .866 - pos.y * .707;
                this.depthPos = pos;
                return this._depth;
            },
            enumerable: true,
            configurable: true
        });
        return TiledObj;
    }());
    ztiledmap.TiledObj = TiledObj;
    __reflect(TiledObj.prototype, "ztiledmap.TiledObj");
})(ztiledmap || (ztiledmap = {}));
//# sourceMappingURL=TiledObj.js.map