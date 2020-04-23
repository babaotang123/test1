class GameType7Control extends CllickTouchScene {

    private opNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private opPos: egret.Point[];  // 选项位置
    private quPos: egret.Point[];   // 题目位置
    private curGameData:any;
    private selfParent:any;
    private rigtData:Object;

    private curControl:any;
    public constructor(data) {
        super();
        super.onAdd();
        this.selfParent = data;
        this.init();
     //   egret.log(this.selfParent);
    }

    public init(): void {
        const id = this.selfParent.curGameData.condition_id;
        switch(id){
            case "73":
            this.curControl = new SpecialControl73(this.selfParent);
            break;
            case "74":
            case "75":
            this.curControl = new SpecialControl74(this.selfParent);
            break;
            case "76":
            case "77":
             this.curControl = new SpecialControl76(this.selfParent);
             break;
            case "80":
            case "81":
            case "82":
            case "83":
            case "84":
            this.curControl = new SpecialControl80(this.selfParent);
            break;
            default:
             this.curControl = new SpecialControl78(this.selfParent);
             break;
        }
        // this.opNumAry = [];
        // this.quNumAry = [];
        // this.opPos = [];
        // this.quPos = [];
        // this.wenhaoAry = [];
        // this.curAnswerData = new Object;
        // this.hitCurRectIndexObj = new Object();
        // this.wenhaoObj = new Object;
        // this.rigtData = new Object();


        // for(let i=0;i<18;i++){
        //     this.selfParent["r_"+i].visible = false;
        //     if(i<6){
        //         this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
        //     }else{
        //         this.quPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
        //     }
        // }
        // this.curGameData = this.selfParent.curGameData;
        // this.creatImg();
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
       this.curControl.setGameOverData();

    }

    public onDestroy(): void {
        this.curControl.onDestroy();
        // this.clearAll();
        // super.onDestroy();
        // this.opNumAry = [];
        // this.quNumAry = [];
        // this.opPos = [];
        // this.quPos = [];
        // this.wenhaoAry = [];
        //  this.rigtData = null;
        // this.wenhaoObj = null;
        // this.hitCurRectIndexObj = null;
    }

    private creatImg():void{
        // 操作类型
        const ary:any[] = this.curGameData.answer.split(",");
        const elmName = ary[0];
        const quIndexAry:any[] = this.curGameData.quetion.split(",");
        const randomAry = this.creatRandomAry();


        this.showQuestionsView();
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
