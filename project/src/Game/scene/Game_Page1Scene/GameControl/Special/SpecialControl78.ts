class SpecialControl78 extends CllickTouchScene {

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
        this.curGameData = this.selfParent.curGameData;

        const ary:any[] = this.curGameData.quetion.split(",");
        const len = ary.length;

        for(let i=0;i<9;i++){
            if(len == 4){
                if(i<4){
                    this.selfParent["r_76_"+i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_76_"+i].x,this.selfParent["r_76_"+i].y));
                    this.opPos.push(new egret.Point(this.selfParent["r_78_"+i].x,this.selfParent["r_78_"+i].y));
                }
            }else if(len == 5){
                if(i>3){
                    this.selfParent["r_76_"+i].visible = false;
                    this.quPos.push(new egret.Point(this.selfParent["r_76_"+i].x,this.selfParent["r_76_"+i].y));
                }
            }
            if(len == 7){
                // this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
                if(i<7){
                    this.quPos.push(new egret.Point(this.selfParent["r_sidai_"+i].x,this.selfParent["r_sidai_"+i].y));
                    this.selfParent["r_sidai_"+i].visible = false;
                }
                if(i<6){
                    this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
                    this.selfParent["r_"+i].visible = false;
                }

            }
            // if(len == 7){
            //     if(i<7){
            //         this.quPos.push(new egret.Point(this.selfParent["r_sidai_"+i].x,this.selfParent["r_sidai_"+i].y));
            //         this.selfParent["r_sidai_"+i].visible = false;

            //         this.opPos.push(new egret.Point(this.selfParent["r_numsidai_"+i].x,this.selfParent["r_numsidai_"+i].y));
            //         this.selfParent["r_numsidai_"+i].visible = false;
            //     }
            // }
        }

        this.creatImg();
    }

    public showQuestionsView():void{
        const p = this.selfParent["r_0"].parent;
        for(const obj of this.rectList){

            p.addChild(obj);
        }
        for(const obj of this.quNumAry){

            p.addChild(obj);
        }

        for(const obj of this.opNumAry){
            p.addChild(obj);
        }
        super.initAddEvent();
    }

    // 最后的结果
    public setGameOverData():void{
        let b = true;
        const len = this.rectList.length;
        const opNameAry:any[] = this.curGameData.opertion.split(",");
        const quName = this.curGameData.answer;
        const opName = opNameAry[0];
        for(const k in this.rigtData){
            const s1 = ((this.rigtData[k]).split(quName))[1];;
            let s2;
            if(this.curAnswerData[k]){
                if(!this.curAnswerData[k].name){
                    b = false;
                    break;
                }else{
                    s2 = ((this.curAnswerData[k].name).split(opName))[1];
                }
            }else{
                 b = false;
                 break;
            }
          //  egret.log(s1+"    "+s2)
            if(s1 != s2 ){
                b = false;
                break;
            }else{
                b = true;
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
        const opNameAry:any[] = this.curGameData.opertion.split(",");
        const quName = this.curGameData.answer;
        const opName = opNameAry[0];
        for(const k in this.rigtData){
            const s1 = ((this.rigtData[k]).split(quName))[1];;
            let s2;
            if(this.curAnswerData[k]){
                if(!this.curAnswerData[k].name){
                    b = false;
                    break;
                }else{
                    s2 = ((this.curAnswerData[k].name).split(opName))[1];
                }
            }else{
                 b = false;
                 break;
            }
          //  egret.log(s1+"    "+s2)
            if(s1 != s2 ){
                b = false;
                break;
            }else{
                b = true;
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
        const quName = this.curGameData.answer;

        const quAry:any[] = this.curGameData.quetion.split(",");

        const opNameAry = this.curGameData.opertion.split(",");
        const opName = opNameAry[0];

        const randomAry = this.creatRandomAry();  // 乱序的
        const hitObjAry = [];

        const id = parseInt(this.curGameData.condition_id);
        let _s1x = 0;
        let _s1y = 0;
        for(let j=0;j<randomAry.length;j++){
            const str = quName+randomAry[j];
            const p = this.quPos[j];
            const img = CommonDragonBones.getInstance().getElementImg(str);
            img.x = p.x;
            img.y = p.y;
            this.quNumAry.push(img);

            const bgname = "img_quan_bg"
            const putBg = CommonDragonBones.getInstance().getElementImg(bgname);
            putBg.x = img.x;
            if(randomAry.length == 7){
                putBg.y = img.y+192;
            }else{
                putBg.y = img.y+142;
            }
            putBg.name = str;
            this.wenhaoAry.push(putBg);
            if(randomAry[j] == "1"&&randomAry.length == 7){
               _s1x =  putBg.x;
               _s1y =  putBg.y;
           }else{
                hitObjAry.push(putBg);
                const key = str+(hitObjAry.length-1);
                this.rigtData[""+(hitObjAry.length-1)] = str;
                this.hitCurRectIndexObj[key] = ""+j;
           }

            if(quAry.length == 7){
                const opStr = opName+(j+1);
                const opImg = CommonDragonBones.getInstance().getElementImg(opStr);
                this.opNumAry.push(opImg);

            }else{
                const opStr = opName+(j+1);
                const opImg = CommonDragonBones.getInstance().getElementImg(opStr);
                opImg.x = this.opPos[j].x;
                opImg.y = this.opPos[j].y;
                this.opNumAry.push(opImg);
            }
        }

         // 7特殊处理
        const curOP = [];
        if(quAry.length == 7){
            for(const obj of this.opNumAry){
                    const i = this.opNumAry.indexOf(obj);
                    const s = (obj.name.split(opName))[1];
                    if(s != "1"){
                        curOP.push(obj);
                    }else{
                        obj.x = _s1x;
                        obj.y = _s1y;
                    }
            }
            for(const obj of curOP){
                 const i = curOP.indexOf(obj);
                 obj.x = this.opPos[i].x;
                 obj.y = this.opPos[i].y;
             }
            this.imgList = curOP;
        }else{
            this.imgList = this.opNumAry;
        }

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

    // 根据配置的数量
    private creatRandomAry():any[]{
        const nary:any[] = this.selfParent.curGameData.quetion.split(",");
        let ary = [];
        for(let i=1;i<nary.length+1;i++){
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
                obj.parent.removeChild(obj);
            }
        }

        for(const obj of this.opNumAry){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }

        for(const obj of this.rectList){
           if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
    }
}
