class CommonSoundManage extends UIObject {
    public static getInstance(): CommonSoundManage {
        if (!CommonSoundManage.instance) {
            CommonSoundManage.instance = new CommonSoundManage();
        }
        return CommonSoundManage.instance;
    }

    private static instance: CommonSoundManage;

    // 播放面板成绩的声音专属
    public  panelSoundAry = [];
  //  private isPlay: boolean = false;
   // private mp3Url:string = "/resource/Game/assets/Game_page_scene1/";
    private AppMp3Url: string = "/sdcard/t1/resource/Game/assets/mp3/";
    private mp3: any;
    private sound: egret.Sound;
    private channel: egret.SoundChannel;
    private curSoundIndex: number = 0;
   // private AppMp3Url:string = "/resource/Game/assets/Game_page_scene1/";
    constructor() {
        super();
    }

      /** 随机一个正确或错误音效 */
    public randomSoundEffect(soundType: number): void {
        const rand: number = soundType == 1 ? App.RandomUtils.limitInteger(1, 3) : App.RandomUtils.limitInteger(1, 2);
        let soundName: string = "";
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
        } else if (soundType == 2) {
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

        if ( ConfigDataJson.getInstance().isPlay) {return; }
        if (Main.os == "Android") {
            soundName = soundName.replace("_mp3", ".mp3");
            const mp3Url = this.AppMp3Url + soundName;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            const thisSelf = this;
            this.mp3.addEventListener("ended", function() {
                ConfigDataJson.getInstance().isPlay = false;
                removeEventListener("ended", function() {
                },                  false);
            },                        false);
        } else {
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
    }

    // 一般播放声音
    public playSoundEffect(soundName: string): void {
        if ( ConfigDataJson.getInstance().isPlay) {return; }
        if (Main.os == "Android") {
            soundName = soundName.replace("_mp3", ".mp3");
            const mp3Url = this.AppMp3Url + soundName;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            const thisSelf = this;
            this.mp3.addEventListener("ended", function() {
                ConfigDataJson.getInstance().isPlay = false;
                removeEventListener("ended", function() {
                },                  false);
            },                        false);
        } else {
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
     }

    public playPanelEffect(): void {
        if ( ConfigDataJson.getInstance().isPlay) {return; }
        const name = this.panelSoundAry[this.curSoundIndex];
        if (Main.os == "Android") {

            const mp3Url = this.AppMp3Url + name;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            const thisSelf = this;
            this.mp3.addEventListener("ended", function() {
                ConfigDataJson.getInstance().isPlay = false;
                removeEventListener("ended", function() {
            //  alert(123)
            },                      false);
            },                        false);
        } else {
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
        this.curSoundIndex ++;
     }

    // 需要返回状态的
    public async playSoundReturn(soundName: string) {
        egret.log( ConfigDataJson.getInstance().isPlay);
        if ( ConfigDataJson.getInstance().isPlay) {return; }
        if (Main.os == "Android") {
            soundName = soundName.replace("_mp3", ".mp3");
            const mp3Url = this.AppMp3Url + soundName;
            this.mp3 = new Audio(mp3Url);
            this.mp3.play();
            ConfigDataJson.getInstance().isPlay = true;
            const thisSelf = this;
            this.mp3.addEventListener("ended", function() {
               ConfigDataJson.getInstance().isPlay = false;
               thisSelf.onSoundReturnComplete(null);
               removeEventListener("ended", function() {
            //  alert(123)
            },                     false);
            },                        false);
        } else {
             await RES.getResAsync(soundName);
             const sound: egret.Sound = RES.getRes(soundName);
             if (!sound) {
            //   this.overAct();
                return;
             }
             ConfigDataJson.getInstance().isPlay = true;
             const channel: egret.SoundChannel = sound.play(0, 1);
             channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundReturnComplete, [3]);
        }
     }

    // 停止所有声音
    public stopAllSound(): void {
       if (this.sound) {
            if (this.sound.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                this.sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
            }
       }
       if (this.channel) {
            this.channel.stop();
       }
    }

     // 关闭音效
    private onSouncComplete(e: egret.Event): void {
        const channel: egret.SoundChannel = e.currentTarget;
        channel.stop();
        ConfigDataJson.getInstance().isPlay = false;
        if (channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
            channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
    }

    private onSoundComplete(e: egret.Event): void {
        const sound: egret.SoundChannel = e.currentTarget;
        sound.stop();
        ConfigDataJson.getInstance().isPlay = false;
        if (sound.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
        }
        if (this.curSoundIndex <= 4) {
            this.playPanelEffect();
        } else {
            this.curSoundIndex  = 0;
        }
    }

    private onSoundReturnComplete(e: egret.Event): void {
        if (Main.os != "Android") {
            const sound: egret.SoundChannel = e.currentTarget;
            sound.stop();
            if (sound.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                sound.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSouncComplete, this);
            }
        }
        // const sub: SoundCompleteEvent = new SoundCompleteEvent(SoundCompleteEvent.data);
        // // 执行发布声音完成事件
        // this.dispatchEvent(sub);
        const evt: SoundCompleteEvent = new SoundCompleteEvent(SoundCompleteEvent.data);
        evt.type = "";
        egret.MainContext.instance.stage.dispatchEvent(evt);
    }

}
