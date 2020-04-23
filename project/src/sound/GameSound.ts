/**
 * Created by win7 on 2017/3/15.
 * 播放的 背景音乐 音效 需要配置到
 * default.res.json
 * name直接传资源的名字即可
 */
class GameSound {
    public static playMusic(name): void {
        SoundManager.getInstance().playMusic(name);
    }

    public static playEffect(name): void {
        SoundManager.getInstance().playEffect(name);
    }

    public static pauseMusic(): void {
        SoundManager.getInstance().pauseMusic();
    }

    public static continueMusic(): void {
        SoundManager.getInstance().continueMusicK();
    }

    /**
     * @param turn true打开音乐音效 flase关闭音乐音效
     */
    public static setSound(turn: boolean): void {
        SoundManager.getInstance().musicTurn = turn;
        SoundManager.getInstance().effectTurn = turn;
    }

    /**
     * 打开播放大厅bg音乐音效
     */
    // public static setHallSound(): void {
    //     if (Main.isSound&&Main.isHallSound) {
    //         GameSound.playMusic("hall_bg_sound_mp3");
    //     }
    // }
    // /**
    //  * 打开播放Button音乐音效
    //  */
    // public static setButtonSound(): void {
    //     if (Main.isSound) {
    //         GameSound.playEffect("btn_click_mp3");
    //     }
    // }

    // public static setEnterGameListSound(): void {
    //     if (Main.isSound) {
    //         GameSound.playEffect("enertroomsound_mp3");
    //     }
    // }

    // public static setLobbyBackSound(): void {
    //     if (Main.isSound) {
    //         GameSound.playEffect("backsound_mp3");
    //     }
    // }
}
