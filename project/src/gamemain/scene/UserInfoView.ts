class UserInfoView extends UIObject {

    private btn_ok:eui.Button;
    private img_0:eui.Image;
    private img_1:eui.Image;
    private img_2:eui.Image;

    private label_0:egret.TextField;
    private label_1:egret.TextField;
    private tips_0:eui.Label;
    private tips_1:eui.Label;
    private tips_2:eui.Label;
    private sexGpAry:any[];
    private sexgp_1:eui.Group;
    private sexgp_2:eui.Group;
    private curSexNum:number;
    private userInfoData:UserInfoData;
    private curBirthDate:string;

    // 提交用户信息进入游戏
    private curlongitude:string;
    private curlatitude:string;
    private curlocation:string;
    public constructor() {
        super();
        this.skinName = "UserInfoView_Skin";
        //  if(egret.Capabilities.isMobile == true){
        //     this.skinName = "UserInfoView_h_Skin";
        // }else{
        //     this.skinName = "LoginView_Skin";
        // }
    }

    public onAdd(): void {
        this.initScene();
        this.initAddEvent();
    }

    public onDestroy():void{
        this.clearEvt();
        this.sexGpAry =[];
        this.curSexNum = -1;
        if(this.parent){
             egret.MainContext.instance.stage.removeChild(this);
        }
    }

    /** 初始化场景 */
    private initScene(): void {
        this.curSexNum = -1;
        this.sexGpAry =[];
        this.sexGpAry.push(this.sexgp_2);
        this.sexGpAry.push(this.sexgp_1);
        this["sex_1"].fontFamily = "ziti";
        this["sex_2"].fontFamily = "ziti";
        this.showText();
    }

        /** 初始化监听 */
    private initAddEvent(): void {
        for(const obj of this.sexGpAry){
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickSexHand, this);
        }
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnComitBegin, this);
        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt,this.httpMsgRetun,this);
    }

    private clickSexHand(event:egret.TouchEvent):void{
        for(const obj of this.sexGpAry){
            this.curSexNum = this.sexGpAry.indexOf(obj);
            if(obj){
                const bg = (obj.$children)[0];
                const txt = ((obj.$children)[1]) as egret.TextField;
                txt.textColor = 0xafafaf;
                bg.visible = false;
            }
        }
        const gp = event.currentTarget;
        const bg = (gp.$children)[0];
        const txt = ((gp.$children)[1]) as egret.TextField;
        txt.textColor = 0xFFFFFF;
        bg.visible = true;
        this.tips_2.text = "";
    }

    // 初始化输入框
    private showText():void{
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

                curText.size = 30;                // 设置字号大小
                curText.textColor = 0x009900;     // 设置字体颜色
                curText.textAlign = egret.HorizontalAlign.CENTER;
                curText.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.addChild(curText);
                curText.x = this["img_"+i].x;
                curText.y = this["img_"+i].y;
                if(i==1){
                    curText.maxChars = 8;
                    curText.type = egret.TextFieldType.INPUT;
                    curText.textColor = 0xafafaf;
                    curText.text = "格式19930501";
                    curText.restrict = "0-9";
                }else{
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
            if(this.label_1.text == "格式19930501"){
                    this.label_1.text ="";
                    this.label_1.textColor = 0x009900;
                }
            break;
        }
    }

    private txtFocusOutEvt (evt):void{
        const targ = evt.currentTarget;
        const name = targ.name;
        switch(name){
            case "label_0":
            break;
             case "label_1":
                if(this.label_1.text == ""){
                   this.label_1.text ="格式19930501";
                   this.label_1.textColor = 0xafafaf;
                }
                break;
        }
    }

    private txtChangeEvt(evt):void{
        const targ = evt.currentTarget;
        const name = targ.name;
    }
    private clickBtnComitBegin():void{
        this.curlongitude = "";
        this.curlatitude = "";
        this.curlocation = "";
        if(this.cheackInputTxt()){
            if(this.cheackBirth()){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(this.onSuccess , this.onError);
                    }else{
                        alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
                    }
                const date = new Date(this.curBirthDate);
                const br = date.getTime();
                const obj = new Object();
                obj["deviceId"] = Main.devId;
                obj["name"] = this.label_0.text;
                obj["birthday"] = br;
                obj["sex"] = this.curSexNum;
                obj["longitude"] = this.curlongitude;
                obj["latitude"] = this.curlatitude;
                obj["location"] = this.curlocation;
                HttpControl.getInstance().sendMsgUserInfo(obj);
            }
        }
    }

    private cheackInputTxt():boolean{
        let b = false;
        const str = ""
        if(this.label_0.text ==""){
            this.tips_0.text = "请填写宝宝昵称";
            return
         }
        if(this.curSexNum == -1){
             this.tips_2.text = "请选择宝宝性别";
             return
         }
        if(this.label_1.text =="格式19930501"){
            this.tips_1.text = "请填写宝宝生日";
            return
         }
        b = true;
        return b
    }

    private httpMsgRetun(msg):void{
        // if(msg.msgType == "EnterGame"){
        //     //  egret.MainContext.instance.stage.addChild(this.loginView);
        //     //  CommunicationManager.getInstance().goTargetPageHandle(1);
        // }
    }

    private cheackBirth():boolean{
        let isRight = false;
        const str = "";
        const age = this.label_1.text;

        const y = age.substring(0,4);
        const m = age.substring(4,6);
        const d = age.substring(6,8);
        const _str = y+"-"+m+"-"+d;
        this.curBirthDate = _str;
        let b =  ConfigDataJson.getInstance().getAge(_str);
        const numAry:any[] = b.split(":");
        if(numAry.length==2||numAry.length==3){
                let m =parseInt(numAry[1]);
                if(m<6){
                    m =0;
                }else{
                    m =0.5;
                }
                b =parseFloat(numAry[0]+"."+numAry[1]);
            }

        if(b>=2.5&&b<=7){
                isRight = true;
                ConfigDataJson.getInstance().age = b;
            }else if(b<2.5||b>7){
                b = "此测试只针对2.5至7周岁的儿童";
                this.tips_1.text = b;
                isRight = false
            }else{
                this.tips_1.text = b;
                isRight = false
            }
        return isRight
    }


    private onSuccess(position){
        this.curlongitude = position.coords.latitude;
        this.curlatitude = position.coords.longitude;
    }

    private onError(error) {
        switch(error.code)
        {
            case error.PERMISSION_DENIED:
           // alert("您拒绝对获取地理位置的请求");
            break;
            case error.POSITION_UNAVAILABLE:
           // alert("位置信息是不可用的");
            break;
            case error.TIMEOUT:
           // alert("请求您的地理位置超时");
            break;
            case error.UNKNOWN_ERROR:
           // alert("未知错误");
            break;
        }
    }

    private clearEvt():void{
        for(const obj of this.sexGpAry){
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickSexHand, this);
        }
        this.btn_ok.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickBtnComitBegin, this);
        egret.MainContext.instance.stage.removeEventListener(GlobalEvent.evt,this.httpMsgRetun,this);
    }
}
