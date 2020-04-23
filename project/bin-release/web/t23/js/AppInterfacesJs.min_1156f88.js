function jsBackKeyEvent() {
    if (window.isRunEgret == true) {
        var context = egret.MainContext.instance;
        context.stage.dispatchEventWith("jsNotifyts", "退出");
    } else {
        callAppKeyEvent();
    }
}

function callAppKeyEvent() {
    window.interaction.jsBackFinsh();
}

function callAppUpdateGameStage() {
    window.interaction.jsUpdateGameStage();
}

function getAppWifiStatus() {
    return window.interaction.jsGetWifiStatus();
}

function sendJsSave(data) {
    return window.interaction.jsSaveRequest(data);
}

function callAppjsCancleCollect() {
    return window.interaction.jsCancleCollect();
}

function callAppjsCollect() {
    return window.interaction.jsCollect();
}

function clearGif() {
    var oDiv = document.getElementById('loading');
    oDiv.style.display = 'none';
    var sty = document.getElementsByTagName('style')[0];
    sty.innerHTML = "html,body {-ms - touch - action: none;background: #FFFFFF;padding: 0;border: 0;margin: 0;height: 100%;}";
}

function restleave() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}