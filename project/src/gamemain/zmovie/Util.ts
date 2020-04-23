/**
 * Created by zringhost on 15-2-10.
 */
namespace zmovie{
    export class Util{
        public static VER:string = "0.0.2";
        public static stage:egret.Stage;
        public static powerScale: number = 1;
        public static stageWidth: number;
        public static stageHeight: number;


        public static Y_CORRECT:number = Math.cos(-Math.PI/6)*Math.SQRT2;

        public static clone(fromObj: any): any {
        const co = cloneAll(fromObj);
        function cloneAll(obj) {
            function Clone() { }
            Clone.prototype = obj;
            const o = new Clone();
            for (const a in o) {
                if (typeof o[a] == "object") {
                    o[a] = cloneAll(o[a]);
                }
            }
            return o;
        }
        return co;
    }
        public static setStage(s:egret.Stage):void{
            Util.stage = s;

            this.setStageWH(s.stageWidth,s.stageHeight);

            this.checkMinR = Math.PI/4;
            this.scnum = 0;
            this.minCheckLen = 100*this.powerScale;
            this.checkLen = this.checkArr.length;


            s.addEventListener(egret.TouchEvent.TOUCH_BEGIN,Util.touchHandle,this);
        }
        public static isObjContent(o:any):boolean{
            for(const name in o){
                return true;
            }
            return false;
        }

        public static showLog(str:string,time:number = 3000):void{
            const tf:egret.TextField = new egret.TextField();
            tf.bold = true;
            tf.size = 50*Util.powerScale;
            tf.textColor = 0xffffff;
            tf.text = str;
            tf.filters = [new egret.GlowFilter(0x000000)];
            Util.stage.addChild(tf);
            tf.x = (tf.stage.stageWidth-tf.width)>>1;
            tf.y = (tf.stage.stageHeight-tf.height)>>1;
            egret.setTimeout(Util.closeLog, this,time,tf);
        }


        public static encrypt(str:string,num:number):string{
            let ret:string = "";
            for(let i:number = str.length-1;i>=0;i--){
                let c:number = str.charCodeAt(i);
                c += num;
                ret += String.fromCharCode(c);
            }
            return ret;
        }
        public static formatNum(num:number,fixNum:number = 2):number{
            return Number(num.toFixed(fixNum));
        }
        public static getDist(x1:number,y1:number,x2:number,y2:number,isGetAbs:boolean = true):number{
            const dx:number = x2-x1;
            const dy:number = y2-y1;
            let dist:number = Math.sqrt(dx*dx+dy*dy);
            if(isGetAbs){
                dist = Math.abs(dist);
            }
            return dist;
        }


        public static clearDisposeDisplay(d:egret.DisplayObjectContainer):void{
            try{
                let tmpD:egret.DisplayObject;
                for(let i:number = d.numChildren-1;i>=0;i--){
                    tmpD = d.getChildAt(i);
                    d.removeChild(tmpD);
                }
            }catch(err){}
        }
        public static setStageWH(w:number,h:number):void{
            if(w>h){
                Util.powerScale = h / 1536;
            }else{
                Util.powerScale = w / 1536;
            }
            Util.stageWidth = w;
            Util.stageHeight = h;
        }

        public static getTextureArrByName(imgArr:any,libObj:any,libName:string):any[]{
            const ret:any[] = [];
            let t:egret.Texture = Util.getTextureByName(imgArr,libName);
            if(null == t){
                const arr:any[] = libObj.clipping[libName];
                if(null != arr){
                    for(let i:number = arr.length-1;i>=0;i--){
                        t = Util.getTextureByName(imgArr,arr[i].name);
                        if(null != t){
                            ret.push({t,x:arr[i].x,y:arr[i].y});
                        }else{
                            return ret;
                        }
                    }
                }
                return ret;
            }
            ret.push({t,x:0,y:0});
            return ret;
        }


        public static getFilters(arr:any[]):any[]{
            for(let i:number = arr.length-1;i>=0;i--){
                try{
                    const fo:any = arr[i];
                    if(null == fo.name){
                        continue;
                    }
                    let fName:string = fo.name;
                    fName = fName.substr(fName.lastIndexOf(":")+1);
                    const fobj:any = null;
                    eval("fobj = new egret."+fName+"();");

                    for(const keystr in fo){
                        if("name" == keystr){
                            continue;
                        }
                        try{
                            fobj[keystr] = fo[keystr];
                        }catch(err){}
                    }
                    arr[i] = fobj;
                }catch(err){}

            }
            return arr;
        }

        public static getTextureByName(imgArr:any,libName:string):egret.Texture{
        let t:egret.Texture = null;
        if(imgArr instanceof Array){
             try{
                 const arr:string[] = imgArr;
                 for(let i:number = arr.length-1;i>=0;i--){
                    const t:egret.Texture = RES.getRes(arr[i]+"."+libName);
                    if(null != t){
                        return t;
                      }
                 }
            }catch(err){}

        }else{
            try{
                 t  = RES.getRes(imgArr+"."+libName);
             }catch(err){}
        }
        return t;
    }

        public static isoToScreen(pos:ztiledmap.Point3D):egret.Point{
            const screenX:number = pos.x-pos.z;
            const screenY:number = pos.y*zmovie.Util.Y_CORRECT+(pos.x+pos.z)*.5;
            return new egret.Point(screenX,screenY);
        }

        public static screenToIso(point:egret.Point,p3d:ztiledmap.Point3D = null):ztiledmap.Point3D{
            const xpos:number = point.y+point.x*.5;
            const ypos:number = 0;
            const zpos:number = point.y-point.x*.5;
            if(null == p3d){
                return new ztiledmap.Point3D(xpos,ypos,zpos);
            }else{
                p3d.x = xpos;
                p3d.y = ypos;
                p3d.z = zpos;
                return p3d;
            }
        }

        // private static checkArr:any[] = [{"r":0.0887,"lr":-2.8181,"rr":2.9068,"zd":[2.4823,-2.1778]},{"r":-1.5708,"lr":-1.7176,"rr":0.1468,"zd":[-1.0994]},{"r":0,"lr":-0.1158,"rr":0.1158} ];
        private static checkArr:any[] = [{"rr":0.2616,"zd":[-1.3355],"r":-2.1914,"lr":-2.453},
                                         {"rr":0.037,"r":0,"lr":-0.037},
                                         {"rr":0.1582,"r":-0.037,"lr":-0.1953},
                                         {"rr":0.6254,"r":0.6254,"lr":0},
                                         {"rr":0.0638,"r":-0.1269,"lr":-0.1907},
                                         {"rr":0.1185,"r":0.0417,"lr":-0.0768},
                                         {"rr":3.0329,"zd":[2.3565,-2.4235],"r":-0.1354,"lr":-3.1683}];
        private static checkLen:number;

        private static touchCatch:any[];
        private static pto:any[];
        private static minCheckLen:number;
        private static checkMinR:number;
        private static scnum:number;

        private static touchHandle(e:egret.TouchEvent):void{
            if(egret.TouchEvent.TOUCH_BEGIN == e.type){
                Util.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,Util.touchHandle,this);
                Util.stage.addEventListener(egret.TouchEvent.TOUCH_END,Util.touchHandle,this);
                this.pto = [];
                this.pto.unshift({x:e.stageX,y:e.stageY});
            }else if(egret.TouchEvent.TOUCH_MOVE == e.type){
                this.pto.unshift({x:e.stageX,y:e.stageY});
            }else{
                  Util.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,Util.touchHandle,this);
                  Util.stage.removeEventListener(egret.TouchEvent.TOUCH_END,Util.touchHandle,this);
                  if(null == this.touchCatch){
                     this.touchCatch = [];
                 }
                 // this.touchCatch.push(this.pto);
                  this.touchCatch.unshift(this.pto);
                  this.checkTouchCatch();
            }
        }
        private static checkTouchCatch(){
            const len = this.touchCatch.length;


            if(this.checkLen-this.scnum <= len){
                for(let i=len-1;i>=0;i--){
                    if(this.checkTouchR(this.checkArr[this.scnum],this.checkTouchArr(this.touchCatch[i]))){
                        this.scnum += 1;
                        if(this.scnum >= this.checkLen){
                            this.scnum = 0;
                            Util.showLog(this.encrypt("兾巬皋帏唫右央'I'yl~vW",-7)+" ver:"+Util.VER);
                        }
                    }else{
                        this.scnum = 0;
                    }
                    this.touchCatch.splice(i,1);

                    if(0 == this.scnum){
                        break;
                    }

                }


            }
        }
        private static closeLog(tf:egret.TextField):void{
            if(null != tf.parent){
                tf.parent.removeChild(tf);
            }
        }


        private static checkTouchR(o1:any,o2:any):boolean{
            let num:number = Math.abs(o2.r-o1.r);
            if(num>this.checkMinR){
                return false;
            }
            num = Math.abs(o2.rr-o1.rr);
            if(num>this.checkMinR){
                return false;
            }
            num = Math.abs(o2.lr-o1.lr);
            if(num>this.checkMinR){
                return false;
            }
            const arr1:any[] = o1.zd;
            const arr2:any[] = o2.zd;
            if(null == arr1 && null == arr2){
                return true;
            }
            if(null == arr1 || null == arr2){
                return false;
            }
            if(arr1.length != arr2.length){
                return false;
            }

            for(let i:number = arr1.length-1;i>=0;i--){
                num = Math.abs(arr1[i]-arr2[i]);
                if(num>this.checkMinR){
                    return false;
                }
            }
            return true;
        }


        private static checkTouchArr(arr:any[]){
           // var debug = new egret.Sprite();
            // debug.graphics.lineStyle(1,0xccccff);
            // this.stage.addChild(debug);
            let ppo:any = null;
            let pr:number;
            let addR:number = 0;
            let zhedian:number = 0;
            let zhedianArr:any[];
            let addLR:number = 0;
            let addRR:number = 0;

            for(let i:number = arr.length-1;i>=0;i--){
                const po:any = arr[i];
                if(null != ppo){
                    const len:number = this.getDist(ppo.x,ppo.y,po.x,po.y);
                    if(len<this.minCheckLen){
                        continue;
                    }
                    // debug.graphics.lineTo(po.x,po.y);
                    const r:number = Math.atan2(po.y-ppo.y,po.x-ppo.x);

                    if(!isNaN(pr)){
                        let tmpR:number = r-pr;
                        let tmpAbsR:number = Math.abs(tmpR);


                        if(Math.PI<tmpAbsR){
                            tmpAbsR -= Math.PI*2+(Math.PI-Math.abs(r));
                            tmpAbsR = Math.abs(tmpAbsR);

                            if(po.x<ppo.x){
                                tmpR = -tmpAbsR;
                            }else{
                                tmpR = tmpAbsR;
                            }


                        }


                        addR += tmpR;
                        if(0>tmpR){
                            addLR += tmpR;
                        }else{
                            addRR += tmpR;
                        }

                        if(tmpAbsR>this.checkMinR){
                            zhedian += tmpR;
                        }else{
                            if(0 != zhedian){
                                if(null == zhedianArr){
                                    zhedianArr = [];
                                }
                                zhedianArr.push(zhedian);
                            }
                            zhedian = 0;
                        }

                    }
                    pr = r;
                }
                ppo = po;
               // debug.graphics.drawCircle(po.x,po.y,10);
               // debug.graphics.moveTo(po.x,po.y);
            }
            return {r:addR,lr:addLR,rr:addRR,zd:zhedianArr};
        }


    }
}