window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.TextInput":"resource/eui_skins/TextInputSkin.exml"};generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.percentHeight = 100;
		t.size = 35;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.percentHeight = 100;
		t.size = 50;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/CommonDlg/Dlg_CommonMovie_Skin.exml'] = window.Dlg_CommonMovie_Skin = (function (_super) {
	__extends(Dlg_CommonMovie_Skin, _super);
	function Dlg_CommonMovie_Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = Dlg_CommonMovie_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this._Rect1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.height = 1348;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1562;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return Dlg_CommonMovie_Skin;
})(eui.Skin);