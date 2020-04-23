namespace zmovie {
    export class ZPage extends egret.Sprite {

        public get _target():any
        {
            return this.target;
        }

        public _rotation:number = NaN;
        public angle:number = NaN;
        private pa:egret.DisplayObject;
        private pb:egret.DisplayObject;
        private wid:number = NaN;
        private hei:number = NaN;
        private c_mc1:egret.Sprite;
        private c_mc2:egret.Sprite;
        private target:egret.Sprite;
        private targetPoint:egret.Point = new egret.Point();

        public constructor(pa:egret.DisplayObject,pb:egret.DisplayObject,w:number,h:number)
        {
            super();
            this.pa = pa;
            this.pb = pb;
            this.wid = w;
            this.hei = h;
            this.c_mc1 = new egret.Sprite();
            this.c_mc2 = new egret.Sprite();
            this.addChild(this.c_mc1);
            this.addChild(this.c_mc2);
            this.c_mc1["addChild"](pa);
            this.c_mc2["addChild"](pb);
            this.target = this.c_mc2;
        }

        public setPageA(a:egret.DisplayObject)
        {
            if(null != this.pa["parent"])
            {
                this.pa["parent"].removeChild(this.pa);
            }
            this.pa = a;
            this.c_mc1["addChild"](a);
        }

        public setPageB(b:egret.DisplayObject)
        {
            if(null != this.pb["parent"])
            {
                this.pb["parent"].removeChild(this.pb);
            }
            this.pb = b;
            this.c_mc2["addChild"](b);
        }

        public flush_pa()
        {
            this.c_mc1["addChild"](this.pa);
        }

        public flush_pb()
        {
            this.c_mc2["addChild"](this.pb);
        }
        public updateRotation(_x:any,_y:any)
        {
            this.angle = Math.atan2(this.targetPoint.y - _y,this.targetPoint.x - _x);
            this._rotation = this.target["rotation"] = 2 * this.angle;
        }

        public setCor(_str:string)
        {
            switch(_str)
            {
            case "TL" :
                this.pb["x"] = -this.wid;
                this.pb["y"] = 0;
                this.pa["x"] = -this.wid;
                this.pa["y"] = 0;
                this.target = this.c_mc1;
                this.targetPoint.x = -this.wid;
                this.targetPoint.y = 0;
                this.c_mc2["rotation"] = 0;
                this.c_mc2["y"] = 0;
                this.c_mc2["x"] = 0;
                this.setChildIndex(this.c_mc1,this.numChildren - 1);
                break;
            case "TR" :
                this.pa["x"] = 0;
                this.pa["y"] = 0;
                this.c_mc1["x"] = 0;
                this.c_mc1["y"] = 0;
                this.pb["x"] = 0;
                this.pb["y"] = 0;
                this.target = this.c_mc2;
                this.targetPoint.x = this.wid;
                this.targetPoint.y = 0;
                this.c_mc1["rotation"] = 0;
                this.setChildIndex(this.c_mc2,this.numChildren - 1);
                break;
            case "BL" :
                this.pb["x"] = -this.wid;
                this.pb["y"] = 0;
                this.pa["x"] = -this.wid;
                this.pa["y"] = -this.hei;
                this.target = this.c_mc1;
                this.targetPoint.x = -this.wid;
                this.targetPoint.y = this.hei;
                this.c_mc2["rotation"] = 0;
                this.c_mc2["y"] = 0;
                this.c_mc2["x"] = 0;
                this.setChildIndex(this.c_mc1,this.numChildren - 1);
                break;
            case "BR":
                this.pa["x"] = 0;
                this.pa["y"] = 0;
                this.c_mc1["x"] = 0;
                this.c_mc1["y"] = 0;
                this.pb["x"] = 0;
                this.pb["y"] = -this.hei;
                this.target = this.c_mc2;
                this.targetPoint.x = this.wid;
                this.targetPoint.y = this.hei;
                this.c_mc1["rotation"] = 0;
                this.c_mc1["y"] = 0;
                this.c_mc1["x"] = 0;
                this.setChildIndex(this.c_mc2,this.numChildren - 1);
                break;
            }
        }

    }
}

