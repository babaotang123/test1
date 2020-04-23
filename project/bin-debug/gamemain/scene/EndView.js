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
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        var _this = _super.call(this) || this;
        _this.skinName = "EndView_Skin";
        _this.onAdd();
        return _this;
    }
    EndView.prototype.onAdd = function () {
        this.initScene();
        this.initAddEvent();
    };
    /** 初始化场景 */
    EndView.prototype.initScene = function () {
        clearGif();
        this.score_txt.text = "";
        this.time_txt_0.text = "";
        this.time_txt_1.text = "";
        // 获取分数 用时 和等级
        this.score_txt.text = (100 - ConfigDataJson.getInstance().erroCount * 3) + "";
        var t = this.getTime(ConfigDataJson.getInstance().totalTime);
        var timeAry = t.split(":");
        var shi = parseInt(timeAry[0]);
        var fen = parseInt(timeAry[1]);
        var miao = parseInt(timeAry[2]);
        this.time_txt_0.text = fen + "";
        this.time_txt_1.text = miao + "";
        var ageNum = ConfigDataJson.getInstance().age;
        // if(ageNum>2.5){
        //     egret.log("----tttttt"+ageNum);
        // }
        // let str ="lev_"+ConfigDataJson.getInstance().getStudyLevel(ConfigDataJson.getInstance().age,ConfigDataJson.getInstance().erroCount);
        // this.curLv = str;
        // let img = CommonDragonBones.getInstance().getElementImg(str);
        // this.levImg.texture = img.texture;
        this.dui.text = "答对的题目：" + ConfigDataJson.getInstance().rightCount + "";
        this.cuo.text = "答错的题目：" + ConfigDataJson.getInstance().erroCount + "";
        this.age.text = "年龄：" + ConfigDataJson.getInstance().age + " 岁";
        this.time.text = "用时：" + ConfigDataJson.getInstance().totalTime + " 秒";
        //  ConfigDataJson.getInstance().totalTime
        if (ConfigDataJson.getInstance().mode != "1") {
            this.upLoadStudyData();
        }
    };
    /** 初始化监听 */
    EndView.prototype.initAddEvent = function () {
        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt, this.httpMsgReturn, this);
    };
    EndView.prototype.httpMsgReturn = function (msg) {
        if (msg.msgType == "studyInfo") {
            egret.log("上传成功");
        }
    };
    // 上传数据
    EndView.prototype.upLoadStudyData = function () {
        var endTime = Date.parse((new Date() + ""));
        // 正确率
        var n = ConfigDataJson.getInstance().rightCount / (ConfigDataJson.getInstance().erroCount + ConfigDataJson.getInstance().rightCount);
        n = (Math.round(n * 100) / 100.00);
        var obj = new Object();
        obj["deviceId"] = Main.devId;
        obj["level"] = "1";
        obj["number"] = "L0000";
        obj["type"] = 0;
        obj["score"] = parseInt(this.score_txt.text);
        obj["startTime"] = ConfigDataJson.getInstance().startTime;
        obj["endTime"] = endTime;
        obj["duration"] = ConfigDataJson.getInstance().totalTime;
        obj["accuracy"] = n;
        obj["wrong"] = ConfigDataJson.getInstance().erroCount;
        HttpControl.getInstance().sendStudyInfo(obj);
    };
    EndView.prototype.getTime = function (s) {
        var t;
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t = '0' + hour + ":";
            }
            else {
                t = hour + ":";
            }
            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec.toFixed(2);
        }
        return t;
    };
    return EndView;
}(UIObject));
__reflect(EndView.prototype, "EndView");
//# sourceMappingURL=EndView.js.map