class SpecialControl73 extends UIObject {

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
            this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
            if(i<3){
                this.selfParent["r_73_"+i].visible = false;
                this.quPos.push(new egret.Point(this.selfParent["r_73_"+i].x,this.selfParent["r_73_"+i].y));
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

    // private setColor():void{
    //     if(this.selectImg.filters!=null){
    //         return
    //     }
    //     for(let obj of this.opNumAry){
    //         if(obj){
    //             obj.filters = null;
    //         }
    //     }
    //     var colorMatrix = [ 1,0,0,0,100,
    //                         0,1,0,0,100,
    //                         0,0,1,0,0,
    //                         0,0,0,1,0 ];

    //     var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
    //     this.selectImg.filters = [colorFlilter];
    // }

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
       const _quNumAry:any[] = this.curGameData.quetion.split(","); // 当前配的数量
       const _opertion:any[] = this.curGameData.opertion.split(","); // 元素范围
       const strName = _opertion[0];
       const n1 = parseInt(_opertion[1]);
       const n2 = parseInt(_opertion[2]);

       let n = parseInt(_quNumAry[0]);
       const numAry = [];
       for(let i= n1;i<n2;i++){
           numAry.push(i);
       }

       let _ary = [];
       while (n > 0) {
            const rand: number = App.RandomUtils.limitInteger(1, numAry.length - 1);
            _ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            n--;
       }

       // 找到正确答案
       _ary = this.sortNum(_ary,1,2);
       this.rightName = strName+_ary[_ary.length-1]+"";


       // 题目
       _ary = this.getRandomAry(_ary);
       for(const obj of _ary){
           const i = _ary.indexOf(obj);
           const p = this.quPos[i];
           const str = strName+obj;
           const img = CommonDragonBones.getInstance().getElementImg(str,1);
           img.x = p.x;
           img.y = p.y;
           this.quNumAry.push(img);
       }

       // 选项
       let len = 6 - _ary.length;
       while (len > 0) {
            const rand: number = App.RandomUtils.limitInteger(1, numAry.length - 1);
            _ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            len--;
       }
       _ary = this.getRandomAry(_ary);
       for(const obj of _ary){
           const i = _ary.indexOf(obj);
           const p = this.opPos[i];
           const str = strName+obj;
           const img = CommonDragonBones.getInstance().getElementImg(str,1);
           img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
           img.x = p.x;
           img.y = p.y+33;
           img.scaleX = img.scaleY = 0.6;
           this.opNumAry.push(img);
       }

       this.showQuestionsView();
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

    // 排序
    private sortNum(arr,n1,n2):any[]{
            let max;
            let num1;
            let num2;
            const _ary  = JSON.parse(JSON.stringify(arr));
            for(let i=0; i<_ary.length; i++){
                for(let j=i; j<_ary.length; j++){
                    num1 = eval(_ary[i]);
                    num2 = eval(_ary[j]);
                    if(n1<n2){ // 从小到大
                        if(num1>num2){
    　　　　　　　　　　　　　 max=_ary[j];
                  _ary[j]=_ary[i];
                  _ary[i]=max;
                        }
                    }else{
                        if(num1<num2){
    　　　　　　　　　　　　　 max=_ary[j];
                  _ary[j]=_ary[i];
                  _ary[i]=max;
                        }
                    }
                }
            }
            return _ary;
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
        if(!Game_Page1Scene.isGameBegin) {return; }
        const index = this.opNumAry.indexOf(event.currentTarget);
        if(index>=0){
               CommonSoundManage.getInstance().playSoundEffect("click_mp3");
               this.selectImg = event.currentTarget;
               this.setColor();
           }
    }

    private setColor():void{
        for(const obj of this.opNumAry){
            if(obj){
               // obj.filters = null;
                obj.scaleX = obj.scaleY = 0.6;
            }
        }
        this.selectImg.scaleX = this.selectImg.scaleY = 0.8;
    }
}
