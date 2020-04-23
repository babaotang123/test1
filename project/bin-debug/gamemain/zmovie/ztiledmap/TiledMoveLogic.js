var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ztiledmap;
(function (ztiledmap) {
    var TiledMoveLogic = (function () {
        function TiledMoveLogic(tmd) {
            this.speed = NaN;
            this.cspeed = NaN;
            this.ci = 0;
            this.len = 0;
            this.angle = NaN;
            this.vx = NaN;
            this.vy = NaN;
            this.tmd = tmd;
            this.speed = 3;
            this.cspeed = this.speed * 2;
            this.dir = "下";
        }
        TiledMoveLogic.prototype.clearMove = function () {
            if (null != this.movePath) {
                for (var i = this.movePath.length - 1; i >= 0; i--) {
                    zmovie.ZPool.putPoint(this.movePath[i]);
                }
                this.movePath.splice(0, this.movePath.length);
            }
            this.toP = null;
            // Starling.juggler.remove(this);
            this.stop();
        };
        TiledMoveLogic.prototype.moveTo = function (to) {
            var tmw = this.tmd.tmw;
            var i = 0;
            if (null == this.movePath) {
                this.movePath = new Array();
            }
            else {
                this.clearMove();
            }
            if (null != tmw) {
                if (null == this.fp) {
                    this.fp = new egret.Point(this.tmd["x"], this.tmd["y"]);
                }
                else {
                    this.fp.x = this.tmd["x"];
                    this.fp.y = this.tmd["y"];
                }
                var v = tmw["astart"](this.fp, to);
                if (null != v) {
                    for (i = v.length - 1; i >= 0; i--) {
                        var o = v[i];
                        this.movePath.unshift(zmovie.ZPool.getPoint(o["x"], o["y"]));
                    }
                    this.ci = 0;
                    this.len = this.movePath.length;
                    this.startMove();
                }
                else {
                    this.stopMove();
                }
            }
        };
        TiledMoveLogic.prototype.turnUp = function (l) {
            this.dir = "u";
            if (this.tmd["getIsExistLabel"](l + "上")) {
                this.tmd["gotoAndPlayLabel"](l + "上");
            }
        };
        TiledMoveLogic.prototype.turnDown = function (l) {
            this.dir = "d";
            if (this.tmd["getIsExistLabel"](l + "下")) {
                this.tmd["gotoAndPlayLabel"](l + "下");
            }
        };
        TiledMoveLogic.prototype.advanceTime = function () {
            if (this.cspeed > Math.abs(this.toP.x - this.tmd["x"])) {
                this.tmd["x"] = this.toP.x;
            }
            else {
                this.tmd["x"] += this.vx;
            }
            if (this.cspeed > Math.abs(this.toP.y - this.tmd["y"])) {
                this.tmd["y"] = this.toP.y;
            }
            else {
                this.tmd["y"] += this.vy;
            }
            if (this.tmd["x"] == this.toP.x && this.tmd["y"] == this.toP.y) {
                if (!this.isSetTP) {
                    this.setTp();
                }
                this.startMove();
            }
            else if (!this.isSetTP) {
                var len = zmovie.Util.getDist(this.tmd.x, this.tmd.y, this.toP.x, this.toP.y);
                if (this.tmd.hsize > len) {
                    this.setTp();
                }
            }
        };
        TiledMoveLogic.prototype.stop = function () {
            egret.clearInterval(this.intkey);
            this.intkey = NaN;
        };
        TiledMoveLogic.prototype.play = function () {
            if (isNaN(this.intkey)) {
                this.intkey = egret.setInterval(this.advanceTime, this, 10);
            }
        };
        TiledMoveLogic.prototype.stopMove = function () {
            var l = "待机";
            if ("l" == this.dir) {
                this.turnLeft(l);
            }
            else if ("r" == this.dir) {
                this.turnRight(l);
            }
            else if ("d" == this.dir) {
                this.turnDown(l);
            }
            else if ("u" == this.dir) {
                this.turnUp(l);
            }
            this.stop();
        };
        TiledMoveLogic.prototype.turnLeft = function (l) {
            this.dir = "l";
            if (this.tmd["getIsExistLabel"](l + "左")) {
                this.tmd["direction"] = 1;
                this.tmd["gotoAndPlayLabel"](l + "左");
            }
            else if (this.tmd["getIsExistLabel"](l + "右")) {
                this.tmd.gotoAndPlayLabel(l + "右");
                this.tmd.direction = -1;
            }
        };
        TiledMoveLogic.prototype.turnRight = function (l) {
            this.dir = "r";
            if (this.tmd["getIsExistLabel"](l + "左")) {
                this.tmd["direction"] = -1;
                this.tmd["gotoAndPlayLabel"](l + "左");
            }
            else if (this.tmd["getIsExistLabel"](l + "右")) {
                this.tmd["gotoAndPlayLabel"](l + "右");
                this.tmd["direction"] = 1;
            }
        };
        TiledMoveLogic.prototype.startMove = function () {
            if (this.ci >= this.len) {
                this.stopMove();
                return;
            }
            this.toP = this.movePath[this.ci];
            this.isSetTP = false;
            var l = "走";
            if (Math.abs(this.toP.x - this.tmd["x"]) > Math.abs(this.toP.y - this.tmd["y"])) {
                if (this.toP.x < this.tmd["x"]) {
                    this.turnLeft(l);
                }
                else {
                    this.turnRight(l);
                }
            }
            else {
                if (this.toP.y < this.tmd["y"]) {
                    this.turnUp(l);
                }
                else {
                    this.turnDown(l);
                }
            }
            var dx = this.toP.x - this.tmd["x"];
            var dy = this.toP.y - this.tmd["y"];
            this.angle = Math.atan2(dy, dx);
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.ci++;
            this.play();
        };
        TiledMoveLogic.prototype.setTp = function () {
            this.isSetTP = true;
            var tmw = this.tmd.tmw;
            var obj = tmw.removeTobj(this.tmd.tx, this.tmd.ty);
            if (null != obj) {
                tmw.setTobj(this.toP.x, this.toP.y, obj);
                this.tmd.tx = this.toP.x;
                this.tmd.ty = this.toP.y;
                this.tmd.tiv = null;
                tmw.checkIsShow(this.tmd);
            }
            if (null != this.tmd.parent) {
                this.tmd.tmw.sort(0);
            }
        };
        return TiledMoveLogic;
    }());
    ztiledmap.TiledMoveLogic = TiledMoveLogic;
    __reflect(TiledMoveLogic.prototype, "ztiledmap.TiledMoveLogic");
})(ztiledmap || (ztiledmap = {}));
//# sourceMappingURL=TiledMoveLogic.js.map