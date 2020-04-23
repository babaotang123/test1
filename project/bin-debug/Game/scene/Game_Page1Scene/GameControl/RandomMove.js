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
var RandomMove = (function (_super) {
    __extends(RandomMove, _super);
    function RandomMove() {
        return _super.call(this) || this;
    }
    RandomMove.prototype.play = function (obj) {
        var speed = 10; // 定义总体速度
        var offsetMaxWidth = 932;
        var offsetMaxHeight = 420;
        var offsetWidth = 72.5;
        var offsetHeight = 159;
        var theta = 2 * Math.PI * Math.random();
        var speedX = 5;
        var speedY = 5;
        this.id = egret.setInterval(function () {
            obj.x = obj.x + speedX;
            obj.y = obj.y + speedY;
            var curX = obj.x;
            var curY = obj.y;
            egret.log("当前y坐标   " + curY);
            egret.log("速度   " + speedY);
            if (curX >= offsetMaxWidth) {
                //   speedX = App.RandomUtils.limitInteger(3, 7);
                speedX = -App.RandomUtils.limitInteger(5, 7);
            }
            if (curX <= offsetWidth) {
                //   speedX = App.RandomUtils.limitInteger(3, 7);
                speedX = App.RandomUtils.limitInteger(5, 7);
            }
            if (curY >= offsetMaxHeight) {
                //  speedY = App.RandomUtils.limitInteger(3, 7);
                speedY = -App.RandomUtils.limitInteger(5, 7);
            }
            if (curY <= offsetHeight) {
                speedY = App.RandomUtils.limitInteger(5, 7);
            }
        }, this, 10);
    };
    RandomMove.prototype.clear = function () {
        egret.clearInterval(this.id);
    };
    return RandomMove;
}(UIObject));
__reflect(RandomMove.prototype, "RandomMove");
//# sourceMappingURL=RandomMove.js.map