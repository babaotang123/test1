class CommonDragonBones extends UIObject {
    public static getInstance(): CommonDragonBones {
        if (!CommonDragonBones.instance) {
            CommonDragonBones.instance = new CommonDragonBones();
        }
        return CommonDragonBones.instance;
    }

    private static instance: CommonDragonBones;
    private displayDataAry = [];
    private curIndex: number;
    private curKey: string;
    private imgObj: Object;
    private animationDataAry: Object = new Object();
    private curImgAnimation: any;
    private curImg: eui.Image;

    constructor() {
        super();
    }

    // 取出一个已经创建的单个动作动画
    public getDrgoneDisplay(s: string): any {
        const dragonbonesData = RES.getRes(s + "_ske_json");
        const textureData = RES.getRes(s + "_tex_json");
        const texture = RES.getRes(s + "_tex_png");
        let facA;
        if (dragonbonesData && textureData && texture) {
            facA = new dragonBones.EgretFactory();
            facA.parseDragonBonesData(dragonbonesData);
            facA.parseTextureAtlasData(textureData, texture);
            const obj = facA.buildArmatureDisplay("Sprite");
            obj.name = s;
            return obj;
        } else {
            return null;
        }
    }

    // 根据配置获取已经组装的默认动画
    public getfactoryAry(s: string, n: string = ""): any {
            // [老虎]=[老虎眨眼，老虎答对，老虎打错];
        const sAry = s.split(",");
        const ary = [];
        this.displayDataAry = [];
        for (let i = 0; i < 3; i++) {
                // 生成当前的一组动画
                sAry.length == 1 ? s = sAry[0] : s = sAry[i];
                const s1 = s + "_yan";
                const s2 = s + "_r";
                const s3 = s + "_err";
                const facA = this.getDrgoneDisplay(s1);
                const facB = this.getDrgoneDisplay(s2);
                const facC = this.getDrgoneDisplay(s3);
                const facAry = [facA, facB, facC];
                this.displayDataAry.push(facAry);
        }
        return this.displayDataAry;
    }

    // 隐藏当前动画，显示相应的动画  curIndex 当前动画索引  播放正确的， 播放错误的
    public hideCurDisplayObj(self: any, curIndex: number, rn: boolean = false, err: boolean = false): void {
        const displayObj = this.displayDataAry[curIndex];
        this.curIndex = curIndex;
        let _x;
        let _y;
        for (const _obj of displayObj) {
            if (_obj) {
                _obj.animation.stop();
                _obj.visible = false;
            }
        }
        let obj;
        _x = displayObj[0].x;
        _y = displayObj[0].y;
        if (rn) {
            obj = displayObj[1];
        }
        if (err) {
            obj = displayObj[2];
        }
        obj.x = _x;
        obj.y = _y;
        obj.visible = true;
        self.addChild(obj);
        obj.animation.play(1, 1);
        obj.addEventListener(egret.Event.COMPLETE, this.loopComplete, this);
    }

    // public dragondestroy():void{
    //     for(let obj of this.displayDataAry){
    //         if(obj){
    //             for(let db of obj){
    //                 db.animation.stop();
    //                 if(db.parent){
    //                     db.parent.removeChild(db);
    //                 }
    //                 db.dispose();
    //                 db = null;
    //             }
    //         }
    //     }
    //     this.displayDataAry = [];
    // }

    public getMoviclip(resoucrNme: string): egret.MovieClip {
        const data = RES.getRes(resoucrNme + "_json");
        const txtr = RES.getRes(resoucrNme + "_png");
        const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        const mc: egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( resoucrNme ) );
        return mc;
    }

    // 纹理集播放类
    public textureSAnimation(resoucrNme: string): any {

    }

    // 从元素对象池里面取出数据
    public getElementImg(s: string,type:number = 0): eui.Image {
        const img = new eui.Image();
        img.texture  = RES.getRes(s);
        if (img.texture == null) {
                    return null;
        }
        if(type ==0){
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
        }else if(type == 1){
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height;
        }

               // img.scaleX = img.scaleY = 0.7;
        img.name = s;
        return img;
    }


    public getDisplayObj(s: string, n: number): any {
                const facAry = [];
                // 生成当前的一组动画
                const s1 = s + "_yan";
                const s2 = s + "_r";
                const s3 = s + "_err";
                const facA = this.getDrgoneDisplay(s1);
                const facB = this.getDrgoneDisplay(s2);
                const facC = this.getDrgoneDisplay(s3);
                if (facA) {
                   // facA.scaleX = facA.scaleY = 0.7;
                    facAry.push(facA);
                }
                if (facB) {
                 //   facB.scaleX = facB.scaleY = 0.7;
                    facAry.push(facB);
                }
                if (facC) {
                 //   facB.scaleX = facB.scaleY = 0.7;
                    facAry.push(facC);
                }
                this.animationDataAry[(n + "")] = facAry;
                return facAry;
    }

    public playChangeAnimatin(self: any, key: string, index: number = 1, isImage: boolean = false): void {
        const ary = this.animationDataAry[key];
        if (!ary) {return; }
        this.curKey = key;
        const _x = ary[0].x;
        const _y = ary[0].y;
        for (const _obj of ary) {
            if (_obj && _obj.animation) {
                _obj.animation.stop();
                _obj.visible = false;
            }
        }
        const obj = ary[index];
        obj.x = _x;
        obj.y = _y;
        obj.visible = true;
        self.addChild(obj);
        obj.animation.play(1, -1);

        if (self.moveImg) {
            self.addChild(self.moveImg);
            self.addChild(self["img_che"]);
        }

        // let id = egret.Tween.get(obj).to({x:1138,y:372},3000).call(function(){
        //     egret.Tween.removeTweens(id);
        // })
        obj.addEventListener(egret.Event.COMPLETE, this.changeloopComplete, this);

    }
    public playImgAnimation(img: eui.Image): void {
                img.visible = false;
                this.curImg = img;
                const s = img.name + "_r";
                const fac = this.getDrgoneDisplay(s);
                this.curImgAnimation = fac;
                if (fac) {
                    fac.x = img.x;
                    fac.y = img.y;
                    fac.scaleX = fac.scaleY = 0.7;
                    fac.visible = true;
                    img.parent.addChild(fac);
                    fac.animation.play(1, 1);
                    fac.addEventListener(egret.Event.COMPLETE, this.onImgComplete, this);
                }
    }

    public dragondestroy(): void {
        for (const obj in this.animationDataAry) {
            const ary = this.animationDataAry[obj];
            if (obj) {
                for (let _obj of ary) {
                    if (_obj.animation) {
                         _obj.animation.stop();
                    }
                    if (_obj.parent) {
                        _obj.parent.removeChild(_obj);
                    }
                    _obj.dispose();
                    _obj = null;
                }
            }
            delete this.animationDataAry[obj];
        }

    }

    // 数字对应关系
    private getDisplayName(s: string): string {
        let str = "";
        switch (s) {
            case "1":
                str = "laohu";
                break;
            case "2":
                str = "laohu";
                break;
            case "3":
                str = "laohu";
                break;
            case "4":
                str = "laohu";
                break;
        }
        return s;
    }

    private loopComplete(): void {
         const displayObj = this.displayDataAry[this.curIndex];
         for (const obj of displayObj) {
            if (obj) {
                obj.animation.stop();
                obj.visible = false;
            }
        }
         displayObj[0].visible = true;
         displayObj[0].animation.play(1, -1);
    }

    private onImgComplete(): void {
        this.curImg.visible = true;
        if (this.curImgAnimation && this.curImgAnimation.parent) {
            this.curImgAnimation.animation.stop();
            this.curImgAnimation.visible = false;
            this.curImgAnimation.parent.removeChild(this.curImgAnimation);
            this.curImgAnimation.dispose();
            this.curImgAnimation = null;
        }
    }

    private changeloopComplete(): void {
         const ary = this.animationDataAry[this.curKey];
         for (const obj of ary) {
            if (obj) {
                obj.animation.stop();
                obj.visible = false;
            }
            if (obj.hasEventListener(egret.Event.COMPLETE)) {
                obj.removeEventListener(egret.Event.COMPLETE, this.changeloopComplete, this);
            }
        }
         ary[0].visible = true;
         egret.Tween.get(ary[0], {loop: true}).wait(2000).call(function() {
                ary[0].animation.play();
        });
    }

}
