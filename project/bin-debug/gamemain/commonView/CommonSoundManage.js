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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CommonSoundManage = (function (_super) {
    __extends(CommonSoundManage, _super);
    // private AppMp3Url:string = "/resource/Game/assets/Game_page_scene1/";
    function CommonSoundManage() {
        var _this = _super.call(this) || this;
        // 播放面板成绩的声音专属
        _this.panelSoundAry = [];
        //  private isPlay: boolean = false;
        // private mp3Url:string = "/resource/Game/assets/Game_page_scene1/";
        _this.AppMp3Url = "/sdcard/t1/resource/Game/assets/mp3/";
        _this.curSoundIndex = 0;
        return _this;
    }
    CommonSoundManage.getInstance = function () {
        if (!CommonSoundManage.instance) {
            CommonSoundManage.instance = new CommonSoundManage();
        }
        return CommonSoundManage.instance;
    };
    /** 随机一个正确或错误音效 */
    CommonSoundManage.prototype.randomSoundEffect = function (soundType) {
        var rand = soundType == 1 ? App.RandomUtils.limitInteger(1, 3) : App.RandomUtils.limitInteger(1, 2);
        var soundName = "";
        if (soundType == 1) {
            switch (rand) {
                case 1:
                    soundName = "r_1_mp3";
                    break;
                case 2:
                    soundName = "r_2_mp3";
                    break;
                case 3:
                    soundName = "r_3_mp3";
                    break;
            }
        }
        else if (soundType == 2) {
            switch (rand) {
                case 1:
                    soundName = "err_1_mp3";
                    break;
                case 2:
                    soundName = "err_2_mp3";
                    break;
                case 3:
                    soundName = "err_3_mp3";
                    break;
            }
        }
        if (ConfigDataJson.getInstance().isPlay) {
            return;
        }
        if (Main.os == "Android") {
            soundName = soundName.replace("_mp3", ".mp3");
            var mp3Url = this.AppMp3Url + soundName;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            var thisSelf = this;
            this.mp3.addEventListener("ended", function () {
                ConfigDataJson.getInstance().isPlay = false;
                removeEventListener("ended", function () {
                }, false);
            }, false);
        }
        else {
            this.sound = RES.getRes(soundName);
            // 如果获取的资源出错了
            if (!this.sound) {
                //   this.overAct();
                return;
            }
            this.channel = this.sound.play(0, 1);
            ConfigDataJson.getInstance().isPlay = true;
            this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
        // if (soundName == "") {
        //     // 如果获取的音效名字错误
        //    // this.overAct();
        //     return;
        // }
        // const sound: egret.Sound = new egret.Sound();
        // sound.load(soundName);
        // sound.addEventListener(egret.Event.COMPLETE,()=>{sound.play(0,1)},this);
    };
    // 一般播放声音
    CommonSoundManage.prototype.playSoundEffect = function (soundName) {
        if (ConfigDataJson.getInstance().isPlay) {
            return;
        }
        if (Main.os == "Android") {
            soundName = soundName.replace("_mp3", ".mp3");
            var mp3Url = this.AppMp3Url + soundName;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            var thisSelf = this;
            this.mp3.addEventListener("ended", function () {
                ConfigDataJson.getInstance().isPlay = false;
                removeEventListener("ended", function () {
                }, false);
            }, false);
        }
        else {
            this.sound = RES.getRes(soundName);
            // 如果获取的资源出错了
            if (!this.sound) {
                //   this.overAct();
                return;
            }
            this.channel = this.sound.play(0, 1);
            ConfigDataJson.getInstance().isPlay = true;
            this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
    };
    CommonSoundManage.prototype.playPanelEffect = function () {
        if (ConfigDataJson.getInstance().isPlay) {
            return;
        }
        var name = this.panelSoundAry[this.curSoundIndex];
        if (Main.os == "Android") {
            var mp3Url = this.AppMp3Url + name;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            var thisSelf = this;
            this.mp3.addEventListener("ended", function () {
                ConfigDataJson.getInstance().isPlay = false;
                removeEventListener("ended", function () {
                    //  alert(123)
                }, false);
            }, false);
        }
        else {
            this.sound = RES.getRes(name);
            // 如果获取的资源出错了
            if (!this.sound) {
                //   this.overAct();
                return;
            }
            this.channel = this.sound.play(0, 1);
            ConfigDataJson.getInstance().isPlay = true;
            this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
        this.curSoundIndex++;
    };
    // 需要返回状态的
    CommonSoundManage.prototype.playSoundReturn = function (soundName) {
        return __awaiter(this, void 0, void 0, function () {
            var mp3Url, thisSelf_1, sound, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.log(ConfigDataJson.getInstance().isPlay);
                        if (ConfigDataJson.getInstance().isPlay) {
                            return [2 /*return*/];
                        }
                        if (!(Main.os == "Android")) return [3 /*break*/, 1];
                        soundName = soundName.replace("_mp3", ".mp3");
                        mp3Url = this.AppMp3Url + soundName;
                        this.mp3 = new Audio(mp3Url);
                        this.mp3.play();
                        ConfigDataJson.getInstance().isPlay = true;
                        thisSelf_1 = this;
                        this.mp3.addEventListener("ended", function () {
                            ConfigDataJson.getInstance().isPlay = false;
                            thisSelf_1.onSoundReturnComplete(null);
                            removeEventListener("ended", function () {
                                //  alert(123)
                            }, false);
                        }, false);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, RES.getResAsync(soundName)];
                    case 2:
                        _a.sent();
                        sound = RES.getRes(soundName);
                        if (!sound) {
                            //   this.overAct();
                            return [2 /*return*/];
                        }
                        ConfigDataJson.getInstance().isPlay = true;
                        channel = sound.play(0, 1);
                        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundReturnComplete, [3]);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 停止所有声音
    CommonSoundManage.prototype.stopAllSound = function () {
        if (this.sound) {
            if (this.sound.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                this.sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
            }
        }
        if (this.channel) {
            this.channel.stop();
        }
    };
    // 关闭音效
    CommonSoundManage.prototype.onSouncComplete = function (e) {
        var channel = e.currentTarget;
        channel.stop();
        ConfigDataJson.getInstance().isPlay = false;
        if (channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
            channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
    };
    CommonSoundManage.prototype.onSoundComplete = function (e) {
        var sound = e.currentTarget;
        sound.stop();
        ConfigDataJson.getInstance().isPlay = false;
        if (sound.hasEventListener(egret.Event.SOUND_COMPLETE)) {
            sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
        if (this.curSoundIndex <= 4) {
            this.playPanelEffect();
        }
        else {
            this.curSoundIndex = 0;
        }
    };
    CommonSoundManage.prototype.onSoundReturnComplete = function (e) {
        if (Main.os != "Android") {
            var sound = e.currentTarget;
            sound.stop();
            if (sound.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
            }
        }
        // const sub: SoundCompleteEvent = new SoundCompleteEvent(SoundCompleteEvent.data);
        // // 执行发布声音完成事件
        // this.dispatchEvent(sub);
        var evt = new SoundCompleteEvent(SoundCompleteEvent.data);
        evt.type = "";
        egret.MainContext.instance.stage.dispatchEvent(evt);
    };
    return CommonSoundManage;
}(UIObject));
__reflect(CommonSoundManage.prototype, "CommonSoundManage");
//# sourceMappingURL=CommonSoundManage.js.map