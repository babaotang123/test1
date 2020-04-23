namespace ztiledmap {
                    export class TiledMoveLogic{
                        private tmd:TiledMapDisplay;

                        private movePath:egret.Point[];
                        private speed:number = NaN;
                        private cspeed:number = NaN;

                        private intkey:number;


                        private fp:egret.Point;

                        private ci:number = 0;
                        private toP:egret.Point;
                        private isSetTP:boolean;
                        private len:number = 0;
                        private angle:number = NaN;
                        private vx:number = NaN;
                        private vy:number = NaN;

                        private dir:string;

                        public constructor(tmd:TiledMapDisplay)
                        {
                            this.tmd = tmd;
                            this.speed = 3;
                            this.cspeed = this.speed * 2;
                            this.dir = "下";
                        }
                        public clearMove()
                        {
                            if(null != this.movePath)
                            {
                                for(let i:number = this.movePath.length - 1;i >= 0; i--)
                                {
                                    zmovie.ZPool.putPoint(this.movePath[i]);
                                }
                                this.movePath.splice(0,this.movePath.length);
                            }
                            this.toP = null;

                            // Starling.juggler.remove(this);
                            this.stop();
                        }
                        public moveTo(to:egret.Point)
                        {
                            const tmw:TiledMapWorld = this.tmd.tmw;
                            let i:number = 0;
                            if(null == this.movePath)
                            {
                                this.movePath = new Array<egret.Point>();
                            }
                            else
                            {
                                this.clearMove();
                            }
                            if(null != tmw)
                            {
                                if(null == this.fp)
                                {
                                    this.fp = new egret.Point(this.tmd["x"],this.tmd["y"]);
                                }
                                else
                                {
                                    this.fp.x = this.tmd["x"];
                                    this.fp.y = this.tmd["y"];
                                }
                                const v:Object[] = tmw["astart"](this.fp,to) as any;
                                if(null != v)
                                {
                                    for(i = v.length - 1; i >= 0; i--)
                                    {
                                        const o:any = v[i];
                                        this.movePath.unshift(zmovie.ZPool.getPoint(o["x"],o["y"]));
                                    }
                                    this.ci = 0;
                                    this.len = this.movePath.length;
                                    this.startMove();
                                }
                                else
                                {
                                    this.stopMove();
                                }
                            }
                        }

                        public turnUp(l:string)
                        {
                            this.dir = "u";
                            if(this.tmd["getIsExistLabel"](l + "上"))
                            {
                                this.tmd["gotoAndPlayLabel"](l + "上");
                            }
                        }

                        public turnDown(l:string)
                        {
                            this.dir = "d";
                            if(this.tmd["getIsExistLabel"](l + "下"))
                            {
                                this.tmd["gotoAndPlayLabel"](l + "下");
                            }
                        }


                        public advanceTime()
                        {
                            if(this.cspeed > Math.abs(this.toP.x - this.tmd["x"]))
                            {
                                this.tmd["x"] = this.toP.x;
                            }
                            else
                            {
                                this.tmd["x"] += this.vx;
                            }
                            if(this.cspeed > Math.abs(this.toP.y - this.tmd["y"]))
                            {
                                this.tmd["y"] = this.toP.y;
                            }
                            else
                            {
                                this.tmd["y"] += this.vy;
                            }
                            if(this.tmd["x"] == this.toP.x && this.tmd["y"] == this.toP.y)
                            {
                                if(!this.isSetTP){
                                    this.setTp();
                                }
                                this.startMove();
                            }
                            else if(!this.isSetTP){
                                const len:number = zmovie.Util.getDist(this.tmd.x,this.tmd.y,this.toP.x,this.toP.y);
                                if(this.tmd.hsize>len){
                                    this.setTp();
                                }
                            }
                        }
                        private stop():void{
                            egret.clearInterval(this.intkey);
                            this.intkey = NaN;
                        }
                        private play():void{
                            if(isNaN(this.intkey)){
                                this.intkey = egret.setInterval(this.advanceTime,this,10)
                            }
                        }
                        private stopMove()
                        {
                            const l:string = "待机";
                            if("l" == this.dir)
                            {
                                this.turnLeft(l);
                            }
                            else if("r" == this.dir)
                            {
                                this.turnRight(l);
                            }
                            else if("d" == this.dir)
                            {
                                this.turnDown(l);
                            }
                            else if("u" == this.dir)
                            {
                                this.turnUp(l);
                            }
                            this.stop();
                        }
                        private turnLeft(l:string)
                        {
                            this.dir = "l";
                            if(this.tmd["getIsExistLabel"](l + "左"))
                            {
                                this.tmd["direction"] = 1;
                                this.tmd["gotoAndPlayLabel"](l + "左");
                            }
                            else if(this.tmd["getIsExistLabel"](l + "右"))
                            {
                                this.tmd.gotoAndPlayLabel(l + "右");
                                this.tmd.direction = -1;
                            }
                        }

                        private turnRight(l:string)
                        {
                            this.dir = "r";
                            if(this.tmd["getIsExistLabel"](l + "左"))
                            {
                                this.tmd["direction"] = -1;
                                this.tmd["gotoAndPlayLabel"](l + "左");
                            }
                            else if(this.tmd["getIsExistLabel"](l + "右"))
                            {
                                this.tmd["gotoAndPlayLabel"](l + "右");
                                this.tmd["direction"] = 1;
                            }
                        }

                        private startMove()
                        {
                            if(this.ci >= this.len)
                            {
                                this.stopMove();
                                return ;
                            }
                            this.toP = this.movePath[this.ci];
                            this.isSetTP = false;


                            const l:string = "走";
                            if(Math.abs(this.toP.x - this.tmd["x"]) > Math.abs(this.toP.y - this.tmd["y"]))
                            {
                                if(this.toP.x < this.tmd["x"])
                                {
                                    this.turnLeft(l);
                                }
                                else
                                {
                                    this.turnRight(l);
                                }
                            }
                            else
                            {
                                if(this.toP.y < this.tmd["y"])
                                {
                                    this.turnUp(l);
                                }
                                else
                                {
                                    this.turnDown(l);
                                }
                            }
                            const dx:number = this.toP.x - this.tmd["x"];
                            const dy:number = this.toP.y - this.tmd["y"];
                            this.angle = Math.atan2(dy,dx);
                            this.vx = Math.cos(this.angle) * this.speed;
                            this.vy = Math.sin(this.angle) * this.speed;
                            this.ci++;
                            this.play();
                        }


                        private setTp():void{
            this.isSetTP = true;
            const tmw:TiledMapWorld = this.tmd.tmw;
            const obj:Object = tmw.removeTobj(this.tmd.tx,this.tmd.ty);
            if(null != obj){
                tmw.setTobj(this.toP.x,this.toP.y,obj);
                this.tmd.tx = this.toP.x;
                this.tmd.ty = this.toP.y;
                this.tmd.tiv = null;
                tmw.checkIsShow(this.tmd);

            }
            if(null != this.tmd.parent){
                this.tmd.tmw.sort(0);
            }
        }

                    }
                }