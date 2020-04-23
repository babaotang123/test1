//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

declare function getWifiStatus();
declare function callAppKeyEvent(data);
declare function clearGif();
class Main extends eui.UILayer {
    public static os: string;
    public static devId:string ;
    public static tokenId:string;
    private static mode:string;
    public static birthday:string;

    private coursewareName: string;
    private resIndex: number;
    private current: number;
    protected createChildren(): void {
        // var mp3 = "/resource/Game/assets/Game_page_scene1/sdcq.mp3";
        // var _mp3 = new Audio(mp3);
        // _mp3.play();
        super.createChildren();

        this.coursewareName = "Game";
        this.resIndex = 0;

        this.initEgretConfig();

        // 初始化游戏相关的配置
        GM.init();
     //   Log.trace("version", "模板库的版本号：" + CoursewareDefines.version);

        this.addChild(GameLayerManager.gameLayer());

        this.runGame().catch((e) => {
            Log.trace("msg", e);
        });
    }

    private initEgretConfig(): void {
        // 生命周期
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin、
            context.onUpdate = () => {

            };
        });

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        };

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        };

        egret.ImageLoader.crossOrigin = "anonymous";
        // 设置最大并发加载线程数量 默认为4
        RES.setMaxLoadingThread(8);

        // inject the custom material parser
        // 注入自定义的素材解析器
        const assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
    }

    private async runGame() {
        await this.loadResource();
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/gamemain/default.res.json", "/resource");
            await RES.loadConfig("resource/" + this.coursewareName + "/" + this.coursewareName + ".res.json", "/resource");
            await this.loadTheme();
            await this.loadCoursewareTheme();

            ResLoad.getInstance().LoadRes("preload", new Handler(this, this.onResourceLoadComplete));
            ResLoad.getInstance().LoadRes(this.coursewareName + "_preload", new Handler(this, this.onResourceLoadComplete));
        } catch (e) {
            // tslint:disable-next-line: no-console
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            // 加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            const theme = new eui.Theme("resource/gamemain/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            },                     this);

        });
    }

    private loadCoursewareTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            // 加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            const theme = new eui.Theme("resource/" + this.coursewareName + "/" + this.coursewareName + ".thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            },                     this);

        });
    }

    /**
    * commonload
    */
    private onResourceLoadComplete(): void {
        this.resIndex++;
        if (this.resIndex >= 2 ) {
            CommunicationManager.getInstance().init(this.coursewareName);
            this.createGameScene();
        }
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    private createGameScene(): void {
           Main.devId = "a8f591b52d302e7181331";
           Main.mode = "0";
           Main.birthday = "1581929020123";
           Main.tokenId = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhOGY1OTFiNTJkMzAyZTcxODEzMzEtMTAwMDAwMDEiLCJleHAiOjE2Mjk2OTIxMzB9.x6GaOoeMe5LF-weQHrqHUMZy73o7EUys3YJ54IhXV6pgTFO1bWm7T6hrzUWeUxO13EdX-nLLdjNGnyF0Lhja8Q";
    //   if(DEBUG){
    //        Main.devId = "a8f591b52d302e7181331";
    //        Main.mode = "0";
    //        Main.birthday = "3.5";
    //        Main.tokenId = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhOGY1OTFiNTJkMzAyZTcxODEzMzEtMTAwMDAwMDEiLCJleHAiOjE2Mjk2OTIxMzB9.x6GaOoeMe5LF-weQHrqHUMZy73o7EUys3YJ54IhXV6pgTFO1bWm7T6hrzUWeUxO13EdX-nLLdjNGnyF0Lhja8Q";
    //   }
      // 测试用
    //   if(RELEASE){
    //       this.GetQueryString();
    //   }
      // 放到后台去下载
           const data = new Date();
           const ss = data.getSeconds();
           egret.log(ss+"秒");
           ResLoad.getInstance().LoadRes("UI_load", new Handler(this, this.onResUILoadComplete));
           ResLoad.getInstance().LoadRes("UI_load_1", new Handler(this, this.onResUILoadComplete));
    //  this.loadMp3Resource();

           ConfigDataJson.getInstance().mode = Main.mode;
           LoginControl.getInstance().init();

        if (egret.Capabilities.isMobile == true) {
            this.stage.orientation = egret.OrientationMode.LANDSCAPE;
            this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        }
        else {
            this.stage.orientation = egret.OrientationMode.AUTO;
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    //    this.stage.orientation = egret.OrientationMode.AUTO;
    //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;

           const s = egret.Capabilities;
           Main.os = GM.gamec.systemType();

           const lab = new eui.Label();
           lab.fontFamily = "ziti";
           lab.text = "1234567890";
           lab.x = -300;
           lab.visible =true;
           this.addChild(lab);

           const self = this;
           const id = setTimeout(function() {
                self.creatLoginView();
            },                   200);
    }

    // 获取url值
    private GetQueryString():void
    {
        Main.devId =ConfigDataJson.getInstance().getOption("deviceId");
        Main.tokenId = ConfigDataJson.getInstance().getOption("token");
        Main.mode = ConfigDataJson.getInstance().getOption("mode");
        Main.birthday = ConfigDataJson.getInstance().getOption("birthday");
        if(Main.birthday!=""){
            ConfigDataJson.getInstance().setAge(Main.birthday);
        }

        egret.log("获取URL-devID"+Main.devId);
        egret.log("获取URL-tokenId"+Main.tokenId);
        egret.log("获取URL-mode"+Main.mode);
        egret.log("获取URL-birthday"+Main.birthday);
    }

    private creatLoginView():void{
        if(Main.mode == "1"){// 普通模式直接获取结果
           clearGif();

           const obj = new Object();
           obj["deviceId"] = Main.devId;
           obj["id"] = 1;
           obj["number"] = "L0000";
           HttpControl.getInstance().sendReviewResultsmsg(obj);

        }else if(Main.mode == "0"){// 样机模式需要登录
            LoginControl.getInstance().addLogin();
        }
        // if(DEBUG){
        //     let _before = new egret.Shape();
        //     _before.graphics.beginFill(0x888888, 1);
        //     _before.graphics.drawRect(0, 0, 100, 100);
        //     _before.graphics.endFill();
        //     _before.x = 20+300;
        //     _before.y = 20;
        //     _before.touchEnabled = true;
        //     egret.MainContext.instance.stage.addChild(_before);

        //     let _after = new egret.Shape();
        //     _after.graphics.beginFill(0x888888, 1);
        //     _after.graphics.drawRect(0, 0, 100, 100);
        //     _after.graphics.endFill();
        //     _after.x = 140+300;
        //     _after.y = 20;
        //     _after.touchEnabled = true;
        //     egret.MainContext.instance.stage.addChild(_after);

        //     _before.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beforePage, this);
        //     _after.addEventListener(egret.TouchEvent.TOUCH_TAP, this.afterPage, this);
        // }
    }

    private async loadMp3Resource(){
        await ResLoad.getInstance().LoadRes("Mp3_load_1", new Handler(this, this.onResUILoadComplete));
        await ResLoad.getInstance().LoadRes("Mp3_load_2", new Handler(this, this.onResUILoadComplete));
        await ResLoad.getInstance().LoadRes("Mp3_load_3", new Handler(this, this.onResUILoadComplete));
        const self = this;
        // let id = setTimeout(function() {
        //     self.loadNextMp3Resource();
        //     egret.clearTimeout(id);
        // }, 6000);
    }

    private async loadNextMp3Resource(){
       egret.log("加载第4组资源");
       ConfigDataJson.getInstance().age = 5;
       CommunicationManager.getInstance().goTargetPageHandle(1);
       await  ResLoad.getInstance().LoadRes("Mp3_load_4", new Handler(this, this.onResUILoadComplete));
      // await  ResLoad.getInstance().LoadRes("Mp3_load_5", new Handler(this, this.onResUILoadComplete));
    }

    private onResUILoadComplete(evt):void{
        egret.log("题库资源组:"+evt+"加载完成");
        // if(evt == "UI_load"){
        //     CommunicationManager.getInstance().goTargetPageHandle(1);
        // }
        const data = new Date();
        const ss = data.getSeconds();
        egret.log(ss+"秒");
        if(evt == "Mp3_load_3"){
            this.loadNextMp3Resource();
        }
    }

    private beforePage(): void {
      const str =  getWifiStatus();
      egret.log("获取状态"+str);
       // let obj = getWifiStatus();
      //  egret.log(JSON.stringify(JSON.parse(obj)));


        // this.current--;
        // if (this.current <= 1) {
        //     this.current = 1;
        // }
        // Log.trace("debug", "跳转页:" + this.current);
        // CommunicationManager.getInstance().goTargetPageHandle(this.current);
    }

    private afterPage(): void {
        // let obj = new Object();
        // obj["lv"] = "0";
        // obj["day"] = "2"

        // this.current++;

        // if (this.current >= CommunicationManager.getInstance().coursewareArray.length) {
        //     this.current = CommunicationManager.getInstance().coursewareArray.length;
        // }
        // Log.trace("debug", "跳转页:" + this.current);
        // CommunicationManager.getInstance().goTargetPageHandle(this.current);
    }
}
