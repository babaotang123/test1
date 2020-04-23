var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginData = (function () {
    function LoginData(data) {
        this.token = data["token"];
        this.name = data["name"];
        this.birthday = data["birthday"];
        this.sex = parseInt(data["sex"]);
    }
    return LoginData;
}());
__reflect(LoginData.prototype, "LoginData");
//# sourceMappingURL=LoginData.js.map