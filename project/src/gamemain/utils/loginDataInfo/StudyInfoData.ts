class StudyInfoData {
    public deviceId:string = "";// 设备id
    public level:string = ""; // 级别
    public resId:string = "";   // 资源id
    public resNumber:string = ""; // 资源编号
    public type:string = "";   //// 0评测 1课件
    public score:number = 0;
    public startTime:number = 0; // 开始使用时间戳
    public endTime:number = 0;  // 结束使用时间戳
    public duration:number = 0;  // 耗时（秒）
    public accuracy:number = 0; // 正确率
    public wrong:number = 0; // 错题数
    public ability:Object; // 能力值得分
    public observation:number = 0; // 观察力
    public attention:number = 0; // 注意力
    public memory:number = 0; // 记忆力
    public spatial:number = 0; // 空间力
    public calculate:number = 0; // 计算力
    public imagination:number = 0; // 想象力
    public creativity:number = 0; // 创造力
    public judgement:number = 0; // 判断力
    public analysis:number = 0; // 分析力
    public summarization:number = 0; // 概括力
    public ratiocination:number = 0; // 推理力
    public understanding:number = 0; // 理解力
    public spark:Object; // 闪光点
    public sparkid:string ="";// id
    public sparktime:number = 0; // 闪光时间 秒
    public sparkcontent:number = 0; // 闪光描述
    public wrongResult:Object;// 错题结果
    public id:string = "";  // 题序号
    public desc:string = "";// 对应知识点
    public studyData:any;

    public constructor() {

    }

    public setData():void{
        const obj =
            {
                "deviceId": this.deviceId,
                "level": this.level,
                "id" : this.resId+"",
                "number" : this.resNumber+"",
                "type": this.type+"",
                "score": this.score+"",
                "startTime": this.startTime+"",
                "endTime": this.endTime+"",
                "duration": this.duration+"",
                "accuracy": this.accuracy+"",
                "wrong": this.wrong+"",
                "ability": {
                    "observation": this.observation+"",
                    "attention": this.attention+"",
                    "memory": this.memory+"",
                    "spatial": this.spatial+"",
                    "calculate":this.calculate,
                    "imagination": this.imagination+"",
                    "creativity": this.creativity+"",
                    "judgement": this.judgement+"",
                    "analysis": this.analysis+"",
                    "summarization": this.summarization+"",
                    "ratiocination": this.ratiocination+"",
                    "understanding": this.understanding+"",
                },
                "spark": {
                    "sparkid": this.sparkid+"",
                    "sparktime":this.sparktime+"",
                    "sparkcontent": this.sparkcontent+""
                },
                "wrongResult": [
                    {
                    "id": this.id+"",
                    "desc": this.desc+""
                    }
                ]
        }
        this.studyData = obj;
    }
}