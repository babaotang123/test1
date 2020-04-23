class RandomMove extends UIObject {

    private id:any
    public constructor() {
        super();
    }

    public play(obj):void{
        const speed = 10;// 定义总体速度
        const offsetMaxWidth = 932;
        const offsetMaxHeight = 420;
        const offsetWidth = 72.5;
        const offsetHeight = 159;
        const theta = 2 * Math.PI * Math.random();

        let speedX = 5;
        let speedY = 5;
        this.id =  egret.setInterval(function(){
                    obj.x =obj.x + speedX;
                    obj.y =obj.y + speedY;

                    const curX = obj.x;
                    const curY = obj.y;
                    egret.log("当前y坐标   "+curY);
                    egret.log("速度   "+speedY);
                    if(curX >=offsetMaxWidth) {
                         //   speedX = App.RandomUtils.limitInteger(3, 7);
                            speedX = -App.RandomUtils.limitInteger(5, 7);
                    }
                    if(curX <=offsetWidth) {
                         //   speedX = App.RandomUtils.limitInteger(3, 7);
                            speedX = App.RandomUtils.limitInteger(5, 7);
                    }
                    if(curY>=offsetMaxHeight) {
                          //  speedY = App.RandomUtils.limitInteger(3, 7);
                            speedY = -App.RandomUtils.limitInteger(5, 7);
                    }
                    if(curY<=offsetHeight){
                            speedY = App.RandomUtils.limitInteger(5, 7);
                    }
                },                   this,10);
        }

    public clear():void{
                egret.clearInterval(this.id);
        }
}
