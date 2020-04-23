class SpecialControl80 extends CllickTouchScene {

    private opNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private opPos: egret.Point[];  // 选项位置
    private quPos: egret.Point[];   // 题目位置
    private quanPos:egret.Point[];
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
        this.quanPos = [];
        this.wenhaoAry = [];
        this.curAnswerData = new Object;
        this.wenhaoObj = new Object;
        this.rigtData = new Object();
        this.hitCurRectIndexObj = new Object();
        this.curGameData = this.selfParent.curGameData;

        const id = this.curGameData.condition_id;

        for(let i=0;i<6;i++){
             this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
             this.selfParent["r_"+i].visible = false;
             // 全部特殊处理 位置
             if(id == 80){
                  if(i<1){
                      this.selfParent["r_sort80_"+i].visible = false;
                      this.quPos.push(new egret.Point(this.selfParent["r_sort80_"+i].x,this.selfParent["r_sort80_"+i].y));
                  }
                  this.quanPos.push(new egret.Point(this.selfParent["r_hit80_"+i].x,this.selfParent["r_hit80_"+i].y));
             }
             if(id == 81){
                  if(i<1){
                      this.quPos.push(new egret.Point(512,300));
                  }
                  this.quanPos.push(new egret.Point(this.selfParent["r_hit81_"+i].x,this.selfParent["r_hit81_"+i].y));
             }
             if(id == 82){
                  if(i<1){
                      this.quPos.push(new egret.Point(512,300));
                  }
                  this.quanPos.push(new egret.Point(this.selfParent["r_hit82_"+i].x,this.selfParent["r_hit82_"+i].y));
             }
             if(id == 83){
                  if(i<1){
                      this.quPos.push(new egret.Point(512,300));
                  }
                  this.quanPos.push(new egret.Point(this.selfParent["r_hit83_"+i].x,this.selfParent["r_hit83_"+i].y));
             }
             if(id == 84){
                  if(i<1){
                      this.quPos.push(new egret.Point(512,300));
                  }
                  this.quanPos.push(new egret.Point(this.selfParent["r_hit84_"+i].x,this.selfParent["r_hit84_"+i].y));
             }
        }

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
        // for(let obj of this.rectList){
        //     p.addChild(obj);
        // }
        for(const obj of this.rectList){

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
                if(s2){
                    s2 = (s2.split("img_num_"))[1];
                }
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
                if(s2){
                    s2 = (s2.split("img_num_"))[1];
                }
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
        const quName = this.curGameData.quetion;
        const opNameAry = this.curGameData.opertion.split(",");
        const opName = opNameAry[0];
        const hitObjAry = [];

        const id = parseInt(this.curGameData.condition_id);
        for(let j=0;j<ary.length;j++){
            let str;
            if(j==0){
                str = quName;
                const p = this.quPos[j];
                const img = CommonDragonBones.getInstance().getElementImg(str);
                img.x = p.x;
                img.y = p.y;
                this.quNumAry.push(img)
            }

            str  = ary[j];
            const rec = new eui.Rect();
            const _p = this.quanPos[j];
            rec.width = rec.height = 60;
            rec.anchorOffsetX = rec.width/2;
            rec.anchorOffsetY = rec.height/2;
            rec.fillAlpha = 0;

            rec.name = str;
            rec.x = _p.x;
            rec.y = _p.y;

            hitObjAry.push(rec);
            this.rigtData[""+j] = rec;
            const key = str+(hitObjAry.length-1);
            this.hitCurRectIndexObj[key] = ""+j;

            const opStr = opName+(j+1);
            const opImg = CommonDragonBones.getInstance().getElementImg(opStr);
            opImg.x = this.opPos[j].x;
            opImg.y = this.opPos[j].y;
            this.opNumAry.push(opImg);
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
