class GlobalEvent extends egret.Event{
    public static evt = "GlobalEvent";
    public data:any;
    public index:number;
    public b:boolean;
    public msgType:string;
    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
}

