var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by win7 on 2017/3/15.
 * 播放的 背景音乐 音效 需要配置到
 * default.res.json
 * name直接传资源的名字即可
 */
var GameSound = (function () {
    function GameSound() {
    }
    GameSound.playMusic = function (name) {
        SoundManager.getInstance().playMusic(name);
    };
    GameSound.playEffect = function (name) {
        SoundManager.getInstance().playEffect(name);
    };
    GameSound.pauseMusic = function () {
        SoundManager.getInstance().pauseMusic();
    };
    GameSound.continueMusic = function () {
        SoundManager.getInstance().continueMusicK();
    };
    /**
     * @param turn true打开音乐音效 flase关闭音乐音效
     */
    GameSound.setSound = function (turn) {
        SoundManager.getInstance().musicTurn = turn;
        SoundManager.getInstance().effectTurn = turn;
    };
    return GameSound;
}());
__reflect(GameSound.prototype, "GameSound");
//# sourceMappingURL=GameSound.js.map