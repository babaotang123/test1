var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ztiledmap;
(function (ztiledmap) {
    var Point3D = (function () {
        function Point3D(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Point3D;
    }());
    ztiledmap.Point3D = Point3D;
    __reflect(Point3D.prototype, "ztiledmap.Point3D");
})(ztiledmap || (ztiledmap = {}));
//# sourceMappingURL=Point3D.js.map