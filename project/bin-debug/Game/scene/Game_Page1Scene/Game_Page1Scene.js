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
var Game_Page1Scene = (function (_super) {
    __extends(Game_Page1Scene, _super);
    function Game_Page1Scene() {
        var _this = _super.call(this) || this;
        _this.levelNum = 2;
        _this.curQuindex = 0;
        // 倒计时
        _this.countTotalTime = 30;
        _this.skinName = "Game_Page1Scene_Skin";
        return _this;
    }
    /** 每次进入 */
    Game_Page1Scene.prototype.onAdd = function () {
        this.initScence();
        // this.showQuesPannel();
    };
    /** 这里进行移出场景的处理 **/
    Game_Page1Scene.prototype.onDestroy = function () {
        egret.Tween.removeAllTweens();
        this.stopTime();
        this.curGameContrl.setGameOverData();
        this.curGameContrl.onDestroy();
        CommonDragonBones.getInstance().dragondestroy();
        this.clearMc();
        CommonSoundManage.getInstance().stopAllSound();
        this.anNumAry = [];
        this.quNumAry = [];
        this.anPos = [];
        this.quPos = [];
        this.jtAry = [];
        this.curSelectAry = [];
        this.countImg = [];
    };
    Game_Page1Scene.prototype.touchBeginMakedItemEvent = function (event) {
        //  CommonSoundManage.getInstance().playSoundEffect("per_talk_mp3");
    };
    // 自定义声音播放完毕回调
    Game_Page1Scene.prototype.ChangeEvent = function (event) {
        ConfigDataJson.getInstance().isPlay = false;
        this.playCountdownAnimation();
        // CommonSoundManage.getInstance().removeEventListener(SoundCompleteEvent.data,this.ChangeEvent,this);
        //   this.showAnswerView();
    };
    Game_Page1Scene.prototype.initScence = function () {
        this.initData();
        this.init();
        this.initImgEvent();
        // super.onAdd();
    };
    Game_Page1Scene.prototype.clearTimeImg = function () {
        egret.Tween.removeAllTweens();
        this.timer.reset();
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.fuc, this);
        for (var _i = 0, _a = this.countImg; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        this.countImg = [];
    };
    Game_Page1Scene.prototype.initData = function () {
        this.anNumAry = [];
        this.quNumAry = [];
        this.anPos = [];
        this.quPos = [];
        this.jtAry = [];
        // this.wenhaoAry = [];
        this.curSelectAry = [];
        this.countImg = [];
        this.txt_input.inputType = "ziti";
        // this.txt_input.prompt = "输入题号";
        this.txt_input.restrict = "A-Z 0-9";
        this.txt_input.textDisplay.size = 23;
        // this.curQuindex = 31;
        this.curQuindex = 0;
        this.loadConfig();
        this.time_txt_0.fontFamily = "ziti";
        this.time_txt_0.textColor = 0xF8F8FF;
        var starTime = Date.parse((new Date() + ""));
        ConfigDataJson.getInstance().startTime = starTime;
        // 加载声音文件
        //  ResLoad.getInstance().LoadRes("Mp3_load", new Handler(this, this.onResourceMp3LoadComplete));
    };
    Game_Page1Scene.prototype.onResourceMp3LoadComplete = function () {
        egret.log("加载声音完毕");
    };
    Game_Page1Scene.prototype.onResUI_1_LoadComplete = function () {
        egret.log("UI1完毕");
    };
    Game_Page1Scene.prototype.loadConfig = function () {
        // 解析配置文件
        var url = "resource/config.json";
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onConfComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onConfComplete, this);
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        loader.load(request);
    };
    Game_Page1Scene.prototype.initImgEvent = function () {
        //   this.btn_playsound.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginMakedItemEvent, this);
        //   this.btn_back_gp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBtnBackEvent, this);
        this.test_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.testgameOver, this);
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showResult, this);
        this.gp_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameOver, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.test, this);
        this.parent.stage.addEventListener(SoundCompleteEvent.data, this.ChangeEvent, this);
        this.addEventListener(GlobalEvent.evt, this.CountScoreEvt, this);
        this.parent.stage.addEventListener("jsNotifyts", this.doQuitMethod, this);
    };
    Game_Page1Scene.prototype.doQuitMethod = function (event) {
        //停止当前游戏
        egret.ticker.pause();
        this.parent.stage.removeEventListener("jsNotifyts", this.doQuitMethod, this);
        var data = JSON.parse(event.eventPhase);
        egret.log("退出游戏：");
        ConfigDataJson.getInstance().isQuit = "true";
        //上传数据
        this.upLoadStudyData();
    };
    Game_Page1Scene.prototype.upLoadStudyData = function () {
        //游戏没结束
        var s = new Object();
        var p = ConfigDataJson.getInstance().CustomsData["power"][0];
        var endTime = Date.parse((new Date() + ""));
        if (this.curSelectAry[this.curQuindex]) {
            s["number"] = "L0000";
            s["type"] = 0;
            s["startTime"] = ConfigDataJson.getInstance().startTime;
            s["endTime"] = endTime;
            ConfigDataJson.getInstance().senStudydMsg(s);
        }
        else {
            //游戏结束了 数据走的另外的流程会本地保存，是否正在上传数据
            if (ConfigDataJson.getInstance().isUploadData != true) {
                ConfigDataJson.getInstance().sendQuitGameMsg();
            }
        }
    };
    Game_Page1Scene.prototype.CountScoreEvt = function (evt) {
        if (evt.b) {
            ConfigDataJson.getInstance().rightCount++;
        }
        else {
            ConfigDataJson.getInstance().erroCount++;
        }
        var curTime = this.curTime - this.countTotalTime;
        ConfigDataJson.getInstance().totalTime += curTime;
        // egret.log("答对次数---"+ConfigDataJson.getInstance().rightCount);
        // egret.log("答错次数---"+ConfigDataJson.getInstance().erroCount);
        // egret.log("总用时---"+ConfigDataJson.getInstance().totalTime);
    };
    Game_Page1Scene.prototype.test = function () {
        this.loginVew = new LoginView();
        this.addChild(this.loginVew);
        this.onDestroy();
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.test, this);
        // CommunicationManager.getInstance().goTargetPageHandle(1);
    };
    Game_Page1Scene.prototype.showResult = function () {
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        this.curGameContrl.showGameOverData();
    };
    Game_Page1Scene.prototype.gameOver = function (evt) {
        if (evt != null) {
            // CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        }
        if (!Game_Page1Scene.isGameBegin) {
            return;
        }
        this.stopTime();
        this.curGameContrl.setGameOverData();
        this.curGameContrl.onDestroy();
        if (this.curSelectAry[this.curQuindex]) {
            this.startRandomQues();
            //  this.playCountdownAnimation();
        }
        else {
            this.EndView = new EndView();
            this.addChild(this.EndView);
            // 结束
        }
        // this.curGameContrl.setGameOverData();
    };
    Game_Page1Scene.prototype.testgameOver = function () {
        // Game_Page1Scene.isGameBegin = true;
        var n = parseInt(this.txt_input.text);
        if (this.txt_input.text != "" && n >= 1 && n <= 96) {
            this.curQuindex = n - 1;
            this.gameOver(null);
        }
    };
    Game_Page1Scene.prototype.init = function () {
        // this.playCountdownAnimation();
        var okBtn = CommonDragonBones.getInstance().getMoviclip("okbtn");
        okBtn.x = this.gp_ok.x;
        okBtn.y = this.gp_ok.y;
        okBtn.play(-1);
        this.addChild(okBtn);
    };
    // D4350B红  FFFF00
    Game_Page1Scene.prototype.timeControl = function () {
        this.timer = new egret.Timer(1000);
        this.curTime = this.countTotalTime;
        this.timer.addEventListener(egret.TimerEvent.TIMER, function p() {
            this.fuc = p;
            this.countTotalTime--;
            // this.time_txt_0.textColor = "0xFFFF00";
            if (this.countTotalTime == 19) {
                this.time_txt_0.textColor = 0xFFFF00;
            }
            else if (this.countTotalTime == 9) {
                this.time_txt_0.textColor = 0xD4350B;
            }
            this.time_txt_0.text = this.countTotalTime.toString();
            if (this.countTotalTime == 0) {
                var curTime = this.curTime - this.countTotalTime;
                ConfigDataJson.getInstance().totalTime += curTime;
                ConfigDataJson.getInstance().erroCount++;
                this.timer.removeEventListener(egret.TimerEvent.TIMER, p, this);
                this.timer.stop();
                this.timer.reset();
                this.gameOver(null);
                return;
            }
        }, this);
        this.timer.start();
    };
    // 3秒倒计时开始动画
    Game_Page1Scene.prototype.playCountdownAnimation = function () {
        this.djsAn = this.getMc("djs");
        this.djsAn.play();
        this.addChild(this.djsAn);
        Game_Page1Scene.isGameBegin = false;
        this.djsAn.addEventListener(zmovie.ZMovieClip.EVENT_FRAME_COMPLETE, this.completeZmovieAct, this);
    };
    Game_Page1Scene.prototype.completeZmovieAct = function (evt) {
        var tag = evt.currentTarget;
        tag.removeEventListener(zmovie.ZMovieClip.EVENT_FRAME_COMPLETE, this.completeZmovieAct, this);
        tag.gotoAndStop(0);
        Game_Page1Scene.isGameBegin = true;
        this.timeControl();
        this.begin_mask.visible = false;
    };
    Game_Page1Scene.prototype.getMc = function (str, n) {
        if (n === void 0) { n = 0; }
        var s = str;
        var s1;
        var s2;
        if (n == 0) {
            s1 = s + "_0_json";
            s2 = s + "_json";
        }
        else if (n == 1) {
            s1 = s + "_1_json";
            s2 = s + "_json";
        }
        else if (n == 10) {
            s1 = s + "0_json";
            s2 = s + "_json";
        }
        var mc = new zmovie.ZMovieClip(s1, RES.getRes(s2));
        if (s == "djs") {
            mc.gotoAndStop(0);
            mc.x = 512;
            mc.y = 300;
            mc.isLoop = false;
            mc.scaleX = mc.scaleY = 0.2;
            mc.anchorOffsetX = mc.width / 2;
            mc.anchorOffsetY = mc.height / 2;
        }
        else {
            mc.play();
        }
        return mc;
    };
    // 取出对应年龄段的题库
    Game_Page1Scene.prototype.getQus = function (age) {
        var _ary = [];
        var a1 = ConfigDataJson.getInstance().CustomsData["GameNumber"];
        var a2 = ConfigDataJson.getInstance().CustomsData["GameConfig"];
        var ary_1 = JSON.parse(JSON.stringify(a1));
        var ary_2 = JSON.parse(JSON.stringify(a2));
        var index = 0;
        if (age < 3) {
            index = 0;
        }
        else if (age >= 3 && age < 3.5) {
            index = 1;
        }
        else if (age >= 3.5 && age < 4) {
            index = 2;
        }
        else if (age >= 4 && age < 5) {
            index = 3;
        }
        else if (age >= 5 && age < 6) {
            index = 4;
        }
        else if (age >= 6 && age < 7) {
            index = 5;
        }
        else if (age >= 7 && age < 8) {
            index = 6;
        }
        else if (age >= 8) {
            index = 7;
        }
        else {
            return [];
        }
        ary_1 = (ary_1[index]).num.split(" ");
        for (var _i = 0, ary_1_1 = ary_1; _i < ary_1_1.length; _i++) {
            var obj = ary_1_1[_i];
            var i = ary_1.indexOf(obj);
            for (var _a = 0, ary_2_1 = ary_2; _a < ary_2_1.length; _a++) {
                var _obj = ary_2_1[_a];
                var _index = ary_2.indexOf(_obj);
                var id = ary_2[_index].condition_id;
                if (obj == id) {
                    _ary.push(_obj);
                }
            }
        }
        return _ary;
    };
    // 随机选出一道题目的元素,可能优先选出背景
    Game_Page1Scene.prototype.startRandomQues = function () {
        if (!this.curSelectAry) {
            this.curSelectAry = [];
        }
        this.op_bg.visible = true;
        if (this.curSelectAry.length == 0) {
            // 先随机拼题库，然后顺序出题
            // const a2: any[] = ConfigDataJson.getInstance().CustomsData["GameConfig"];
            // this.curSelectAry = a2;
            // 根据年龄出题
            egret.log("当前年龄:  " + ConfigDataJson.getInstance().age);
            this.curSelectAry = this.getQus(ConfigDataJson.getInstance().age);
        }
        if (this.curSelectAry.length > 0) {
            // 随机选出一道题
            // const rand: number = App.RandomUtils.limitInteger(0, this.curSelectAry.length-1);
            // let  rand ;
            // if(this.txt_input.text == ""){
            //     rand = 0;
            // }else{
            //     let n = parseInt(this.txt_input.text);
            //     rand = n-1;
            // }
            // 测试按顺序出题
            // this.curQuindex = 31;
            if (this.curSelectAry[this.curQuindex]) {
                this.curGameData = this.curSelectAry[this.curQuindex];
                this.curQuindex++;
            }
            else {
                // 结束
                this.visible = false;
                this.onDestroy();
                var endView = new EndView();
                this.addChild(endView);
                return;
            }
            //  this.curSelectAry.splice(rand, 1);
        }
        else {
            return;
        }
        this.testurl.text = "游戏ID: " + this.curGameData.condition_id;
        // 倒计时显示
        this.time_txt_0.text = this.curGameData.timeout;
        this.countTotalTime = parseInt(this.curGameData.timeout);
        this.curMp3Name = this.curGameData.condition_id + "_mp3";
        CommonSoundManage.getInstance().stopAllSound();
        CommonSoundManage.getInstance().playSoundReturn(this.curMp3Name);
        this.doBuildGameData();
        this.addChild(this.begin_mask);
        this.begin_mask.visible = true;
    };
    Game_Page1Scene.prototype.doBuildGameData = function () {
        var str = this.curGameData.Game_type;
        switch (str) {
            case "找规律":
                this.curGameContrl = new GameType1Control(this);
                break;
            case "数规律":
                this.curGameContrl = new GameType2Control(this);
                break;
            case "分类哪个多":
                this.curGameContrl = new GameType3Control(this);
                break;
            case "逻辑":
                this.curGameContrl = new GameType4Control(this);
                break;
            case "图形规律":
                this.curGameContrl = new GameType5Control(this);
                break;
            case "拼图":
                this.curGameContrl = new GameType6Control(this);
                break;
            case "排序":
                this.curGameContrl = new GameType7Control(this);
                break;
            case "数学":
                this.curGameContrl = new GameType8Control(this);
                break;
            case "":
                break;
        }
    };
    Game_Page1Scene.prototype.showQuestionsView = function () {
        // if (this.quNumAry.length == 0) {
        //     this.startRandomQues();
        // }
        if (this.curGameContrl) {
            this.curGameContrl.showQuestionsView();
        }
        // 显示UI
        // this.gp_ui.visible = true;
        // this.showAnswerView();
    };
    Game_Page1Scene.prototype.onConfComplete = function (event) {
        if (event.type == "complete") {
            var loader = event.target;
            var data = loader.data;
            loader.removeEventListener(egret.Event.COMPLETE, this.onConfComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onConfComplete, this);
            ConfigDataJson.getInstance().CustomsData = JSON.parse(loader.data);
            this.startRandomQues();
        }
        else {
            // 加载出错
        }
    };
    Game_Page1Scene.prototype.testSound = function () {
        CommonSoundManage.getInstance().panelSoundAry = ["d1_mp3", "10_mp3", "d4_mp3", "d2_mp3", "20_mp3", "d3_mp3"];
        CommonSoundManage.getInstance().playPanelEffect();
    };
    // 移除图片
    Game_Page1Scene.prototype.clearMc = function () {
        for (var _i = 0, _a = this.quNumAry; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        this.quNumAry = [];
        this.rightNum = [];
    };
    Game_Page1Scene.prototype.stopTime = function () {
        egret.Tween.removeAllTweens();
        if (this.timer) {
            this.timer.reset();
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.fuc, this);
        }
        if (this.djsAn) {
            this.djsAn.dispose();
        }
        // for(let obj of this.countImg){
        //     if(obj){
        //         obj.visible = true;
        //     }
        // }
    };
    Game_Page1Scene.prototype.clearRemoveAllEvt = function () {
        CommonSoundManage.getInstance().removeEventListener(SoundCompleteEvent.data, this.ChangeEvent, this);
    };
    Game_Page1Scene.key = "Game_Page1Scene";
    return Game_Page1Scene;
}(UIObject));
__reflect(Game_Page1Scene.prototype, "Game_Page1Scene");
//# sourceMappingURL=Game_Page1Scene.js.map