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
var ConfigDataJson = (function (_super) {
    __extends(ConfigDataJson, _super);
    function ConfigDataJson() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.totalTime = 0; // 总用时
        _this.totalScore = 0; // 总分
        _this.rightCount = 0; // 答对的次数
        _this.erroCount = 0; // 答对的次数
        return _this;
    }
    ConfigDataJson.getInstance = function () {
        if (!ConfigDataJson.instance) {
            ConfigDataJson.instance = new ConfigDataJson();
        }
        return ConfigDataJson.instance;
    };
    ConfigDataJson.prototype.getData = function () {
        return this.CustomsData;
    };
    ConfigDataJson.prototype.getStudyLevel = function (age, erroNum) {
        var level = 0;
        if (age > 2.5 && age < 3) {
            if (erroNum > 0 && erroNum <= 1) {
                level = 1;
            }
            else if (erroNum >= 2 && erroNum <= 3) {
                level = 0;
            }
            else if (erroNum >= 4 && erroNum <= 7) {
                level = 0;
            }
            else if (erroNum >= 8 && erroNum <= 14) {
                level = 0;
            }
            else if (erroNum > 14) {
                level = 0;
            }
        }
        else if (age >= 3 && age < 4) {
            if (erroNum > 0 && erroNum <= 1) {
                level = 2;
            }
            else if (erroNum >= 2 && erroNum <= 3) {
                level = 1;
            }
            else if (erroNum >= 4 && erroNum <= 7) {
                level = 1;
            }
            else if (erroNum >= 8 && erroNum <= 14) {
                level = 1;
            }
            else if (erroNum > 14) {
                level = 1;
            }
        }
        else if (age >= 4 && age < 5) {
            if (erroNum > 0 && erroNum <= 1) {
                level = 3;
            }
            else if (erroNum >= 2 && erroNum <= 3) {
                level = 2;
            }
            else if (erroNum >= 4 && erroNum <= 7) {
                level = 2;
            }
            else if (erroNum >= 8 && erroNum <= 14) {
                level = 1;
            }
            else if (erroNum > 14) {
                level = 1;
            }
        }
        else if (age >= 5 && age < 6) {
            if (erroNum > 0 && erroNum <= 1) {
                level = 3;
            }
            else if (erroNum >= 2 && erroNum <= 3) {
                level = 2;
            }
            else if (erroNum >= 4 && erroNum <= 7) {
                level = 2;
            }
            else if (erroNum >= 8 && erroNum <= 14) {
                level = 1;
            }
            else if (erroNum > 14) {
                level = 1;
            }
        }
        else if (age >= 6 && age < 7) {
            if (erroNum > 0 && erroNum <= 1) {
                level = 3;
            }
            else if (erroNum >= 2 && erroNum <= 3) {
                level = 2;
            }
            else if (erroNum >= 4 && erroNum <= 7) {
                level = 2;
            }
            else if (erroNum >= 8 && erroNum <= 14) {
                level = 2;
            }
            else if (erroNum > 14) {
                level = 2;
            }
        }
        return level;
    };
    ConfigDataJson.prototype.getAge = function (str) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
        if (r == null) {
            return "日期错误";
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        var returnStr = "输入的日期格式错误！";
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
            var date = new Date();
            var yearNow = date.getFullYear();
            var monthNow = date.getMonth() + 1;
            var dayNow = date.getDate();
            var largeMonths = [1, 3, 5, 7, 8, 10, 12], // 大月， 用于计算天，只在年月都为零时，天数有效
            lastMonth = monthNow - 1 > 0 ? monthNow - 1 : 12, // 上一个月的月份
            isLeapYear = false, // 是否是闰年
            daysOFMonth = 0; // 当前日期的上一个月多少天
            if ((yearNow % 4 === 0 && yearNow % 100 !== 0) || yearNow % 400 === 0) {
                isLeapYear = true;
            }
            if (largeMonths.indexOf(lastMonth) > -1) {
                daysOFMonth = 31;
            }
            else if (lastMonth === 2) {
                if (isLeapYear) {
                    daysOFMonth = 29;
                }
                else {
                    daysOFMonth = 28;
                }
            }
            else {
                daysOFMonth = 30;
            }
            var Y = yearNow - parseInt(r[1]);
            var M = monthNow - parseInt(r[3]);
            var D = dayNow - parseInt(r[4]);
            if (D < 0) {
                D = D + daysOFMonth; // 借一个月
                M--;
            }
            if (M < 0) {
                Y--;
                M = M + 12; //
            }
            if (Y < 0) {
                returnStr = "出生日期有误！";
            }
            else if (Y === 0) {
                if (M === 0) {
                    returnStr = D + ":";
                }
                else {
                    returnStr = M + ":";
                }
            }
            else {
                if (M === 0) {
                    returnStr = Y + ":";
                }
                else {
                    returnStr = Y + ":" + M + ":";
                }
            }
        }
        return returnStr;
    };
    // 获取链接中UR值
    ConfigDataJson.prototype.getOption = function (key) {
        if (window.location.href) {
            var search = window.location.href;
            // search = "sdcard/ub_res/index.html?mode=0&collected=0"
            var searchArr = search.split("?");
            if (!searchArr[1]) {
                return "";
            }
            var curKeyUrlAry = searchArr[1].split("&");
            var length_1 = curKeyUrlAry.length;
            for (var i = 0; i < length_1; i++) {
                var str = curKeyUrlAry[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    };
    // 时间戳转换为年龄
    ConfigDataJson.prototype.setAge = function (br) {
        var date = new Date(parseInt(br)); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        var str = Y + M + D;
        this.age = this.countAge(str);
    };
    ConfigDataJson.prototype.countAge = function (num) {
        var age = num.split("-");
        var y = age[0];
        var m = age[1];
        var d = age[2];
        var _str = y + "-" + m + "-" + d;
        var b = this.getAge(_str);
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
        return b;
    };
    // 验证手机号规则
    ConfigDataJson.prototype.checkMobile = function (s) {
        var sMobile = s;
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))) {
            return false;
        }
        return true;
    };
    ConfigDataJson.prototype.showHttpSendWait = function (str) {
        var tipsStr = "";
        switch (str) {
            case "code":
                tipsStr = "验证码和获取中";
                break;
            case "login":
                tipsStr = "正在登陆中";
                break;
            case "review":
                tipsStr = "获取评测结果";
                break;
            case "UserInfo":
                tipsStr = "进入游戏中";
                break;
            case "studyInfo":
                tipsStr = "学习记录同步中";
                break;
        }
        WaitManager.getInstance().showWaritPanel(tipsStr);
    };
    ConfigDataJson.prototype.getWifiStatus = function () {
        return getAppWifiStatus();
    };
    ConfigDataJson.prototype.sendSaveRequest = function (data) {
        return sendJsSave(data);
    };
    //离开游戏
    ConfigDataJson.prototype.sendQuitGameMsg = function () {
        callAppKeyEvent();
    };
    ConfigDataJson.prototype.senStudydMsg = function (data) {
        var params = JSON.stringify(data);
        egret.log("wifi状态：" + ConfigDataJson.getInstance().getWifiStatus());
        egret.log("学习数据：" + params);
        if (!ConfigDataJson.getInstance().getWifiStatus()) {
            //离线状态
            ConfigDataJson.getInstance().sendSaveRequest(params); //保存数据
            if (this.isQuit == "true") {
                ConfigDataJson.getInstance().sendQuitGameMsg(); //退出
            }
            return;
        }
        HttpControl.getInstance().sendStudyInfo(params);
    };
    return ConfigDataJson;
}(UIObject));
__reflect(ConfigDataJson.prototype, "ConfigDataJson");
//# sourceMappingURL=ConfigDataJson.js.map