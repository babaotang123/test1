namespace ztiledmap{
                    export class TiledMapWorld extends  egret.DisplayObjectContainer {
                        public size:number = NaN;
                        public hsize:number = NaN;


                        public isMove:Boolean;
                        private libObj:any;
                        private mcName:string;
                        private mcObj:any;
                        private _floor:egret.Sprite;
                        private _world:egret.Sprite;
                        private pKeyObj:any;
                        private showIdCatch:any;
                        private tiledV:any[];
                        private currShow:any[];
                        private defT:egret.Texture;
                        private defTS:number;
                        private px:number = NaN;
                        private py:number = NaN;
                        private currShowBuild:any[];
                        private imgArr:any;


                        private _astart:AStart;

                        private downX:number = NaN;
                        private downY:number = NaN;
                        private srcX:number = NaN;
                        private srcY:number = NaN;

                        private sortID:number = 0;

                        private s:egret.Stage;
                        private gp:egret.Point;
                        private gp2:egret.Point;

                        public constructor(imgArr:any,libObj:any,mcName:string=null)
                        {
                            super();
                            this.gp = new egret.Point();
                            const tmo:any = libObj.tileMap;
                            if(null == tmo){
                                return;
                            }
                            let key:string;
                            if(null == mcName){
                                for(key in tmo){
                                    mcName = key;
                                    break;
                                }
                            }
                            if(null == tmo[mcName]){
                                return ;
                            }

                            this.imgArr = imgArr;
                            this.mcName = mcName;
                            this.libObj = libObj;

                            this.mcObj = zmovie.Util.clone(tmo[mcName]);
                            this._floor = new egret.Sprite();
                            this.addChild(this._floor);
                            this._world = new egret.Sprite();
                            this.addChild(this._world);
                            const xNum:number = this.mcObj["xnum"];
                            const yNum:number = this.mcObj["ynum"];
                            this.size = this.mcObj["size"];
                            this.hsize = this.size * .5;
                            const zmc:zmovie.ZMovieClip = new zmovie.ZMovieClip(imgArr,this.libObj,this.mcObj.defT);
                            if(1 == zmc.totalFrame && 1 == zmc.numChildren){
                                const b:zmovie.ZImage = zmc.getChildAt(0) as zmovie.ZImage;
                                if(null != b){
                                    this.defT = b.getTexture();
                                    this.defTS = b.getScale();
                                    this.px = b.width >> 1;
                                    this.py = b.height >> 1;
                                }
                            }
                            zmc.dispose();

                            this.pKeyObj = {};
                            this.showIdCatch = {};
                            this.tiledV = [];
                            this.currShow = [];
                            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.stageHandle,this);
                        }


                        public setTobj(x:number,y:number,o:any):void{
            let tobj:any = this.mcObj.tobj[x];
            if(null == tobj){
                tobj = {};
                this.mcObj.tobj[x] = tobj;
            }
            tobj[y] = o;
        }

                        public removeTobj(x:number,y:number):any{
            const tobj:any = this.mcObj.tobj[x];
            let retObj:any = null;
            if(null != tobj){
                retObj = tobj[y];
                if(null != retObj){
                    delete tobj[y];
                    if(!zmovie.Util.isObjContent(tobj)){
                        delete this.mcObj.tobj[x];
                    }
                }
            }
            return retObj;
        }


                        public checkIsShow(tmd:TiledMapDisplay):void{
            if(null == this.currShowBuild){
                return;
            }
            let num:number;
            const to:TiledObj = this.getFloorObjByPosition(tmd.tx,tmd.ty,false);

            if(null == to || null == to.d || null == to.d.parent){
                if(null != tmd.parent){
                        num = this.currShowBuild.indexOf(tmd);
                        if(0<=num){
                            this.currShowBuild.splice(num,1);
                        }
                        tmd.parent.removeChild(tmd);
                        tmd.stop();
                }
            }else{
                if(null == tmd.parent){
                    num = this.currShowBuild.indexOf(tmd);
                    if(0>num){
                        this.currShowBuild.push(tmd);
                    }
                    this._world.addChild(tmd);
                    if(tmd.isMovie()){
                        tmd.play();
                    }
                }
            }

        }
                        public astart(from:egret.Point,to:egret.Point):Object[]{
                            if(null == this._astart){
                                this._astart = new AStart(this);
                            }
                            return this._astart["search"](from,to);
                        }
                        public sort(delay:number = 10)
                        {
                            if(0 != delay && 0 != this.sortID)
                            {
                                return ;
                            }
                            egret.clearTimeout(this.sortID);
                            if(0 != delay){
                                this.sortID = egret.setTimeout(this.sort,this,delay,0);
                                return ;
                            }
                            this.sortID = 0;
                            if(null != this.currShowBuild)
                            {
                                this.currShowBuild.sort(this.sortDepth);
                                this.checkNearDepth();
                                const len:number = this.currShowBuild.length;
                                for(let i:number = 0;i < len; i++)
                                {
                                    this._world.setChildIndex(this.currShowBuild[i],i);
                                }
                            }
                        }

                        public formatPoint(p:egret.Point)
                        {
                            const num:number = 0;
                            if(0 != p.x % 1)
                            {
                                p.x = Math.ceil(p.x);
                                if(0 > p.x)
                                {
                                    p.x -= 1;
                                }
                                p.x = Math.floor(p.x / this.size) * this.size;
                            }
                            if(0 != p.y % 1)
                            {
                                p.y = Math.ceil(p.y);
                                if(0 > p.y)
                                {
                                    p.y -= 1;
                                }
                                p.y = Math.floor(p.y / this.hsize) * this.hsize;
                            }
                        }

                        public opintToTiledPoint(p:egret.Point):egret.Point
                        {

                            const pos:ztiledmap.Point3D = zmovie.Util.screenToIso(p);
                            pos["x"] = Math.round(pos["x"] / this.size) * this.size;
                            pos["y"] = Math.round(pos["y"] / this.size) * this.size;
                            pos["z"] = Math.round(pos["z"] / this.size) * this.size;
                            const xnum:number = Math.floor(pos["x"] / this.size);
                            const ynum:number = Math.floor(pos["z"] / this.size);
                            p = zmovie.Util.isoToScreen(pos);
                            this.formatPoint(p);
                            return p;
                        }

                        public getIsStopMove(x:number,y:number):boolean
                        {
                            x = x;
                            y = y;
                            const o:any = this.getTobj(x,y);
                            if(null != o)
                            {
                                const tmpO:any = this.getContentObjById(o as string);
                                if(null != tmpO && null == tmpO["noStop"])
                                {
                                    return true;
                                }
                            }
                            return false;
                        }

                        public getTobj(x:number,y:number):any
                        {
                            const tobj:any = this.mcObj.tobj[x];
                            if(null != tobj)
                            {
                                return tobj[y];
                            }
                            return null;
                        }

                        public flush()
                        {
                            if(null == this.stage)
                            {
                                return ;
                            }
                            let p:egret.Point = this.globalToLocal(this.gp.x,this.gp.y)
                            let spx:number = 0,spy:number = 0;
                            const p2:egret.Point = this.globalToLocal(this.gp2.x,this.gp2.y);
                            p.x -= this.size*5;
                            p.y -= this.hsize*5;
                            p2.x += this.size*10;
                            p2.y += this.hsize*10;
                            const showV:ztiledmap.TiledObj[] = new Array<ztiledmap.TiledObj>();
                            const showBV:TiledMapDisplay[] = new Array<TiledMapDisplay>();
                            let d:egret.DisplayObject;
                            p = this.opintToTiledPoint(p);
                            let yb:boolean = true as any;
                            spy = p.y;
                            spx = p.x;
                            let isSort:boolean;
                            while(true)
                            {
                                const to:TiledObj = this.getFloorObjByPosition(p.x,p.y);
                                this.createTiledDisplay(to);
                                d = to.d;
                                if(null == d.parent){
                                    this._floor.addChild(d);
                                }
                                if(null != this.mcObj && null != this.mcObj["tobj"])
                                {
                                    let tobj:any = this.mcObj["tobj"][p.x] as any;
                                    if(null != tobj)
                                    {
                                        tobj = tobj[p.y];
                                        if(null != tobj)
                                        {
                                            const tmb:TiledMapDisplay = this.showContent(tobj as string);
                                            if(null == tmb["parent"])
                                            {
                                                isSort = true;
                                                this._world["addChild"](tmb);
                                                if(tmb["isMovie"]())
                                                {
                                                    tmb["play"]();
                                                }
                                            }
                                            if(0 > showBV.indexOf(tmb))
                                            {
                                                showBV.push(tmb);
                                            }
                                            if(null != this.currShowBuild)
                                            {
                                                const cnum:number = this.currShowBuild.indexOf(tmb);
                                                if(0 <= cnum)
                                                {
                                                    this.currShowBuild.splice(cnum,1);
                                                }
                                            }
                                        }
                                    }
                                }
                                if(null != this.currShow)
                                {
                                    const tnum:number = this.currShow.indexOf(to);
                                    if(0 <= tnum)
                                    {
                                        this.currShow.splice(tnum,1);
                                    }
                                }
                                showV.push(to);
                                p.x += this.size;
                                if(yb)
                                {
                                    p.y = spy + this.hsize;
                                }
                                else
                                {
                                    p.y = spy;
                                }
                                yb = (!yb as any);
                                if(p.x >= p2.x)
                                {
                                    p.x = spx;
                                    spy += this.size;
                                    p.y = spy;
                                    yb = true;
                                    if(p.y >= p2.y)
                                    {
                                        break;
                                    }
                                }
                            }
                            let i:number = 0;
                            if(null != this.currShow)
                            {
                                for(i = this.currShow.length - 1; i >= 0; i--)
                                {
                                    d = this.currShow[i].d;
                                    if(null != d.parent)
                                    {
                                        d.parent.removeChild(d);
                                    }
                                }
                            }
                            this.currShow = showV;
                            if(null != this.currShowBuild)
                            {
                                for(i = this.currShowBuild.length - 1; i >= 0; i--)
                                {
                                    d = this.currShowBuild[i];
                                    if(null != d.parent)
                                    {
                                        d.parent.removeChild(d);
                                        if(d instanceof zmovie.ZMovieClip){
                                            const zm:zmovie.ZMovieClip = d as zmovie.ZMovieClip;
                                            zm.stop();
                                        }
                                    }
                                }
                            }
                            this.currShowBuild = showBV;
                            if(isSort)
                            {
                                this.sort();
                            }
                        }

                        public createFloor(x:number,y:number):TiledObj
                        {
                            const to:TiledObj = new TiledObj(this.size) as any;
                            this.tiledV.push(to);
                            let tmpO:any = this.pKeyObj[x] as any;
                            if(null == tmpO)
                            {
                                tmpO = {};
                                this.pKeyObj[x] = tmpO;
                            }
                            tmpO[y] = to;
                            to["x"] = x;
                            to["y"] = y;

                            return to;
                        }

                        public getContentObjById(id:string):any
                        {
                            return this.mcObj.cont[id];
                        }

                        public getFloorObjById(id:string):TiledMapDisplay
                        {
                            if(null != this.showIdCatch[id])
                            {
                                return this.showIdCatch[id];
                            }else{
                                return this.showContent(id);
                            }
                        }

                        public getFloorObjByPosition(x:number,y:number,isAutoCreate:boolean = true):TiledObj
                        {
                            let ret:TiledObj = null as any;
                            const tmpO:any = this.pKeyObj[x] as any;
                            if(null != tmpO)
                            {
                                ret = tmpO[y];
                            }
                            if(null == ret && isAutoCreate){
                                ret = this.createFloor(x,y);
                            }
                            return ret;
                        }

                        public dispose()
                        {
                            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.stageHandle,this);
                            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.stageHandle,this);
                            if(null != this.parent)
                            {
                                this.parent.removeChild(this);
                            }
                            if(null != this.s)
                            {
                                this.s.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandle,this);
                                this.s.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandle,this);
                            }
                        }


                        private touchHandle(e:egret.TouchEvent){

                            if(egret.TouchEvent.TOUCH_BEGIN == e.type){
                                this.srcX = this.x;
                                this.srcY = this.y;
                                this.downX = e.stageX;
                                this.downY = e.stageY;
                                this.isMove = false;
                            }else if(egret.TouchEvent.TOUCH_MOVE == e.type){
                                if(!this.isMove){
                                    if(5<Math.abs(e.stageX-this.downX) || 5<Math.abs(e.stageY-this.downY)){
                                        this.isMove = true;
                                    }
                                }
                                this.x = this.srcX + (e.stageX - this.downX);
                                this.y = this.srcY + (e.stageY - this.downY);
                                this.flush();
                            }else{

                            }
                        }

                        private checkNearDepth():void{
            const len:number = this.currShowBuild.length;
            for(let i:number = len-1;i>=0;i--){
                for(let j:number = i-1;j>=0;j--){
                    const ret:number = this.currShowBuild[i].checkNearDepth(this.currShowBuild[j]);
                    if(-1 == ret){
                        const tmp:TiledMapDisplay = this.currShowBuild[i];
                        this.currShowBuild[i] = this.currShowBuild[j];
                        this.currShowBuild[j] = tmp;
                        i = len;
                        break;
                    }
                }
            }
                        }


                        private sortDepth(a:TiledMapDisplay, b:TiledMapDisplay):number{
                            if(a.depth>b.depth){
                                return 1;
                            }else if(a.depth<b.depth){
                                return -1;
                            }

                            if(a.depthPos.x>b.depthPos.x){
                                return 1;
                            }else if(a.depthPos.x<b.depthPos.x){
                                return -1;
                            }
                            return 0;
                    }
                        private stageHandle(e:egret.Event)
                        {
                            if(e.type == egret.Event.REMOVED_FROM_STAGE)
                            {
                                if(null != this.s)
                                {
                                    this.s.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandle,this);
                                    this.s.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandle,this);
                                }
                                this.addEventListener(egret.Event.ADDED_TO_STAGE,this.stageHandle,this);
                                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.stageHandle,this);
                            }
                            else
                            {
                                this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.stageHandle,this);
                                this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stageHandle,this);
                                this.s = this.stage;
                                this.s.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandle,this);
                                this.s.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandle,this);
                                if(null == this.gp2)
                                {
                                    this.gp2 = new egret.Point(this.stage.stageWidth,this.stage.stageHeight);
                                }
                                this.flush();
                            }
                        }

                        private createTiledDisplay(to:any):void{
            if(null != to.d){
                return;
            }
            let img:egret.Bitmap;
            if(null != this.defT)
                            {
                                img = new egret.Bitmap(this.defT);
                                img.scaleX /= this.defTS;
                                img.scaleY /= this.defTS;

                                img.anchorOffsetX = this.px;
                                img.anchorOffsetY = this.py;
                                img.x = to.x;
                                img.y = to.y;
                                to.d = img;
                            }else{
                                img = new egret.Bitmap();
                                to.d = img;
                            }
        }

                        private showContent(id:string):TiledMapDisplay
                        {
                            if(null != this.showIdCatch[id])
                            {
                                return this.showIdCatch[id];
                            }
                            let ret:TiledMapDisplay;
                            try
                            {
                                const ao:any = this.mcObj["cont"][id] as any;
                                ret = new TiledMapDisplay(this.imgArr,this.libObj,ao["libName"]);
                                ret["tiledObj"](ao,this,id);
                                this.showIdCatch[id] = ret;
                            }
                            catch(err)
                            {}
                            return ret;
                        }

                    }
                }
