var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StudyInfoData = (function () {
    function StudyInfoData() {
        this.deviceId = ""; // 设备id
        this.level = ""; // 级别
        this.resId = ""; // 资源id
        this.resNumber = ""; // 资源编号
        this.type = ""; //// 0评测 1课件
        this.score = 0;
        this.startTime = 0; // 开始使用时间戳
        this.endTime = 0; // 结束使用时间戳
        this.duration = 0; // 耗时（秒）
        this.accuracy = 0; // 正确率
        this.wrong = 0; // 错题数
        this.observation = 0; // 观察力
        this.attention = 0; // 注意力
        this.memory = 0; // 记忆力
        this.spatial = 0; // 空间力
        this.calculate = 0; // 计算力
        this.imagination = 0; // 想象力
        this.creativity = 0; // 创造力
        this.judgement = 0; // 判断力
        this.analysis = 0; // 分析力
        this.summarization = 0; // 概括力
        this.ratiocination = 0; // 推理力
        this.understanding = 0; // 理解力
        this.sparkid = ""; // id
        this.sparktime = 0; // 闪光时间 秒
        this.sparkcontent = 0; // 闪光描述
        this.id = ""; // 题序号
        this.desc = ""; // 对应知识点
    }
    StudyInfoData.prototype.setData = function () {
        var obj = {
            "deviceId": this.deviceId,
            "level": this.level,
            "id": this.resId + "",
            "number": this.resNumber + "",
            "type": this.type + "",
            "score": this.score + "",
            "startTime": this.startTime + "",
            "endTime": this.endTime + "",
            "duration": this.duration + "",
            "accuracy": this.accuracy + "",
            "wrong": this.wrong + "",
            "ability": {
                "observation": this.observation + "",
                "attention": this.attention + "",
                "memory": this.memory + "",
                "spatial": this.spatial + "",
                "calculate": this.calculate,
                "imagination": this.imagination + "",
                "creativity": this.creativity + "",
                "judgement": this.judgement + "",
                "analysis": this.analysis + "",
                "summarization": this.summarization + "",
                "ratiocination": this.ratiocination + "",
                "understanding": this.understanding + "",
            },
            "spark": {
                "sparkid": this.sparkid + "",
                "sparktime": this.sparktime + "",
                "sparkcontent": this.sparkcontent + ""
            },
            "wrongResult": [
                {
                    "id": this.id + "",
                    "desc": this.desc + ""
                }
            ]
        };
        this.studyData = obj;
    };
    return StudyInfoData;
}());
__reflect(StudyInfoData.prototype, "StudyInfoData");
//# sourceMappingURL=StudyInfoData.js.map