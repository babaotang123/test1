/**
 *
 * @author
 *
 */
class ZShap extends egret.Shape{
    public img_depth: number;
    public constructor() {
        super();
    }
    public draw(arr:any[]){
        this.graphics.clear();

        const len = arr.length;
        let k;
        for(let i = 0;i<len;i++){
            const o:any = arr[i];
            if("ef" == o){
                this.graphics.endFill();
            }else if(null != o.colors){
                const m:any = o.matrix;
                const matrix:egret.Matrix = new egret.Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
                this.graphics.beginGradientFill(o.type,o.colors,o.alphas,o.ratios,matrix);
            }else if(null != o.color){
                this.graphics.beginFill(o.color,o.alpha);
            }else if(null != o.commands){
                const cm:any[] = o.commands;
                const data:any[] = o.data;
                const len2 = cm.length;
                k = 0;
                for(let j = 0;j<len2;j++){
                    const ci = cm[j];
                    try{
                        if(1 == ci){
                            this.graphics.moveTo(data[k],data[k+1]);
                            k+=2;
                        }else if(2 == ci){
                            this.graphics.lineTo(data[k],data[k+1]);
                            k+=2;
                        }else if(3 == ci){
                            this.graphics.curveTo(data[k],data[k+1],data[k+2],data[k+3]);
                            k+=4;
                        }else if(6 == ci){
                            this.graphics.cubicCurveTo(data[k],data[k+1],data[k+2],data[k+3],data[k+4],data[k+5]);
                            k+=6;
                        }
                    }catch(err){
                    }
                }


                }
            }
    }
}
