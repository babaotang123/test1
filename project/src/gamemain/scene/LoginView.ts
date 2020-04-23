declare function clearGif();
//declare function restleave();
class LoginView extends UIObject {

    private btn_ok:eui.Button;
    private btn_code:eui.Button;
    private img_0:eui.Image;
    private img_1:eui.Image;

    private label_0:egret.TextField;
    private label_1:egret.TextField;
    private tips_0:eui.Label;
    private tips_1:eui.Label;
    private txt_djs:eui.BitmapLabel;
    private timer: egret.Timer;
    private countTime:number;
    private gp_djs:eui.Group;

    public constructor() {
        super();
        this.skinName = "LoginView_Skin";
        // if(egret.Capabilities.isMobile == true){
        //     this.skinName = "LoginView_h_Skin";
        // }else{
        //     this.skinName = "LoginView_Skin";
        // }
    }

    public onAdd(): void {
        this.initScene();
        this.initAddEvent();
    }

    public txtFocusOutEvt (evt):void{
        const targ = evt.currentTarget;
        const name = targ.name;
        const b =  ConfigDataJson.getInstance().checkMobile(this.label_0.text);
        if(!b){
             this.tips_0.text = "请填写正确的手机号";
         }
       // restleave();
    }

    public onDestroy():void{
        this.clearEvt();
        this.txt_djs.text = "";
        this.timer.reset();
        this.timer.stop();
        this.btn_code.visible = true;
        this.gp_djs.visible = false;
        this.countTime = 20;
        egret.MainContext.instance.stage.removeChild(this);

    }

    /** 初始化场景 */
    private initScene(): void {
        this.countTime = 20;
        this.gp_djs.visible = false;
        this.showText();
        // ResLoad.getInstance().LoadRes("UI_load", new Handler(this, this.onResUILoadComplete));
        // ResLoad.getInstance().LoadRes("UI_load_1", new Handler(this, this.onResUILoadComplete));
        clearGif();

    }

        /** 初始化监听 */
    private initAddEvent(): void {
         this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnLoginBegin, this);
         this.btn_code.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnCodeBegin, this);
         egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt,this.httpMsgReturn,this);
    }

    // 初始化输入框
    private showText():void{
          // 登录的输入框
           for(let i=0;i<2;i++){
                this["label_"+i] = new egret.TextField();
                const curText = this["label_"+i];
                curText.fontFamily = "ziti";  // 设置字体
                curText.text = "";         // 设置文本内容
                curText.type = egret.TextFieldType.INPUT;
                curText.width = 241;
                curText.height = 41;
                curText.name = "label_"+i;
                curText.maxChars = 14;
                // curText.restrict = "0-9";
                curText.size = 30;                // 设置字号大小
                curText.textColor = 0x009900;     // 设置字体颜色
                curText.textAlign = egret.HorizontalAlign.CENTER;
                curText.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.addChild(curText);
                curText.x = this["img_"+i].x;
                curText.y = this["img_"+i].y;
                if(i==1){
                    curText.maxChars = 6;
                }
                curText.addEventListener(egret.TouchEvent.FOCUS_IN,this.txtFocusInEvt,this);
                curText.addEventListener(egret.TouchEvent.FOCUS_OUT,this.txtFocusOutEvt,this);
                curText.addEventListener(egret.Event.CHANGE,this.txtChangeEvt,this);
           }
    }

    private txtFocusInEvt (evt):void{
        const targ = evt.currentTarget;
        const name = targ.name;
        switch(name){
            case "label_0":
                this.tips_0.text = "";
                break;
            case "label_1":
                this.tips_1.text = "";
                this.label_1.textColor = 0x009900;
                this.label_1.text = "";
                break;
        }
        //restleave();
    }

    private txtChangeEvt(evt):void{
        const targ = evt.currentTarget;
        const name = targ.name;
    }

    // 登录
    private clickBtnLoginBegin():void{
        if(this.cheackInputTxt()){
            const obj = new Object();
            obj["phone"] = this.label_0.text;
            // obj["code"] = this.label_1.text;
            obj["code"] = "000000"; // 测试用的
            HttpControl.getInstance().sendLoginGameMsg(obj);
        }
    }

    // 获取验证码
    private clickBtnCodeBegin():void{
        if(this.label_0.text!=""){
            const b =  ConfigDataJson.getInstance().checkMobile(this.label_0.text);
            if(!b) {return }

            this.startDjs();

            const obj = new Object();
            obj["phone"] = this.label_0.text;
            HttpControl.getInstance().sendCodeMsg(obj);
        }else{
            this.cheackInputTxt();
        }
    }

    private cheackInputTxt():boolean{
        let b = false;
        const str = ""
        if(this.label_0.text ==""){
            this.tips_0.text = "请填写手机号";
            return
         }
        b =  ConfigDataJson.getInstance().checkMobile(this.label_0.text);
        if(!b){
             this.tips_0.text = "请填写正确的手机号";
             return b
         }
        if(this.label_1.text ==""){
            this.tips_1.text = "请输入验证码";
            return
         }
        b = true;
        return b
    }

    private httpMsgReturn(msg):void{
        if(msg.msgType == "login"){
            if(msg.data["code"]){
                const code = msg.data["code"];
                if(code == 400){
                    this.tips_1.text = "验证码有误";
                }
            }else if(msg.data["token"]!=""){
                Main.tokenId = msg.data["token"];
                // 登录成功
                const br = msg.data["birthday"];
                ConfigDataJson.getInstance().setAge(br);
                if(br == 0){
                    // 没有信息需要填写
                    const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
                    evt.data = "OpenUserView";
                    egret.MainContext.instance.stage.dispatchEvent(evt);
                }else{
                    // 获取评测结果
                    const self = this;
                    const idTimeout= setTimeout(function () {
                        egret.clearTimeout(idTimeout);
                        self.getReviewResults();
                    },                          500);
                }
            }
        }
        if(msg.msgType == "review"){ // 评测结果 如果有显示结果 没有进入游戏
            if(msg.data["wrong"]){
                ConfigDataJson.getInstance().rightCount = msg.data["score"];
                ConfigDataJson.getInstance().erroCount = msg.data["wrong"];// 错题数
                // ConfigDataJson.getInstance().age = msg.data[""];
                ConfigDataJson.getInstance().totalTime = msg.data["cost"];// 耗时
                const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
                evt.msgType = "OpenEndView";
                egret.MainContext.instance.stage.dispatchEvent(evt);
            }else{
                this.onDestroy();
                const curMsgType = "EnterGame";
                const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
                evt.msgType = curMsgType;
                egret.MainContext.instance.stage.dispatchEvent(evt);
                // CommunicationManager.getInstance().goTargetPageHandle(1);
            }
        }
    }

    // 获取评测结果
    private getReviewResults():void{
          const obj = new Object();
          obj["deviceId"] = Main.devId;
          obj["id"] = 1;
          obj["number"] = "L0000";
          HttpControl.getInstance().sendReviewResultsmsg(obj);
    }

    // 启动倒计时器
    private startDjs():void{
        this.gp_djs.visible = true;
        this.txt_djs.text = this.countTime+"";
        this.btn_code.visible = false;
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER,(event:egret.TimerEvent) =>{
            this.countTime--;
            this.txt_djs.text = this.countTime+"";
            if(this.countTime <= 0){
                this.txt_djs.text = "";
                this.timer.reset();
                this.timer.stop();
                this.btn_code.visible = true;
                this.gp_djs.visible = false;
                this.countTime = 20;
                // this.timer.removeEventListener(egret.TimerEvent.TIMER);
            }
        },                          this);
        this.timer.start();
    }


    private onResUILoadComplete():void{
        egret.log("题库资源加载完成");
    }

    // 时间戳转换成日期,设置全局年龄


    private clearEvt():void{
        this.btn_ok.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnLoginBegin, this);
        this.btn_code.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnCodeBegin, this);
        egret.MainContext.instance.stage.removeEventListener(GlobalEvent.evt,this.httpMsgReturn,this);
    }
}
