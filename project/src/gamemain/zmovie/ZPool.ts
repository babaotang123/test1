namespace zmovie {
    export class ZPool {
        public static getObject():any{
            if(null != ZPool.poolObj && 0 != ZPool.poolObj.length){
                return ZPool.poolObj.pop();
            }
            return {};
        }
        public static putObject(o:Object):void{
            if(null == ZPool.poolObj){
                ZPool.poolObj = [];
            }
            for(const k in o){
                delete o[k];
            }
            ZPool.poolObj.push(o);
        }
        public static getPoint(x:number = 0, y:number = 0):egret.Point{
            if (0 == ZPool.sPoints.length) { return new egret.Point(x, y); }
            else
            {
                const point:egret.Point = ZPool.sPoints.pop();
                point.x = x; point.y = y;
                return point;
            }
        }

        /** Stores a Point instance in the pool.
         *  Don't keep any references to the object after moving it to the pool! */
        public static putPoint(point:egret.Point):void
        {
            if (point) { ZPool.sPoints.push(point); }
        }
        private static poolObj:any[];


        private static sPoints:any[] = [];
        public constructor() {
        }


    }
}