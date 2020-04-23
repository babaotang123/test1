declare function getAppWifiStatus();
declare function sendJsSave(data);
declare function callAppKeyEvent();
declare function callAppUpdateGameStage();
class ConfigDataJson extends UIObject {
    public static getInstance(): ConfigDataJson {
        if (!ConfigDataJson.instance) {
            ConfigDataJson.instance = new ConfigDataJson();
        }
        return ConfigDataJson.instance;
    }

    private static instance: ConfigDataJson;
    public  CustomsData: Object;

    public age:number;
    public totalTime:number =0;  // 总用时
    public totalScore:number =0; // 总分
    public rightCount:number =0; // 答对的次数
    public erroCount:number =0; // 答对的次数
    public startTime:any;
    public mode:string;   // 模式
    public isPlay:boolean;
    public isQuit:string;
    public isUploadData:boolean; //是否正在上传数据中
    public getData(): any {
        return this.CustomsData;
    }

    public getStudyLevel(age:number,erroNum:number):number{
        let level = 0;
        if(age>2.5&&age<3){
            if(erroNum>0&&erroNum<=1){
                level =1;
            }else if(erroNum>=2&&erroNum<=3){
                level =0;
            }else if(erroNum>=4&&erroNum<=7){
                level =0;
            }else if(erroNum>=8&&erroNum<=14){
                level =0;
            }else if(erroNum>14){
                level =0;
            }
        }else if(age>=3&&age<4){
            if(erroNum>0&&erroNum<=1){
                level =2;
            }else if(erroNum>=2&&erroNum<=3){
                level =1;
            }else if(erroNum>=4&&erroNum<=7){
                level =1;
            }else if(erroNum>=8&&erroNum<=14){
                level =1;
            }else if(erroNum>14){
                level =1;
            }
        }else if(age>=4&&age<5){
            if(erroNum>0&&erroNum<=1){
                level =3;
            }else if(erroNum>=2&&erroNum<=3){
                level =2;
            }else if(erroNum>=4&&erroNum<=7){
                level =2;
            }else if(erroNum>=8&&erroNum<=14){
                level =1;
            }else if(erroNum>14){
                level =1;
            }
        }else if(age>=5&&age<6){
            if(erroNum>0&&erroNum<=1){
                level =3;
            }else if(erroNum>=2&&erroNum<=3){
                level =2;
            }else if(erroNum>=4&&erroNum<=7){
                level =2;
            }else if(erroNum>=8&&erroNum<=14){
                level =1;
            }else if(erroNum>14){
                level =1;
            }
        }else if(age>=6&&age<7){
            if(erroNum>0&&erroNum<=1){
                level =3;
            }else if(erroNum>=2&&erroNum<=3){
                level =2;
            }else if(erroNum>=4&&erroNum<=7){
                level =2;
            }else if(erroNum>=8&&erroNum<=14){
                level =2;
            }else if(erroNum>14){
                level =2;
            }
        }

        return level
    }

    public getAge(str):any{
            const r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
            if(r==null) {return "日期错误"; }
            const d= new Date(r[1],r[3]-1,r[4]);
            let returnStr = "输入的日期格式错误！";
            if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
                const date = new Date();
                const yearNow = date.getFullYear();
                const monthNow = date.getMonth() + 1;
                const dayNow = date.getDate();

                let largeMonths = [1,3,5,7,8,10,12], // 大月， 用于计算天，只在年月都为零时，天数有效
                    lastMonth = monthNow -1>0?monthNow-1:12,  // 上一个月的月份
                    isLeapYear = false, // 是否是闰年
                    daysOFMonth = 0;    // 当前日期的上一个月多少天

                if((yearNow%4===0&&yearNow%100!==0)||yearNow%400===0){  // 是否闰年， 用于计算天，只在年月都为零时，天数有效
                    isLeapYear = true;
                }
                if(largeMonths.indexOf(lastMonth)>-1){
                    daysOFMonth = 31;
                }else if(lastMonth===2){
                    if(isLeapYear){
                        daysOFMonth = 29;
                    }else{
                        daysOFMonth = 28;
                    }
                }else{
                    daysOFMonth = 30;
                }
                let Y = yearNow - parseInt(r[1]);
                let M = monthNow - parseInt(r[3]);
                let D = dayNow - parseInt(r[4]);
                if(D < 0){
                    D = D + daysOFMonth; // 借一个月
                    M--;
                }
                if(M<0){  // 借一年 12个月
                    Y--;
                    M = M + 12; //
                }
                if(Y<0){
                    returnStr = "出生日期有误！";

                }else if(Y===0){
                    if(M===0){
                        returnStr = D+":";
                    }else{
                        returnStr = M+":";
                    }
                }else{
                    if(M===0){
                        returnStr = Y+":";
                    }else{
                        returnStr = Y+":"+M+":";
                    }
                }

            }
            return returnStr;
    }

     // 获取链接中UR值
    public  getOption(key:string):string {
        if (window.location.href) {
             const search = window.location.href;
           // search = "sdcard/ub_res/index.html?mode=0&collected=0"
             const searchArr = search.split("?");
             if(!searchArr[1]){
                return "";
            }
             const curKeyUrlAry =  searchArr[1].split("&");
             const length = curKeyUrlAry.length;
             for (let i:number = 0; i < length; i++) {
                const str = curKeyUrlAry[i];
                const arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    }

    // 时间戳转换为年龄
    public setAge(br):void{
        const date = new Date(parseInt(br));// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        const str = Y+M+D;
        this.age = this.countAge(str);
    }

    public countAge(num):number{
        const age = num.split("-");
        const y = age[0];
        const m = age[1];
        const d = age[2];
        const _str = y+"-"+m+"-"+d;
        let b = this.getAge(_str);
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
        return b
    }

    // 验证手机号规则
    public checkMobile(s:string):boolean{
        const sMobile = s;
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){
            return false;
        }
        return true
    }

    public showHttpSendWait(str):void{
         let tipsStr = "";
         switch(str){
             case "code":
                tipsStr = "验证码和获取中";
             break;
             case "login":
                tipsStr = "正在登陆中";
             break;
             case "review":
                tipsStr = "获取评测结果";
             break;
             case "UserInfo":
                tipsStr = "进入游戏中";
             break;
             case "studyInfo":
                tipsStr = "学习记录同步中";
             break;
         }
         WaitManager.getInstance().showWaritPanel(tipsStr);
    }

     public getWifiStatus():boolean{
        return getAppWifiStatus();
    }

    public sendSaveRequest(data){
        return sendJsSave(data);
    }

    //离开游戏
    public sendQuitGameMsg():void{
        callAppKeyEvent();
    }

    public senStudydMsg(data):void{
        let params = JSON.stringify(data);
       
        egret.log("wifi状态："+ConfigDataJson.getInstance().getWifiStatus());
        egret.log("学习数据："+params);
        if(!ConfigDataJson.getInstance().getWifiStatus()){
            //离线状态
            ConfigDataJson.getInstance().sendSaveRequest(params);//保存数据
            if(this.isQuit == "true"){
                 ConfigDataJson.getInstance().sendQuitGameMsg();//退出
            }
            return
        }
       
        HttpControl.getInstance().sendStudyInfo(params);
    }
}
