class GameType4Control extends UIObject {

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
        this.rightData = new Object();

        for(let i=0;i<6;i++){
            this.selfParent["r_"+i].visible = false;
            if(i<6){
                this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
            }
            if(i==0){
                this.quPos.push(new egret.Point(495,299));
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

    // private getGlowFilter():egret.GlowFilter{
    //     var color:number = 0xffffff;        /// 光晕的颜色，十六进制，不包含透明度
    //     var alpha:number = 0.5;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
    //     var blurX:number = 4;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
    //     var blurY:number = 4;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
    //     var strength:number = 100;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255
    //     var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
    //     var inner:boolean = true;            /// 指定发光是否为内侧发光
    //     var knockout:boolean = false;            /// 指定对象是否具有挖空效果
    //     let glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
    //         strength, quality, inner, knockout );
    //     return glowFilter;
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
       const _quNumAry:any[] = this.curGameData.quetion.split(","); // 题目
       const randomAry = this.creatRandomAry();// 取出选项
       this.rightName = this.curGameData.answer;

       for(const obj of _quNumAry){
            const i = _quNumAry.indexOf(obj);
            const img = CommonDragonBones.getInstance().getElementImg(obj);
            img.x = this.quPos[i].x;
            img.y = this.quPos[i].y;
            this.quNumAry.push(img);
       }

       for(const obj of randomAry){
            const i = randomAry.indexOf(obj);
            const img = CommonDragonBones.getInstance().getElementImg(obj);
            img.x = this.opPos[i].x;
            img.y = this.opPos[i].y;
            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            this.opNumAry.push(img);
       }

       this.showQuestionsView();
    }

    private creatRandomAry():any[]{
        const opary = this.curGameData.opertion.split(",");
        const anAry = this.curGameData.answer.split(",");
        const str = opary[0];
        const starIndex =parseInt(opary[1]);
        const endIndex =parseInt(opary[2])+1;
        const elmentAry = [];
        let _ary = [];
        for(const obj of anAry){
            if(obj){
                _ary.push(obj);
            }
        }

        for(let i = starIndex;i<endIndex;i++){
            const s1 = str +i;
            elmentAry.push(s1);
        }

        for(const obj of _ary){
            for(const _obj of elmentAry){
                const i = elmentAry.indexOf(_obj);
                if(obj == _obj){
                    elmentAry.splice(i,1);
                }
            }
        }

        let len = 6-anAry.length;
        while(len){
            const rand = App.RandomUtils.limitInteger(0, elmentAry.length - 1);
            _ary.push(elmentAry[rand]);
            elmentAry.splice(rand,1);
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
           if(!Game_Page1Scene.isGameBegin) {return; }
           const index = this.opNumAry.indexOf(event.currentTarget);
           if(index>=0){
               CommonSoundManage.getInstance().playSoundEffect("click_mp3");
               this.selectImg = event.currentTarget;
               this.setColor();
           }
    }

    private setColor():void{
        if(this.selectImg.filters!=null){
            return
        }
        for(const obj of this.opNumAry){
            if(obj){
                obj.filters = null;
                obj.scaleX = obj.scaleY = 1;
            }
        }
        // var colorMatrix = [ 1,0,0,0,100,
        //                     0,1,0,0,100,
        //                     0,0,1,0,0,
        //                     0,0,0,1,0 ];

        //  var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        // this.selectImg.filters = [colorFlilter];
        this.selectImg.scaleX = this.selectImg.scaleY = 1.4
    }
}
