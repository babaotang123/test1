  /*
    * 通讯等待类
    * All Rights Reserved.
    * 和服务端通讯时的显示效果
    */
class WaitPanel extends egret.Sprite {
    private waitImg: egret.Bitmap;
    private w: number = 0;
    private h: number = 0;
    private bg: egret.Sprite;      // 底遮罩

    private imgHand: egret.Bitmap;
    private tips:eui.Label;
    private timerId:any;
    private count:number;
    private curTipsStr:string;
    private rect:eui.Rect;
    constructor(str ="") {
        super();
        //str = "数据加载中"
        this.curTipsStr = str;
        this.createView();
    }

    public destory(): void {
       egret.clearTimeout(this.timerId);
       if(this.rect&&this.rect.parent){
           this.rect.parent.removeChild(this.rect);
       }
    }

    private createView(): void {
        this.count =0;
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.addMask();
        let wait = CommonDragonBones.getInstance().getMoviclip("wait");
        wait.anchorOffsetX = wait.width/2;
        wait.anchorOffsetY = wait.height/2;
        wait.x = 480;
        wait.y = 250;
        wait.play(-1);
        this.addChild(wait);

        this.tips = new eui.Label();
        this.tips.$alpha = 0.8;
        this.tips.fontFamily = "ziti";
        this.tips.width = 200;
        this.tips.text = this.curTipsStr;
        this.tips.x = 512;
        this.tips.y = 320;
        this.tips.visible =true;
        this.tips.anchorOffsetX = 100;
        this.addChild(this.tips);

        this.playTips(this.curTipsStr);
    }

    public setTipsStr(str):void{
        this.curTipsStr = str;
    }

    private addMask(): void {
        this.rect = new eui.Rect();
        this.rect.width = this.w;
        this.rect.height = this.h;
        this.rect.alpha = 0.4;
        egret.MainContext.instance.stage.addChild(this.rect);
        // this.bg = new egret.Sprite();
        // this.bg.x = 0;
        // this.bg.y = 0;
        // this.bg.graphics.beginFill(0x000000);
        // this.bg.graphics.drawRect(0, 0, this.w, this.h);
        // this.bg.graphics.endFill();
        // egret.MainContext.instance.stage.addChild(this.bg);
        // this.bg.alpha = 0.5;
    }

    private playTips(str):void{
        let s1 = str;
        let s2 = ".";
        s1 +=s2;
        this.tips.text = s1;
        if(this.count == 6){
            s1 = this.curTipsStr;
            this.count = 0;
        }
        let self = this;
        this.timerId = setTimeout(function(){
            egret.clearTimeout(self.timerId);
            self.playTips(s1);
        },300);
        
        this.count++;
    }

}
