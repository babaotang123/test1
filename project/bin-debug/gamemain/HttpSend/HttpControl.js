/*
  * HTTP请求
  */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpControl = (function () {
    function HttpControl() {
        this.curUrlStr = "https://server.everobo.com/machine"; // 目前这个是测试环境
        this.initRequest();
    }
    HttpControl.getInstance = function () {
        if (!HttpControl.instance) {
            HttpControl.instance = new HttpControl();
        }
        return HttpControl.instance;
    };
    // 验证码请求
    HttpControl.prototype.sendCodeMsg = function (data) {
        this.curMsgType = "code";
        var phone = data["phone"];
        var _url = this.curUrlStr + "/user/sendverifycode/" + phone;
        this.sendMsg(_url, data);
    };
    // 登录请求
    HttpControl.prototype.sendLoginGameMsg = function (data) {
        this.curMsgType = "login";
        var phone = data["phone"];
        var _url = this.curUrlStr + "/user/" + Main.devId + "/login/" + phone;
        this.sendMsg(_url, data);
    };
    // 发送评测结果请求
    HttpControl.prototype.sendReviewResultsmsg = function (data) {
        this.curMsgType = "review";
        var id = data["id"];
        var _url = this.curUrlStr + "/content/" + Main.devId + "/report/" + id;
        var Authorization = "Bearer " + Main.tokenId;
        this.sendMsg(_url, data, Authorization, "get");
    };
    // 提交用户信息
    HttpControl.prototype.sendMsgUserInfo = function (data) {
        this.curMsgType = "UserInfo";
        var Authorization = "Bearer " + Main.tokenId;
        var request = new egret.HttpRequest();
        var _url = this.curUrlStr + "/user/" + Main.devId;
        this.sendMsg(_url, data, Authorization);
    };
    // 上传学习记录
    HttpControl.prototype.sendStudyInfo = function (data) {
        this.curMsgType = "studyInfo";
        var Authorization = "Bearer " + Main.tokenId;
        var request = new egret.HttpRequest();
        var _url = this.curUrlStr + "/upload/" + Main.devId + "/content";
        this.sendMsg(_url, data, Authorization);
    };
    HttpControl.prototype.getSelf = function () {
        return this;
    };
    HttpControl.prototype.initRequest = function () {
        if (!this.xmlhttpRequest) {
            this.xmlhttpRequest = new XMLHttpRequest();
        }
    };
    // 统一HTTP请求接口
    HttpControl.prototype.sendMsg = function (_url, _data, _Authorization, _type) {
        if (_Authorization === void 0) { _Authorization = ""; }
        if (_type === void 0) { _type = "post"; }
        //    ConfigDataJson.getInstance().showHttpSendWait(this.curMsgType);
        if (this.curMsgType == "studyInfo") {
            ConfigDataJson.getInstance().isUploadData = true;
        }
        _data = JSON.stringify(_data);
        this.curData = _data;
        egret.log("发送消息：" + this.curMsgType + _data);
        this.xmlhttpRequest.onreadystatechange = this.onPostComplete;
        this.xmlhttpRequest.open(_type, _url, true);
        this.xmlhttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8;");
        if (_Authorization != "") {
            this.xmlhttpRequest.setRequestHeader("Authorization", _Authorization);
            ;
        }
        if (_data) {
            this.xmlhttpRequest.send(_data);
        }
        else {
            this.xmlhttpRequest.send();
        }
    };
    HttpControl.prototype.onPostComplete = function (evt) {
        var _readyState = evt.target.readyState;
        var _status = evt.target.status;
        var self = HttpControl.getInstance().getSelf();
        var data = evt.target.response;
        egret.log("_readyState状态：" + _readyState + "  _status " + _status);
        if (_readyState == 4 && _status == 200) {
            // WaitManager.getInstance().hideWaritPanel();
            egret.log(self.curMsgType + ": succes" + "--数据-：" + evt.target.response);
            if (data !== "") {
                data = JSON.parse(evt.target.response);
            }
            if (self.curMsgType == "login") {
                data = new LoginData(data);
            }
            if (self.curMsgType == "UserInfo") {
                self.curMsgType = "EnterGame";
            }
            if (this.curMsgType == "studyInfo") {
                ConfigDataJson.getInstance().isUploadData = false; //上传成功结束
                if (ConfigDataJson.getInstance().isQuit) {
                    ConfigDataJson.getInstance().sendQuitGameMsg();
                }
            }
            self.dipatchHttpEvt(data, self.curMsgType);
        }
        else if (_readyState != 0 && _readyState == 4) {
            if (this.curMsgType == "studyInfo") {
                ConfigDataJson.getInstance().isUploadData = false; //上传失败结束
                //写本地
                ConfigDataJson.getInstance().sendSaveRequest(this.curData);
            }
            // WaitManager.getInstance().hideWaritPanel();
            egret.log(self.curMsgType + ": 失败  " + data);
        }
    };
    HttpControl.prototype.dipatchHttpEvt = function (data, str) {
        var evt = new GlobalEvent(GlobalEvent.evt);
        evt.msgType = str;
        evt.data = data;
        egret.MainContext.instance.stage.dispatchEvent(evt);
    };
    return HttpControl;
}());
__reflect(HttpControl.prototype, "HttpControl");
//# sourceMappingURL=HttpControl.js.map