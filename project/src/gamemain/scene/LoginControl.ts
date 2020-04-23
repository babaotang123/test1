/*
  * 登录控制
  */

class  LoginControl {

    public static getInstance(): LoginControl {
        if (!LoginControl.instance) {
            LoginControl.instance = new LoginControl();
        }
        return LoginControl.instance;
    }

    private static instance: LoginControl;
    private loginView:LoginView;
    private userInfoView:UserInfoView;
    private endView:EndView;
    constructor() {

    }

    public init():void{
        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt,this.changeView,this);
    }

    public addLogin(): void {
        this.loginView = new LoginView();
        this.loginView.onAdd();
        egret.MainContext.instance.stage.addChild(this.loginView);
    }

    public changeView(evt):void{
        if(evt.data == "OpenUserView"){
            this.loginView.onDestroy();
            this.userInfoView = new UserInfoView();
            this.userInfoView.onAdd();
            egret.MainContext.instance.stage.addChild(this.userInfoView);
        }else if(evt.msgType == "EnterGame"){
            if(this.userInfoView){
                this.userInfoView.onDestroy();
            }
            if (egret.Capabilities.isMobile == true){
                     egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                     if(  egret.MainContext.instance.stage.stageHeight / egret.MainContext.instance.stage.stageWidth < 1.77 ){
                             egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
                    }else{
                             egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                    }
                    // var stageWidth = document.documentElement.clientWidth;
                    // var stageHeight = document.documentElement.clientHeight;
                     egret.MainContext.instance.stage.setContentSize(1024,600);
                     egret.MainContext.instance.stage.stage.orientation = egret.OrientationMode.LANDSCAPE;
                     egret.MainContext.instance.stage.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
                }
            CommunicationManager.getInstance().goTargetPageHandle(1);
        }else if(evt.msgType == "OpenEndView"){
            if(this.userInfoView){
                this.userInfoView.onDestroy();
            }
            this.endView = new EndView();
            egret.MainContext.instance.stage.addChild(this.endView);
        }else if (evt.msgType == "review"){
            const obj = evt.data;

            if(evt.data["wrong"]){
                ConfigDataJson.getInstance().rightCount = obj["score"];
                ConfigDataJson.getInstance().erroCount = obj["wrong"];// 错题数
                ConfigDataJson.getInstance().setAge(Main.birthday);
                ConfigDataJson.getInstance().totalTime = obj["cost"];// 耗时
                const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
                evt.msgType = "OpenEndView";
                egret.MainContext.instance.stage.dispatchEvent(evt);
            }else{

                const curMsgType = "EnterGame";
                const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
                evt.msgType = curMsgType;
                egret.MainContext.instance.stage.dispatchEvent(evt);
                // CommunicationManager.getInstance().goTargetPageHandle(1);
            }
        }
    }

}
