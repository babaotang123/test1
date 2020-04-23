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
                generateEUI.skins = {};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "login_json.img_elm14";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/Game/game_skins/Game_Page1Scene/Game_Page1Scene_Skin.exml'] = window.Game_Page1Scene_Skin = (function (_super) {
	__extends(Game_Page1Scene_Skin, _super);
	function Game_Page1Scene_Skin() {
		_super.call(this);
		this.skinParts = ["time_mask","gp_txt","panleMask","testurl","txt_input","time_txt_0","gp_time","test_btn","btn_ok","op_bg","r_0","r_1","r_2","r_3","r_4","r_5","r_6","r_7","r_8","r_9","r_10","r_11","r_12","r_13","r_14","r_15","r_16","r_17","r_18","r_19","r_20","r_21","r_22","r_23","r_24","r_25","gp_ok","fru_0","fru_1","fru_2","fru_3","fru_4","fru_5","fru_6","fru_7","fru_8","fru_9","fru_10","fru_11","fru_12","fru_13","fru_14","fru_15","fru_16","fru_17","fru_18","fru_19","sh_0","sh_1","sh_2","sh_3","sh_4","sh_5","sh_6","sh_7","sh_8","sh_9","sh_10","txt3_1","txt3_0","txt3_2","txt5_0","txt5_1","txt5_2","txt5_3","txt5_4","txt9_2","txt9_1","txt9_0","txt9_3","txt9_4","txt9_5","txt9_6","txt9_7","txt9_8","txt16_0","txt16_1","txt16_2","txt16_3","txt16_4","txt16_5","txt16_6","txt16_7","txt16_8","txt16_9","txt16_10","txt16_11","txt16_12","txt16_13","txt16_14","txt16_15","r_73_0","r_73_1","r_73_2","r_76_0","r_76_1","r_76_2","r_76_3","r_76_4","r_76_5","r_76_6","r_76_7","r_76_8","r_78_0","r_78_1","r_78_2","r_78_3","r_sidai_0","r_sidai_1","r_sidai_2","r_sidai_3","r_sidai_4","r_sidai_5","r_sidai_6","r_numsidai_0","r_numsidai_1","r_numsidai_2","r_numsidai_3","r_numsidai_4","r_numsidai_5","r_numsidai_6","r_sort80_0","r_hit80_0","r_hit80_1","r_hit80_2","r_hit80_3","r_hit80_4","r_hit80_5","r_hit81_0","r_hit81_1","r_hit81_2","r_hit81_3","r_hit81_4","r_hit81_5","r_hit82_0","r_hit82_1","r_hit82_2","r_hit82_3","r_hit82_4","r_hit82_5","r_hit83_0","r_hit83_1","r_hit83_2","r_hit83_3","r_hit83_4","r_hit83_5","r_hit84_0","r_hit84_1","r_hit84_2","r_hit84_3","r_hit84_4","r_hit84_5","testurl0","txt25_0","txt25_1","txt25_2","txt25_3","txt25_4","txt25_5","txt25_6","txt25_7","txt25_8","txt25_9","txt25_15","txt25_16","txt25_17","txt25_18","txt25_19","txt25_11","txt25_12","txt25_13","txt25_14","txt25_10","txt25_20","txt25_21","txt25_22","txt25_23","txt25_24","begin_mask","group"];
		
		this.height = 600;
		this.width = 1024;
		this.elementsContent = [this.group_i()];
	}
	var _proto = Game_Page1Scene_Skin.prototype;

	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 600;
		t.width = 1024;
		t.elementsContent = [this._Rect1_i(),this.time_mask_i(),this.gp_txt_i(),this.panleMask_i(),this.testurl_i(),this.txt_input_i(),this.gp_time_i(),this.test_btn_i(),this.btn_ok_i(),this.op_bg_i(),this.r_0_i(),this.r_1_i(),this.r_2_i(),this.r_3_i(),this.r_4_i(),this.r_5_i(),this.r_6_i(),this.r_7_i(),this.r_8_i(),this.r_9_i(),this.r_10_i(),this.r_11_i(),this.r_12_i(),this.r_13_i(),this.r_14_i(),this.r_15_i(),this.r_16_i(),this.r_17_i(),this.r_18_i(),this.r_19_i(),this.r_20_i(),this.r_21_i(),this.r_22_i(),this.r_23_i(),this.r_24_i(),this.r_25_i(),this.gp_ok_i(),this.fru_0_i(),this.fru_1_i(),this.fru_2_i(),this.fru_3_i(),this.fru_4_i(),this.fru_5_i(),this.fru_6_i(),this.fru_7_i(),this.fru_8_i(),this.fru_9_i(),this.fru_10_i(),this.fru_11_i(),this.fru_12_i(),this.fru_13_i(),this.fru_14_i(),this.fru_15_i(),this.fru_16_i(),this.fru_17_i(),this.fru_18_i(),this.fru_19_i(),this._Rect5_i(),this.sh_0_i(),this.sh_1_i(),this.sh_2_i(),this.sh_3_i(),this.sh_4_i(),this.sh_5_i(),this.sh_6_i(),this.sh_7_i(),this.sh_8_i(),this.sh_9_i(),this.sh_10_i(),this._Rect6_i(),this.txt3_1_i(),this.txt3_0_i(),this.txt3_2_i(),this.txt5_0_i(),this.txt5_1_i(),this.txt5_2_i(),this.txt5_3_i(),this.txt5_4_i(),this.txt9_2_i(),this.txt9_1_i(),this.txt9_0_i(),this.txt9_3_i(),this.txt9_4_i(),this.txt9_5_i(),this.txt9_6_i(),this.txt9_7_i(),this.txt9_8_i(),this.txt16_0_i(),this.txt16_1_i(),this.txt16_2_i(),this.txt16_3_i(),this.txt16_4_i(),this.txt16_5_i(),this.txt16_6_i(),this.txt16_7_i(),this.txt16_8_i(),this.txt16_9_i(),this.txt16_10_i(),this.txt16_11_i(),this.txt16_12_i(),this.txt16_13_i(),this.txt16_14_i(),this.txt16_15_i(),this._Image3_i(),this.r_73_0_i(),this.r_73_1_i(),this.r_73_2_i(),this.r_76_0_i(),this.r_76_1_i(),this.r_76_2_i(),this.r_76_3_i(),this.r_76_4_i(),this.r_76_5_i(),this.r_76_6_i(),this.r_76_7_i(),this.r_76_8_i(),this.r_78_0_i(),this.r_78_1_i(),this.r_78_2_i(),this.r_78_3_i(),this.r_sidai_0_i(),this.r_sidai_1_i(),this.r_sidai_2_i(),this.r_sidai_3_i(),this.r_sidai_4_i(),this.r_sidai_5_i(),this.r_sidai_6_i(),this.r_numsidai_0_i(),this.r_numsidai_1_i(),this.r_numsidai_2_i(),this.r_numsidai_3_i(),this.r_numsidai_4_i(),this.r_numsidai_5_i(),this.r_numsidai_6_i(),this.r_sort80_0_i(),this.r_hit80_0_i(),this.r_hit80_1_i(),this.r_hit80_2_i(),this.r_hit80_3_i(),this.r_hit80_4_i(),this.r_hit80_5_i(),this.r_hit81_0_i(),this.r_hit81_1_i(),this.r_hit81_2_i(),this.r_hit81_3_i(),this.r_hit81_4_i(),this.r_hit81_5_i(),this.r_hit82_0_i(),this.r_hit82_1_i(),this.r_hit82_2_i(),this.r_hit82_3_i(),this.r_hit82_4_i(),this.r_hit82_5_i(),this.r_hit83_0_i(),this.r_hit83_1_i(),this.r_hit83_2_i(),this.r_hit83_3_i(),this.r_hit83_4_i(),this.r_hit83_5_i(),this.r_hit84_0_i(),this.r_hit84_1_i(),this.r_hit84_2_i(),this.r_hit84_3_i(),this.r_hit84_4_i(),this.r_hit84_5_i(),this.testurl0_i(),this._Image4_i(),this._Image5_i(),this.txt25_0_i(),this.txt25_1_i(),this.txt25_2_i(),this.txt25_3_i(),this.txt25_4_i(),this.txt25_5_i(),this.txt25_6_i(),this.txt25_7_i(),this.txt25_8_i(),this.txt25_9_i(),this.txt25_15_i(),this.txt25_16_i(),this.txt25_17_i(),this.txt25_18_i(),this.txt25_19_i(),this.txt25_11_i(),this.txt25_12_i(),this.txt25_13_i(),this.txt25_14_i(),this.txt25_10_i(),this.txt25_20_i(),this.txt25_21_i(),this.txt25_22_i(),this.txt25_23_i(),this.txt25_24_i(),this.begin_mask_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xb3e4f8;
		t.height = 600;
		t.width = 1024;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.time_mask_i = function () {
		var t = new eui.Rect();
		this.time_mask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 600;
		t.width = 1024;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_txt_i = function () {
		var t = new eui.Group();
		this.gp_txt = t;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 12;
		t.y = 22;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "ui_json.img_22";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.panleMask_i = function () {
		var t = new eui.Image();
		this.panleMask = t;
		t.height = 606;
		t.scale9Grid = new egret.Rectangle(26,28,2,2);
		t.source = "ui_json.img_21";
		t.visible = false;
		t.width = 1026;
		t.x = -1.33;
		t.y = -2.66;
		return t;
	};
	_proto.testurl_i = function () {
		var t = new eui.Label();
		this.testurl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.height = 50;
		t.size = 26;
		t.text = "第0题";
		t.textAlign = "center";
		t.textColor = 0x0451f7;
		t.verticalAlign = "middle";
		t.width = 181;
		t.x = 251;
		t.y = 8.5;
		return t;
	};
	_proto.txt_input_i = function () {
		var t = new eui.TextInput();
		this.txt_input = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 53;
		t.skinName = "skins.TextInputSkin";
		t.width = 137.51;
		t.x = 641;
		t.y = 14.5;
		return t;
	};
	_proto.gp_time_i = function () {
		var t = new eui.Group();
		this.gp_time = t;
		t.x = 905;
		t.y = 7;
		t.elementsContent = [this._Image2_i(),this.time_txt_0_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_json.img_30";
		t.x = -1;
		t.y = 7;
		return t;
	};
	_proto.time_txt_0_i = function () {
		var t = new eui.Label();
		this.time_txt_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "";
		t.height = 52;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 48;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xFFFF00;
		t.verticalAlign = "middle";
		t.width = 75;
		t.x = 6;
		t.y = 26;
		return t;
	};
	_proto.test_btn_i = function () {
		var t = new eui.Group();
		this.test_btn = t;
		t.anchorOffsetX = 114.5;
		t.anchorOffsetY = 40;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.x = 844;
		t.y = 35;
		t.elementsContent = [this._Rect2_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0xac09f4;
		t.height = 80;
		t.width = 229;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 76;
		t.size = 40;
		t.text = "跳转";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 220;
		t.x = 5;
		t.y = 2;
		return t;
	};
	_proto.btn_ok_i = function () {
		var t = new eui.Group();
		this.btn_ok = t;
		t.anchorOffsetX = 114.5;
		t.anchorOffsetY = 40;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.x = 844;
		t.y = 81;
		t.elementsContent = [this._Rect3_i(),this._Label2_i()];
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x096cf4;
		t.height = 80;
		t.width = 229;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.size = 40;
		t.text = "显示答案";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 224;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.op_bg_i = function () {
		var t = new eui.Image();
		this.op_bg = t;
		t.source = "ui_json.img_28";
		t.visible = false;
		t.x = 106;
		t.y = 507;
		return t;
	};
	_proto.r_0_i = function () {
		var t = new eui.Rect();
		this.r_0 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 184.5;
		t.y = 547;
		return t;
	};
	_proto.r_1_i = function () {
		var t = new eui.Rect();
		this.r_1 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 315.4;
		t.y = 547;
		return t;
	};
	_proto.r_2_i = function () {
		var t = new eui.Rect();
		this.r_2 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 445.8;
		t.y = 547;
		return t;
	};
	_proto.r_3_i = function () {
		var t = new eui.Rect();
		this.r_3 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 576.2;
		t.y = 547;
		return t;
	};
	_proto.r_4_i = function () {
		var t = new eui.Rect();
		this.r_4 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 706.6;
		t.y = 547;
		return t;
	};
	_proto.r_5_i = function () {
		var t = new eui.Rect();
		this.r_5 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 837;
		t.y = 547;
		return t;
	};
	_proto.r_6_i = function () {
		var t = new eui.Rect();
		this.r_6 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 55.8;
		t.y = 271;
		return t;
	};
	_proto.r_7_i = function () {
		var t = new eui.Rect();
		this.r_7 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 139.39;
		t.y = 271;
		return t;
	};
	_proto.r_8_i = function () {
		var t = new eui.Rect();
		this.r_8 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 222.48;
		t.y = 271;
		return t;
	};
	_proto.r_9_i = function () {
		var t = new eui.Rect();
		this.r_9 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 305.27;
		t.y = 271;
		return t;
	};
	_proto.r_10_i = function () {
		var t = new eui.Rect();
		this.r_10 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 388.36;
		t.y = 271;
		return t;
	};
	_proto.r_11_i = function () {
		var t = new eui.Rect();
		this.r_11 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 471.45;
		t.y = 271;
		return t;
	};
	_proto.r_12_i = function () {
		var t = new eui.Rect();
		this.r_12 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 554.55;
		t.y = 271;
		return t;
	};
	_proto.r_13_i = function () {
		var t = new eui.Rect();
		this.r_13 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 637.44;
		t.y = 271;
		return t;
	};
	_proto.r_14_i = function () {
		var t = new eui.Rect();
		this.r_14 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 720.93;
		t.y = 271;
		return t;
	};
	_proto.r_15_i = function () {
		var t = new eui.Rect();
		this.r_15 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 803.82;
		t.y = 271;
		return t;
	};
	_proto.r_16_i = function () {
		var t = new eui.Rect();
		this.r_16 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 886.91;
		t.y = 271;
		return t;
	};
	_proto.r_17_i = function () {
		var t = new eui.Rect();
		this.r_17 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 970;
		t.y = 271;
		return t;
	};
	_proto.r_18_i = function () {
		var t = new eui.Rect();
		this.r_18 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 108.5;
		t.y = 271;
		return t;
	};
	_proto.r_19_i = function () {
		var t = new eui.Rect();
		this.r_19 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 225.30714285714285;
		t.y = 271;
		return t;
	};
	_proto.r_20_i = function () {
		var t = new eui.Rect();
		this.r_20 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 340.26428571428573;
		t.y = 271;
		return t;
	};
	_proto.r_21_i = function () {
		var t = new eui.Rect();
		this.r_21 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 457.0114285714286;
		t.y = 271;
		return t;
	};
	_proto.r_22_i = function () {
		var t = new eui.Rect();
		this.r_22 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 572.3585714285714;
		t.y = 271;
		return t;
	};
	_proto.r_23_i = function () {
		var t = new eui.Rect();
		this.r_23 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 688.1057142857144;
		t.y = 271;
		return t;
	};
	_proto.r_24_i = function () {
		var t = new eui.Rect();
		this.r_24 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 804.0528571428572;
		t.y = 271;
		return t;
	};
	_proto.r_25_i = function () {
		var t = new eui.Rect();
		this.r_25 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 919.5;
		t.y = 271;
		return t;
	};
	_proto.gp_ok_i = function () {
		var t = new eui.Group();
		this.gp_ok = t;
		t.height = 100;
		t.width = 100;
		t.x = 913.67;
		t.y = 498.35;
		t.elementsContent = [this._Rect4_i()];
		return t;
	};
	_proto._Rect4_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto.fru_0_i = function () {
		var t = new eui.Rect();
		this.fru_0 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 66;
		t.fillAlpha = 0.6;
		t.height = 132;
		t.visible = false;
		t.width = 120;
		t.x = 72.5;
		t.y = 156;
		return t;
	};
	_proto.fru_1_i = function () {
		var t = new eui.Rect();
		this.fru_1 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 201.5;
		t.y = 156;
		return t;
	};
	_proto.fru_2_i = function () {
		var t = new eui.Rect();
		this.fru_2 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 342.36;
		t.y = 156;
		return t;
	};
	_proto.fru_3_i = function () {
		var t = new eui.Rect();
		this.fru_3 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 485;
		t.y = 156;
		return t;
	};
	_proto.fru_4_i = function () {
		var t = new eui.Rect();
		this.fru_4 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 633;
		t.y = 156;
		return t;
	};
	_proto.fru_5_i = function () {
		var t = new eui.Rect();
		this.fru_5 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 775.36;
		t.y = 156;
		return t;
	};
	_proto.fru_6_i = function () {
		var t = new eui.Rect();
		this.fru_6 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 929;
		t.y = 184.5;
		return t;
	};
	_proto.fru_7_i = function () {
		var t = new eui.Rect();
		this.fru_7 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 72.5;
		t.y = 290.5;
		return t;
	};
	_proto.fru_8_i = function () {
		var t = new eui.Rect();
		this.fru_8 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 201.5;
		t.y = 290.5;
		return t;
	};
	_proto.fru_9_i = function () {
		var t = new eui.Rect();
		this.fru_9 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 342.36;
		t.y = 290.5;
		return t;
	};
	_proto.fru_10_i = function () {
		var t = new eui.Rect();
		this.fru_10 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 485;
		t.y = 290.5;
		return t;
	};
	_proto.fru_11_i = function () {
		var t = new eui.Rect();
		this.fru_11 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 633;
		t.y = 290.5;
		return t;
	};
	_proto.fru_12_i = function () {
		var t = new eui.Rect();
		this.fru_12 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 775.36;
		t.y = 290.5;
		return t;
	};
	_proto.fru_13_i = function () {
		var t = new eui.Rect();
		this.fru_13 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 932;
		t.y = 310;
		return t;
	};
	_proto.fru_14_i = function () {
		var t = new eui.Rect();
		this.fru_14 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 66;
		t.fillAlpha = 0.6;
		t.height = 132;
		t.visible = false;
		t.width = 120;
		t.x = 72.5;
		t.y = 419;
		return t;
	};
	_proto.fru_15_i = function () {
		var t = new eui.Rect();
		this.fru_15 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 258.5;
		t.y = 415;
		return t;
	};
	_proto.fru_16_i = function () {
		var t = new eui.Rect();
		this.fru_16 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 435.5;
		t.y = 420;
		return t;
	};
	_proto.fru_17_i = function () {
		var t = new eui.Rect();
		this.fru_17 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 586;
		t.y = 415;
		return t;
	};
	_proto.fru_18_i = function () {
		var t = new eui.Rect();
		this.fru_18 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 751;
		t.y = 433;
		return t;
	};
	_proto.fru_19_i = function () {
		var t = new eui.Rect();
		this.fru_19 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 57;
		t.fillAlpha = 0.6;
		t.height = 114;
		t.visible = false;
		t.width = 120;
		t.x = 921;
		t.y = 433;
		return t;
	};
	_proto._Rect5_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 437;
		t.anchorOffsetY = 205;
		t.fillAlpha = 0.5;
		t.height = 410;
		t.visible = false;
		t.width = 874;
		t.x = 495;
		t.y = 299;
		return t;
	};
	_proto.sh_0_i = function () {
		var t = new eui.Rect();
		this.sh_0 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 94.6;
		t.y = 300;
		return t;
	};
	_proto.sh_1_i = function () {
		var t = new eui.Rect();
		this.sh_1 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 261.3;
		t.y = 300;
		return t;
	};
	_proto.sh_2_i = function () {
		var t = new eui.Rect();
		this.sh_2 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 429.0000000000001;
		t.y = 300;
		return t;
	};
	_proto.sh_3_i = function () {
		var t = new eui.Rect();
		this.sh_3 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 595.2000000000002;
		t.y = 300;
		return t;
	};
	_proto.sh_4_i = function () {
		var t = new eui.Rect();
		this.sh_4 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 762.4000000000001;
		t.y = 300;
		return t;
	};
	_proto.sh_5_i = function () {
		var t = new eui.Rect();
		this.sh_5 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 928.96;
		t.y = 300;
		return t;
	};
	_proto.sh_6_i = function () {
		var t = new eui.Rect();
		this.sh_6 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 141.5;
		t.y = 294;
		return t;
	};
	_proto.sh_7_i = function () {
		var t = new eui.Rect();
		this.sh_7 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 326;
		t.y = 294;
		return t;
	};
	_proto.sh_8_i = function () {
		var t = new eui.Rect();
		this.sh_8 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 510.8;
		t.y = 294;
		return t;
	};
	_proto.sh_9_i = function () {
		var t = new eui.Rect();
		this.sh_9 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 695.7;
		t.y = 294;
		return t;
	};
	_proto.sh_10_i = function () {
		var t = new eui.Rect();
		this.sh_10 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.visible = false;
		t.width = 120;
		t.x = 879.96;
		t.y = 294;
		return t;
	};
	_proto._Rect6_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 341.5;
		t.anchorOffsetY = 183;
		t.fillAlpha = 0.5;
		t.height = 366;
		t.visible = false;
		t.width = 683;
		t.x = 512;
		t.y = 329;
		return t;
	};
	_proto.txt3_1_i = function () {
		var t = new eui.Rect();
		this.txt3_1 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 495;
		t.y = 314;
		return t;
	};
	_proto.txt3_0_i = function () {
		var t = new eui.Rect();
		this.txt3_0 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 375.5;
		t.y = 314;
		return t;
	};
	_proto.txt3_2_i = function () {
		var t = new eui.Rect();
		this.txt3_2 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 615;
		t.y = 314;
		return t;
	};
	_proto.txt5_0_i = function () {
		var t = new eui.Rect();
		this.txt5_0 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 434;
		t.y = 263.5;
		return t;
	};
	_proto.txt5_1_i = function () {
		var t = new eui.Rect();
		this.txt5_1 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 554;
		t.y = 263.5;
		return t;
	};
	_proto.txt5_2_i = function () {
		var t = new eui.Rect();
		this.txt5_2 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 374.5;
		t.y = 380;
		return t;
	};
	_proto.txt5_3_i = function () {
		var t = new eui.Rect();
		this.txt5_3 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 494;
		t.y = 380;
		return t;
	};
	_proto.txt5_4_i = function () {
		var t = new eui.Rect();
		this.txt5_4 = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 100;
		t.x = 614;
		t.y = 380;
		return t;
	};
	_proto.txt9_2_i = function () {
		var t = new eui.Rect();
		this.txt9_2 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 737;
		t.y = 217;
		return t;
	};
	_proto.txt9_1_i = function () {
		var t = new eui.Rect();
		this.txt9_1 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 512;
		t.y = 217;
		return t;
	};
	_proto.txt9_0_i = function () {
		var t = new eui.Rect();
		this.txt9_0 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 287;
		t.y = 217;
		return t;
	};
	_proto.txt9_3_i = function () {
		var t = new eui.Rect();
		this.txt9_3 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 287;
		t.y = 331.5;
		return t;
	};
	_proto.txt9_4_i = function () {
		var t = new eui.Rect();
		this.txt9_4 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 510.86;
		t.y = 331.5;
		return t;
	};
	_proto.txt9_5_i = function () {
		var t = new eui.Rect();
		this.txt9_5 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 737;
		t.y = 331.5;
		return t;
	};
	_proto.txt9_6_i = function () {
		var t = new eui.Rect();
		this.txt9_6 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 287;
		t.y = 446;
		return t;
	};
	_proto.txt9_7_i = function () {
		var t = new eui.Rect();
		this.txt9_7 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 514.36;
		t.y = 446;
		return t;
	};
	_proto.txt9_8_i = function () {
		var t = new eui.Rect();
		this.txt9_8 = t;
		t.anchorOffsetX = 107;
		t.anchorOffsetY = 50;
		t.fillAlpha = 0.5;
		t.height = 100;
		t.visible = false;
		t.width = 214;
		t.x = 737;
		t.y = 446;
		return t;
	};
	_proto.txt16_0_i = function () {
		var t = new eui.Rect();
		this.txt16_0 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 261;
		t.y = 194;
		return t;
	};
	_proto.txt16_1_i = function () {
		var t = new eui.Rect();
		this.txt16_1 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 429;
		t.y = 194;
		return t;
	};
	_proto.txt16_2_i = function () {
		var t = new eui.Rect();
		this.txt16_2 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 597;
		t.y = 194;
		return t;
	};
	_proto.txt16_3_i = function () {
		var t = new eui.Rect();
		this.txt16_3 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 765;
		t.y = 194;
		return t;
	};
	_proto.txt16_4_i = function () {
		var t = new eui.Rect();
		this.txt16_4 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 261;
		t.y = 284;
		return t;
	};
	_proto.txt16_5_i = function () {
		var t = new eui.Rect();
		this.txt16_5 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 429;
		t.y = 283.16666666666663;
		return t;
	};
	_proto.txt16_6_i = function () {
		var t = new eui.Rect();
		this.txt16_6 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 597;
		t.y = 283.16666666666663;
		return t;
	};
	_proto.txt16_7_i = function () {
		var t = new eui.Rect();
		this.txt16_7 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 765;
		t.y = 283.66666666666663;
		return t;
	};
	_proto.txt16_8_i = function () {
		var t = new eui.Rect();
		this.txt16_8 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 261;
		t.y = 373;
		return t;
	};
	_proto.txt16_9_i = function () {
		var t = new eui.Rect();
		this.txt16_9 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 429;
		t.y = 372.8333333333333;
		return t;
	};
	_proto.txt16_10_i = function () {
		var t = new eui.Rect();
		this.txt16_10 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 597;
		t.y = 372.8333333333333;
		return t;
	};
	_proto.txt16_11_i = function () {
		var t = new eui.Rect();
		this.txt16_11 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 765;
		t.y = 373.3333333333333;
		return t;
	};
	_proto.txt16_12_i = function () {
		var t = new eui.Rect();
		this.txt16_12 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 261;
		t.y = 463;
		return t;
	};
	_proto.txt16_13_i = function () {
		var t = new eui.Rect();
		this.txt16_13 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 429;
		t.y = 463;
		return t;
	};
	_proto.txt16_14_i = function () {
		var t = new eui.Rect();
		this.txt16_14 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 597;
		t.y = 463;
		return t;
	};
	_proto.txt16_15_i = function () {
		var t = new eui.Rect();
		this.txt16_15 = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 41;
		t.fillAlpha = 0.5;
		t.height = 82;
		t.visible = false;
		t.width = 162;
		t.x = 765;
		t.y = 463;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 341.5;
		t.anchorOffsetY = 183;
		t.source = "ui_1_json.img_sufg5";
		t.visible = false;
		t.x = 512.5;
		t.y = 329;
		return t;
	};
	_proto.r_73_0_i = function () {
		var t = new eui.Rect();
		this.r_73_0 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 167;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 216;
		t.y = 358;
		return t;
	};
	_proto.r_73_1_i = function () {
		var t = new eui.Rect();
		this.r_73_1 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 167;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 509.5;
		t.y = 358;
		return t;
	};
	_proto.r_73_2_i = function () {
		var t = new eui.Rect();
		this.r_73_2 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 167;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 803;
		t.y = 358;
		return t;
	};
	_proto.r_76_0_i = function () {
		var t = new eui.Rect();
		this.r_76_0 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 140.5;
		t.y = 268;
		return t;
	};
	_proto.r_76_1_i = function () {
		var t = new eui.Rect();
		this.r_76_1 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 388;
		t.y = 268;
		return t;
	};
	_proto.r_76_2_i = function () {
		var t = new eui.Rect();
		this.r_76_2 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 635;
		t.y = 268;
		return t;
	};
	_proto.r_76_3_i = function () {
		var t = new eui.Rect();
		this.r_76_3 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 882;
		t.y = 268;
		return t;
	};
	_proto.r_76_4_i = function () {
		var t = new eui.Rect();
		this.r_76_4 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 107;
		t.y = 270;
		return t;
	};
	_proto.r_76_5_i = function () {
		var t = new eui.Rect();
		this.r_76_5 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 310;
		t.y = 270;
		return t;
	};
	_proto.r_76_6_i = function () {
		var t = new eui.Rect();
		this.r_76_6 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 513;
		t.y = 270;
		return t;
	};
	_proto.r_76_7_i = function () {
		var t = new eui.Rect();
		this.r_76_7 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 716;
		t.y = 270;
		return t;
	};
	_proto.r_76_8_i = function () {
		var t = new eui.Rect();
		this.r_76_8 = t;
		t.anchorOffsetX = 93;
		t.anchorOffsetY = 83.5;
		t.height = 167;
		t.visible = false;
		t.width = 186;
		t.x = 919;
		t.y = 270;
		return t;
	};
	_proto.r_78_0_i = function () {
		var t = new eui.Rect();
		this.r_78_0 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 251;
		t.y = 548;
		return t;
	};
	_proto.r_78_1_i = function () {
		var t = new eui.Rect();
		this.r_78_1 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 428.5;
		t.y = 546;
		return t;
	};
	_proto.r_78_2_i = function () {
		var t = new eui.Rect();
		this.r_78_2 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 607;
		t.y = 546;
		return t;
	};
	_proto.r_78_3_i = function () {
		var t = new eui.Rect();
		this.r_78_3 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 785;
		t.y = 548;
		return t;
	};
	_proto.r_sidai_0_i = function () {
		var t = new eui.Rect();
		this.r_sidai_0 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 135.5;
		t.y = 252;
		return t;
	};
	_proto.r_sidai_1_i = function () {
		var t = new eui.Rect();
		this.r_sidai_1 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 261.5;
		t.y = 252;
		return t;
	};
	_proto.r_sidai_2_i = function () {
		var t = new eui.Rect();
		this.r_sidai_2 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 387.36;
		t.y = 252;
		return t;
	};
	_proto.r_sidai_3_i = function () {
		var t = new eui.Rect();
		this.r_sidai_3 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 512.5;
		t.y = 252;
		return t;
	};
	_proto.r_sidai_4_i = function () {
		var t = new eui.Rect();
		this.r_sidai_4 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 638;
		t.y = 252;
		return t;
	};
	_proto.r_sidai_5_i = function () {
		var t = new eui.Rect();
		this.r_sidai_5 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 763.5;
		t.y = 252;
		return t;
	};
	_proto.r_sidai_6_i = function () {
		var t = new eui.Rect();
		this.r_sidai_6 = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 151.5;
		t.height = 303;
		t.visible = false;
		t.width = 30;
		t.x = 889;
		t.y = 252;
		return t;
	};
	_proto.r_numsidai_0_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_0 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 174;
		t.y = 548;
		return t;
	};
	_proto.r_numsidai_1_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_1 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 285.5;
		t.y = 548;
		return t;
	};
	_proto.r_numsidai_2_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_2 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 398;
		t.y = 548;
		return t;
	};
	_proto.r_numsidai_3_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_3 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 510;
		t.y = 548;
		return t;
	};
	_proto.r_numsidai_4_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_4 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 622;
		t.y = 548;
		return t;
	};
	_proto.r_numsidai_5_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_5 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 733.5;
		t.y = 548;
		return t;
	};
	_proto.r_numsidai_6_i = function () {
		var t = new eui.Rect();
		this.r_numsidai_6 = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.fillAlpha = 0.5;
		t.height = 80;
		t.visible = false;
		t.width = 80;
		t.x = 846;
		t.y = 548;
		return t;
	};
	_proto.r_sort80_0_i = function () {
		var t = new eui.Rect();
		this.r_sort80_0 = t;
		t.anchorOffsetX = 468;
		t.anchorOffsetY = 199;
		t.fillAlpha = 0.4;
		t.height = 398;
		t.visible = false;
		t.width = 936;
		t.x = 512;
		t.y = 297;
		return t;
	};
	_proto.r_hit80_0_i = function () {
		var t = new eui.Rect();
		this.r_hit80_0 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 74;
		t.y = 297;
		return t;
	};
	_proto.r_hit80_1_i = function () {
		var t = new eui.Rect();
		this.r_hit80_1 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 394;
		t.y = 273;
		return t;
	};
	_proto.r_hit80_2_i = function () {
		var t = new eui.Rect();
		this.r_hit80_2 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 685;
		t.y = 296;
		return t;
	};
	_proto.r_hit80_3_i = function () {
		var t = new eui.Rect();
		this.r_hit80_3 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 225;
		t.y = 466;
		return t;
	};
	_proto.r_hit80_4_i = function () {
		var t = new eui.Rect();
		this.r_hit80_4 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 509;
		t.y = 466;
		return t;
	};
	_proto.r_hit80_5_i = function () {
		var t = new eui.Rect();
		this.r_hit80_5 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 814;
		t.y = 466;
		return t;
	};
	_proto.r_hit81_0_i = function () {
		var t = new eui.Rect();
		this.r_hit81_0 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 285.5;
		t.y = 320;
		return t;
	};
	_proto.r_hit81_1_i = function () {
		var t = new eui.Rect();
		this.r_hit81_1 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 585;
		t.y = 320;
		return t;
	};
	_proto.r_hit81_2_i = function () {
		var t = new eui.Rect();
		this.r_hit81_2 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 869.36;
		t.y = 320;
		return t;
	};
	_proto.r_hit81_3_i = function () {
		var t = new eui.Rect();
		this.r_hit81_3 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 145;
		t.y = 466;
		return t;
	};
	_proto.r_hit81_4_i = function () {
		var t = new eui.Rect();
		this.r_hit81_4 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 444.36;
		t.y = 466;
		return t;
	};
	_proto.r_hit81_5_i = function () {
		var t = new eui.Rect();
		this.r_hit81_5 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 729;
		t.y = 466;
		return t;
	};
	_proto.r_hit82_0_i = function () {
		var t = new eui.Rect();
		this.r_hit82_0 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 114;
		t.y = 287;
		return t;
	};
	_proto.r_hit82_1_i = function () {
		var t = new eui.Rect();
		this.r_hit82_1 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 297;
		t.y = 287;
		return t;
	};
	_proto.r_hit82_2_i = function () {
		var t = new eui.Rect();
		this.r_hit82_2 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 431.5;
		t.y = 287;
		return t;
	};
	_proto.r_hit82_3_i = function () {
		var t = new eui.Rect();
		this.r_hit82_3 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 589;
		t.y = 287;
		return t;
	};
	_proto.r_hit82_4_i = function () {
		var t = new eui.Rect();
		this.r_hit82_4 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 743;
		t.y = 287;
		return t;
	};
	_proto.r_hit82_5_i = function () {
		var t = new eui.Rect();
		this.r_hit82_5 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 921;
		t.y = 287;
		return t;
	};
	_proto.r_hit83_0_i = function () {
		var t = new eui.Rect();
		this.r_hit83_0 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 114;
		t.y = 387;
		return t;
	};
	_proto.r_hit83_1_i = function () {
		var t = new eui.Rect();
		this.r_hit83_1 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 272;
		t.y = 387;
		return t;
	};
	_proto.r_hit83_2_i = function () {
		var t = new eui.Rect();
		this.r_hit83_2 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 430;
		t.y = 387;
		return t;
	};
	_proto.r_hit83_3_i = function () {
		var t = new eui.Rect();
		this.r_hit83_3 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 588.5;
		t.y = 387;
		return t;
	};
	_proto.r_hit83_4_i = function () {
		var t = new eui.Rect();
		this.r_hit83_4 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 748;
		t.y = 387;
		return t;
	};
	_proto.r_hit83_5_i = function () {
		var t = new eui.Rect();
		this.r_hit83_5 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 906;
		t.y = 387;
		return t;
	};
	_proto.r_hit84_0_i = function () {
		var t = new eui.Rect();
		this.r_hit84_0 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 106;
		t.y = 383;
		return t;
	};
	_proto.r_hit84_1_i = function () {
		var t = new eui.Rect();
		this.r_hit84_1 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 264.4;
		t.y = 383;
		return t;
	};
	_proto.r_hit84_2_i = function () {
		var t = new eui.Rect();
		this.r_hit84_2 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 423.1600000000001;
		t.y = 383;
		return t;
	};
	_proto.r_hit84_3_i = function () {
		var t = new eui.Rect();
		this.r_hit84_3 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 582.2;
		t.y = 383;
		return t;
	};
	_proto.r_hit84_4_i = function () {
		var t = new eui.Rect();
		this.r_hit84_4 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 740.6;
		t.y = 383;
		return t;
	};
	_proto.r_hit84_5_i = function () {
		var t = new eui.Rect();
		this.r_hit84_5 = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.fillAlpha = 0.4;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 899;
		t.y = 383;
		return t;
	};
	_proto.testurl0_i = function () {
		var t = new eui.Label();
		this.testurl0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.height = 50;
		t.size = 26;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xf41904;
		t.verticalAlign = "middle";
		t.width = 181;
		t.x = 250;
		t.y = 42;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "ui_1_json.img_sufg5";
		t.visible = false;
		t.x = 172;
		t.y = 132;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 341.5;
		t.anchorOffsetY = 183;
		t.source = "ui_1_json.img_sufg4";
		t.visible = false;
		t.x = 512.5;
		t.y = 329;
		return t;
	};
	_proto.txt25_0_i = function () {
		var t = new eui.Rect();
		this.txt25_0 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69;
		t.visible = false;
		t.width = 130;
		t.x = 241;
		t.y = 185;
		return t;
	};
	_proto.txt25_1_i = function () {
		var t = new eui.Rect();
		this.txt25_1 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 377;
		t.y = 185;
		return t;
	};
	_proto.txt25_2_i = function () {
		var t = new eui.Rect();
		this.txt25_2 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 513;
		t.y = 185;
		return t;
	};
	_proto.txt25_3_i = function () {
		var t = new eui.Rect();
		this.txt25_3 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 649;
		t.y = 185;
		return t;
	};
	_proto.txt25_4_i = function () {
		var t = new eui.Rect();
		this.txt25_4 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 785;
		t.y = 185;
		return t;
	};
	_proto.txt25_5_i = function () {
		var t = new eui.Rect();
		this.txt25_5 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 241;
		t.y = 257.5;
		return t;
	};
	_proto.txt25_6_i = function () {
		var t = new eui.Rect();
		this.txt25_6 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 377;
		t.y = 257.5;
		return t;
	};
	_proto.txt25_7_i = function () {
		var t = new eui.Rect();
		this.txt25_7 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 513;
		t.y = 257.5;
		return t;
	};
	_proto.txt25_8_i = function () {
		var t = new eui.Rect();
		this.txt25_8 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 649;
		t.y = 257.5;
		return t;
	};
	_proto.txt25_9_i = function () {
		var t = new eui.Rect();
		this.txt25_9 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 785;
		t.y = 257.5;
		return t;
	};
	_proto.txt25_15_i = function () {
		var t = new eui.Rect();
		this.txt25_15 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 241;
		t.y = 402.5;
		return t;
	};
	_proto.txt25_16_i = function () {
		var t = new eui.Rect();
		this.txt25_16 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 377;
		t.y = 402.5;
		return t;
	};
	_proto.txt25_17_i = function () {
		var t = new eui.Rect();
		this.txt25_17 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 513;
		t.y = 402.5;
		return t;
	};
	_proto.txt25_18_i = function () {
		var t = new eui.Rect();
		this.txt25_18 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 649;
		t.y = 402.5;
		return t;
	};
	_proto.txt25_19_i = function () {
		var t = new eui.Rect();
		this.txt25_19 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 785;
		t.y = 402.5;
		return t;
	};
	_proto.txt25_11_i = function () {
		var t = new eui.Rect();
		this.txt25_11 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 377;
		t.y = 330;
		return t;
	};
	_proto.txt25_12_i = function () {
		var t = new eui.Rect();
		this.txt25_12 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 513;
		t.y = 330;
		return t;
	};
	_proto.txt25_13_i = function () {
		var t = new eui.Rect();
		this.txt25_13 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 649;
		t.y = 330;
		return t;
	};
	_proto.txt25_14_i = function () {
		var t = new eui.Rect();
		this.txt25_14 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 785;
		t.y = 330;
		return t;
	};
	_proto.txt25_10_i = function () {
		var t = new eui.Rect();
		this.txt25_10 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 241;
		t.y = 330;
		return t;
	};
	_proto.txt25_20_i = function () {
		var t = new eui.Rect();
		this.txt25_20 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 241;
		t.y = 475;
		return t;
	};
	_proto.txt25_21_i = function () {
		var t = new eui.Rect();
		this.txt25_21 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 377;
		t.y = 475;
		return t;
	};
	_proto.txt25_22_i = function () {
		var t = new eui.Rect();
		this.txt25_22 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 513;
		t.y = 475;
		return t;
	};
	_proto.txt25_23_i = function () {
		var t = new eui.Rect();
		this.txt25_23 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 649;
		t.y = 475;
		return t;
	};
	_proto.txt25_24_i = function () {
		var t = new eui.Rect();
		this.txt25_24 = t;
		t.anchorOffsetX = 65.11;
		t.anchorOffsetY = 34.73;
		t.fillAlpha = 0.5;
		t.height = 69.46;
		t.visible = false;
		t.width = 130.22;
		t.x = 785;
		t.y = 475;
		return t;
	};
	_proto.begin_mask_i = function () {
		var t = new eui.Rect();
		this.begin_mask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 600;
		t.width = 1024;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return Game_Page1Scene_Skin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/ClassOverScene/GetStarScene_Skin.exml'] = window.GetStarScene_Skin = (function (_super) {
	__extends(GetStarScene_Skin, _super);
	function GetStarScene_Skin() {
		_super.call(this);
		this.skinParts = ["lightImg","starImg","goImg"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = GetStarScene_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this._Image1_i(),this.lightImg_i(),this.starImg_i(),this.goImg_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "star_bg_jpg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lightImg_i = function () {
		var t = new eui.Image();
		this.lightImg = t;
		t.anchorOffsetX = 599;
		t.anchorOffsetY = 510;
		t.source = "star_light_png";
		t.x = 781;
		t.y = 549.51;
		return t;
	};
	_proto.starImg_i = function () {
		var t = new eui.Image();
		this.starImg = t;
		t.horizontalCenter = 0;
		t.source = "star_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.goImg_i = function () {
		var t = new eui.Image();
		this.goImg = t;
		t.source = "main_btn_out_png";
		t.x = 1394.88;
		t.y = 1177.88;
		return t;
	};
	return GetStarScene_Skin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/CommonDlg/CommonButton_Skin.exml'] = window.CommonButton_Skin = (function (_super) {
	__extends(CommonButton_Skin, _super);
	function CommonButton_Skin() {
		_super.call(this);
		this.skinParts = ["imgSrcName"];
		
		this.currentState = "up";
		this.elementsContent = [this.imgSrcName_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("imgSrcName","scaleX",1.1),
					new eui.SetProperty("imgSrcName","scaleY",1.1)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("imgSrcName","x",0),
					new eui.SetProperty("imgSrcName","y",0)
				])
		];
	}
	var _proto = CommonButton_Skin.prototype;

	_proto.imgSrcName_i = function () {
		var t = new eui.Image();
		this.imgSrcName = t;
		t.source = "showBtn_png";
		return t;
	};
	return CommonButton_Skin;
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
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/LoginSkin/EndView_Skin.exml'] = window.EndView_Skin = (function (_super) {
	__extends(EndView_Skin, _super);
	function EndView_Skin() {
		_super.call(this);
		this.skinParts = ["score_txt","time_txt_0","time_txt_1","levImg","age","dui","cuo","time"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = EndView_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 600;
		t.width = 1024;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.score_txt_i(),this.time_txt_0_i(),this.time_txt_1_i(),this.levImg_i(),this.age_i(),this.dui_i(),this.cuo_i(),this.time_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "ui_2_json.img_bg_1";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ui_2_json.img_bg_2";
		t.x = 434;
		t.y = 310;
		return t;
	};
	_proto.score_txt_i = function () {
		var t = new eui.Label();
		this.score_txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.scaleX = 1.23;
		t.size = 35;
		t.text = "50";
		t.textAlign = "right";
		t.verticalAlign = "bottom";
		t.width = 62.69;
		t.x = 206;
		t.y = 123;
		return t;
	};
	_proto.time_txt_0_i = function () {
		var t = new eui.Label();
		this.time_txt_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.size = 35;
		t.text = "1";
		t.textAlign = "center";
		t.verticalAlign = "bottom";
		t.width = 57;
		t.x = 228;
		t.y = 218;
		return t;
	};
	_proto.time_txt_1_i = function () {
		var t = new eui.Label();
		this.time_txt_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.size = 35;
		t.text = "2";
		t.textAlign = "center";
		t.verticalAlign = "bottom";
		t.width = 57;
		t.x = 334;
		t.y = 218;
		return t;
	};
	_proto.levImg_i = function () {
		var t = new eui.Image();
		this.levImg = t;
		t.source = "ui_2_json.lev_0";
		t.x = 798;
		t.y = 169;
		return t;
	};
	_proto.age_i = function () {
		var t = new eui.Label();
		this.age = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.text = "年龄";
		t.width = 229;
		t.x = 94;
		t.y = 318;
		return t;
	};
	_proto.dui_i = function () {
		var t = new eui.Label();
		this.dui = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.text = "年龄";
		t.width = 229;
		t.x = 94;
		t.y = 359;
		return t;
	};
	_proto.cuo_i = function () {
		var t = new eui.Label();
		this.cuo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.text = "年龄";
		t.width = 229;
		t.x = 94;
		t.y = 400;
		return t;
	};
	_proto.time_i = function () {
		var t = new eui.Label();
		this.time = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.text = "年龄";
		t.width = 229;
		t.x = 94;
		t.y = 436;
		return t;
	};
	return EndView_Skin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/LoginSkin/LoginView_h_Skin.exml'] = window.LoginView_h_Skin = (function (_super) {
	__extends(LoginView_h_Skin, _super);
	var LoginView_h_Skin$Skin1 = 	(function (_super) {
		__extends(LoginView_h_Skin$Skin1, _super);
		function LoginView_h_Skin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_ui_json.img_elm20")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LoginView_h_Skin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login_ui_json.img_elm19";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginView_h_Skin$Skin1;
	})(eui.Skin);

	var LoginView_h_Skin$Skin2 = 	(function (_super) {
		__extends(LoginView_h_Skin$Skin2, _super);
		function LoginView_h_Skin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_ui_json.img_elm15")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LoginView_h_Skin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.height = 41;
			t.source = "login_ui_json.img_elm11";
			t.width = 144;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginView_h_Skin$Skin2;
	})(eui.Skin);

	function LoginView_h_Skin() {
		_super.call(this);
		this.skinParts = ["tips_0","tips_1","img_0","img_1","btn_ok","btn_code","txt_djs","gp_djs"];
		
		this.height = 1024;
		this.width = 600;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = LoginView_h_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1024;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 600;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.tips_0_i(),this.tips_1_i(),this.img_0_i(),this.img_1_i(),this.btn_ok_i(),this.btn_code_i(),this.gp_djs_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "22_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm1";
		t.x = 137;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm18";
		t.x = 242;
		t.y = 8;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm5";
		t.x = 73;
		t.y = 134;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm2";
		t.x = 73;
		t.y = 206;
		return t;
	};
	_proto.tips_0_i = function () {
		var t = new eui.Label();
		this.tips_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xFC0505;
		t.verticalAlign = "middle";
		t.width = 235;
		t.x = 181;
		t.y = 96.5;
		return t;
	};
	_proto.tips_1_i = function () {
		var t = new eui.Label();
		this.tips_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xFC0505;
		t.verticalAlign = "middle";
		t.width = 354;
		t.x = 115;
		t.y = 171.75;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.height = 41;
		t.source = "login_ui_json.img_elm4";
		t.width = 241;
		t.x = 179;
		t.y = 131.75;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.height = 41;
		t.source = "login_ui_json.img_elm4";
		t.width = 241;
		t.x = 179;
		t.y = 203.5;
		return t;
	};
	_proto.btn_ok_i = function () {
		var t = new eui.Button();
		this.btn_ok = t;
		t.label = "";
		t.x = 240;
		t.y = 320;
		t.skinName = LoginView_h_Skin$Skin1;
		return t;
	};
	_proto.btn_code_i = function () {
		var t = new eui.Button();
		this.btn_code = t;
		t.label = "";
		t.x = 431;
		t.y = 130.5;
		t.skinName = LoginView_h_Skin$Skin2;
		return t;
	};
	_proto.gp_djs_i = function () {
		var t = new eui.Group();
		this.gp_djs = t;
		t.visible = false;
		t.x = 430;
		t.y = 129;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i(),this.txt_djs_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm21";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm22";
		t.x = 10;
		t.y = 13;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm23";
		t.x = 75;
		t.y = 8;
		return t;
	};
	_proto.txt_djs_i = function () {
		var t = new eui.BitmapLabel();
		this.txt_djs = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "txt_num_login_fnt";
		t.height = 26;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "10";
		t.textAlign = "center";
		t.verticalAlign = "center";
		t.width = 41;
		t.x = 79;
		t.y = 7;
		return t;
	};
	return LoginView_h_Skin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/LoginSkin/LoginView_Skin.exml'] = window.LoginView_Skin = (function (_super) {
	__extends(LoginView_Skin, _super);
	var LoginView_Skin$Skin3 = 	(function (_super) {
		__extends(LoginView_Skin$Skin3, _super);
		function LoginView_Skin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_ui_json.img_elm20")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LoginView_Skin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login_ui_json.img_elm19";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginView_Skin$Skin3;
	})(eui.Skin);

	var LoginView_Skin$Skin4 = 	(function (_super) {
		__extends(LoginView_Skin$Skin4, _super);
		function LoginView_Skin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_ui_json.img_elm15")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LoginView_Skin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.height = 41;
			t.source = "login_ui_json.img_elm11";
			t.width = 144;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginView_Skin$Skin4;
	})(eui.Skin);

	function LoginView_Skin() {
		_super.call(this);
		this.skinParts = ["tips_0","tips_1","img_0","img_1","btn_ok","btn_code","txt_djs","gp_djs"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = LoginView_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 600;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1024;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.tips_0_i(),this.tips_1_i(),this.img_0_i(),this.img_1_i(),this.btn_ok_i(),this.btn_code_i(),this.gp_djs_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 600;
		t.source = "login_ui_json.img_elm7";
		t.width = 1024;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm1";
		t.x = 332;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm18";
		t.x = 437;
		t.y = 8;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm5";
		t.x = 268;
		t.y = 134;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm2";
		t.x = 268;
		t.y = 206;
		return t;
	};
	_proto.tips_0_i = function () {
		var t = new eui.Label();
		this.tips_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textColor = 0xFC0505;
		t.verticalAlign = "middle";
		t.width = 235;
		t.x = 781;
		t.y = 136.25;
		return t;
	};
	_proto.tips_1_i = function () {
		var t = new eui.Label();
		this.tips_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textColor = 0xFC0505;
		t.verticalAlign = "middle";
		t.width = 354;
		t.x = 630;
		t.y = 208.5;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.height = 41;
		t.source = "login_ui_json.img_elm4";
		t.width = 241;
		t.x = 374;
		t.y = 131.75;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.height = 41;
		t.source = "login_ui_json.img_elm4";
		t.width = 241;
		t.x = 374;
		t.y = 203.5;
		return t;
	};
	_proto.btn_ok_i = function () {
		var t = new eui.Button();
		this.btn_ok = t;
		t.label = "";
		t.x = 435;
		t.y = 320;
		t.skinName = LoginView_Skin$Skin3;
		return t;
	};
	_proto.btn_code_i = function () {
		var t = new eui.Button();
		this.btn_code = t;
		t.label = "";
		t.x = 626;
		t.y = 130.5;
		t.skinName = LoginView_Skin$Skin4;
		return t;
	};
	_proto.gp_djs_i = function () {
		var t = new eui.Group();
		this.gp_djs = t;
		t.visible = false;
		t.x = 625;
		t.y = 129;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i(),this.txt_djs_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm21";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm22";
		t.x = 10;
		t.y = 13;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm23";
		t.x = 75;
		t.y = 8;
		return t;
	};
	_proto.txt_djs_i = function () {
		var t = new eui.BitmapLabel();
		this.txt_djs = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "txt_num_login_fnt";
		t.height = 26;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "10";
		t.textAlign = "center";
		t.verticalAlign = "center";
		t.width = 41;
		t.x = 79;
		t.y = 7;
		return t;
	};
	return LoginView_Skin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/LoginSkin/UserInfoView_h_Skin.exml'] = window.UserInfoView_h_Skin = (function (_super) {
	__extends(UserInfoView_h_Skin, _super);
	var UserInfoView_h_Skin$Skin5 = 	(function (_super) {
		__extends(UserInfoView_h_Skin$Skin5, _super);
		function UserInfoView_h_Skin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_ui_json.img_elm17")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = UserInfoView_h_Skin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login_ui_json.img_elm16";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return UserInfoView_h_Skin$Skin5;
	})(eui.Skin);

	function UserInfoView_h_Skin() {
		_super.call(this);
		this.skinParts = ["img_0","img_1","sexbg_1","sex_1","sexgp_1","sexbg_2","sex_2","sexgp_2","tips_0","tips_2","tips_1","btn_ok"];
		
		this.height = 1024;
		this.width = 600;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = UserInfoView_h_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1024;
		t.width = 600;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.img_0_i(),this.img_1_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.sexgp_1_i(),this.sexgp_2_i(),this.tips_0_i(),this.tips_2_i(),this.tips_1_i(),this.btn_ok_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1024;
		t.source = "22_png";
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm1";
		t.x = 134;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm3";
		t.x = 239;
		t.y = 8.5;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.source = "login_ui_json.img_elm4";
		t.x = 210;
		t.y = 133.42;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.source = "login_ui_json.img_elm4";
		t.x = 210;
		t.y = 273.42;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm10";
		t.x = 70;
		t.y = 134;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm8";
		t.x = 70;
		t.y = 206;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm9";
		t.x = 70;
		t.y = 278;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm4";
		t.x = 212;
		t.y = 201;
		return t;
	};
	_proto.sexgp_1_i = function () {
		var t = new eui.Group();
		this.sexgp_1 = t;
		t.x = 217;
		t.y = 204.5;
		t.elementsContent = [this.sexbg_1_i(),this.sex_1_i()];
		return t;
	};
	_proto.sexbg_1_i = function () {
		var t = new eui.Image();
		this.sexbg_1 = t;
		t.source = "login_ui_json.img_elm14";
		t.visible = false;
		t.x = -4.5;
		t.y = -4;
		return t;
	};
	_proto.sex_1_i = function () {
		var t = new eui.Label();
		this.sex_1 = t;
		t.height = 28;
		t.size = 28;
		t.text = "男";
		t.textAlign = "center";
		t.textColor = 0xafafaf;
		t.verticalAlign = "middle";
		t.width = 93;
		t.x = 4;
		t.y = 6;
		return t;
	};
	_proto.sexgp_2_i = function () {
		var t = new eui.Group();
		this.sexgp_2 = t;
		t.x = 336;
		t.y = 204.5;
		t.elementsContent = [this.sexbg_2_i(),this.sex_2_i()];
		return t;
	};
	_proto.sexbg_2_i = function () {
		var t = new eui.Image();
		this.sexbg_2 = t;
		t.source = "login_ui_json.img_elm14";
		t.visible = false;
		t.x = -4.5;
		t.y = -3.5;
		return t;
	};
	_proto.sex_2_i = function () {
		var t = new eui.Label();
		this.sex_2 = t;
		t.anchorOffsetX = 0;
		t.size = 28;
		t.text = "女";
		t.textAlign = "center";
		t.textColor = 0xafafaf;
		t.verticalAlign = "middle";
		t.width = 93;
		t.x = 4;
		t.y = 5;
		return t;
	};
	_proto.tips_0_i = function () {
		var t = new eui.Label();
		this.tips_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xF40000;
		t.verticalAlign = "middle";
		t.width = 230;
		t.x = 215.5;
		t.y = 96.42;
		return t;
	};
	_proto.tips_2_i = function () {
		var t = new eui.Label();
		this.tips_2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xf40000;
		t.verticalAlign = "middle";
		t.width = 337;
		t.x = 166;
		t.y = 172;
		return t;
	};
	_proto.tips_1_i = function () {
		var t = new eui.Label();
		this.tips_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xF40000;
		t.verticalAlign = "middle";
		t.width = 230;
		t.x = 215;
		t.y = 241.5;
		return t;
	};
	_proto.btn_ok_i = function () {
		var t = new eui.Button();
		this.btn_ok = t;
		t.label = "";
		t.x = 223;
		t.y = 320;
		t.skinName = UserInfoView_h_Skin$Skin5;
		return t;
	};
	return UserInfoView_h_Skin;
})(eui.Skin);generateEUI.paths['resource/gamemain/game_skins/LoginSkin/UserInfoView_Skin.exml'] = window.UserInfoView_Skin = (function (_super) {
	__extends(UserInfoView_Skin, _super);
	var UserInfoView_Skin$Skin6 = 	(function (_super) {
		__extends(UserInfoView_Skin$Skin6, _super);
		function UserInfoView_Skin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_ui_json.img_elm17")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = UserInfoView_Skin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login_ui_json.img_elm16";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return UserInfoView_Skin$Skin6;
	})(eui.Skin);

	function UserInfoView_Skin() {
		_super.call(this);
		this.skinParts = ["img_0","img_1","sexbg_1","sex_1","sexgp_1","sexbg_2","sex_2","sexgp_2","tips_0","tips_2","tips_1","btn_ok"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = UserInfoView_Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 600;
		t.width = 1024;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.img_0_i(),this.img_1_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.sexgp_1_i(),this.sexgp_2_i(),this.tips_0_i(),this.tips_2_i(),this.tips_1_i(),this.btn_ok_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 600;
		t.source = "login_ui_json.img_elm7";
		t.width = 1024;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm1";
		t.x = 332;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm3";
		t.x = 437;
		t.y = 8.5;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.source = "login_ui_json.img_elm4";
		t.x = 428;
		t.y = 133.42;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.source = "login_ui_json.img_elm4";
		t.x = 428;
		t.y = 273.42;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm10";
		t.x = 268;
		t.y = 134;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm8";
		t.x = 268;
		t.y = 206;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm9";
		t.x = 268;
		t.y = 278;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "login_ui_json.img_elm4";
		t.x = 430;
		t.y = 201;
		return t;
	};
	_proto.sexgp_1_i = function () {
		var t = new eui.Group();
		this.sexgp_1 = t;
		t.x = 435;
		t.y = 204.5;
		t.elementsContent = [this.sexbg_1_i(),this.sex_1_i()];
		return t;
	};
	_proto.sexbg_1_i = function () {
		var t = new eui.Image();
		this.sexbg_1 = t;
		t.source = "login_ui_json.img_elm14";
		t.visible = false;
		t.x = -4.5;
		t.y = -4;
		return t;
	};
	_proto.sex_1_i = function () {
		var t = new eui.Label();
		this.sex_1 = t;
		t.height = 28;
		t.size = 28;
		t.text = "男";
		t.textAlign = "center";
		t.textColor = 0xafafaf;
		t.verticalAlign = "middle";
		t.width = 93;
		t.x = 4;
		t.y = 6;
		return t;
	};
	_proto.sexgp_2_i = function () {
		var t = new eui.Group();
		this.sexgp_2 = t;
		t.x = 554;
		t.y = 204.5;
		t.elementsContent = [this.sexbg_2_i(),this.sex_2_i()];
		return t;
	};
	_proto.sexbg_2_i = function () {
		var t = new eui.Image();
		this.sexbg_2 = t;
		t.source = "login_ui_json.img_elm14";
		t.visible = false;
		t.x = -4.5;
		t.y = -3.5;
		return t;
	};
	_proto.sex_2_i = function () {
		var t = new eui.Label();
		this.sex_2 = t;
		t.anchorOffsetX = 0;
		t.size = 28;
		t.text = "女";
		t.textAlign = "center";
		t.textColor = 0xafafaf;
		t.verticalAlign = "middle";
		t.width = 93;
		t.x = 4;
		t.y = 5;
		return t;
	};
	_proto.tips_0_i = function () {
		var t = new eui.Label();
		this.tips_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textColor = 0xF40000;
		t.verticalAlign = "middle";
		t.width = 230;
		t.x = 677;
		t.y = 138.42;
		return t;
	};
	_proto.tips_2_i = function () {
		var t = new eui.Label();
		this.tips_2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textColor = 0xf40000;
		t.verticalAlign = "middle";
		t.width = 337;
		t.x = 677;
		t.y = 207.42;
		return t;
	};
	_proto.tips_1_i = function () {
		var t = new eui.Label();
		this.tips_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "ziti";
		t.height = 31;
		t.size = 20;
		t.text = "";
		t.textColor = 0xF40000;
		t.verticalAlign = "middle";
		t.width = 230;
		t.x = 677;
		t.y = 279.42;
		return t;
	};
	_proto.btn_ok_i = function () {
		var t = new eui.Button();
		this.btn_ok = t;
		t.label = "";
		t.x = 435;
		t.y = 320;
		t.skinName = UserInfoView_Skin$Skin6;
		return t;
	};
	return UserInfoView_Skin;
})(eui.Skin);