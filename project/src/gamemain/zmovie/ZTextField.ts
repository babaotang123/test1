class ZTextField extends  egret.TextField{
    public img_depth: number;
    public constructor(text:string,fontSize:number,color:number=0x0,_w:number = NaN,bold:boolean=false,fontName:string=null,filters:any[] = null,lend:number = NaN,_h:number = NaN,isPixelSize:boolean = true,textObj:any = null) {
        super();

        this.width = _w;
        this.size = fontSize;
        this.textColor = color;
        this.bold = bold;
        this.fontFamily = fontName;
        this.text = text;
        this.italic = textObj.tf.italic;
        this.textAlign = textObj.tf.align;

        if(null != filters){
            try{
                this.filters = zmovie.Util.getFilters(filters);
            }catch(err){}
        }

    }
}