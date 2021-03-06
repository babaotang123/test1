class GameType2Control extends CllickTouchScene {

    private opNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private opPos: egret.Point[];  // 选项位置
    private quPos: egret.Point[];   // 题目位置
    private curGameData:any;
    private selfParent:any;
    private rigtData:Object;
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    public constructor(data) {
        super();
        super.onAdd();
        this.selfParent = data;
        this.init();

     //   egret.log(this.selfParent);
    }

    public init(): void {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.wenhaoAry = [];
        this.curAnswerData = new Object;
        this.wenhaoObj = new Object;
        this.rigtData = new Object();
        this.hitCurRectIndexObj = new Object();

        for(let i=0;i<26;i++){
            this.selfParent["r_"+i].visible = false;
            if(i<6){
                this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
            }else if(i>17){
                this.quPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
            }
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    }

    public showQuestionsView():void{
        const p = this.selfParent["r_0"].parent;
        for(const obj of this.quNumAry){

            p.addChild(obj);
        }
        for(const obj of this.opNumAry){
            p.addChild(obj);
        }
        for(const obj of this.wenhaoAry){
            p.addChild(obj);
        }
        super.initAddEvent();
    }

    // 最后的结果
    public setGameOverData():void{
        let b = true;
        const len = this.rectList.length;
        for(const k in this.rigtData){
            const s1 = this.rigtData[k].name;
            let s2;
            if(this.curAnswerData[k]){
                s2 = this.curAnswerData[k].name;
                if(!this.curAnswerData[k].name){
                    b = false;
                    break;
                }
            }
          //  egret.log(s1+"    "+s2)
            if(s1 != s2 ){
                b = false;
                break;
            }
        }
        if(b){
            egret.log("回答正确"+b);
            this.selfParent.testurl0.text = "正确";
        }else{
            egret.log("回答错误"+b);
            this.selfParent.testurl0.text = "错误";
        }
        const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
        evt.b = b;
        this.selfParent.dispatchEvent(evt);
    }

    public showGameOverData():void{
        let b = true;
        const len = this.rectList.length;
        for(const k in this.rigtData){
            const s1 = this.rigtData[k].name;
            let s2;
            if(this.curAnswerData[k]){
                s2 = this.curAnswerData[k].name;
                if(!this.curAnswerData[k].name){
                    b = false;
                    break;
                }
            }
          //  egret.log(s1+"    "+s2)
            if(s1 != s2 ){
                b = false;
                break;
            }
        }
        if(b){
            egret.log("回答正确"+b);
            this.selfParent.testurl0.text = "正确";
        }else{
            egret.log("回答错误"+b);
            this.selfParent.testurl0.text = "错误";
        }
    }

    public onDestroy(): void {
        super.onDestroy();
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.wenhaoAry = [];
        this.rigtData = null;
        this.wenhaoObj = null;
        this.hitCurRectIndexObj = null;
    }

    private creatImg():void{
        // 操作类型
        const ary:any[] = this.curGameData.answer.split(",");
        const elmName = ary[0];
        const quIndexAry:any[] = this.curGameData.quetion.split(",");
        let randomAry = this.creatRandomAry();
        const hitObjAry = [];

        let nameIndex = 0;
        let s1;
        let n;

        const id = parseInt(this.curGameData.condition_id);
        if(id<15&&id>12){
            nameIndex = 1;
        }
        let str;
        let newimg;
        let rec;
        for(let j=0;j<quIndexAry.length;j++){
            if(id>=15){
                if(quIndexAry[j]=="?"){
                    str = ary[nameIndex];
                    nameIndex++;
                }else{
                    str = quIndexAry[j];
                }
            }else{
                if(quIndexAry[j]=="?"){
                    n = parseInt(ary[nameIndex]);
                    nameIndex++;
                }else{
                    n  = parseInt(quIndexAry[j]);
                }
                str = elmName+n;
            }

            const p = this.quPos[j];
            egret.log("name   "+s1);

            if(quIndexAry[j]=="?"){
                const wen = CommonDragonBones.getInstance().getDrgoneDisplay("wen");
                wen.animation.play(1);
                wen.x = this.quPos[j].x;
                wen.y = this.quPos[j].y;
                this.wenhaoAry.push(wen);
                this.wenhaoObj[""+j] = wen;

                rec = new eui.Rect();
                rec.fillAlpha = 0;
                rec.name = str;
                rec.width = 80;
                rec.height = 80;
                rec.anchorOffsetX = wen.width/2;
                rec.anchorOffsetY = wen.height/2;

                rec.x = p.x;
                rec.y = p.y;
                hitObjAry.push(rec);
                this.rigtData[""+j] = rec;
                const key = str+(hitObjAry.length-1);
                this.hitCurRectIndexObj[key] = ""+j;
               // this.curAnswerData[""+j] = this.copyNewobj(rec);
            }else{
                if(id>=15){
                    const gp = new eui.Group();
                    const label:egret.TextField = new egret.TextField();
                    label.text = quIndexAry[j];
                    label.size = 65;
                    label.textAlign = egret.HorizontalAlign.CENTER;
                    label.verticalAlign = egret.VerticalAlign.MIDDLE;
                    label.strokeColor = 0xFFFF00;   // 描边颜色
                    label.fontFamily = "ziti";
                    gp.width = gp.height = label.width = label.height = 120;
                    gp.addChild(label);
                    this.selfParent.addChild(gp);
                    gp.x = p.x;
                    gp.y = p.y;
                    gp.name = str;
                    gp.anchorOffsetX = gp.anchorOffsetY = gp.width/2;
                    this.quNumAry.push(gp);
                 //   this.rigtData[""+j] = gp;
                }else{
                    newimg = CommonDragonBones.getInstance().getElementImg(str);
                    newimg.x = p.x;
                    newimg.y = p.y;
                    this.quNumAry.push(newimg);
                   // this.rigtData[""+j] = newimg;
                }
            }

        }

        if(id>=15){
            randomAry = this.getRandomAry(this.curGameData.opertion.split(","));
        }else{
            randomAry = this.getAppointNumAry(randomAry);
        }

        for(const obj of randomAry){
            const i = randomAry.indexOf(obj);
            const str = elmName+obj;
            if(id>=15){
                    const gp = new eui.Group();
                    const label:egret.TextField = new egret.TextField();
                    label.text = randomAry[i];
                    label.size = 50;
                    label.textAlign = egret.HorizontalAlign.CENTER;
                    label.verticalAlign = egret.VerticalAlign.MIDDLE;
                    label.strokeColor = 0xFFFF00;   // 描边颜色
                    label.fontFamily = "ziti";

                    gp.width = gp.height = label.width = label.height = 120;
                    gp.addChild(label);
                    this.selfParent.addChild(gp);
                    gp.x = this.opPos[i].x;
                    gp.y = this.opPos[i].y;
                    gp.anchorOffsetX = gp.anchorOffsetY =  gp.width/2;
                    gp.name = obj;
                    this.opNumAry.push(gp);
            }else{
                const img = CommonDragonBones.getInstance().getElementImg(str);
                img.x = this.opPos[i].x;
                img.y = this.opPos[i].y;
                this.opNumAry.push(img);
            }
        }

        this.imgList = this.opNumAry;
        this.rectList = hitObjAry;
        this.showQuestionsView();
    }

    // 复制一个新的
    private copyNewobj(rec:eui.Rect):eui.Rect{
        const re = new eui.Rect;
        re.fillAlpha = 0;
        re.name = rec.name;
        re.width = rec.width;
        re.height = rec.height;
        re.anchorOffsetX = rec.width/2;
        re.anchorOffsetY = rec.height/2;
        re.x = rec.x;
        re.y = rec.y;
        return re;
    }

    // 抽取正确答案然后随机其中的几个
    private getAppointNumAry(data:any[]):any[]{
        const r = data;
        const ary = [];
        const _ary:any[] = this.curGameData.answer.split(",");
        for(let i=1;i<_ary.length;i++){
            ary.push(_ary[i]);
        }
        const nary = this.selfParent.curGameData.opertion.split(",");
        const starn = parseInt(nary[1]);
        let len = 6 - ary.length;

        // 找出剩余的
        let count = r.length;
        while (count > 0) {
             for(const obj of ary){
                 const index = count -1;
                 if(obj == r[index]){
                     r.splice(index,1);
                 }
             }
             count--;
         }

        egret.log(r.length);
         // 把剩余的添加到新数组里
        while (len > 0) {
            const rand: number = App.RandomUtils.limitInteger(0, len-1);
            ary.push(r[rand]);
            r.splice(rand, 1);
            len--;
        }

        // 最后随机打乱
        let n = ary.length;
        const newAry = [];
        while (n > 0) {
            const rand: number = App.RandomUtils.limitInteger(0, ary.length - 1);
            newAry.push(ary[rand]);
            ary.splice(rand, 1);
            n--;
        }

        egret.log(newAry.length);
        return newAry;
    }

    // 创建6个随机，存的是元素名称
    private creatRandomAry():any[]{
        const nary = this.selfParent.curGameData.opertion.split(",");
        const starn = parseInt(nary[0]);
        const endn = parseInt(nary[1])+1;
        let ary = [];
        for(let i=1;i<endn;i++){
            ary.push(i);
        }
        ary = this.getRandomAry(ary);
        return ary;
    }

        // 得到随机后的数组
    private getRandomAry(ary: any[]): any[] {
        const ramNumAry = this.getRandomNumAry(ary.length);
        const _Ary = [];
        for (const obj of ramNumAry) {
             _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    }

    private getRandomNumAry(n): any[] {
        const numAry = [];
        for(let i=0;i<n;i++){
            numAry.push(i);
        }
        const ary = [];
        while (n > 0) {
            const rand: number = App.RandomUtils.limitInteger(0, numAry.length - 1);
            ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            n--;
        }
        return ary;
    }

    private clearAll():void{
        for(const obj of this.quNumAry){
            if(obj&&obj.parent){
                // while(obj.numChildren>0){
                //     obj.removeChildAt(0);
                // }
                obj.parent.removeChild(obj);
            }
        }
    }
}
