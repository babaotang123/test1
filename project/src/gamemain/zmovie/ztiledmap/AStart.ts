namespace ztiledmap{
                    export class AStart{
                        private tmw:TiledMapWorld;
                        private _heuristic:Function = this.diagonal;
                        private _straightCost:number = 1.0;
                        private _diagCost:number = Math.SQRT2;

                        private xyObjCatch:any;


                        private endO:any;
                        private startO:any;
                        private _open:Object[];
                        private _closed:Object[];
                        private _path:Object[];

                        public constructor(tmw:TiledMapWorld){
                            this.tmw = tmw;
                        }
                        public search(from:egret.Point,to:egret.Point):Object[]
                        {
                            this.initCatch();
                            to = this.tmw["opintToTiledPoint"](to);
                            if(this.tmw["getIsStopMove"](to.x,to.y))
                            {
                                console.log("这里禁止移动");
                                return null;
                            }
                            this.endO = this.getObject(to.x,to.y);
                            from = this.tmw["opintToTiledPoint"](from);
                            this.startO = this.getObject(from.x,from.y);
                            if(null == this._open)
                            {
                                this._open = new Array<Object>();
                                this._closed = new Array<Object>();
                                this._path = new Array<Object>();
                            }
                            else
                            {
                                this._open.splice(0,this._open.length);
                                this._closed.splice(0,this._closed.length);
                                this._path.splice(0,this._path.length);
                            }
                            this.startO["g"] = 0;
                            this.startO["h"] = this._heuristic(this.startO);
                            this.startO["f"] = this.startO["g"] + this.startO["h"];
                            return this.start();
                        }
                        private initCatch()
                        {
                            if(null == this.xyObjCatch)
                            {
                                this.xyObjCatch = {};
                            }
                            for(const xk in this.xyObjCatch)
                            {
                                const o:any = this.xyObjCatch[xk] as any;
                                for(const yk in o)
                                {
                                    const o2:any = o[yk] as any;
                                    zmovie.ZPool.putObject(o2);
                                }
                                zmovie.ZPool.putObject(o);
                                delete this.xyObjCatch[xk];
                            }
                        }

                        private diagonal(node:any):number
                        {
                            const dx:number = Math.abs(node["x"] - this.endO["x"]);
                            const dy:number = Math.abs(node["y"] - this.endO["y"]);
                            const diag:number = Math.min(dx,dy);
                            const straight:number = dx + dy;
                            return this._diagCost * diag + this._straightCost + (straight - 2 * diag);
                        }

                        private getObject(x:number,y:number):any
                        {
                            let o:any = this.xyObjCatch[x] as any;
                            if(null == o)
                            {
                                o = zmovie.ZPool.getObject();
                                this.xyObjCatch[x] = o;
                            }
                            if(null == o[y])
                            {
                                o[y] = zmovie.ZPool.getObject();
                                o[y].x = x;
                                o[y].y = y;
                            }
                            return o[y];
                        }

                        private start():Object[]
                        {
                            let node:any = this.startO;
                            while(node != this.endO)
                            {
                                let pto:any = node;
                                for(let i:number = 0;i <= 7; i++)
                                {
                                    pto = this.check(pto,i);
                                    if(this.tmw["getIsStopMove"](pto["x"],pto["y"]))
                                    {
                                        continue;
                                    }
                                    let cost:number = this._straightCost;
                                    if((node["x"] == pto["x"]) || (node["y"] == pto["y"]))
                                    {
                                        cost = this._diagCost;
                                    }
                                    const g:number = node["g"] + cost;
                                    let h:number = 0;
                                    if(null == pto["h"])
                                    {
                                        h = this._heuristic(pto);
                                    }
                                    else
                                    {
                                        h = pto["h"];
                                    }
                                    const f:number = g + h;
                                    if(this.isOpen(pto) || this.isClose(pto))
                                    {
                                        if(pto["f"] > f)
                                        {
                                            pto["f"] = f;
                                            pto["g"] = g;
                                            pto["parent"] = node;
                                        }
                                    }
                                    else
                                    {
                                        pto["f"] = f;
                                        pto["g"] = g;
                                        pto["h"] = h;
                                        pto["parent"] = node;
                                        this._open.push(pto);
                                    }
                                }
                                this._closed.push(node);
                                if(0 == this._open.length)
                                {
                                    console.log("no path found");
                                    return null;
                                }
                                this._open.sort(this.sortFun);
                                node = this._open.shift();
                            }
                            this.buildPath();
                            return this._path;
                        }

                        private buildPath()
                        {
                            let node:any = this.endO;
                            this._path.push(node);
                            while(node != this.startO)
                            {
                                node = node["parent"];
                                this._path.unshift(node);
                            }

                        }

                        private sortFun(a:any,b:any):number
                        {
                            if(a["f"] > b["f"])
                            {
                                return 1;
                            }
                            else if(a["f"] < b["f"])
                            {
                                return -1;
                            }
                            return 0;
                        }

                        private isOpen(node:any):boolean
                        {
                            if(0 > this._open.indexOf(node))
                            {
                                return false;
                            }
                            return true;
                        }

                        private isClose(node:any):boolean
                        {
                            if(0 > this._closed.indexOf(node))
                            {
                                return false;
                            }
                            return true;
                        }

                        private check(pto:any,cnum:number):any
                        {
                            let to:any;
                            if(0 == cnum)
                            {
                                to = this.getObject(pto["x"],pto["y"] - this.tmw["size"]);
                            }
                            else if(1 == cnum || 2 == cnum)
                            {
                                to = this.getObject(pto["x"] + this.tmw["size"],pto["y"] + this.tmw["hsize"]);
                            }
                            else if(3 == cnum || 4 == cnum)
                            {
                                to = this.getObject(pto["x"] - this.tmw["size"],pto["y"] + this.tmw["hsize"]);
                            }
                            else if(5 == cnum || 6 == cnum)
                            {
                                to = this.getObject(pto["x"] - this.tmw["size"],pto["y"] - this.tmw["hsize"]);
                            }
                            else if(7 == cnum)
                            {
                                to = this.getObject(pto["x"] + this.tmw["size"],pto["y"] - this.tmw["hsize"]);
                            }
                            return to;
                        }

                    }
                }
