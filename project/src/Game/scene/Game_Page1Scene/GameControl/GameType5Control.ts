class GameType5Control extends UIObject {

    private opNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private opPos: egret.Point[];  // 选项位置
    private quPos: egret.Point[];   // 题目位置
    private curGameData:any;
    private selfParent:any;
    private rightData:Object;
    private elemNameAry:any[];
    private rightName:string;
    private selectImg:eui.Image;
    private wenhaoAry:any[];

    private curScal:number = 1;
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
        this.elemNameAry = [];
        this.wenhaoAry = [];
        this.rightData = new Object();

        for(let i=0;i<6;i++){
            this.selfParent["r_"+i].visible = false;
            this.selfParent["sh_"+i].visible = false;
            if(i<6){
                this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
                this.quPos.push(new egret.Point(this.selfParent["sh_"+i].x,this.selfParent["sh_"+i].y));
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
    }

    // 最后的结果
    public setGameOverData():void{
        let b = false
        if(this.selectImg){
            if(this.selectImg.name == this.rightName){
                // 回答正确
                this.selectImg = null;
                this.selfParent.testurl0.text = "正确";
                b = true;
            }else{
                this.selfParent.testurl0.text = "错误";
                b = false;
            }
        }
        const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
        evt.b = b;
        this.selfParent.dispatchEvent(evt);
    }

    public showGameOverData():void{
        let b = false
        if(this.selectImg){

            if(this.selectImg.name == this.rightName){
                // 回答正确
                this.selectImg = null;
                this.selfParent.testurl0.text = "正确";
                b = true;
            }else{
                this.selfParent.testurl0.text = "错误";
                b = false;
            }
        }
    }

    public onDestroy(): void {
        super.onDestroy();
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.rightData = null;
        Game_Page1Scene.isGameBegin = false;
    }

    private creatImg():void{
       const id =parseInt(this.selfParent.curGameData.condition_id);
       const _quNumAry:any[] = this.curGameData.quetion.split(","); // 题目
       const randomAry = this.creatRandomAry();// 取出选项
       const an = this.curGameData.answer.split(",");
       this.rightName = an[0]+an[1];
       const strName = an[0];
       // 特殊处理
       if(id == 53){
           this.quPos = [];
           for(let i=6;i<11;i++){
                this.quPos.push(new egret.Point(this.selfParent["sh_"+i].x,this.selfParent["sh_"+i].y));
            }
       }

       for(let j=0;j<_quNumAry.length;j++){
           let obj = _quNumAry[j];
           if(obj=="?"){
                const wen = CommonDragonBones.getInstance().getDrgoneDisplay("wen");
                wen.animation.play(1);
                wen.name = "wen";
                wen.x = this.quPos[j].x;
                wen.y = this.quPos[j].y;
                this.quNumAry.push(wen);
            }else{
                obj = strName+obj;
                const img = CommonDragonBones.getInstance().getElementImg(obj);
                img.x = this.quPos[j].x;
                img.y = this.quPos[j].y;
                this.quNumAry.push(img);
            }
       }

       for(let obj of randomAry){
            const i = randomAry.indexOf(obj);
            obj = strName+obj;
            const img = CommonDragonBones.getInstance().getElementImg(obj);
            img.x = this.opPos[i].x;
            img.y = this.opPos[i].y;
            if(id!= 58){
                img.pixelHitTest = true;
            }

            this.setScale(id,img);

            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            this.opNumAry.push(img);
       }
       this.showQuestionsView();
    }
    private setScale(id,img):void{
        let n = 0;
        switch(id){
            case 49:
                n = 0.4;
                break;
            case 50:
                n = 0.9;
                break;
            case 51:
                n = 0.6;
                break;
            case 52:
                n = 0.4;
                break;
            case 53:
                n = 0.6;
                break;
            case 54:
                n = 0.6;
                break;
            case 55:
                n = 0.8;
                break;
            case 56:
                n = 0.6;
                break;
            case 57:
                n = 0.5;
                break;
            case 58:
                n = 1;
                break;
            case 59:
                n = 0.7;
                break;
            case 60:
                n = 0.6;
                break;
        }
        this.curScal = n;
        img.scaleX = img.scaleY = n;
    }

    private creatRandomAry():any[]{
        const anAry = this.curGameData.opertion.split(",");
        let len = anAry.length;
        let _ary = [];
        while(len){
            const rand = App.RandomUtils.limitInteger(0, anAry.length - 1);
            _ary.push(anAry[rand]);
            anAry.splice(rand,1);
            len--;
        }
        _ary  = this.getRandomAry(_ary);
        return _ary;
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
    }

    private onClickTouch(event:egret.TouchEvent):void{
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        if(!Game_Page1Scene.isGameBegin) {return; }
        const index = this.opNumAry.indexOf(event.currentTarget);
        if(index>=0){
               CommonSoundManage.getInstance().playSoundEffect("click_mp3");
               this.selectImg = event.currentTarget;
               this.setColor();
           }
    }

    private setColor():void{
        // if(this.selectImg.scaleX ==  this.curScal){
        //     return
        // }
        for(const obj of this.opNumAry){
            if(obj){
               // obj.filters = null;
                obj.scaleX = obj.scaleY =  this.curScal;
            }
        }
        const n  =  this.curScal+0.4;
        // if( n>1){
        //      n = 1;
        // }else{
        //      n =  this.curScal+0.4
        // }
        this.selectImg.scaleX = this.selectImg.scaleY = n;
    }
}
