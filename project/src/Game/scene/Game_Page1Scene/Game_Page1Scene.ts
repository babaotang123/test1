class Game_Page1Scene extends UIObject {
    public static key: string = "Game_Page1Scene";

    public static isGameBegin:boolean;

    public static isclickShowBtn:boolean;
    private img_mask: eui.Rect;
    private gp_txt: eui.Group;
    private gp_ui: eui.Group;

    private jtAry: any[]; // 箭头
   // private wenhaoAry: any[]; // 问号

    private keyValueAyr: Object;
    private rightNum: any;
    private rightKey: any;  // 正确的字母

    private curScore_txt: eui.Label;
    private btn_playsound: eui.Image;
    private star_txt: eui.Label;
    private core_mask: eui.Image;
 //   private erroCount:number;


    private curSelectAry:any[];
    private curGameData:any;
    private anNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private anPos: egret.Point[];  // 答案位置
    private quPos: egret.Point[];   // 题目位置

    private levelNum: number = 2;
    private gp_time:eui.Group;

    private time_txt_0:eui.Label;

    // 倒计时图片
    private countImg:any[];
    private age:any;

    private curGameContrl:any;
    private curRect:any[];

    private loginVew:LoginView;
    private EndView:EndView;
    private gp_ok:eui.Group;
    private op_bg:eui.Image;
    private curQuindex:number = 0;
    private timer: egret.Timer;

    // 测试
    private txt_input:eui.TextInput;
    private testurl0:eui.TextInput;
    private btn_ok:eui.Group;
    private testurl: eui.Label;
    private test_btn:eui.Group;
    private djsAn:any;
    private curMp3Name:string;

    private begin_mask:eui.Rect;

    // 倒计时
    private countTotalTime = 30;
    private curTime:number;
    private fuc:any
    public constructor() {
        super();
        this.skinName = "Game_Page1Scene_Skin";
    }

    /** 每次进入 */
    public onAdd(): void {
        this.initScence();
        // this.showQuesPannel();
    }

    /** 这里进行移出场景的处理 **/
    public onDestroy(): void {
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
    }

    protected touchBeginMakedItemEvent(event: egret.TouchEvent): void {
        //  CommonSoundManage.getInstance().playSoundEffect("per_talk_mp3");
    }

    // 自定义声音播放完毕回调
    protected ChangeEvent(event: egret.Event): void {
        ConfigDataJson.getInstance().isPlay = false;
        this.playCountdownAnimation();
         // CommonSoundManage.getInstance().removeEventListener(SoundCompleteEvent.data,this.ChangeEvent,this);
      //   this.showAnswerView();
    }

    private initScence():void{
        this.initData();
        this.init();
        this.initImgEvent();
        // super.onAdd();
    }

    private clearTimeImg():void{
        egret.Tween.removeAllTweens();
        this.timer.reset();
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.fuc,this);
        for(const obj of this.countImg){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
        this.countImg = [];
    }

    private initData(): void {
         this.anNumAry = [];
         this.quNumAry = [];
         this.anPos = [];
         this.quPos = [];

         this.jtAry = [];
        // this.wenhaoAry = [];
         this.curSelectAry = [];
         this.countImg = [];
         this.txt_input.inputType ="ziti"
        // this.txt_input.prompt = "输入题号";
         this.txt_input.restrict = "A-Z 0-9"
         this.txt_input.textDisplay.size = 23;
         // this.curQuindex = 31;
         this.curQuindex = 0;

         this.loadConfig();

         this.time_txt_0.fontFamily = "ziti";
         this.time_txt_0.textColor = 0xF8F8FF;


         const starTime = Date.parse((new Date()+""));
         ConfigDataJson.getInstance().startTime = starTime;

        // 加载声音文件
       //  ResLoad.getInstance().LoadRes("Mp3_load", new Handler(this, this.onResourceMp3LoadComplete));
    }

    private onResourceMp3LoadComplete(): void {
        egret.log("加载声音完毕");
    }

    private onResUI_1_LoadComplete(): void {
        egret.log("UI1完毕");
    }

    private loadConfig():void{
        // 解析配置文件
         const url: string = "resource/config.json";
         const loader: egret.URLLoader = new egret.URLLoader();
         loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
         loader.addEventListener(egret.Event.COMPLETE, this.onConfComplete, this);
         loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onConfComplete, this);

         const request: egret.URLRequest = new egret.URLRequest(url);
         request.method = egret.URLRequestMethod.GET;
         loader.load(request);
    }

    private initImgEvent(): void {
     //   this.btn_playsound.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginMakedItemEvent, this);
     //   this.btn_back_gp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBtnBackEvent, this);
        this.test_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.testgameOver, this);
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showResult, this);

        this.gp_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameOver, this);
       // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.test, this);
        this.parent.stage.addEventListener(SoundCompleteEvent.data, this.ChangeEvent, this);
        this.addEventListener(GlobalEvent.evt,this.CountScoreEvt,this);
        this.parent.stage.addEventListener("jsNotifyts",this.doQuitMethod,this);
    }

     private doQuitMethod(event):void{
        //停止当前游戏
        egret.ticker.pause();

        this.parent.stage.removeEventListener("jsNotifyts",this.doQuitMethod,this);
        let data =JSON.parse(event.eventPhase) ;
        egret.log("退出游戏：");
        ConfigDataJson.getInstance().isQuit = "true";
        //上传数据
        this.upLoadStudyData();
    }

    private upLoadStudyData():void{
        //游戏没结束
        let s  = new Object();
        let p = ConfigDataJson.getInstance().CustomsData["power"][0];
        var endTime = Date.parse((new Date()+""));
        if(this.curSelectAry[this.curQuindex]){
             s["number"] = "L0000";
             s["type"] =  0;
             s["startTime"] = ConfigDataJson.getInstance().startTime;
             s["endTime"] = endTime;
            ConfigDataJson.getInstance().senStudydMsg(s);
        }else{
            //游戏结束了 数据走的另外的流程会本地保存，是否正在上传数据
            if(ConfigDataJson.getInstance().isUploadData != true){
                ConfigDataJson.getInstance().sendQuitGameMsg();
            }
        }
    }

    private CountScoreEvt(evt):void{
        if(evt.b){
           ConfigDataJson.getInstance().rightCount++;
        }else{
            ConfigDataJson.getInstance().erroCount++;
        }
        const curTime = this.curTime - this.countTotalTime;
        ConfigDataJson.getInstance().totalTime += curTime;
        // egret.log("答对次数---"+ConfigDataJson.getInstance().rightCount);
        // egret.log("答错次数---"+ConfigDataJson.getInstance().erroCount);
        // egret.log("总用时---"+ConfigDataJson.getInstance().totalTime);
    }

    private test():void{
        this.loginVew = new LoginView();
        this.addChild(this.loginVew);
        this.onDestroy();
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.test, this);
       // CommunicationManager.getInstance().goTargetPageHandle(1);
    }

    private showResult():void{
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        this.curGameContrl.showGameOverData();
    }

    private gameOver(evt):void{
       if(evt!=null){
          // CommonSoundManage.getInstance().playSoundEffect("click_mp3");
       }

       if(!Game_Page1Scene.isGameBegin) {return; }
       this.stopTime();

       this.curGameContrl.setGameOverData();
       this.curGameContrl.onDestroy();
       if(this.curSelectAry[this.curQuindex]){
           this.startRandomQues();
         //  this.playCountdownAnimation();
       }else{
           this.EndView = new EndView();
           this.addChild(this.EndView);
           // 结束
       }
       // this.curGameContrl.setGameOverData();
    }

    private testgameOver():void{
       // Game_Page1Scene.isGameBegin = true;
        const n = parseInt(this.txt_input.text);
        if(this.txt_input.text!=""&&n>=1&&n<=96){
            this.curQuindex =n-1;
            this.gameOver(null);
        }
    }

    private init(): void {
      // this.playCountdownAnimation();
       let okBtn = CommonDragonBones.getInstance().getMoviclip("okbtn");
       okBtn.x = this.gp_ok.x;
       okBtn.y = this.gp_ok.y;
       okBtn.play(-1);
       this.addChild(okBtn);
    }

    // D4350B红  FFFF00
    private timeControl():void {
        this.timer = new egret.Timer(1000);
        this.curTime = this.countTotalTime;
        this.timer.addEventListener(egret.TimerEvent.TIMER,function p(){
            this.fuc = p;
            this.countTotalTime--;
           // this.time_txt_0.textColor = "0xFFFF00";
            if(this.countTotalTime==19){
                this.time_txt_0.textColor = 0xFFFF00;
            }else if(this.countTotalTime==9){
                this.time_txt_0.textColor = 0xD4350B;
            }
            this.time_txt_0.text= this.countTotalTime.toString();
            if(this.countTotalTime == 0){
                const curTime = this.curTime - this.countTotalTime;
                ConfigDataJson.getInstance().totalTime += curTime;
                ConfigDataJson.getInstance().erroCount++;
                this.timer.removeEventListener(egret.TimerEvent.TIMER,p,this);
                this.timer.stop();
                this.timer.reset();
                this.gameOver(null);
                return;
            }
        },                          this);
        this.timer.start();
    }

    // 3秒倒计时开始动画
    private playCountdownAnimation():void{
        this.djsAn = this.getMc("djs");
        this.djsAn.play();
        this.addChild(this.djsAn);
        Game_Page1Scene.isGameBegin = false;
        this.djsAn.addEventListener(zmovie.ZMovieClip.EVENT_FRAME_COMPLETE, this.completeZmovieAct, this);
    }

    private completeZmovieAct(evt){
        const tag = evt.currentTarget;
        tag.removeEventListener(zmovie.ZMovieClip.EVENT_FRAME_COMPLETE, this.completeZmovieAct, this);
        tag.gotoAndStop(0);
        Game_Page1Scene.isGameBegin = true;
        this.timeControl();
        this.begin_mask.visible = false;
    }

    private getMc(str:string,n=0):any{
        const s =  str;
        let s1;
        let s2;
        if(n==0){
            s1 = s+"_0_json";
            s2 = s+"_json";
        }else if(n==1){
            s1 = s+"_1_json";
            s2 = s+"_json";
        }else if(n == 10){
            s1 = s+"0_json";
            s2 = s+"_json";
        }
        
        const  mc = new zmovie.ZMovieClip(s1,RES.getRes(s2));
        if(s=="djs"){
            mc.gotoAndStop(0);
            mc.x = 512;
            mc.y = 300;
            mc.isLoop = false;
            mc.scaleX = mc.scaleY = 0.2;
            mc.anchorOffsetX = mc.width/2;
            mc.anchorOffsetY = mc.height/2;
        }else{
            mc.play();
        }
        return mc
    }

    // 取出对应年龄段的题库
    private getQus(age): any[] {
        const _ary = [];
        const a1 = ConfigDataJson.getInstance().CustomsData["GameNumber"];
        const a2: any[] = ConfigDataJson.getInstance().CustomsData["GameConfig"];
        let ary_1 = JSON.parse(JSON.stringify(a1));
        const ary_2 = JSON.parse(JSON.stringify(a2));
        let index = 0;
        if(age<3){
            index = 0;
        }else if(age>=3&&age<3.5){
            index = 1;
        }else if(age>=3.5&&age<4){
            index = 2;
        }else if(age>=4&&age<5){
            index = 3;
        }else if(age>=5&&age<6){
            index = 4;
        }else if(age>=6&&age<7){
            index = 5;
        }else if(age>=7&&age<8){
            index = 6;
        }else if(age>=8){
            index = 7;
        }else{
            return [];
        }

        ary_1 = (ary_1[index]).num.split(" ");
        for(const obj of ary_1){
            const i = ary_1.indexOf(obj);
            for(const _obj of ary_2){
                 const _index = ary_2.indexOf(_obj);
                 const id = ary_2[_index].condition_id;
                 if(obj == id){
                    _ary.push(_obj);
                }
            }
        }
        return _ary;
    }

       // 随机选出一道题目的元素,可能优先选出背景
    private  startRandomQues(): void {
        if(!this.curSelectAry){
            this.curSelectAry = [];

        }
        this.op_bg.visible = true;
        if (this.curSelectAry.length == 0) {
            // 先随机拼题库，然后顺序出题
            // const a2: any[] = ConfigDataJson.getInstance().CustomsData["GameConfig"];
            // this.curSelectAry = a2;

        // 根据年龄出题
           egret.log("当前年龄:  "+ConfigDataJson.getInstance().age);
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
           if(this.curSelectAry[this.curQuindex]){
                this.curGameData = this.curSelectAry[this.curQuindex];
                this.curQuindex++;
           }else{
               // 结束
               this.visible = false;
               this.onDestroy();
               const endView= new EndView();
               this.addChild(endView);
               return
           }
          //  this.curSelectAry.splice(rand, 1);
        }else{
            return
        }
        this.testurl.text ="游戏ID: "+this.curGameData.condition_id;
        // 倒计时显示
        this.time_txt_0.text = this.curGameData.timeout;
        this.countTotalTime = parseInt(this.curGameData.timeout);
        this.curMp3Name = this.curGameData.condition_id+"_mp3";
        CommonSoundManage.getInstance().stopAllSound();
        CommonSoundManage.getInstance().playSoundReturn(this.curMp3Name);
        this.doBuildGameData();
        this.addChild(this.begin_mask);
        this.begin_mask.visible = true;
    }

    private doBuildGameData():void{
        const str = this.curGameData.Game_type;
        switch(str){
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
    }

    private showQuestionsView(): void {
        // if (this.quNumAry.length == 0) {
        //     this.startRandomQues();
        // }
        if(this.curGameContrl){
            this.curGameContrl.showQuestionsView();
        }
        // 显示UI
        // this.gp_ui.visible = true;
        // this.showAnswerView();
    }

    private onConfComplete(event: egret.Event): void {
        if (event.type == "complete") {
            const loader: egret.URLLoader = event.target as egret.URLLoader;
            const data: egret.URLVariables = loader.data;
            loader.removeEventListener(egret.Event.COMPLETE, this.onConfComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onConfComplete, this);
            ConfigDataJson.getInstance().CustomsData = JSON.parse(loader.data);
            this.startRandomQues();
        } else {
            // 加载出错
        }
    }
    private testSound(): void {
        CommonSoundManage.getInstance().panelSoundAry = ["d1_mp3", "10_mp3", "d4_mp3", "d2_mp3", "20_mp3", "d3_mp3"];
        CommonSoundManage.getInstance().playPanelEffect();
    }

    // 移除图片
    private clearMc(): void {

        for (const obj of this.quNumAry) {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        this.quNumAry = [];
        this.rightNum = [];
    }

    private stopTime():void{
        egret.Tween.removeAllTweens();
        if(this.timer){
            this.timer.reset();
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.fuc,this);
        }
        if(this.djsAn){
            this.djsAn.dispose();
        }
        // for(let obj of this.countImg){
        //     if(obj){
        //         obj.visible = true;
        //     }
        // }
    }

    private clearRemoveAllEvt(): void {
        CommonSoundManage.getInstance().removeEventListener(SoundCompleteEvent.data, this.ChangeEvent, this);
    }
}
