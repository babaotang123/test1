namespace ztiledmap {
                    export class TiledMapDisplay extends zmovie.ZMovieClip {


                        public set x(value:number)
                        {
                            if(value == super.$getX())
                            {
                                return ;
                            }
                            this._depth = NaN;
                            super.$setX(value);
                        }
                        public get x():number{
                            return super.$getX();
                        }
                        public get y():number{
                            return super.$getY();
                        }

                        public set y(value:number)
                        {
                            if(value == super.$getY())
                            {
                                return ;
                            }
                            this._depth = NaN;
                            super.$setY(value);
                        }
                        public get depth():number{
            if(isNaN(this._depth)){
                const pos:Point3D = zmovie.Util.screenToIso(new egret.Point(this.x,this.y));
                pos.x = Math.round(pos.x/this.size)*this.size;
                pos.y = Math.round(pos.y/this.size)*this.size;
                pos.z = Math.round(pos.z/this.size)*this.size;
                this._depth = (pos.x+pos.z)*.866-pos.y*.707;
                this.depthPos = pos;
            }
            return this._depth;
        }
                        public depthPos:Point3D;

                        public tx:number = NaN;
                        public ty:number = NaN;
                        public size:number = 0;
                        public hsize:number = 0;
                        public nsize:number = 0;
                        public p:egret.Point;
                        public tmw:TiledMapWorld;public id:string;

                        public tiv:any[];

                        private tml:TiledMoveLogic;
                        private _depth:number;


                        private checkDepthCatch:any;

                        public constructor(imgArr:any,libObj:any,mcName:string = null,scale_:number = 1)
                        {
                            super(imgArr,libObj,mcName,scale_);
                            this.p = new egret.Point();
                        }
                        public moveTo(to:egret.Point)
                        {
                            if(null == this.tml)
                            {
                                this.tml = new TiledMoveLogic(this);
                            }
                            this.tml.moveTo(to);
                        }
                        public tiledObj(o:any,tmw:TiledMapWorld,id:string)
                        {
                            this.id = id;
                            this.tmw = tmw;

                            const tmo:any = this.mcObj.tmo as any;
                            if(null != tmo)
                            {
                                this.anchorOffsetX = tmo["px"];
                                this.anchorOffsetY = tmo["py"];
                                this.size = tmo["size"];
                                this.hsize = this.size*.5;
                                this.nsize = this.size*3;
                            }
                            this.x = o["x"];
                            this.y = o["y"];
                            this.tx = o["x"];
                            this.ty = o["y"];
                            this.tiv = null;
                        }
                        public getTiledV():any[]{
            if(null == this.tiv){
                this.tiv = new Array();
                const tmo:any = this.mcObj.tmo;
                const tmox:number = this.tx-tmo.px+tmo.x;
                const tmoy:number = this.ty-tmo.py+tmo.y;
                const p:egret.Point = new egret.Point(tmox,tmoy);
                // 貌似没有这个必要
                // p = tmw.opintToTiledPoint(p);


                let xnum:number = tmo.xnum;
                let ynum:number = tmo.ynum;
                let spy:number = p.y;
                let spx:number = p.x;

                while(true){
                    const to:TiledObj = this.tmw.getFloorObjByPosition(p.x,p.y);


                    this.tiv.push(to);

                    p.x -= this.size;
                    p.y += this.hsize;


                    ynum-=1;

                    if(0>=ynum){
                        xnum -= 1;
                        if(0>=xnum){
                            break;
                        }else{
                            ynum = tmo.ynum;
                            spx += this.size;
                            p.x = spx;
                            spy += this.hsize;
                            p.y = spy;
                        }
                    }
                }
            }
            return this.tiv;
        }


                        public checkNearDepth(tmt:TiledMapDisplay):number{
            if(null != this.checkDepthCatch){
                const o:any = this.checkDepthCatch[tmt.id];
                if(null != o && o.x == tmt.tx && o.y == tmt.ty && o.ix == this.tx && o.iy == this.ty){
                    return o.depth;
                }
            }
            const v1:any[] = this.getTiledV();
            const v2:any[] = tmt.getTiledV();
            let minJL:number = NaN;
            let minO1:TiledObj,minO2:TiledObj;
            for(let i:number = v1.length-1;i>=0;i--){
                const o1:TiledObj = v1[i];
                for(let j:number = v2.length-1;j>=0;j--){
                    const o2:TiledObj = v2[j];
                    const jl:number = zmovie.Util.getDist(o1.x,o1.y,o2.x,o2.y);
                    if(isNaN(minJL) || jl<minJL){
                        minJL = jl;
                        minO1 = o1;
                        minO2 = o2;
                    }
                }
            }

            if(this.nsize>minJL){
                if(minO1.depth>minO2.depth){
                    return this.setCatch(tmt,1);
                }else if(minO1.depth<minO2.depth){
                    return this.setCatch(tmt,-1);
                }
            }
            return this.setCatch(tmt,0);
        }

                        private setCatch(tmt:TiledMapDisplay,ret:number,isSetOther:boolean = true):number{
            if(null == this.checkDepthCatch){
                this.checkDepthCatch = {};
            }
            let o:any = this.checkDepthCatch[tmt.id];
            if(null == o){
                o = {};
                this.checkDepthCatch[tmt.id] = o;
            }
            o.x = tmt.tx;
            o.y = tmt.ty;
            o.ix = this.tx;
            o.iy = this.ty;
            o.depth = ret;
            if(isSetOther){
                tmt.setCatch(this,ret*-1,false);
            }

            return ret;
        }


                    }
                }
