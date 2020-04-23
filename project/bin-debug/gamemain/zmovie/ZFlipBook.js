var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ZFlipBook = (function (_super) {
    __extends(ZFlipBook, _super);
    function ZFlipBook(lpaper, rpaper) {
        var _this = _super.call(this) || this;
        _this.speed = 0.5;
        _this.isEndPage = false;
        _this.currentPaper = null;
        _this.isMoveing = false;
        _this.widxwid = NaN;
        _this.scaleR = NaN;
        _this.tP = new egret.Point();
        _this.isDown = false;
        _this.fp = new egret.Point();
        _this.isDragStart = false;
        _this.dempP = new egret.Point();
        _this.lrType = 0;
        _this.isReady = true;
        _this.dragMinNum = 0;
        if (null == lpaper && null == rpaper) {
            return _this;
        }
        _this.lpaper = lpaper;
        _this.rpaper = rpaper;
        if (null != lpaper) {
            _this.w = lpaper.width;
            _this.h = lpaper.height;
            lpaper.x = -_this.w;
            _this.addChild(lpaper);
        }
        else {
            _this.w = rpaper.width;
            _this.h = rpaper.height;
        }
        _this.init(_this.w, _this.h);
        if (null != lpaper) {
            _this.addPaper(rpaper, new zmovie.ZMovieClip(lpaper.imgArr, lpaper.libObj, lpaper.mcName));
        }
        else {
            _this.addPaper(rpaper, new zmovie.ZMovieClip(rpaper.imgArr, rpaper.libObj, lpaper.mcName));
        }
        return _this;
    }
    Object.defineProperty(ZFlipBook.prototype, "currPage", {
        get: function () {
            return this._currPage;
        },
        enumerable: true,
        configurable: true
    });
    ZFlipBook.prototype.init = function (w, h) {
        this.w = w;
        this.h = h;
        this.paperArr = [];
        this.rightPagesArr = [];
        this.leftPagesArr = [];
        this.pageContent = [];
        this.book = new egret.Sprite();
        this._currPage = 1;
        this.addChild(this.book);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
        // this.pivotX = -w;
        this.anchorOffsetX = -w;
        this.shadowfm_img = new egret.Sprite();
        this.shadowfm_img.touchEnabled = false;
        var tmpQ = this.getShape(100, 100, 0x000000);
        this.shadowfm_img.addChild(tmpQ);
        // addChild(shadowfm_img);
        this.shadowfrm_img = this.getShape(100, 100, 0x000000);
        this.shadowfrm_img.touchEnabled = false;
        // addChild(shadowfrm_img);
        // this.shadowfrm_img.alignPivot(Align.CENTER, Align.TOP);
        this.shadowfrm_img.anchorOffsetX = this.shadowfrm_img.width >> 1;
        this.shadowfrm_img.width = w * 2;
        this.shadowfrm_img.height = h;
        tmpQ.width = w;
        tmpQ.height = h;
        this.shadowfm_img.x = 0;
        this.shadowfm_img.y = -150;
        this.shadowf_img = this.getTexture("ShadowF");
        // addChild(shadowf_img);
        this.shadowf_img.touchEnabled = false;
        this.shadowfr_img = this.getTexture("ShadowFR");
        this.shadowfr_img.anchorOffsetY = this.shadowfr_img.height >> 1;
        this.shadowfr_img.touchEnabled = false;
        this.shadowfr_img.height = this.shadowf_img.height = Math.sqrt(w * w + h * h) * 2;
        // shadowf_img.alignPivot(Align.RIGHT, Align.CENTER);
        this.shadowf_img.anchorOffsetX = this.shadowf_img.width;
        this.shadowf_img.anchorOffsetY = this.shadowf_img.height >> 1;
        // this.shadowf_img.mask=this.shadowfm_img;
        // this.shadowfr_img.mask=this.shadowfrm_img;
        this.shadowfr_img.alpha = 0;
    };
    ZFlipBook.prototype.addDefaultPaper = function () {
        return this.addPaper(new zmovie.ZMovieClip(this.lpaper.imgArr, this.lpaper.libObj, this.lpaper.mcName), new zmovie.ZMovieClip(this.rpaper.imgArr, this.rpaper.libObj, this.lpaper.mcName));
    };
    ZFlipBook.prototype.addPaper = function (pageA, pageB) {
        this.paperArr.push(pageA);
        this.paperArr.push(pageB);
        pageA.touchEnabled = true;
        pageB.touchEnabled = true;
        var paper = new ZPaper(pageA, pageB, this.w, this.h);
        this.pageContent.push(paper);
        if (2 > this.book.numChildren) {
            this.book.addChildAt(paper, 0);
        }
        this.rightPagesArr.push(paper);
        if (null == this.currentPaper) {
            this.currentPaper = paper;
        }
        this.dispatchEventWith(ZFlipBook.EVENT_PAGE_ADD, false, paper);
        return paper;
    };
    ZFlipBook.prototype.getPageContent = function () {
        return this.pageContent;
    };
    ZFlipBook.prototype.next = function () {
        if (this.isMoveing) {
            if (null == this.contralCatch) {
                this.contralCatch = [];
            }
            var len = this.contralCatch.length;
            if (0 < len) {
                var co = this.contralCatch[len - 1];
                if (co == this.prev) {
                    this.contralCatch.pop();
                    return;
                }
            }
            this.contralCatch.push(this.next);
            return;
        }
        if (this.rightPagesArr.length) {
            this.nextFun(this.rightPagesArr[0]);
        }
        else {
            this.nextCatch();
        }
    };
    ZFlipBook.prototype.getIsMoveing = function () {
        return this.isMoveing;
    };
    ZFlipBook.prototype.advanceTime = function () {
        this.update();
    };
    ZFlipBook.prototype.prev = function () {
        if (this.isMoveing) {
            if (null == this.contralCatch) {
                this.contralCatch = [];
            }
            var len = this.contralCatch.length;
            if (0 < len) {
                var co = this.contralCatch[len - 1];
                if (co == this.next) {
                    this.contralCatch.pop();
                    return;
                }
            }
            this.contralCatch.push(this.prev);
            return;
        }
        if (this.leftPagesArr.length) {
            this.prevFun(this.leftPagesArr[this.leftPagesArr.length - 1]);
        }
        else {
            this.nextCatch();
        }
    };
    ZFlipBook.prototype.dispose = function () {
        // Tweener.removeTweens(this.fp);
        _super.prototype["dispose"].call(this);
    };
    ZFlipBook.prototype.touchFun = function (e) {
        var p = new egret.Point(e.stageX, e.stageY);
        var p1 = this.book.globalToLocal(e.stageX, e.stageY);
        if (egret.TouchEvent.TOUCH_BEGIN == e.type) {
            if (this.isMoveing) {
                return;
            }
            this.tP.x = p1.x;
            this.tP.y = p1.y;
            this.dir = this.getDir(p1.x, p1.y);
            this.resetFp(this.dir);
            this.cp = null;
            if (this.dir == "TL") {
                if (this.leftPagesArr.length) {
                    this.cp = this.leftPagesArr[this.leftPagesArr.length - 1];
                }
            }
            else if (this.dir == "TR") {
                if (this.rightPagesArr.length) {
                    this.cp = this.rightPagesArr[0];
                }
            }
            else if (this.dir == "BL") {
                if (this.leftPagesArr.length) {
                    this.cp = this.leftPagesArr[this.leftPagesArr.length - 1];
                }
            }
            else if (this.dir == "BR") {
                if (this.rightPagesArr.length) {
                    this.cp = this.rightPagesArr[0];
                }
            }
            if (null == this.cp) {
                return;
            }
            if ("TR" == this.dir || "BR" == this.dir) {
                if (!this.isEndPage) {
                    if (1 == this.rightPagesArr.length) {
                        this.cp = null;
                        return;
                    }
                }
            }
            this.isDown = true;
            this.isDragStart = false;
            this.downPoint = p;
            this.dragStart(p);
        }
        /*var t:flash.events.Touch = <any>e["getTouch"](flash.As3As(e.currentTarget,egret.DisplayObject));
        if(null != t)
        {
            try
            {
                var p:egret.Point = new egret.Point(t["globalX"],t["globalY"]);
                var p1:egret.Point = flash.globalToLocal(this.book,p);
                if(TouchPhase.BEGAN == t["phase"])
                {
                    if(this.isMoveing)
                    {
                        return ;
                    }
                    this.tP.x = p1.x;
                    this.tP.y = p1.y;
                    this.dir = this.getDir(p1.x,p1.y);
                    this.resetFp(this.dir);
                    this.cp = null;
                    if(this.dir == "TL")
                    {
                        if(this.leftPagesArr.length)
                        {
                            this.cp = this.leftPagesArr[this.leftPagesArr.length - 1];
                        }
                    }
                    else if(this.dir == "TR")
                    {
                        if(this.rightPagesArr.length)
                        {
                            this.cp = this.rightPagesArr[0];
                        }
                    }
                    else if(this.dir == "BL")
                    {
                        if(this.leftPagesArr.length)
                        {
                            this.cp = this.leftPagesArr[this.leftPagesArr.length - 1];
                        }
                    }
                    else if(this.dir == "BR")
                    {
                        if(this.rightPagesArr.length)
                        {
                            this.cp = this.rightPagesArr[0];
                        }
                    }
                    if(null == this.cp)
                    {
                        return ;
                    }
                    if("TR" == this.dir || "BR" == this.dir)
                    {
                        if(<any>!this.isEndPage)
                        {
                            if(1 == this.rightPagesArr.length)
                            {
                                this.cp = null;
                                return ;
                            }
                        }
                    }
                    this.isDown = true;
                    this.isDragStart = false;
                    this.downPoint = p;
                }
                else if(t["phase"] == TouchPhase.ENDED)
                {
                    if(null == this.cp)
                    {
                        return ;
                    }
                    if(this.isDragStart)
                    {
                        this.tP.x = p1.x;
                        this.tP.y = p1.y;
                        this.gotoHSPoint(this.dir);
                        this.isDragStart = false;
                    }
                    else
                    {
                        dispatchEventWith(zmovie.ZFlipBook.EVENT_PAGE_CLICK,false,p);
                    }
                    this.cp = null;
                    this.isDown = false;
                }
                else if(t["phase"] == TouchPhase.MOVED)
                {
                    if(null == this.cp)
                    {
                        return ;
                    }
                    if(<any>!this.isDragStart)
                    {
                        this.dragStart(new egret.Point(t["globalX"],t["globalY"]));
                    }
                    if(this.isDragStart)
                    {
                        this.tP.x = p1.x;
                        this.tP.y = p1.y;
                    }
                }
            }
            catch(err)
            {}
        }*/
    };
    ZFlipBook.prototype.getShape = function (w, h, col) {
        var tmpQ = new egret.Shape();
        tmpQ.graphics.beginFill(col);
        tmpQ.graphics.drawRect(0, 0, w, h);
        return tmpQ;
    };
    ZFlipBook.prototype.getTexture = function (type) {
        var sp, matr;
        if ("ShadowF" == type) {
            sp = new egret.Shape();
            matr = new egret.Matrix();
            matr.createGradientBox(126, 200);
            sp.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xffffff, 0xffffff, 0xffffff, 0x000000], [0, 0.1, 0.2, 0.2], [0x00, 0x7f, 0xb2, 0xFF], matr);
            sp.graphics.drawRect(0, 0, 126, 200);
            return sp;
        }
        else if ("ShadowFR" == type) {
            sp = new egret.Shape();
            matr = new egret.Matrix();
            matr.createGradientBox(100, 100);
            sp.graphics.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000, 0x000000], [0.5, 0.2, 0], [0x00, 0x75, 0xFF], matr);
            sp.graphics.drawRect(0, 0, 100, 100);
            return sp;
        }
        return null;
    };
    ZFlipBook.prototype.nextFun = function (page) {
        if (!this.isEndPage) {
            if (1 == this.rightPagesArr.length) {
                return;
            }
        }
        this.dir = "BR";
        this.resetFp(this.dir);
        this.currentPaper = page;
        this.book.setChildIndex(this.currentPaper, this.book.numChildren - 1);
        this.currentPaper["setCor"](this.dir);
        this.widxwid = this.w * this.w;
        this.fadeInShadow();
        this.scaleR = Math.floor((Math.random() * 0.5) * 1000) / 1000;
        this.fp.x = this.w;
        this.fp.y = this.h;
        this.moveStart(this.dir);
        this.initDempP("BL");
        // Tweener.addTween(this.fp,{x:this.dempP.x,time:this.speed,transition:"easeOutSine",onComplete:this.autoCompleteL,onUpdate:this.autoUpdate});
        var tw = egret.Tween.get(this.fp, { onChange: this.autoUpdate, onChangeObj: this });
        tw.to({ x: this.dempP.x }, this.speed, egret.Ease.elasticOut);
        tw.call(this.autoCompleteL, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
    };
    ZFlipBook.prototype.prevFun = function (page) {
        this.dir = "BL";
        this.resetFp(this.dir);
        this.moveStart(this.dir);
        this.currentPaper = page;
        this.book.setChildIndex(this.currentPaper, this.book.numChildren - 1);
        this.currentPaper["setCor"](this.dir);
        this.widxwid = this.w * this.w;
        this.fadeInShadow();
        this.scaleR = Math.floor((Math.random() * 0.5) * 1000) / 1000;
        this.fp.x = -this.w;
        this.fp.y = this.h;
        this.initDempP("BR");
        // Tweener.addTween(this.fp,{x:this.dempP.x,time:this.speed,transition:"easeOutSine",onComplete:this.autoCompleteR,onUpdate:this.autoUpdate});
        this.addEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
    };
    ZFlipBook.prototype.autoUpdate = function () {
        this.fp.y = this.h - Math.sqrt(this.widxwid - this.fp.x * this.fp.x) * this.scaleR;
    };
    ZFlipBook.prototype.autoCompleteR = function () {
        this.isDown = false;
        this.fadeOutShadow();
        this.isReady = true;
        var leftPage = this.leftPagesArr[this.leftPagesArr.length - 1];
        if (this.leftPagesArr.length && leftPage["parent"] != this.book) {
            while (this.book.numChildren) {
                this.book.removeChildAt(0);
            }
            if (this.rightPagesArr.length && this.rightPagesArr[0]["parent"] != this.book) {
                this.book.addChild(this.rightPagesArr[0]);
            }
            this.book.addChild(leftPage);
            this.currentPaper = leftPage;
            if (0 <= (this.leftPagesArr.length - 2) && this.leftPagesArr[this.leftPagesArr.length - 2]["parent"] != this.book) {
                this.book.addChild(this.leftPagesArr[this.leftPagesArr.length - 2]);
            }
        }
        this.rightPagesArr.unshift(this.leftPagesArr.pop());
        if (this.leftPagesArr.length) {
            this.book.setChildIndex(this.leftPagesArr[this.leftPagesArr.length - 1], this.book.numChildren - 1);
        }
        if (this.rightPagesArr.length) {
            this.book.setChildIndex(this.rightPagesArr[0], this.book.numChildren - 1);
        }
        if (null != this.currentPaper) {
            this.currentPaper["setCor"]("BR");
        }
        this.pageComplete(2);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
        this._currPage -= 1;
        /*if(null != this.gotoPageCatch)
        {
            this.checkGotoPageCatch();
        }*/
        this.moveEnd();
    };
    ZFlipBook.prototype.autoCompleteL = function () {
        this.fadeOutShadow();
        this.isDown = false;
        this.isReady = true;
        if (this.rightPagesArr[0]["parent"] != this.book) {
            while (this.book.numChildren) {
                this.book.removeChildAt(0);
            }
            if (this.leftPagesArr.length && this.leftPagesArr[this.leftPagesArr.length - 1]["parent"] != this.book) {
                this.book.addChild(this.leftPagesArr[this.leftPagesArr.length - 1]);
            }
            if (1 < this.rightPagesArr.length && this.rightPagesArr[1]["parent"] != this.book) {
                this.book.addChild(this.rightPagesArr[1]);
            }
            this.book.addChild(this.rightPagesArr[0]);
            this.currentPaper = this.rightPagesArr[0];
        }
        this.leftPagesArr.push(this.rightPagesArr[0]);
        this.rightPagesArr.shift();
        if (this.leftPagesArr.length) {
            this.book.setChildIndex(this.leftPagesArr[this.leftPagesArr.length - 1], this.book.numChildren - 1);
        }
        if (this.rightPagesArr.length) {
            this.book.setChildIndex(this.rightPagesArr[0], this.book.numChildren - 1);
        }
        this.currentPaper["setCor"]("BL");
        this.pageComplete(1);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
        this._currPage += 1;
        /*if(null != this.gotoPageCatch)
        {
            this.checkGotoPageCatch();
        }*/
        this.moveEnd();
    };
    ZFlipBook.prototype.getDir = function (_x, _y) {
        if (_x > 0) {
            if (_y > this.h >> 1) {
                return "BR";
            }
            else {
                return "TR";
            }
        }
        else {
            if (_y > this.h >> 1) {
                return "BL";
            }
            else {
                return "TL";
            }
        }
    };
    ZFlipBook.prototype.resetFp = function (hs) {
        if (hs == "TL") {
            this.fp.x = -this.w;
            this.fp.y = 0;
        }
        else if (hs == "TR") {
            this.fp.x = this.w;
            this.fp.y = 0;
        }
        else if (hs == "BL") {
            this.fp.x = -this.w;
            this.fp.y = this.h;
        }
        else if (hs == "BR") {
            this.fp.x = this.w;
            this.fp.y = this.h;
        }
    };
    ZFlipBook.prototype.dragStart = function (p) {
        if (this.dragMinNum > zmovie.Util.getDist(p.x, p.y, this.downPoint.x, this.downPoint.y)) {
            return;
        }
        this.currentPaper = this.cp;
        this.isDragStart = true;
        this.currentPaper["setCor"](this.dir);
        this.book.setChildIndex(this.currentPaper, this.book.numChildren - 1);
        this.fadeInShadow();
        this.addEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
        this.moveStart(this.dir);
    };
    ZFlipBook.prototype.updatefp = function () {
        if (this.isDown) {
            this.fp.x += (this.tP.x - this.fp.x) * 0.6;
            this.fp.y += (this.tP.y - this.fp.y) * 0.6;
        }
    };
    ZFlipBook.prototype.initDempP = function (hs) {
        if (hs == "TL") {
            this.dempP.x = -this.w;
            this.dempP.y = 0;
        }
        else if (hs == "TR") {
            this.dempP.x = this.w;
            this.dempP.y = 0;
        }
        else if (hs == "BL") {
            this.dempP.x = -this.w;
            this.dempP.y = this.h;
        }
        else if (hs == "BR") {
            this.dempP.x = this.w;
            this.dempP.y = this.h;
        }
    };
    ZFlipBook.prototype.pageComplete = function (lrType) {
        if (1 == lrType) {
            if (this.rightPagesArr.length > 1 && this.rightPagesArr[1]["parent"] != this.book) {
                this.book.addChildAt(this.rightPagesArr[1], 0);
            }
            if (this.leftPagesArr.length > 2 && this.leftPagesArr[this.leftPagesArr.length - 3]["parent"] == this.book) {
                this.book.removeChild(this.leftPagesArr[this.leftPagesArr.length - 3]);
            }
        }
        else {
            if (0 <= this.leftPagesArr.length - 2 && this.leftPagesArr[this.leftPagesArr.length - 2]["parent"] != this.book) {
                this.book.addChildAt(this.leftPagesArr[this.leftPagesArr.length - 2], 0);
            }
            if (this.rightPagesArr.length > 2 && this.rightPagesArr[2]["parent"] == this.book) {
                this.book.removeChild(this.rightPagesArr[2]);
            }
        }
    };
    ZFlipBook.prototype.gotoHSPoint = function (dir) {
        if (this.isReady) {
            if (this.fp.x <= 0) {
                if (dir == "TR") {
                    dir = "TL";
                    this.leftPagesArr.push(this.rightPagesArr[0]);
                    this.rightPagesArr.shift();
                    this.lrType = 1;
                }
                else if (dir == "BR") {
                    dir = "BL";
                    this.leftPagesArr.push(this.rightPagesArr[0]);
                    this.rightPagesArr.shift();
                    this.lrType = 1;
                }
            }
            else {
                if (dir == "TL") {
                    dir = "TR";
                    this.rightPagesArr.unshift(this.leftPagesArr[this.leftPagesArr.length - 1]);
                    this.leftPagesArr.splice(this.leftPagesArr.length - 1, 1);
                    this.lrType = 2;
                }
                else if (dir == "BL") {
                    dir = "BR";
                    this.rightPagesArr.unshift(this.leftPagesArr[this.leftPagesArr.length - 1]);
                    this.leftPagesArr.splice(this.leftPagesArr.length - 1, 1);
                    this.lrType = 2;
                }
            }
            this.isReady = false;
            this.initDempP(dir);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.advanceTime, this);
            /*Tweener.removeTweens(this.fp);
            if((this.fp.y < 0 && this.currentPaper["lp"].isTop) || (this.fp.y > this.h && <any>!this.currentPaper["lp"].isTop))
            {
                Tweener.addTween(this.fp,{x:this.dempP.x,time:this.speed,transition:"easeOutSine"});
                Tweener.addTween(this.fp,{y:this.dempP.y,time:this.speed,transition:"easeOutBack",onComplete:this.complete,onCompleteParams:[dir],onUpdate:this.update});
            }
            else
            {
                Tweener.addTween(this.fp,{x:this.dempP.x,y:this.dempP.y,time:this.speed,transition:"easeOutSine",onComplete:this.complete,onCompleteParams:[dir],onUpdate:this.update});
            }*/
        }
    };
    ZFlipBook.prototype.complete = function (dir) {
        this.fadeOutShadow();
        this.isReady = true;
        if (this.leftPagesArr.length) {
            this.book.addChild(this.leftPagesArr[this.leftPagesArr.length - 1]);
        }
        if (this.rightPagesArr.length) {
            this.book.addChild(this.rightPagesArr[0]);
        }
        if (0 != this.lrType) {
            if (0 < dir.indexOf("R")) {
                this._currPage -= 1;
            }
            else {
                this._currPage += 1;
            }
            this.pageComplete(this.lrType);
            this.lrType = 0;
        }
        this.moveEnd();
    };
    ZFlipBook.prototype.moveStart = function (dir) {
        this.isMoveing = true;
        this.dispatchEventWith(ZFlipBook.EVENT_PAGE_MOVIE_START, false, dir);
    };
    ZFlipBook.prototype.moveEnd = function () {
        this.isMoveing = false;
        this.cp = null;
        this.dispatchEventWith(ZFlipBook.EVENT_PAGE_MOVIE_END, false, this._currPage);
        this.nextCatch();
    };
    ZFlipBook.prototype.nextCatch = function () {
        if (null != this.contralCatch && 0 != this.contralCatch.length) {
            var fun = this.contralCatch.shift();
            fun();
        }
    };
    ZFlipBook.prototype.fadeInShadow = function () {
        /*var _self__:any = this;
        _self__.addChild(this.shadowfm_img);
        _self__.addChild(this.shadowfrm_img);
        _self__.addChild(this.shadowf_img);
        _self__.addChild(this.shadowfr_img);
        //Tweener.removeTweens(this.shadowf_img);
        //Tweener.removeTweens(this.shadowfr_img);
        this.shadowfr_img["visible"] = this.shadowf_img["visible"] = true;
        //Tweener.addTween(this.shadowf_img,{alpha:1,visible:true,time:0,transition:"easeOutSine"});
        //Tweener.addTween(this.shadowfr_img,{alpha:1,visible:true,time:0,transition:"easeOutSine"});*/
    };
    ZFlipBook.prototype.fadeOutShadow = function () {
        // Tweener.removeTweens(this.shadowf_img);
        // Tweener.removeTweens(this.shadowfr_img);
        // Tweener.addTween(this.shadowf_img,{alpha:0,visible:false,time:this.speed,transition:"easeOutSine"});
        // Tweener.addTween(this.shadowfr_img,{alpha:0,visible:false,time:this.speed,transition:"easeOutSine"});
    };
    ZFlipBook.prototype.update = function () {
        if (this.currentPaper) {
            this.updatefp();
            this.currentPaper["Update"](this.fp);
            /*this.shadowf_img["rotation"] = flash.trannumber(this.currentPaper["mask_rotation"]);
            this.shadowfr_img["x"] = this.shadowf_img["x"] = flash.trannumber(this.currentPaper["mask_x"]);
            this.shadowfr_img["y"] = this.shadowf_img["y"] = flash.trannumber(this.currentPaper["mask_y"]);
            this.shadowfm_img.x = this.currentPaper["lp"].point.x;
            this.shadowfm_img.y = this.currentPaper["lp"].point.y;
            this.shadowfm_img.rotation = flash.trannumber(this.currentPaper["mask_rotation"]) * 2;
            this.shadowfr_img["rotation"] = this.shadowfm_img.rotation / 2;
            this.shadowfr_img["scaleX"] = this.currentPaper["currentDir"] == "right"?1:-1;
            this.shadowfr_img["alpha"] = (Math.abs(this.shadowfr_img["x"]) / this.w) + 0.3;
            this.shadowfm_img.getChildAt(0).x = this.currentPaper["page"].x;
            this.shadowfm_img.getChildAt(0).y = this.currentPaper["page"].y;*/
        }
    };
    ZFlipBook.EVENT_PAGE_MOVIE_END = "EVENT_PAGE_MOVIE_END";
    ZFlipBook.EVENT_PAGE_MOVIE_START = "EVENT_PAGE_MOVIE_START";
    ZFlipBook.EVENT_PAGE_CLICK = "EVENT_PAGE_CLICK";
    ZFlipBook.EVENT_PAGE_ADD = "EVENT_PAGE_ADD";
    ZFlipBook.EVENT_PAGE_REMOVE = "EVENT_PAGE_REMOVE";
    return ZFlipBook;
}(egret.DisplayObjectContainer));
__reflect(ZFlipBook.prototype, "ZFlipBook");
//# sourceMappingURL=ZFlipBook.js.map