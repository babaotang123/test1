class SoundCompleteEvent extends egret.Event {
    public static data = "SoundCompleteEvent";
    public num: number;
    public index: number;
    public type: string;
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}

