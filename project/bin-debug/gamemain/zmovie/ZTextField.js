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
var ZTextField = (function (_super) {
    __extends(ZTextField, _super);
    function ZTextField(text, fontSize, color, _w, bold, fontName, filters, lend, _h, isPixelSize, textObj) {
        if (color === void 0) { color = 0x0; }
        if (_w === void 0) { _w = NaN; }
        if (bold === void 0) { bold = false; }
        if (fontName === void 0) { fontName = null; }
        if (filters === void 0) { filters = null; }
        if (lend === void 0) { lend = NaN; }
        if (_h === void 0) { _h = NaN; }
        if (isPixelSize === void 0) { isPixelSize = true; }
        if (textObj === void 0) { textObj = null; }
        var _this = _super.call(this) || this;
        _this.width = _w;
        _this.size = fontSize;
        _this.textColor = color;
        _this.bold = bold;
        _this.fontFamily = fontName;
        _this.text = text;
        _this.italic = textObj.tf.italic;
        _this.textAlign = textObj.tf.align;
        if (null != filters) {
            try {
                _this.filters = zmovie.Util.getFilters(filters);
            }
            catch (err) { }
        }
        return _this;
    }
    return ZTextField;
}(egret.TextField));
__reflect(ZTextField.prototype, "ZTextField");
//# sourceMappingURL=ZTextField.js.map