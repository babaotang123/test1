class ZPaper extends  egret.DisplayObjectContainer{

        public get mask_rotation():any
        {
            return this.img["rotation"];
        }

        public get mask_x():any
        {
            return this.img["x"];
        }

        public get mask_y():any
        {
            return this.img["y"];
        }

        public get page():any
        {
            return this.pageMC["_target"].getChildAt(0);
        }
        public get changedPageNum():number
        {
            const lpx:number = this.lp["point"].x as any;
            if(Math.abs(lpx - (-this.w)) < 3)
            {
                if(this.MemoryDir == "right")
                {
                    this.MemoryDir = "left";
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            else if(Math.abs(lpx - this.w) < 3)
            {
                if(this.MemoryDir == "left")
                {
                    this.MemoryDir = "right";
                    return -1;
                }
                else
                {
                    return 0;
                }
            }
            return 0;
        }


        private static getAlignTexture():egret.Shape{
             const r:number = 500;
             const sp:egret.Shape = new egret.Shape();
             sp.graphics.beginFill(0xff0000,1);

             sp.graphics.moveTo(r, r);
             sp.graphics.lineTo(r*2 , r);
             sp.graphics.drawArc(r, r, r, Math.PI/2, Math.PI/2*3, false);
             sp.graphics.lineTo(r, r);
             sp.graphics.endFill();

             return sp;
        }
        public pageA:egret.DisplayObject;public pageB:egret.DisplayObject;public w:number;public h:number;
        public lp:zmovie.LimitPoint;
        public currentDir:string = "right";
        public targetPage:any;

        public MemoryDir:string = "right";

        private pageMC:zmovie.ZPage;	private img:egret.Shape;

        private currentCor:string;

        private started:boolean = false;


        public constructor(pa:egret.DisplayObject,pb:egret.DisplayObject,w:number,h:number) {
        super();
        this.pageA=pa;
        this.pageB=pb;
        this.w=w;
        this.h=h;


        this.img= ZPaper.getAlignTexture();

        const setW:number =Math.sqrt(w*w+h*h);
        const setH:number = setW*2;
        this.img.scaleX = setW/(this.img.width*0.5);
        this.img.scaleY = setH/this.img.height;
        this.img.anchorOffsetX = this.img.width*0.5;
        this.img.anchorOffsetY = this.img.height*0.5;


        this.addChild(this.img);


        this.lp = new zmovie.LimitPoint();
        this.lp.O=new egret.Point(0,h/2);
        this.lp.setSize(w,h,new egret.Point());

        this.pageMC=new zmovie.ZPage(pa,pb,w,h);
        this.pageMC.mask=this.img;
        this.addChild(this.pageMC);

        this.setCor("BR");
    }
        public setCor(Cor:string)
        {
            this.currentCor = Cor;
            this.pageMC["setCor"](Cor);
            this.targetPage = this.pageMC["_target"];
            if(Cor == "TR" || Cor == "BR")
            {
                this.currentDir = "right";
            }
            else
            {
                this.currentDir = "left";
            }
            if(Cor == "TL" || Cor == "TR")
            {
                this.img["y"] = 0;
                this.lp["changeTo"]("top");
            }
            else
            {
                this.lp["changeTo"]("bottom");
                this.img["y"] = this.h;
            }
            this.fix(Cor);
        }

        public show()
        {
            this.img["visible"] = this.visible = true;
        }

        public hide()
        {
            this.img["visible"] = this.visible = false;
        }
        public start()
        {
            this.close();
            this.visible = true;
        }

        public Update(point:egret.Point)
        {
            this.lp["update"](point.x,point.y);
            this.update();
        }

        public close()
        {
            this.lp["close"]();
            this.update();
        }

        public getPageA():egret.DisplayObject
        {
            return this.pageA;
        }

        public getPageB():egret.DisplayObject
        {
            return this.pageB;
        }

        public setPageA(a:egret.DisplayObject)
        {
            this.pageA = a;
            this.pageMC["setPageA"](a);
        }

        public setPageB(b:egret.DisplayObject)
        {
            this.pageB = b;
            this.pageMC["setPageB"](b);
        }

        public flushPageA()
        {
            this.pageMC["flush_pa"]();
        }

        public flushPageB()
        {
            this.pageMC["flush_pb"]();
        }

        private fix(Cor:any)
        {
            if(Cor == "TL")
            {
                this.img["x"] = -this.w;
                this.img["y"] = 0;
                this.img["rotation"] = 180;
                this.targetPage["rotation"] = 180 >> 1;
                this.targetPage["x"] = -this.w;
            }
            else if(Cor == "TR")
            {
                this.img["x"] = 0;
                this.img["y"] = 0;
                this.img["rotation"] = 180;
                this.targetPage["rotation"] = 0;
                this.targetPage["x"] = -this.w;
            }
            else if(Cor == "BL")
            {
                this.img["x"] = 0;
                this.img["rotation"] = 0;
                this.targetPage["rotation"] = 0;
                this.targetPage["x"] = this.w;
            }
            else if(Cor == "BR")
            {
                this.img["x"] = 0;
                this.img.rotation = 180;
                this.targetPage["rotation"] = 0;
                this.targetPage["x"] = -this.w;
            }
        }

        private update()
        {
            this.targetPage["x"] = this.lp["point"].x;
            this.targetPage["y"] = this.lp["point"].y;
            this.pageMC["updateRotation"](this.lp["point"].x,this.lp["point"].y);
            const _sin:number = Math.sin(this.pageMC["angle"] * 2);
            let _x:number = 0;
            if(this.currentCor == "BR")
            {
                _x = this.w - (this.h - this.lp["point"].y) / _sin;
                if(!_sin as any)
                {
                    this.img["x"] = this.w - (this.w - this.lp["point"].x) / 2;
                }
                else
                {
                    this.img["x"] = _x;
                }
                this.img["rotation"] = this.pageMC["_rotation"] / 2;
            }
            else if(this.currentCor == "TR")
            {
                _x = this.w - (-this.lp["point"].y) / _sin;
                if(!_sin as any)
                {
                    this.img["x"] = this.w - (this.w - this.lp["point"].x) / 2;
                }
                else
                {
                    this.img["x"] = _x;
                }
                this.img["rotation"] = this.pageMC["_rotation"] / 2;
            }
            else if(this.currentCor == "TL")
            {
                _x = this.lp["point"].y / _sin - this.w;
                if(this.pageMC["angle"] == 180)
                {
                    this.img["x"] = (-this.w - this.lp["point"].x) / 2 + this.lp["point"].x;
                    this.img["rotation"] = this.pageMC["_rotation"] / 2;
                }
                else
                {
                    if(_sin)
                    {
                        this.img["x"] = _x;
                        this.img["rotation"] = this.pageMC["_rotation"] / 2;
                    }
                    else
                    {
                        this.img["x"] = -this.w;
                        this.img["rotation"] = 180;
                    }
                }
            }
            else if(this.currentCor == "BL")
            {
                _x = -this.w - (this.h - this.lp["point"].y) / _sin;
                if(this.pageMC["angle"] == 180)
                {
                    this.img["x"] = (-this.w - this.lp["point"].x) / 2 + this.lp["point"].x;
                    this.img["rotation"] = this.pageMC["_rotation"] / 2;
                }
                else
                {
                    if(_sin)
                    {
                        this.img["x"] = _x;
                        this.img["rotation"] = this.pageMC["_rotation"] / 2;
                    }
                    else
                    {
                        this.img["x"] = -this.w;
                        this.img["rotation"] = 180;
                    }
                }
            }
        }


}