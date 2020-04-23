/*
  * 登录控制
  */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginControl = (function () {
    function LoginControl() {
    }
    LoginControl.getInstance = function () {
        if (!LoginControl.instance) {
            LoginControl.instance = new LoginControl();
        }
        return LoginControl.instance;
    };
    LoginControl.prototype.init = function () {
        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt, this.changeView, this);
    };
    LoginControl.prototype.addLogin = function () {
        this.loginView = new LoginView();
        this.loginView.onAdd();
        egret.MainContext.instance.stage.addChild(this.loginView);
    };
    LoginControl.prototype.changeView = function (evt) {
        if (evt.data == "OpenUserView") {
            this.loginView.onDestroy();
            this.userInfoView = new UserInfoView();
            this.userInfoView.onAdd();
            egret.MainContext.instance.stage.addChild(this.userInfoView);
        }
        else if (evt.msgType == "EnterGame") {
            if (this.userInfoView) {
                this.userInfoView.onDestroy();
            }
            if (egret.Capabilities.isMobile == true) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                if (egret.MainContext.instance.stage.stageHeight / egret.MainContext.instance.stage.stageWidth < 1.77) {
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
                }
                else {
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                }
                // var stageWidth = document.documentElement.clientWidth;
                // var stageHeight = document.documentElement.clientHeight;
                egret.MainContext.instance.stage.setContentSize(1024, 600);
                egret.MainContext.instance.stage.stage.orientation = egret.OrientationMode.LANDSCAPE;
                egret.MainContext.instance.stage.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
            }
            CommunicationManager.getInstance().goTargetPageHandle(1);
        }
        else if (evt.msgType == "OpenEndView") {
            if (this.userInfoView) {
                this.userInfoView.onDestroy();
            }
            this.endView = new EndView();
            egret.MainContext.instance.stage.addChild(this.endView);
        }
        else if (evt.msgType == "review") {
            var obj = evt.data;
            if (evt.data["wrong"]) {
                ConfigDataJson.getInstance().rightCount = obj["score"];
                ConfigDataJson.getInstance().erroCount = obj["wrong"]; // 错题数
                ConfigDataJson.getInstance().setAge(Main.birthday);
                ConfigDataJson.getInstance().totalTime = obj["cost"]; // 耗时
                var evt_1 = new GlobalEvent(GlobalEvent.evt);
                evt_1.msgType = "OpenEndView";
                egret.MainContext.instance.stage.dispatchEvent(evt_1);
            }
            else {
                var curMsgType = "EnterGame";
                var evt_2 = new GlobalEvent(GlobalEvent.evt);
                evt_2.msgType = curMsgType;
                egret.MainContext.instance.stage.dispatchEvent(evt_2);
                // CommunicationManager.getInstance().goTargetPageHandle(1);
            }
        }
    };
    return LoginControl;
}());
__reflect(LoginControl.prototype, "LoginControl");
//# sourceMappingURL=LoginControl.js.map