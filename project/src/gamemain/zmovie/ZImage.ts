/**
 * Created by ASUS on 15-2-9.
 */
namespace zmovie{
    export class ZImage extends  egret.DisplayObjectContainer{
        public img_depth:number;
        public displayLibName:string;
        private img:egret.Bitmap;
        private _s:number;
        public constructor(t:egret.Texture) {
            super();
            this._s = 1;
            this.img = new egret.Bitmap();
            this.addChild(this.img);
            this.setTexture(t);
        }

        public setTexture(t:egret.Texture):void{
            this.img.texture = t;
        }
        public getTexture():egret.Texture{
            return this.img.texture;
        }
        public setScale(s:number):void{
            this._s = s;
            this.img.scaleX = 1/s;
            this.img.scaleY = 1/s;
        }

        public getScale():number{
            return this._s;
        }

        public setP(o:any):void{
            if(null != o){
               if(null != o.x){
                    this.img.x = o.x;
               }
               if(null != o.y){
                    this.img.y = o.y;
               }
            }
        }

    }
}