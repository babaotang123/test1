var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ztiledmap;
(function (ztiledmap) {
    var AStart = (function () {
        function AStart(tmw) {
            this._heuristic = this.diagonal;
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this.tmw = tmw;
        }
        AStart.prototype.search = function (from, to) {
            this.initCatch();
            to = this.tmw["opintToTiledPoint"](to);
            if (this.tmw["getIsStopMove"](to.x, to.y)) {
                console.log("这里禁止移动");
                return null;
            }
            this.endO = this.getObject(to.x, to.y);
            from = this.tmw["opintToTiledPoint"](from);
            this.startO = this.getObject(from.x, from.y);
            if (null == this._open) {
                this._open = new Array();
                this._closed = new Array();
                this._path = new Array();
            }
            else {
                this._open.splice(0, this._open.length);
                this._closed.splice(0, this._closed.length);
                this._path.splice(0, this._path.length);
            }
            this.startO["g"] = 0;
            this.startO["h"] = this._heuristic(this.startO);
            this.startO["f"] = this.startO["g"] + this.startO["h"];
            return this.start();
        };
        AStart.prototype.initCatch = function () {
            if (null == this.xyObjCatch) {
                this.xyObjCatch = {};
            }
            for (var xk in this.xyObjCatch) {
                var o = this.xyObjCatch[xk];
                for (var yk in o) {
                    var o2 = o[yk];
                    zmovie.ZPool.putObject(o2);
                }
                zmovie.ZPool.putObject(o);
                delete this.xyObjCatch[xk];
            }
        };
        AStart.prototype.diagonal = function (node) {
            var dx = Math.abs(node["x"] - this.endO["x"]);
            var dy = Math.abs(node["y"] - this.endO["y"]);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost + (straight - 2 * diag);
        };
        AStart.prototype.getObject = function (x, y) {
            var o = this.xyObjCatch[x];
            if (null == o) {
                o = zmovie.ZPool.getObject();
                this.xyObjCatch[x] = o;
            }
            if (null == o[y]) {
                o[y] = zmovie.ZPool.getObject();
                o[y].x = x;
                o[y].y = y;
            }
            return o[y];
        };
        AStart.prototype.start = function () {
            var node = this.startO;
            while (node != this.endO) {
                var pto = node;
                for (var i = 0; i <= 7; i++) {
                    pto = this.check(pto, i);
                    if (this.tmw["getIsStopMove"](pto["x"], pto["y"])) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if ((node["x"] == pto["x"]) || (node["y"] == pto["y"])) {
                        cost = this._diagCost;
                    }
                    var g = node["g"] + cost;
                    var h = 0;
                    if (null == pto["h"]) {
                        h = this._heuristic(pto);
                    }
                    else {
                        h = pto["h"];
                    }
                    var f = g + h;
                    if (this.isOpen(pto) || this.isClose(pto)) {
                        if (pto["f"] > f) {
                            pto["f"] = f;
                            pto["g"] = g;
                            pto["parent"] = node;
                        }
                    }
                    else {
                        pto["f"] = f;
                        pto["g"] = g;
                        pto["h"] = h;
                        pto["parent"] = node;
                        this._open.push(pto);
                    }
                }
                this._closed.push(node);
                if (0 == this._open.length) {
                    console.log("no path found");
                    return null;
                }
                this._open.sort(this.sortFun);
                node = this._open.shift();
            }
            this.buildPath();
            return this._path;
        };
        AStart.prototype.buildPath = function () {
            var node = this.endO;
            this._path.push(node);
            while (node != this.startO) {
                node = node["parent"];
                this._path.unshift(node);
            }
        };
        AStart.prototype.sortFun = function (a, b) {
            if (a["f"] > b["f"]) {
                return 1;
            }
            else if (a["f"] < b["f"]) {
                return -1;
            }
            return 0;
        };
        AStart.prototype.isOpen = function (node) {
            if (0 > this._open.indexOf(node)) {
                return false;
            }
            return true;
        };
        AStart.prototype.isClose = function (node) {
            if (0 > this._closed.indexOf(node)) {
                return false;
            }
            return true;
        };
        AStart.prototype.check = function (pto, cnum) {
            var to;
            if (0 == cnum) {
                to = this.getObject(pto["x"], pto["y"] - this.tmw["size"]);
            }
            else if (1 == cnum || 2 == cnum) {
                to = this.getObject(pto["x"] + this.tmw["size"], pto["y"] + this.tmw["hsize"]);
            }
            else if (3 == cnum || 4 == cnum) {
                to = this.getObject(pto["x"] - this.tmw["size"], pto["y"] + this.tmw["hsize"]);
            }
            else if (5 == cnum || 6 == cnum) {
                to = this.getObject(pto["x"] - this.tmw["size"], pto["y"] - this.tmw["hsize"]);
            }
            else if (7 == cnum) {
                to = this.getObject(pto["x"] + this.tmw["size"], pto["y"] - this.tmw["hsize"]);
            }
            return to;
        };
        return AStart;
    }());
    ztiledmap.AStart = AStart;
    __reflect(AStart.prototype, "ztiledmap.AStart");
})(ztiledmap || (ztiledmap = {}));
//# sourceMappingURL=AStart.js.map