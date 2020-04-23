class CllickTouchScene extends UIObject {
    protected putImgList:any[];
    protected imgList:any[];
    protected rectList:any[];
    protected wenhaoAry:any[];
    protected curScoreCount:number = 0;
    protected erroCount:number = 0;
    protected oldImg:any;
    protected curAnswerData:Object;
    protected wenhaoObj:Object;
    protected hitCurRectIndexObj:Object;
    private curMoveIndex:number;
    private _distance:egret.Point;
    private curImg:any;
    private isMove:boolean;

    private oldX:number;
    private oldY:number;
    private isCopy:boolean;

    private r_1:eui.Rect;
    private clickIndex:number;
    private copyList:any[];
    private curHitIndex:number;

    // //保存放到问号位置的数据
    private curPutinObj:Object;
    public constructor() {
        super();
    }

     /** 每次进入 */
    public onAdd(): void {
        this.putImgList = [];
        this.imgList = [];
        this.copyList =[];
        this.rectList =[]

        this.curMoveIndex = -1;
        this.isCopy = true;

        this._distance = new egret.Point();
        this.curPutinObj = new Object();
        // this.initAddEvent();
    }

    public initAddEvent(): void {
        for(const obj of this.imgList){

            if(obj){
                obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
            }
        }
        this.imgList[0].parent.addEventListener(egret.TouchEvent.TOUCH_END, this.touchImgEndEvent, this);
        this.imgList[0].parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveEvent, this);
    }

    public clearImg():void{
        for(const obj of this.putImgList){
            if(obj&&obj.parent){
                while(obj.numChildren>0){
                    obj.removeChildAt(0);
                }
                obj.parent.removeChild(obj);
            }
        }
        for(const obj of this.rectList){
            if(obj&&obj.parent){
                while(obj.numChildren>0){
                    obj.removeChildAt(0);
                }
                obj.parent.removeChild(obj);
            }
        }
        for(const obj of this.imgList){
            if(obj&&obj.parent){
                while(obj.numChildren>0){
                    obj.removeChildAt(0);
                }
                obj.parent.removeChild(obj);
            }
        }
        for(const obj of this.wenhaoAry){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
        if(this.curImg){
            if(this.curImg.parent){
                this.curImg.parent.removeChild(this.curImg);
            }
        }
        this.rectList =[];
        this.imgList =[];
        this.putImgList =[];
        this.putImgList = [];
    }

    public execMessage(data: any): void {
    }

    /** 这里进行移出场景的处理 **/
    public onDestroy(): void {
        this.removeAllEvt();
        this.clearImg();
        this.curAnswerData = null;
        this.wenhaoObj = null;
        this.putImgList = [];
        this.imgList = [];
        this.copyList =[];
        this.rectList =[]
        this.curMoveIndex = -1;
        this.isCopy = true;
    }

    protected getSiteIndexForGlobalPos(xGlobal: number, yGlobal: number): boolean {
        const localPos = this.globalToLocal(xGlobal, yGlobal);
        const curX = localPos.x;
        const curY = localPos.y;
        let b:boolean = false;
        for(const obj of this.rectList){
           const i = this.rectList.indexOf(obj);
           if(obj){
              b =  obj.hitTestPoint(curX, curY);
              if(b){
                  this.curHitIndex = i;
                  return b;
              }

           }
       }
        return b
    }

        // 结束
    private touchImgEndEvent(event: egret.TouchEvent): void {
        if (this.curMoveIndex >= 0) {
           this.touchEndHanle();
        }
    }

    private touchEndHanle():void{
            this.hit();
            this.putImgList.push(this.curImg);
            this.curImg = null;
            this.isMove =false;
            this.curMoveIndex = -1;
            this.isCopy = true;
    }

    private hit():void{
        const b = this.getSiteIndexForGlobalPos(this.curImg.x,this.curImg.y);
        if(b){
            const str1 = this.rectList[this.curHitIndex].name+this.curHitIndex;
            const key = this.hitCurRectIndexObj[str1];
            const img = this.curAnswerData[key];
            const curIndex = -1;
            const _x = this.rectList[this.curHitIndex].x;
            const _y = this.rectList[this.curHitIndex].y;
            const p = new egret.Point(_x,_y);
            if(img){
                if(img == this.curImg){
                    this.curImg.x = this.rectList[this.curHitIndex].x;
                    this.curImg.y = this.rectList[this.curHitIndex].y;
                    egret.log("同一个位置的同一个元素");
                    return
                }else{
                    for(const _key in this.curAnswerData){
                        if(this.curImg == this.curAnswerData[_key]){
                            // 更新这个元素在其他位置上的数据
                            this.curAnswerData[_key] = "";
                            delete this.curAnswerData[_key];
                            img.parent.removeChild(img);
                            break;
                        }
                    }
                    egret.log("这个位置上已有元素");
                }
            }else{
                // 没有元素
                for(const _key in this.curAnswerData){
                    if(this.curImg == this.curAnswerData[_key]){
                        // 更新这个元素在其他位置上的数据
                        // let _img = this.curAnswerData[key]
                        // _img.parent.removeChild(img);
                        this.curAnswerData[_key] = "";
                        delete this.curAnswerData[_key];
                        break;
                    }
                }
            }

            this.curImg.x = p.x;
            this.curImg.y = p.y;
            if(img){
                const oldx = img.x;
                const oldy = img.y;
                if(oldx == this.curImg.x&&oldy == this.curImg.y){
                    if(img.parent){
                        img.parent.removeChild(img);
                    }
                }
            }
            this.curImg.scaleX = this.curImg.scaleY = 1;
            this.curAnswerData[key] = this.curImg;
        }else{
            if(this.curImg&&this.curImg.parent){
                this.curImg.parent.removeChild(this.curImg);
            }

            for(const _key in this.curAnswerData){
                if(this.curImg == this.curAnswerData[_key]){
                    // 更新这个元素在其他位置上的数据
                    this.curAnswerData[_key] = "";
                    delete this.curAnswerData[_key];
                    break;
                }
            }

            // let str1 = this.rectList[this.curHitIndex].name+this.curHitIndex;
            // let key = this.hitCurRectIndexObj[str1];
            // let img = this.curAnswerData[key];
            // this.curAnswerData[key] = "";
            // delete this.curAnswerData[key];

            // for(let obj of this.wenhaoAry){
            //     if(obj.x ==this.oldX &&obj.y == this.oldY){
            //         obj.visible = true;

            //     }
            // }
            // if(this.oldImg == this.curImg){
            //     for(let key in this.curAnswerData){
            //         if(this.curAnswerData[key] == this.oldImg){
            //            //有相同的
            //            this.wenhaoObj[key].visible = true;
            //         }
            //     }
            //     this.oldImg =null;
            // }
        }
    }

    private touchMoveEvent(event: egret.TouchEvent): void {
        if(this.curMoveIndex >= 0){
            this.curImg.x = event.stageX - this._distance.x;
            this.curImg.y = event.stageY - this._distance.y;
            this.isMove = true;
        }
    }

    private onClickTouch(event: egret.TouchEvent): void {
        if(!Game_Page1Scene.isGameBegin) {return; }
        if(this.isCopy){
             const index = this.imgList.indexOf(event.currentTarget);
             if(index>=0){
                if(!this.curImg){
                    this.clickIndex = index;
                    this.curImg = this.copyImg();
                    this.curMoveIndex = 1;
                    this._distance.x = event.stageX - this.curImg.x;
                    this._distance.y = event.stageY - this.curImg.y;
                }
            }
        }
    }

    private touchImgBeginEvent(event: egret.TouchEvent): void {
        const index = this.copyList.indexOf(event.currentTarget);
        if(index>=0){
                const img = event.currentTarget;
                this.curMoveIndex = index;
                this.curImg = img;
                this.oldX = this.curImg.x;
                this.oldY = this.curImg.y;
                this._distance.x = event.stageX - img.x;
                this._distance.y = event.stageY - img.y;
                this.setCurImgChildIndex();
            }
    }

    private setCurImgChildIndex():void{
        if(this.curImg.parent){
            this.curImg.parent.addChild(this.curImg);
        }
    }

    private copyImg():any{
        this.scaleX
        const obj = this.imgList[this.clickIndex];
        let img;
        if(obj.texture){
            const path = obj.texture;
            img = new eui.Image(path);
            img.x = obj.x;
            img.y = obj.y;
            img.anchorOffsetX = obj.anchorOffsetX;
            img.anchorOffsetY = obj.anchorOffsetY;
            img.rotation = obj.rotation;
            img.scaleX = obj.scaleX;
            img.scaleY = obj.scaleY;
            img.name = obj.name;
            obj.parent.addChild(img);
        }else{
                    img = new eui.Group();
                    const label:egret.TextField = new egret.TextField();
                    const t:egret.TextField = (obj.$children)[0] as egret.TextField;
                    label.text = t.text;
                    label.size = t.size;
                    label.textAlign = egret.HorizontalAlign.CENTER;
                    label.verticalAlign = egret.VerticalAlign.MIDDLE;
                    label.strokeColor = 0xFFFF00;   // 描边颜色
                    label.fontFamily = "ziti";
                    img.width = img.height = label.width = label.height = t.width;
                    img.addChild(label);
                    obj.parent.addChild(img);
                    img.x =  obj.x;
                    img.y = obj.y;
                    img.anchorOffsetX = img.anchorOffsetY = t.width/2;
                    img.name = obj.name;

        }
        this.isCopy = false;
        this.copyList.push(img);
        img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchImgBeginEvent, this)
        return img;
    }

    private removeAllEvt():void{

        for(const obj of this.putImgList){
            if(obj){
                obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchImgBeginEvent, this);
            }
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
        if(this.imgList[0]){
             this.imgList[0].parent.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchImgEndEvent, this);
             this.imgList[0].parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveEvent, this);
        }
    }

    // private setTestTxt():void{
    //     if(this.selectImg){
    //         if(this.selectImg.name == this.rightName){
    //             //回答正确
    //             this.selfParent.testurl0.text = "正确";
    //         }else{
    //             this.selfParent.testurl0.text = "错误";
    //         }
    //     }
    // }
}
