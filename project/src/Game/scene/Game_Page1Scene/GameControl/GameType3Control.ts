class GameType3Control extends UIObject {

    private opNumAry: any[];  // 选项
    private quNumAry: any[];  // 题目

    private opPos: egret.Point[];  // 选项位置
    private quPos: egret.Point[];   // 题目位置
    private curGameData:any;
    private selfParent:any;
    private rightData:Object;
    private elemNameAry:any[];
    private rightName:string;
    private selectImg:eui.Image;

    // 随机方向移动元素
    private idTimeout:any[];
    /* 规则 取出任意2个元素  然后按固定顺序排列*/
    public constructor(data) {
        super();
        super.onAdd();
        this.selfParent = data;
        this.init();
     //   egret.log(this.selfParent);
    }

    public init(): void {
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.elemNameAry = [];
        this.rightData = new Object();

        for(let i=0;i<20;i++){
            this.selfParent["r_"+i].visible = false;
            if(i<6){
                this.opPos.push(new egret.Point(this.selfParent["r_"+i].x,this.selfParent["r_"+i].y));
            }
            this.quPos.push(new egret.Point(this.selfParent["fru_"+i].x,this.selfParent["fru_"+i].y));
        }
        this.curGameData = this.selfParent.curGameData;
        this.creatImg();
    }

    public showQuestionsView():void{
        const p = this.selfParent["r_0"].parent;
        for(const obj of this.quNumAry){
            p.addChild(obj);
        }
        for(const obj of this.opNumAry){
            p.addChild(obj);
        }
    }

    // 最后的结果
    public setGameOverData():void{
        let b = false
        if(this.selectImg){

            if(this.selectImg.name == this.rightName){
                // 回答正确
                this.selectImg = null;
                this.selfParent.testurl0.text = "正确";
                b = true;
            }else{
                this.selfParent.testurl0.text = "错误";
                b = false;
            }
        }
        const evt: GlobalEvent = new GlobalEvent(GlobalEvent.evt);
        evt.b = b;
        this.selfParent.dispatchEvent(evt);
    }

    public showGameOverData():void{
        let b = false
        if(this.selectImg){

            if(this.selectImg.name == this.rightName){
                // 回答正确
                this.selectImg = null;
                this.selfParent.testurl0.text = "正确";
                b = true;
            }else{
                this.selfParent.testurl0.text = "错误";
                b = false;
            }
        }
    }

    public onDestroy(): void {
        super.onDestroy();
        this.clearAll();
        this.opNumAry = [];
        this.quNumAry = [];
        this.opPos = [];
        this.quPos = [];
        this.idTimeout = [];
        this.rightData = null;

        // 测试
        this.selfParent.testurl0.text = "";
    }

    private creatImg():void{
        const id =parseInt(this.selfParent.curGameData.condition_id);
        const eleName = this.selfParent.curGameData.answer;
        // 操作类型
        let _quNumAry:any[] = this.curGameData.quetion.split(","); // 数量
        _quNumAry = _quNumAry.sort();// 从小到大排序了

        let randomAry = this.creatRandomAry();// 取出了题目元素

        // 创建了题目元素
        let str = "";
        let totalNum:number = 0;

        // 总数
        for(let i=0;i<_quNumAry.length;i++){
                const num = parseInt(_quNumAry[i]);
                totalNum = totalNum+num;
        }

        let count1:number = 0;
        let count2:number = 0;

        // 第32题专用
        const opAry1 = [];
        const opAry2 = [];
        if(id>30&&id<35&&id != 32){
             for(let i=0;i<randomAry.length;i++){
                str = randomAry[i];
                const img = CommonDragonBones.getInstance().getElementImg(str);
                img.rotation = App.RandomUtils.limitInteger(0, 180);   // 每个元素旋转方向
                img.pixelHitTest = true;
                const name = img.name;
                if(this.rightData[name] == "img_sortmore16"){
                    count1++;
                }else{
                    count2++
                }
                this.quNumAry.push(img);
             }
        }else if(id == 32){
            for(let i=0;i<randomAry.length;i++){
                str = randomAry[i];
                const img = CommonDragonBones.getInstance().getElementImg(str);
                img.rotation = App.RandomUtils.limitInteger(0, 180);   // 每个元素旋转方向
                img.pixelHitTest = true;
                const name = img.name;
                if(this.rightData[name] == "left"){
                    count1++;
                    opAry1.push(img);
                }else{
                    count2++;
                    opAry2.push(img);
                }
                this.quNumAry.push(img);
             }
        }else{
              for(let i=0;i<_quNumAry.length;i++){
                const num = parseInt(_quNumAry[i]);
               // totalNum = totalNum+num;
                str =  randomAry[i];
                for(let i=0;i<num;i++){
                    const img = CommonDragonBones.getInstance().getElementImg(str);
                    img.rotation = App.RandomUtils.limitInteger(0, 180);   // 每个元素旋转方向
                    img.pixelHitTest = true;
                    const name = img.name;
                    if(this.rightData[name] == "img_sortmore16"){
                        count1++;
                    }else{
                        count2++
                    }
                    this.quNumAry.push(img);
                }
                if(id!=35&&id!=36){
                    if(i == _quNumAry.length-1){
                        this.rightName = str;
                    }
                }
            }
        }

        // 蔬菜多 水果多
        if(id == 35||id == 36||id == 31||id == 33||id == 34){
            if(count1<count2){
                this.rightName = "img_sortmore13";
            }else{
                this.rightName = "img_sortmore16";
            }
        }

        // 创建选项 包含题目
        if(id ==32){
            const opAry = [];
            let  n1Ary;
            let  n2Ary;
            n1Ary = [1,2,3,4,5,6,7,8,9,10];
            n2Ary = [11,12,13,14,15,16,17,18];
            if(count1>count2){// 左边的多
                const rand: number = App.RandomUtils.limitInteger(0, opAry1.length - 1);
                opAry.push(opAry1[rand].name);
                this.rightName = opAry1[rand].name;
                let n = 5;
                const len = opAry2.length-1;
                egret.log(opAry2);
                while(n>0){
                    const rand: number = App.RandomUtils.limitInteger(0, len);
                    const _str = eleName+n2Ary[rand];
                    opAry.push(_str);
                    n2Ary.splice(rand, 1);
                    n--;
                }
            }else{// 右边的多
                const rand: number = App.RandomUtils.limitInteger(0, opAry2.length - 1);
                opAry.push(opAry2[rand].name);
                this.rightName = opAry2[rand].name;
                let n = 5;
                const len = opAry1.length-1;
                while(n>0){
                    const rand: number = App.RandomUtils.limitInteger(0, len);
                    const _str = eleName+n1Ary[rand];
                    opAry.push(_str);
                    n1Ary.splice(rand, 1);
                    n--;
                }
            }
            randomAry = [];
            randomAry = opAry;
        }else if(id == 31||id == 33||id == 34||id == 35||id == 36){
            const a1 = this.selfParent.curGameData.opertion.split("_");
            const starIndx = parseInt(a1[0]);
            const endIndx = parseInt(a1[1])+1;
            randomAry = [];  // 清空重新存放
            for(let i = starIndx;i<endIndx;i++){
                const _str = eleName+i;
               // let newopimg = CommonDragonBones.getInstance().getElementImg(_str);
                randomAry.push(_str);
            }
        }else{
            let n = 6-randomAry.length;
            while(n>0){
                const rand: number = App.RandomUtils.limitInteger(0, this.elemNameAry.length - 1);
                randomAry.push(this.elemNameAry[rand]);

                this.elemNameAry.splice(rand, 1);
                n--;
            }
        }

        // 随机题目位置
        const _qupos = [];
        while(totalNum>0){
            const rand: number = App.RandomUtils.limitInteger(0, this.quPos.length - 1);
            _qupos.push(this.quPos[rand]);
            const index = totalNum-1;
            const p = this.quPos[rand];
            this.quNumAry[index].x = p.x;
            this.quNumAry[index].y = p.y;
            this.quPos.splice(rand, 1);
            totalNum--;
        }

        // 随机选项位置
        randomAry = this.getRandomAry(randomAry);
        for(const obj of randomAry){
             const i = randomAry.indexOf(obj);
             const p = this.opPos[i];
             str =  obj;
             const img = CommonDragonBones.getInstance().getElementImg(str);
             img.x = p.x;
             img.y = p.y;
             img.scaleX =img.scaleY = 0.5;

             img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickTouch, this);
             this.opNumAry.push(img);
        }

        if(id==35||id == 36){
            this.moveElmentAuto();
       }

        this.showQuestionsView();
    }

    // 创建6个随机，存的是元素名称
    private creatRandomAry():any[]{
        const id =parseInt(this.selfParent.curGameData.condition_id);
        let quNumAry:any[] = this.selfParent.curGameData.quetion.split(",");// 配的个数
        let qulen = quNumAry.length;

        const elmAry:any[] = this.selfParent.curGameData.opertion.split("_");// 元素选项

        const str = this.selfParent.curGameData.answer; // 元素前缀
        let elmLen = 0;
        if(id == 31||id == 33||id == 34||id == 35||id == 36){
            elmLen =parseInt(elmAry[0]);
        }else{
            elmLen =parseInt(elmAry[1])+1;
        }
        this.elemNameAry = [];
        // 创建所有元素
        for(let i=1;i<elmLen;i++){
            const s  = str+i;   // 元素的真实名字
            this.elemNameAry.push(s);
        }

        let _ary = [];

        if(id == 32){
            // 左右手个数
               quNumAry = this.getRandomAry(quNumAry);

               let  n1Ary;
               let  n2Ary;
               n1Ary = [1,2,3,4,5,6,7,8,9,10];
               n2Ary = [11,12,13,14,15,16,17,18];
               const lNum = parseInt(quNumAry[0]);
               const rNum = parseInt(quNumAry[1]);

               const lAry = this.countNumAry(n1Ary,lNum,str);
               const rAry = this.countNumAry(n2Ary,rNum,str);

               // 再次随机存放
               _ary = this.getRandomAry(lAry.concat(rAry));
               const nameAry = [];
               for(const obj of _ary){
                    const name = str+obj;
                    nameAry.push(name);
               }
               _ary = nameAry;

               let count1 =0;
               let count2 =0;
               for(const obj of _ary){
                    const a1 = obj.split(str);
                    const n1 =parseInt(a1[1]);
                    const key = str+n1;
                    if(n1<11){
                        // 左手
                        this.rightData[key] = "left";
                        count1++;
                    }else{
                        // 右手
                        this.rightData[key] = "right";
                        count2++;
                    }
                }
        }else{
            if(id == 31||id == 33||id == 34)
            {
               // 先随机蔬菜水果的个数
               quNumAry = this.getRandomAry(quNumAry);
               // 随机出来的0 1 选择数量 蔬菜
               // 顺序分别取出蔬菜和水果

               let  n1Ary;
               let  n2Ary;
               n1Ary = [1,2,3,4,5];
               n2Ary = [6,7,8,9,10];
               const sucaiNum = parseInt(quNumAry[0]);
               const shuiguoNum = parseInt(quNumAry[1]);

               const sucaiAry = this.countNumAry(n1Ary,sucaiNum,str);
               const shuiguoAry = this.countNumAry(n2Ary,shuiguoNum,str);

               // 再次随机存放
               _ary = this.getRandomAry(sucaiAry.concat(shuiguoAry));
               const nameAry = [];
               for(const obj of _ary){
                    const name = str+obj;
                    nameAry.push(name);
               }
               _ary = nameAry;

            }else{
                // 先随机取出长度数量的元素
                while(qulen>0){
                    const rand: number = App.RandomUtils.limitInteger(0, this.elemNameAry.length - 1);
                    _ary.push(this.elemNameAry[rand]);
                    this.elemNameAry.splice(rand, 1);
                    qulen--;
                }
            }

            // 设定对应关系
            for(const obj of _ary){
                const a1 = obj.split(str);
                const n1 =parseInt(a1[1]);
                const key = str+n1;
                if(n1<6){
                    // 蔬菜
                    this.rightData[key] = "img_sortmore16";
                }else{
                    // 水果
                    this.rightData[key] = "img_sortmore13";
                }
            }
        }
        return _ary;
    }

    // 分类取值
    private countNumAry(ary:any[],n:number,sname:string):any[]{
        const _ary = [];
        let a = ary;
        if(n>=ary.length){
                   let count = n - ary.length;
                   while(count){
                       const rand: number = App.RandomUtils.limitInteger(0, ary.length - 1);
                       _ary.push(ary[rand]);
                       count--;
                   }
                   a = a.concat(_ary);
        } else {
            while(n){
                       const rand: number = App.RandomUtils.limitInteger(0, ary.length - 1);
                       _ary.push(a[rand]);
                       a.splice(rand,1);
                       n--;
            }
            a = _ary;
        }
        return a;
    }

    // 得到随机后的数组
    private getRandomAry(ary: any[]): any[] {
        const ramNumAry = this.getRandomNumAry(ary.length);
        const _Ary = [];
        for (const obj of ramNumAry) {
             _Ary.push(ary[obj]); // 重新排序的名字
        }
        return _Ary;
    }

    private getRandomNumAry(n): any[] {
        const numAry = [];
        for(let i=0;i<n;i++){
            numAry.push(i);
        }
        const ary = [];
        while (n > 0) {
            const rand: number = App.RandomUtils.limitInteger(0, numAry.length - 1);
            ary.push(numAry[rand]);
            numAry.splice(rand, 1);
            n--;
        }
        return ary;
    }
    private moveElmentAuto():void{
        this.idTimeout = [];
        const self = this;
        for(const obj of this.quNumAry){
            const i = this.quNumAry.indexOf(obj);
            const time = 200*Math.random();
            const id = setTimeout(function() {
                const move = new RandomMove();
                move.play(obj);
                self.idTimeout.push(id);
            },                    time);
        }
    }


    private clearAll():void{
        if(this.idTimeout){
            for(const obj of this.idTimeout){
                if(obj){
                    egret.clearTimeout(obj);
                }
            }
        }

        for(const obj of this.quNumAry){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
        for(const obj of this.opNumAry){
            if(obj&&obj.parent){
                obj.parent.removeChild(obj);
            }
        }
    }

    private onClickTouch(event:egret.TouchEvent):void{
        CommonSoundManage.getInstance().playSoundEffect("click_mp3");
        if(!Game_Page1Scene.isGameBegin) {return; }
        const index = this.opNumAry.indexOf(event.currentTarget);
        if(index>=0){
               CommonSoundManage.getInstance().playSoundEffect("click_mp3");
               this.selectImg = event.currentTarget;
               this.setColor();
           }
    }

    private setColor():void{
        for(const obj of this.opNumAry){
            if(obj){
               // obj.filters = null;
                obj.scaleX = obj.scaleY = 0.5;
            }
        }
        this.selectImg.scaleX = this.selectImg.scaleY = 0.8;
    }
}
