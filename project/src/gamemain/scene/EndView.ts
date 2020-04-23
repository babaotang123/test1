declare function clearGif();
class EndView extends UIObject {
    private score_txt:eui.Label;
    private time_txt_0:eui.Label;
    private time_txt_1:eui.Label;
    private levImg:eui.Image;
    private curLv:string;
    // 测试
    private age:eui.Label;
    private dui:eui.Label;
    private cuo:eui.Label;
    private time:eui.Label;
    public constructor() {
        super();
        this.skinName = "EndView_Skin";
        this.onAdd();
    }

    public onAdd(): void {
        this.initScene();
        this.initAddEvent();
    }

    /** 初始化场景 */
    private initScene(): void {
        clearGif();
        this.score_txt.text = "";
        this.time_txt_0.text = "";
        this.time_txt_1.text = "";

        // 获取分数 用时 和等级
        this.score_txt.text = (100-ConfigDataJson.getInstance().erroCount*3)+"";
        const t = this.getTime(ConfigDataJson.getInstance().totalTime);
        const timeAry = t.split(":");
        const shi =parseInt(timeAry[0]);
        const fen =parseInt(timeAry[1]);
        const miao = parseInt(timeAry[2]);

        this.time_txt_0.text = fen+"";
        this.time_txt_1.text = miao+"";

        const ageNum = ConfigDataJson.getInstance().age;
        // if(ageNum>2.5){
        //     egret.log("----tttttt"+ageNum);
        // }
        // let str ="lev_"+ConfigDataJson.getInstance().getStudyLevel(ConfigDataJson.getInstance().age,ConfigDataJson.getInstance().erroCount);
        // this.curLv = str;
        // let img = CommonDragonBones.getInstance().getElementImg(str);
        // this.levImg.texture = img.texture;

        this.dui.text = "答对的题目："+ConfigDataJson.getInstance().rightCount+"";
        this.cuo.text = "答错的题目："+ConfigDataJson.getInstance().erroCount+"";
        this.age.text = "年龄："+ConfigDataJson.getInstance().age+" 岁";
        this.time.text = "用时："+ConfigDataJson.getInstance().totalTime+" 秒";

        //  ConfigDataJson.getInstance().totalTime
        if(ConfigDataJson.getInstance().mode!="1"){
             this.upLoadStudyData();
        }
    }

    /** 初始化监听 */
    private initAddEvent(): void {

        egret.MainContext.instance.stage.addEventListener(GlobalEvent.evt,this.httpMsgReturn,this);
    }

    private httpMsgReturn(msg):void{
        if(msg.msgType == "studyInfo"){
            egret.log("上传成功");
        }
    }

    // 上传数据
    private upLoadStudyData():void{
        const endTime = Date.parse((new Date()+""));
        // 正确率
        let n = ConfigDataJson.getInstance().rightCount / (ConfigDataJson.getInstance().erroCount+ConfigDataJson.getInstance().rightCount)
        n =  (Math.round( n* 100) / 100.00 );
        const obj = new Object();
        obj["deviceId"] = Main.devId;
        obj["level"] = "1";
        obj["number"] = "L0000";
        obj["type"] = 0;
        obj["score"] = parseInt(this.score_txt.text);
        obj["startTime"] = ConfigDataJson.getInstance().startTime;
        obj["endTime"] = endTime;
        obj["duration"] = ConfigDataJson.getInstance().totalTime;
        obj["accuracy"] = n;
        obj["wrong"] = ConfigDataJson.getInstance().erroCount;
        HttpControl.getInstance().sendStudyInfo(obj);
    }

    private getTime(s):string{
        let t;
        if(s > -1){
            const hour = Math.floor(s/3600);
            const min = Math.floor(s/60) % 60;
            const sec = s % 60;
            if(hour < 10) {
                t = '0'+ hour + ":";
            } else {
                t = hour + ":";
            }

            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec.toFixed(2);
        }
        return t;
    }
}
