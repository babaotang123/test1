namespace ztiledmap{
export class TiledObj {
        public get depth():number{
            if(!isNaN(this._depth)){
                return this._depth;
            }

            const pos:Point3D = zmovie.Util.screenToIso(new egret.Point(this.x,this.y));
            pos.x = Math.round(pos.x/this.size)*this.size;
            pos.y = Math.round(pos.y/this.size)*this.size;
            pos.z = Math.round(pos.z/this.size)*this.size;
            this._depth = (pos.x+pos.z)*.866-pos.y*.707;
            this.depthPos = pos;
            return this._depth;
        }
        public d:any;public size:number;public x:number;public y:number;public walkable:boolean;
        public depthPos:Point3D;
        private _depth:number;
        public constructor(size:number) {
        this.size = size;
    }
}
}