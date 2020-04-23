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
var UserInfoView = (function (_super) {
    __extends(UserInfoView, _super);
    function UserInfoView() {
        var _this = _super.call(this) || this;
        _this.skinName = "UserInfoView_Skin";
        return _this;
        //  if(egret.Capabilities.isMobile == true){
        //     this.skinName = "UserInfoView_h_Skin";
        // }else{
        //     this.skinName = "LoginView_Skin";
        // }
    }
    UserInfoView.prototype.onAdd = function () {
        this.initScene();
        this.initAddEvent();
    };
    UserInfoView.prototype.onDestroy = function () {
        this.clearEvt();
        this.sexGpAry = [];
        this.curSexNum = -1;
        if (this.parent) {
            egret.MainContext.instance.stage.removeChild(this);
        }
    };
    /** 初始化场景 */
    UserInfoView.prototype.initScene = function () {
        this.curSexNum = -1;
        this.sexGpAry = [];
        this.sexGpAry.push(this.sexgp_2);
        this.sexGpAry.push(this.sexgp_1);
        this["sex_1"].fontFamily = "ziti";
        this["sex_2"].fontFamily = "ziti";
        this.showText();
    };
    /** 初始化监听 */
    UserInfoView.prototype.initAddEvent = function () {
        for (var _i = 0, _a = this.sexGpAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickSexHand, this);
        }
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnComitBegin, this);
        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt, this.httpMsgRetun, this);
    };
    UserInfoView.prototype.clickSexHand = function (event) {
        for (var _i = 0, _a = this.sexGpAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            this.curSexNum = this.sexGpAry.indexOf(obj);
            if (obj) {
                var bg_1 = (obj.$children)[0];
                var txt_1 = ((obj.$children)[1]);
                txt_1.textColor = 0xafafaf;
                bg_1.visible = false;
            }
        }
        var gp = event.currentTarget;
        var bg = (gp.$children)[0];
        var txt = ((gp.$children)[1]);
        txt.textColor = 0xFFFFFF;
        bg.visible = true;
        this.tips_2.text = "";
    };
    // 初始化输入框
    UserInfoView.prototype.showText = function () {
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
            curText.size = 30; // 设置字号大小
            curText.textColor = 0x009900; // 设置字体颜色
            curText.textAlign = egret.HorizontalAlign.CENTER;
            curText.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(curText);
            curText.x = this["img_" + i].x;
            curText.y = this["img_" + i].y;
            if (i == 1) {
                curText.maxChars = 8;
                curText.type = egret.TextFieldType.INPUT;
                curText.textColor = 0xafafaf;
                curText.text = "格式19930501";
                curText.restrict = "0-9";
            }
            else {
                curText.maxChars = 6;
            }
            curText.addEventListener(egret.TouchEvent.FOCUS_IN, this.txtFocusInEvt, this);
            curText.addEventListener(egret.TouchEvent.FOCUS_OUT, this.txtFocusOutEvt, this);
            curText.addEventListener(egret.Event.CHANGE, this.txtChangeEvt, this);
        }
    };
    UserInfoView.prototype.txtFocusInEvt = function (evt) {
        var targ = evt.currentTarget;
        var name = targ.name;
        switch (name) {
            case "label_0":
                this.tips_0.text = "";
                break;
            case "label_1":
                this.tips_1.text = "";
                if (this.label_1.text == "格式19930501") {
                    this.label_1.text = "";
                    this.label_1.textColor = 0x009900;
                }
                break;
        }
    };
    UserInfoView.prototype.txtFocusOutEvt = function (evt) {
        var targ = evt.currentTarget;
        var name = targ.name;
        switch (name) {
            case "label_0":
                break;
            case "label_1":
                if (this.label_1.text == "") {
                    this.label_1.text = "格式19930501";
                    this.label_1.textColor = 0xafafaf;
                }
                break;
        }
    };
    UserInfoView.prototype.txtChangeEvt = function (evt) {
        var targ = evt.currentTarget;
        var name = targ.name;
    };
    UserInfoView.prototype.clickBtnComitBegin = function () {
        this.curlongitude = "";
        this.curlatitude = "";
        this.curlocation = "";
        if (this.cheackInputTxt()) {
            if (this.cheackBirth()) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
                }
                else {
                    alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
                }
                var date = new Date(this.curBirthDate);
                var br = date.getTime();
                var obj = new Object();
                obj["deviceId"] = Main.devId;
                obj["name"] = this.label_0.text;
                obj["birthday"] = br;
                obj["sex"] = this.curSexNum;
                obj["longitude"] = this.curlongitude;
                obj["latitude"] = this.curlatitude;
                obj["location"] = this.curlocation;
                HttpControl.getInstance().sendMsgUserInfo(obj);
            }
        }
    };
    UserInfoView.prototype.cheackInputTxt = function () {
        var b = false;
        var str = "";
        if (this.label_0.text == "") {
            this.tips_0.text = "请填写宝宝昵称";
            return;
        }
        if (this.curSexNum == -1) {
            this.tips_2.text = "请选择宝宝性别";
            return;
        }
        if (this.label_1.text == "格式19930501") {
            this.tips_1.text = "请填写宝宝生日";
            return;
        }
        b = true;
        return b;
    };
    UserInfoView.prototype.httpMsgRetun = function (msg) {
        // if(msg.msgType == "EnterGame"){
        //     //  egret.MainContext.instance.stage.addChild(this.loginView);
        //     //  CommunicationManager.getInstance().goTargetPageHandle(1);
        // }
    };
    UserInfoView.prototype.cheackBirth = function () {
        var isRight = false;
        var str = "";
        var age = this.label_1.text;
        var y = age.substring(0, 4);
        var m = age.substring(4, 6);
        var d = age.substring(6, 8);
        var _str = y + "-" + m + "-" + d;
        this.curBirthDate = _str;
        var b = ConfigDataJson.getInstance().getAge(_str);
        var numAry = b.split(":");
        if (numAry.length == 2 || numAry.length == 3) {
            var m_1 = parseInt(numAry[1]);
            if (m_1 < 6) {
                m_1 = 0;
            }
            else {
                m_1 = 0.5;
            }
            b = parseFloat(numAry[0] + "." + numAry[1]);
        }
        if (b >= 2.5 && b <= 7) {
            isRight = true;
            ConfigDataJson.getInstance().age = b;
        }
        else if (b < 2.5 || b > 7) {
            b = "此测试只针对2.5至7周岁的儿童";
            this.tips_1.text = b;
            isRight = false;
        }
        else {
            this.tips_1.text = b;
            isRight = false;
        }
        return isRight;
    };
    UserInfoView.prototype.onSuccess = function (position) {
        this.curlongitude = position.coords.latitude;
        this.curlatitude = position.coords.longitude;
    };
    UserInfoView.prototype.onError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                // alert("您拒绝对获取地理位置的请求");
                break;
            case error.POSITION_UNAVAILABLE:
                // alert("位置信息是不可用的");
                break;
            case error.TIMEOUT:
                // alert("请求您的地理位置超时");
                break;
            case error.UNKNOWN_ERROR:
                // alert("未知错误");
                break;
        }
    };
    UserInfoView.prototype.clearEvt = function () {
        for (var _i = 0, _a = this.sexGpAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickSexHand, this);
        }
        this.btn_ok.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnComitBegin, this);
        egret.MainContext.instance.stage.removeEventListener(GlobalEvent.evt, this.httpMsgRetun, this);
    };
    return UserInfoView;
}(UIObject));
__reflect(UserInfoView.prototype, "UserInfoView");
//# sourceMappingURL=UserInfoView.js.map