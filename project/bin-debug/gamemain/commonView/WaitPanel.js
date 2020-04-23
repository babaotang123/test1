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
/*
  * 通讯等待类
  * All Rights Reserved.
  * 和服务端通讯时的显示效果
  */
var WaitPanel = (function (_super) {
    __extends(WaitPanel, _super);
    function WaitPanel(str) {
        if (str === void 0) { str = ""; }
        var _this = _super.call(this) || this;
        _this.w = 0;
        _this.h = 0;
        //str = "数据加载中"
        _this.curTipsStr = str;
        _this.createView();
        return _this;
    }
    WaitPanel.prototype.destory = function () {
        egret.clearTimeout(this.timerId);
        if (this.rect && this.rect.parent) {
            this.rect.parent.removeChild(this.rect);
        }
    };
    WaitPanel.prototype.createView = function () {
        this.count = 0;
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        this.addMask();
        var wait = CommonDragonBones.getInstance().getMoviclip("wait");
        wait.anchorOffsetX = wait.width / 2;
        wait.anchorOffsetY = wait.height / 2;
        wait.x = 480;
        wait.y = 250;
        wait.play(-1);
        this.addChild(wait);
        this.tips = new eui.Label();
        this.tips.$alpha = 0.8;
        this.tips.fontFamily = "ziti";
        this.tips.width = 200;
        this.tips.text = this.curTipsStr;
        this.tips.x = 512;
        this.tips.y = 320;
        this.tips.visible = true;
        this.tips.anchorOffsetX = 100;
        this.addChild(this.tips);
        this.playTips(this.curTipsStr);
    };
    WaitPanel.prototype.setTipsStr = function (str) {
        this.curTipsStr = str;
    };
    WaitPanel.prototype.addMask = function () {
        this.rect = new eui.Rect();
        this.rect.width = this.w;
        this.rect.height = this.h;
        this.rect.alpha = 0.4;
        egret.MainContext.instance.stage.addChild(this.rect);
        // this.bg = new egret.Sprite();
        // this.bg.x = 0;
        // this.bg.y = 0;
        // this.bg.graphics.beginFill(0x000000);
        // this.bg.graphics.drawRect(0, 0, this.w, this.h);
        // this.bg.graphics.endFill();
        // egret.MainContext.instance.stage.addChild(this.bg);
        // this.bg.alpha = 0.5;
    };
    WaitPanel.prototype.playTips = function (str) {
        var s1 = str;
        var s2 = ".";
        s1 += s2;
        this.tips.text = s1;
        if (this.count == 6) {
            s1 = this.curTipsStr;
            this.count = 0;
        }
        var self = this;
        this.timerId = setTimeout(function () {
            egret.clearTimeout(self.timerId);
            self.playTips(s1);
        }, 300);
        this.count++;
    };
    return WaitPanel;
}(egret.Sprite));
__reflect(WaitPanel.prototype, "WaitPanel");
//# sourceMappingURL=WaitPanel.js.map