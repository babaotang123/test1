namespace zmovie {
    export class LimitPoint{

        public set O(_p:any)
        {
            this.Op = _p;
        }

        public get point():egret.Point
        {
            return this._point;
        }
        public isTop:boolean = false;
        public _point:egret.Point;
        private width:number = NaN;
        private height:number = NaN;
        private topR:number = NaN;
        private bottomR:number = NaN;
        private tPoint:egret.Point = new egret.Point();
        private bPoint:egret.Point = new egret.Point();
        private Op:egret.Point = new egret.Point();
        private mPoint:egret.Point = new egret.Point();
        private dia:number = NaN;
        private speed:number = 1;
        private tmpSpeed:number = 1;

        public constructor()
        {
        }

        public setSize(wid:number,hei:number,initPoint:egret.Point)
        {
            this._point = new egret.Point();
            this.width = wid;
            this.height = hei;
            this.topR = Math.sqrt(wid * wid + hei * hei);
            this.tPoint = new egret.Point(this.Op.x,this.Op.y - hei / 2);
            this.bPoint = new egret.Point(this.Op.x,this.Op.y + hei / 2);
            this.dia = Math.sqrt(this.width * this.width + this.height * this.height);
            this.update(initPoint.x,initPoint.y);
            this.speed = this.tmpSpeed;
        }

        public changeTo(_str:string)
        {
            if(_str == "top")
            {
                if(!this.isTop as any)
                {
                    this.change();
                }
            }
            else if(_str == "bottom")
            {
                if(this.isTop)
                {
                    this.change();
                }
            }
        }

        public close()
        {
            this._point.x = this.width;
            this._point.y = this.height;
        }

        public update(_x:any,_y:any)
        {
            let angle:number = 0;
            this.mPoint.x = _x;
            this.mPoint.y = _y;
            if(((!this.isTop as any) && _y <= this.Op.y + this.height / 2) || (this.isTop && _y >= this.Op.y - this.height / 2))
            {
                if(this.getDis(this.bPoint.x,this.bPoint.y,_x,_y) <= this.width)
                {
                    this._point.x = _x;
                    this._point.y = _y;
                }
                else
                {
                    angle = this.getAngleByPoint(this.bPoint.x,this.bPoint.y,_x,_y);
                    this._point.x = Math.cos(angle) * this.width + this.bPoint.x;
                    this._point.y = Math.sin(angle) * this.width + this.bPoint.y;
                }
            }
            else
            {
                if(this.getDis(this.tPoint.x,this.tPoint.y,_x,_y) <= this.dia)
                {
                    this._point.x = _x;
                    this._point.y = _y;
                }
                else
                {
                    angle = this.getAngleByPoint(this.tPoint.x,this.tPoint.y,_x,_y);
                    this._point.x = Math.cos(angle) * this.dia + this.tPoint.x;
                    this._point.y = Math.sin(angle) * this.dia + this.tPoint.y;
                }
            }
            if(this._point.x < this.Op.x - this.width)
            {
                this._point.x = this.Op.x - this.width;
                this.isTop?this._point.y = this.Op.y - this.height / 2:this._point.y = this.Op.y + this.height / 2;
            }
            if(this._point.x > this.Op.x + this.width)
            {
                this._point.x = this.Op.x + this.width;
                this.isTop?this._point.y = this.Op.y - this.height / 2:this._point.y = this.Op.y + this.height / 2;
            }
        }

        private change():boolean
        {
            const tmp:egret.Point = new egret.Point(this.tPoint.x,this.tPoint.y);
            this.tPoint.x = this.bPoint.x;
            this.tPoint.y = this.bPoint.y;
            this.bPoint.x = tmp.x;
            this.bPoint.y = tmp.y;
            this.isTop = (!this.isTop as any);
            return this.isTop;
        }

        private getDis(p1x:any,p1y:any,p2x:any,p2y:any):number
        {
            const a:number = Math.abs(p1x - p2x);
            const b:number = Math.abs(p1y - p2y);
            return Math.sqrt(a * a + b * b);
        }

        private getAngleByPoint(p1x:any,p1y:any,p2x:any,p2y:any):number
        {
            return Math.atan2(p2y - p1y,p2x - p1x);
        }

    }
}

