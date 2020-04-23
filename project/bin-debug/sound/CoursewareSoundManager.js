var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by win7 on 2017/3/15.
 * 声音管理类
 *
 * 播放背景音乐
 * SoundManager.Instance.playMusic("city_music");
 * 播放音效
 * SoundManager.Instance.playEffect("gan_effect");
 *
 */
var CoursewareSoundManager = (function () {
    function CoursewareSoundManager() {
        this._volume = 1; // 背景音乐
        this._effectVolume = 1;
        this._musicName = "";
        this._musicTurn = true;
        this._effectTurn = true;
        this._position = 0;
        this._musicDict = {};
    }
    Object.defineProperty(CoursewareSoundManager.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            if (this._volume != value) {
                this._volume = value;
                this.changeVolume();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoursewareSoundManager.prototype, "effectVolume", {
        get: function () {
            return this._effectVolume;
        },
        set: function (value) {
            if (this._effectVolume != value) {
                this._effectVolume = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoursewareSoundManager.prototype, "musicTurn", {
        get: function () {
            return this._musicTurn;
        },
        set: function (value) {
            if (this._musicTurn != value) {
                this._musicTurn = value;
                if (value) {
                    this.continueMusic();
                }
                else {
                    this.pauseMusic();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoursewareSoundManager.prototype, "effectTurn", {
        get: function () {
            return this._effectTurn;
        },
        set: function (value) {
            if (this._effectTurn != value) {
                this._effectTurn = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CoursewareSoundManager.getInstance = function () {
        if (CoursewareSoundManager._instance == null) {
            CoursewareSoundManager._instance = new CoursewareSoundManager();
        }
        return CoursewareSoundManager._instance;
    };
    CoursewareSoundManager.prototype.playMusic = function (name) {
        if (this._musicTurn == false) {
            return;
        }
        if (this._musicChannel) {
            this._musicChannel.stop();
            this._musicChannel = null;
        }
        this._musicSound = this.getSound(name);
        this._musicName = name;
        if (this._musicSound) {
            this._musicChannel = this._musicSound.play();
            this._musicChannel.volume = this.volume;
        }
        else {
            RES.getResAsync(name, this.loadMusicComplete, this);
        }
    };
    CoursewareSoundManager.prototype.pauseMusic = function () {
        if (this._musicChannel) {
            this._position = this._musicChannel.position;
            this._musicChannel.stop();
            this._musicChannel = null;
        }
    };
    /**所谓继续 从新开始播发 */
    CoursewareSoundManager.prototype.continueMusicK = function () {
        if (this._musicName != "") {
            this.playMusic(this._musicName);
        }
    };
    /**continueMusic 有问题 会有中断 间断 */
    CoursewareSoundManager.prototype.continueMusic = function () {
        if (this._musicSound && this._musicTurn) {
            if (this._musicChannel) {
                this._musicChannel.stop();
                this._musicChannel = null;
            }
            this._musicChannel = this._musicSound.play(this._position);
            this._musicChannel.volume = this.volume;
        }
    };
    CoursewareSoundManager.prototype.loadMusicComplete = function (data) {
        if (data) {
            this._musicSound = data;
            this._musicChannel = this._musicSound.play();
            this._musicChannel.volume = this.volume;
        }
    };
    CoursewareSoundManager.prototype.playEffect = function (name) {
        if (this._effectTurn == false) {
            return;
        }
        var effectSound = this.getSound(name);
        if (effectSound) {
            this._effectChanel = effectSound.play(0, 1);
            this._effectChanel.volume = this._effectVolume;
        }
        else {
            RES.getResAsync(name, this.loadEffectComplete, this);
        }
    };
    CoursewareSoundManager.prototype.loadEffectComplete = function (data) {
        if (data) {
            this._effectChanel = data.play(0, 1);
            this._effectChanel.volume = this._effectVolume;
        }
    };
    CoursewareSoundManager.prototype.getSound = function (name) {
        var sound;
        if (this._musicDict.hasOwnProperty(name)) {
            sound = this._musicDict[name];
        }
        else {
            if (RES.hasRes(name)) {
                sound = RES.getRes(name);
            }
        }
        return sound;
    };
    CoursewareSoundManager.prototype.changeVolume = function () {
        if (this._musicChannel) {
            this._musicChannel.volume = this._volume;
        }
    };
    return CoursewareSoundManager;
}());
__reflect(CoursewareSoundManager.prototype, "CoursewareSoundManager");
//# sourceMappingURL=CoursewareSoundManager.js.map