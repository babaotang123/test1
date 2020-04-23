class GameType8Control extends UIObject {

    private opNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private opPos: egret.Point[];  // 选项位置
    private quPos: egret.Point[];   // 题目位置
    private curGameData:any;
    private selfParent:any;
    private rightData:Object;
    private elemNameAry:any[];
    private rightNameAry:any[];
    private selectImg:eui.Image;
    private wenhaoAry:any[];

    private posDataObj:Object;
    private curPosNum:any[];
    private selectedAry:any[];
    private curStartNum:any;
    public constructor(data) {
        super();
        this.selfParent = data;
        this.init();
    }

    public init(): void {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.wenhaoAry = [];
        this.rightNameAry = [];
        this.selectedAry = [];
        this.curPosNum = [3,5,9,16,25];
        this.posDataObj = new Object();
        this.rightData = new Object();
        this.curGameData = this.selfParent.curGameData;
        this.selfParent.op_bg.visible = false;

        this.initPos();
        this.creatImg();
    }

    public showQuestionsView():void{
        const p = this.selfParent["r_0"].parent;
        for(const obj of this.opNumAry){
            p.addChild(obj);
        }
        for(const obj of this.quNumAry){
            p.addChild(obj);
        }
    }

    // 最后的结果
    public setGameOverData():void{
           let b = true;
           if(this.selectedAry.length == this.rightNameAry.length)
           {
               for(const obj of this.selectedAry){
               const i = this.selectedAry.indexOf(obj);
               if(obj&&this.rightNameAry[i]){
                   if(obj == this.selectedAry[i]){
                       b = true;
                   }else{
                            b = false;
                            break;
                        }
                    }
                }
           }else{
               b = false;
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

    // 测试专用
    public showGameOverData():void{
           let b = true;
           if(this.selectedAry.length == this.rightNameAry.length)
           {
               for(const obj of this.selectedAry){
               const i = this.selectedAry.indexOf(obj);
               if(obj&&this.rightNameAry[i]){
                   if(obj == this.selectedAry[i]){
                       b = true;
                   }else{
                            b = false;
                            break;
                        }
                    }
                }
           }else{
               b = false;
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
        this.rightData = null;
        Game_Page1Scene.isGameBegin = false;
    }

    private initPos():void{
        const key = "";
        for(let i=0;i<this.curPosNum.length;i++){
            const str = "txt"+this.curPosNum[i]+"_";
            const len = this.curPosNum[i];
            const _ary = [];
            for(let j=0;j<len;j++){
                const p = new egret.Point(this.selfParent[str+j].x,this.selfParent[str+j].y);
                _ary.push(p);
            }
            const key = i+1;
            this.posDataObj[key] = _ary;
        }
    }

    private creatImg():void{
       const id = parseInt(this.curGameData.condition_id);
       const op = this.curGameData.opertion;
       const qu = this.curGameData.quetion.split(",");
       const an = parseInt(this.curGameData.answer);

       // 背景
       const opImg = CommonDragonBones.getInstance().getElementImg(op);
       opImg.x = 512;
       opImg.y = 329;
       this.opNumAry.push(opImg);

       const key = (op.split("img_sufg"))[1];
       const curQupos = this.posDataObj[key];
       let numAllAry = [];
       let startIndex;
       let endIndex;
       let qn1;
       let qn2;
       if(id<94){
                qn1 = parseInt(qu[0]);
                qn2 = parseInt(qu[1]);
                if(qn1<qn2){
                    startIndex =parseInt(qu[0]);
                    endIndex =parseInt(qu[1])+1;
                }else{
                    startIndex =parseInt(qu[1]);
                    endIndex =parseInt(qu[0])+1;
                }

                for(let i=startIndex;i<endIndex;i++ ){
                    numAllAry.push(i);                   // 生成范围内的数字
                }
            }else{
                numAllAry = qu;
            }

            // 取出固定的数字
       let len = an;
            // 随机取出固定数量的数字
       let quNameAry = [];
       while(len){
                    const rand = App.RandomUtils.limitInteger(0, numAllAry.length - 1);
                    quNameAry.push(numAllAry[rand]);
                    numAllAry.splice(rand,1);
                    len--;
            }
       if(id<94){
                this.rightNameAry = this.sortNum(quNameAry,qn1,qn2);
            }else{
                this.rightNameAry = this.sortNum(quNameAry,1,2);
            }

       let _w;
       let _h;
       switch(an){
                case 3:
                    _w = 100;
                    _h = 100;
                    break;
                case 5:
                    _w = 100;
                    _h = 100;
                    break;
                case 9:
                    _w = 214;
                    _h = 100;
                    break;
                case 16:
                    _w = 162;
                    _h = 82;
                    break;
                case 25:
                    _w = 130;
                    _h = 69;
                    break;
            }

       quNameAry = this.creatRandomAry(quNameAry);
       for(const obj of quNameAry){
                 const j = quNameAry.indexOf(obj);
                 const s1 = quNameAry[j]+"";
                 const gp = new eui.Group();
                 const p = curQupos[j];
                 if(an == 16&& obj == this.curStartNum){
                      const bgImg = CommonDragonBones.getInstance().getElementImg("img_31");
                      bgImg.x = p.x;
                      bgImg.y = p.y;
                      bgImg.pixelHitTest = true;
                      this.selfParent.addChild(bgImg);
                 }
                 if(an == 25&& obj == this.curStartNum){
                      const bgImg = CommonDragonBones.getInstance().getElementImg("img_32");
                      bgImg.x = p.x;
                      bgImg.y = p.y;
                      bgImg.pixelHitTest = true;
                      this.selfParent.addChild(bgImg);
                 }
                 const label:egret.TextField = new egret.TextField();
                 label.text = s1;
                 label.size = 40;
                 label.textAlign = egret.HorizontalAlign.CENTER;
                 label.verticalAlign = egret.VerticalAlign.MIDDLE;
                 label.strokeColor = 0xFFFF00;   // 描边颜色
                 label.fontFamily = "ziti";
                 gp.width = label.width = _w
                 gp.height = label.height = _h;

                 gp.addChild(label);
                 this.selfParent.addChild(gp);
                 gp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
                 gp.x = p.x;
                 gp.y = p.y;
                 gp.name = s1;
                 gp.anchorOffsetX = _w/2;
                 gp.anchorOffsetY = _h/2;
                 this.quNumAry.push(gp);

            }
       this.showQuestionsView();
    }

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
            if(n1<n2){
             this.curStartNum = _ary[0];
         }else{
             this.curStartNum = _ary[_ary.length-1];
         }
            return _ary;
    }

    private creatRandomAry(ary):any[]{
      //  let anAry = this.curGameData.opertion.split(",");
        let len = ary.length;
        const _ary = [];
        while(len){
            const rand = App.RandomUtils.limitInteger(0, ary.length - 1);
            _ary.push(ary[rand]);
            ary.splice(rand,1);
            len--;
        }
        return _ary;
    }

    private clearAll():void{
        for(const obj of this.opNumAry){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
        for(const obj of this.quNumAry){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
        const img_1 = this.selfParent.getChildByName("img_31");
        if(img_1){
            this.selfParent.removeChild(img_1);
        }

        const img_2 = this.selfParent.getChildByName("img_32");
        if(img_2){
            this.selfParent.removeChild(img_2);
        }
    }

    private onClickTouch(event:egret.TouchEvent):void{
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        if(!Game_Page1Scene.isGameBegin) {return; }
        const index = this.quNumAry.indexOf(event.currentTarget);
        if(index>=0){
               const obj = event.currentTarget;
               if(obj.name){
                   this.selectedAry.push(obj.name);
               }
           }
    }
}
