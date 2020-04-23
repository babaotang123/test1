/*
  * 等待界面
  */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WaitManager = (function () {
    function WaitManager() {
    }
    WaitManager.getInstance = function () {
        if (!WaitManager.instance) {
            WaitManager.instance = new WaitManager();
        }
        return WaitManager.instance;
    };
    // 显示等待界面
    WaitManager.prototype.init = function () {
        this.waitPanel = null;
        // lcp.LListener.getInstance().addEventListener("show_wait", this.showWaritPanel, this);
        // lcp.LListener.getInstance().addEventListener("hide_wait", this.hideWaritPanel, this);
    };
    // 显示等待界面
    WaitManager.prototype.showWaritPanel = function (str) {
        if (!this.waitPanel) {
            this.waitPanel = new WaitPanel();
        }
        this.waitPanel.setTipsStr(str);
        // GameLayerManager.gameLayer().maskLayer.removeChildren();
        // GameLayerManager.gameLayer().maskLayer.addChild(this.waitPanel);
        egret.MainContext.instance.stage.addChild(this.waitPanel);
    };
    // 移除界面
    WaitManager.prototype.hideWaritPanel = function () {
        if (this.waitPanel && egret.MainContext.instance.stage.contains(this.waitPanel)) {
            this.waitPanel.destory();
            egret.MainContext.instance.stage.removeChild(this.waitPanel);
        }
    };
    return WaitManager;
}());
__reflect(WaitManager.prototype, "WaitManager");
//# sourceMappingURL=WaitManager.js.map