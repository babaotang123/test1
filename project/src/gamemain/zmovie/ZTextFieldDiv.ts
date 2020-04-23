/**
 *
 * @author
 *
 */
class ZTextFieldDiv {


    public set x(num:number){
        this.div.style.left = num + "px";
    }
    public set y(num:number){
        this.div.style.top = num + "px";
    }
    public set text(str:string){
        this.div.innerHTML = str;
    }
    public set size(num:number){
        this.div.style.fontSize = num + "px";
    }
    public set visible(b:boolean){
        if(b) {
            this.div.style.display = "";
        } else {
            this.div.style.display = "none";
        }
    }
    private div: any;
    private cont: any;
    // word-break:break-all;width:100%,height:100%
    public constructor() {
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.style.textAlign = "left";
        this.div.style.width = "1000px";
        const object = document.getElementById("bookValue").appendChild(this.div);

    }

    public resizeText(w:number,h:number,str:string):any[]{
        this.div.style.worldBreak = "break-all";
        this.div.style.width = w+"px";
        // this.div.style.height = h+"px";

        // this.div.innerHTML = "<pre style='world-break:break-all;width:"+w+"px'>"+str+"</pre>";
        this.div.innerHTML = str;

        /*var childN:any = this.div.childNodes;
        var len:number = (childN.length);
        for(var i: number = 0;i < len;i++){
            this.checkHTML(childN[i])
        }*/
        this.cont = document.createElement("div");
        this.cont.style.worldBreak = "break-all";
        this.cont.style.width = w+"px";
        this.cont.style.textAlign = "left";

        document.getElementById("bookValue").appendChild(this.cont);
        const ret: any[] = new Array<any>();
        this.checkHTML(this.div,h,ret);
        this.div.innerHTML = "";
        this.cont.innerHTML = "";
        return ret;
        // alert(this.div.offsetHeight);
    }


    private checkEndText(str:string,spine,h):number{
        let c_num: number = str.length >> 1;
        const c_str: string = str.substring(0,c_num);
        const c_str2: string = str.substring(c_num);
        spine.innerHTML = c_str;
        let ret: number = 0;
        if(this.cont.offsetHeight>h){
            ret = this.checkEndText(c_str,spine,h);
        }else{
            c_num = c_str2.length >> 1;
            const c_str2_1: string = c_str2.substring(0,c_num);
            const c_str2_2: string = c_str2.substring(c_num);
            spine.innerHTML = c_str + c_str2_1;
            if(this.cont.offsetHeight>h){
                spine.innerHTML = c_str;
                ret = c_str.length;
            }else{
                ret = c_str.length + c_str2_1.length;
            }
        }
        return ret;
    }

    private checkTextHeight(text:string,spine,h:number,ret:any[]):void{
        while(true) {
            spine.innerHTML = text;
            if(this.cont.offsetHeight>h){
                   const num:number = this.checkEndText(text,spine,h);
                   ret.push(this.cont.innerHTML);
                   this.cont.innerHTML = "";
                   text.substring(num);

                   spine = document.createElement("spine");
                   this.cont.appendChild(spine);

               }else{
                   break;
               }
            }
    }

    private checkHTML(child:any,h:number,ret:any[]){
        if("#text" == child.nodeName){
            console.log(child.nodeValue);
            const text = document.createElement("spine");
            this.cont.appendChild(text);
            // text.nodeValue = child.nodeValue;
           /*text.innerHTML = child.nodeValue;
           this.cont.appendChild(text);*/

            this.checkTextHeight(child.nodeValue,text,h,ret);


           // alert(this.cont.offsetHeight);
        }else{

           if("BR" == child.nodeName || "P" == child.nodeName){
                this.cont.appendChild(document.createElement(child.nodeName));

                if(h<=this.cont.offsetHeight){
                    ret.push(this.cont.innerHTML);
                    this.cont.innerHTML = "";
                }

           }

           console.log(child.nodeName);
           const childN: any = child.childNodes;
           const len:number = (childN.length);
           for(let i: number = 0;i < len;i++){
                this.checkHTML(childN[i],h,ret);
            }
        }
    }
}
