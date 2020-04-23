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
//declare function restleave();
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoginView_Skin";
        return _this;
        // if(egret.Capabilities.isMobile == true){
        //     this.skinName = "LoginView_h_Skin";
        // }else{
        //     this.skinName = "LoginView_Skin";
        // }
    }
    LoginView.prototype.onAdd = function () {
        this.initScene();
        this.initAddEvent();
    };
    LoginView.prototype.txtFocusOutEvt = function (evt) {
        var targ = evt.currentTarget;
        var name = targ.name;
        var b = ConfigDataJson.getInstance().checkMobile(this.label_0.text);
        if (!b) {
            this.tips_0.text = "请填写正确的手机号";
        }
        // restleave();
    };
    LoginView.prototype.onDestroy = function () {
        this.clearEvt();
        this.txt_djs.text = "";
        this.timer.reset();
        this.timer.stop();
        this.btn_code.visible = true;
        this.gp_djs.visible = false;
        this.countTime = 20;
        egret.MainContext.instance.stage.removeChild(this);
    };
    /** 初始化场景 */
    LoginView.prototype.initScene = function () {
        this.countTime = 20;
        this.gp_djs.visible = false;
        this.showText();
        // ResLoad.getInstance().LoadRes("UI_load", new Handler(this, this.onResUILoadComplete));
        // ResLoad.getInstance().LoadRes("UI_load_1", new Handler(this, this.onResUILoadComplete));
        clearGif();
    };
    /** 初始化监听 */
    LoginView.prototype.initAddEvent = function () {
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnLoginBegin, this);
        this.btn_code.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnCodeBegin, this);
        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt, this.httpMsgReturn, this);
    };
    // 初始化输入框
    LoginView.prototype.showText = function () {
        // 登录的输入框
        for (var i = 0; i < 2; i++) {
            this["label_" + i] = new egret.TextField();
            var curText = this["label_" + i];
            curText.fontFamily = "ziti"; // 设置字体
            curText.text = ""; // 设置文本内容
            curText.type = egret.TextFieldType.INPUT;
            curText.width = 241;
            curText.height = 41;
            curText.name = "label_" + i;
            curText.maxChars = 14;
            // curText.restrict = "0-9";
            curText.size = 30; // 设置字号大小
            curText.textColor = 0x009900; // 设置字体颜色
            curText.textAlign = egret.HorizontalAlign.CENTER;
            curText.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(curText);
            curText.x = this["img_" + i].x;
            curText.y = this["img_" + i].y;
            if (i == 1) {
                curText.maxChars = 6;
            }
            curText.addEventListener(egret.TouchEvent.FOCUS_IN, this.txtFocusInEvt, this);
            curText.addEventListener(egret.TouchEvent.FOCUS_OUT, this.txtFocusOutEvt, this);
            curText.addEventListener(egret.Event.CHANGE, this.txtChangeEvt, this);
        }
    };
    LoginView.prototype.txtFocusInEvt = function (evt) {
        var targ = evt.currentTarget;
        var name = targ.name;
        switch (name) {
            case "label_0":
                this.tips_0.text = "";
                break;
            case "label_1":
                this.tips_1.text = "";
                this.label_1.textColor = 0x009900;
                this.label_1.text = "";
                break;
        }
        //restleave();
    };
    LoginView.prototype.txtChangeEvt = function (evt) {
        var targ = evt.currentTarget;
        var name = targ.name;
    };
    // 登录
    LoginView.prototype.clickBtnLoginBegin = function () {
        if (this.cheackInputTxt()) {
            var obj = new Object();
            obj["phone"] = this.label_0.text;
            // obj["code"] = this.label_1.text;
            obj["code"] = "000000"; // 测试用的
            HttpControl.getInstance().sendLoginGameMsg(obj);
        }
    };
    // 获取验证码
    LoginView.prototype.clickBtnCodeBegin = function () {
        if (this.label_0.text != "") {
            var b = ConfigDataJson.getInstance().checkMobile(this.label_0.text);
            if (!b) {
                return;
            }
            this.startDjs();
            var obj = new Object();
            obj["phone"] = this.label_0.text;
            HttpControl.getInstance().sendCodeMsg(obj);
        }
        else {
            this.cheackInputTxt();
        }
    };
    LoginView.prototype.cheackInputTxt = function () {
        var b = false;
        var str = "";
        if (this.label_0.text == "") {
            this.tips_0.text = "请填写手机号";
            return;
        }
        b = ConfigDataJson.getInstance().checkMobile(this.label_0.text);
        if (!b) {
            this.tips_0.text = "请填写正确的手机号";
            return b;
        }
        if (this.label_1.text == "") {
            this.tips_1.text = "请输入验证码";
            return;
        }
        b = true;
        return b;
    };
    LoginView.prototype.httpMsgReturn = function (msg) {
        if (msg.msgType == "login") {
            if (msg.data["code"]) {
                var code = msg.data["code"];
                if (code == 400) {
                    this.tips_1.text = "验证码有误";
                }
            }
            else if (msg.data["token"] != "") {
                Main.tokenId = msg.data["token"];
                // 登录成功
                var br = msg.data["birthday"];
                ConfigDataJson.getInstance().setAge(br);
                if (br == 0) {
                    // 没有信息需要填写
                    var evt = new GlobalEvent(GlobalEvent.evt);
                    evt.data = "OpenUserView";
                    egret.MainContext.instance.stage.dispatchEvent(evt);
                }
                else {
                    // 获取评测结果
                    var self_1 = this;
                    var idTimeout_1 = setTimeout(function () {
                        egret.clearTimeout(idTimeout_1);
                        self_1.getReviewResults();
                    }, 500);
                }
            }
        }
        if (msg.msgType == "review") {
            if (msg.data["wrong"]) {
                ConfigDataJson.getInstance().rightCount = msg.data["score"];
                ConfigDataJson.getInstance().erroCount = msg.data["wrong"]; // 错题数
                // ConfigDataJson.getInstance().age = msg.data[""];
                ConfigDataJson.getInstance().totalTime = msg.data["cost"]; // 耗时
                var evt = new GlobalEvent(GlobalEvent.evt);
                evt.msgType = "OpenEndView";
                egret.MainContext.instance.stage.dispatchEvent(evt);
            }
            else {
                this.onDestroy();
                var curMsgType = "EnterGame";
                var evt = new GlobalEvent(GlobalEvent.evt);
                evt.msgType = curMsgType;
                egret.MainContext.instance.stage.dispatchEvent(evt);
                // CommunicationManager.getInstance().goTargetPageHandle(1);
            }
        }
    };
    // 获取评测结果
    LoginView.prototype.getReviewResults = function () {
        var obj = new Object();
        obj["deviceId"] = Main.devId;
        obj["id"] = 1;
        obj["number"] = "L0000";
        HttpControl.getInstance().sendReviewResultsmsg(obj);
    };
    // 启动倒计时器
    LoginView.prototype.startDjs = function () {
        var _this = this;
        this.gp_djs.visible = true;
        this.txt_djs.text = this.countTime + "";
        this.btn_code.visible = false;
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            _this.countTime--;
            _this.txt_djs.text = _this.countTime + "";
            if (_this.countTime <= 0) {
                _this.txt_djs.text = "";
                _this.timer.reset();
                _this.timer.stop();
                _this.btn_code.visible = true;
                _this.gp_djs.visible = false;
                _this.countTime = 20;
                // this.timer.removeEventListener(egret.TimerEvent.TIMER);
            }
        }, this);
        this.timer.start();
    };
    LoginView.prototype.onResUILoadComplete = function () {
        egret.log("题库资源加载完成");
    };
    // 时间戳转换成日期,设置全局年龄
    LoginView.prototype.clearEvt = function () {
        this.btn_ok.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnLoginBegin, this);
        this.btn_code.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnCodeBegin, this);
        egret.MainContext.instance.stage.removeEventListener(GlobalEvent.evt, this.httpMsgReturn, this);
    };
    return LoginView;
}(UIObject));
__reflect(LoginView.prototype, "LoginView");
//# sourceMappingURL=LoginView.js.map