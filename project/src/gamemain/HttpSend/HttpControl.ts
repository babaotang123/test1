/*
  * HTTP请求
  */

class  HttpControl {

    public static getInstance(): HttpControl {
        if (!HttpControl.instance) {
            HttpControl.instance = new HttpControl();
        }
        return HttpControl.instance;
    }

    private static instance: HttpControl;
    private curMsgType:string;

   // public  tokenId:string;
    private loginData:LoginData;
    private xmlhttpRequest:XMLHttpRequest;
    private curUrlStr = "https://server.everobo.com/machine"; // 目前这个是测试环境
    private curData:any;
    constructor() {
      this.initRequest();
    }

    // 验证码请求
    public sendCodeMsg(data:Object): void {
        this.curMsgType = "code"
        const phone = data["phone"];
        const _url = this.curUrlStr+"/user/sendverifycode/"+phone;
        this.sendMsg(_url,data);
    }

     // 登录请求
    public sendLoginGameMsg(data:Object): void {
        this.curMsgType = "login";
        const phone = data["phone"];
        const _url = this.curUrlStr+"/user/"+Main.devId+"/login/"+phone;
        this.sendMsg(_url,data);
    }

     // 发送评测结果请求
    public sendReviewResultsmsg(data:Object):void{
        this.curMsgType = "review";
        const id = data["id"];
        const _url = this.curUrlStr+"/content/"+Main.devId+"/report/"+id;
        const Authorization = "Bearer "+Main.tokenId;
        this.sendMsg(_url,data,Authorization,"get");
    }

    // 提交用户信息
    public sendMsgUserInfo(data:Object):void{
        this.curMsgType = "UserInfo";
        const Authorization = "Bearer "+Main.tokenId;
        const request = new egret.HttpRequest();
        const _url = this.curUrlStr+"/user/"+Main.devId;
        this.sendMsg(_url,data,Authorization);
    }

    // 上传学习记录
    public sendStudyInfo(data:Object):void{
        this.curMsgType = "studyInfo";
        const Authorization = "Bearer "+Main.tokenId;
        const request = new egret.HttpRequest();
        const _url = this.curUrlStr+"/upload/"+Main.devId+"/content";
        this.sendMsg(_url,data,Authorization);
    }

    public getSelf():any{
        return this
    }

    private initRequest():void{
        if(!this.xmlhttpRequest){
            this.xmlhttpRequest = new XMLHttpRequest();
        }
    }

    // 统一HTTP请求接口
    private sendMsg(_url:string,_data:Object,_Authorization:string ="",_type:string ="post",):void{
     //    ConfigDataJson.getInstance().showHttpSendWait(this.curMsgType);
         if(this.curMsgType == "studyInfo"){
             ConfigDataJson.getInstance().isUploadData = true;
         }
         _data = JSON.stringify(_data);
         this.curData = _data;
         egret.log("发送消息："+this.curMsgType+_data);
         this.xmlhttpRequest.onreadystatechange = this.onPostComplete;
         this.xmlhttpRequest.open(_type, _url, true);
         this.xmlhttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8;");
         if(_Authorization!=""){
             this.xmlhttpRequest.setRequestHeader("Authorization", _Authorization);;
         }
         if(_data){
             this.xmlhttpRequest.send(_data);
         }else{
             this.xmlhttpRequest.send();
         }
    }

    private onPostComplete(evt):void {
        const _readyState = evt.target.readyState;
        const _status = evt.target.status;
        const self = HttpControl.getInstance().getSelf();
        let data = evt.target.response;
        egret.log("_readyState状态："+_readyState+"  _status "+_status);
        if(_readyState == 4&&_status == 200){
               // WaitManager.getInstance().hideWaritPanel();

                egret.log(self.curMsgType+": succes"+"--数据-："+evt.target.response);
                if(data!==""){
                    data = JSON.parse(evt.target.response);
                }
                if(self.curMsgType == "login"){
                    data = new LoginData(data);
                }
                if(self.curMsgType == "UserInfo"){
                    self.curMsgType = "EnterGame";
                }

                if(this.curMsgType == "studyInfo"){
                    ConfigDataJson.getInstance().isUploadData = false;  //上传成功结束
                    if(ConfigDataJson.getInstance().isQuit){
                        ConfigDataJson.getInstance().sendQuitGameMsg();
                    }
                }
                self.dipatchHttpEvt(data,self.curMsgType);
         }else if(_readyState!=0&&_readyState == 4){
             if(this.curMsgType == "studyInfo"){
                    ConfigDataJson.getInstance().isUploadData = false;  //上传失败结束
                    //写本地
                    ConfigDataJson.getInstance().sendSaveRequest(this.curData);
             }
             // WaitManager.getInstance().hideWaritPanel();
             egret.log(self.curMsgType+": 失败  "+data);
         }
    }

    private dipatchHttpEvt(data,str):void{
        const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
        evt.msgType = str;
        evt.data = data;
        egret.MainContext.instance.stage.dispatchEvent(evt);
    }
}
