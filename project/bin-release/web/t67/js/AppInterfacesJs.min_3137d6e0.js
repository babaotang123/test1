function jsBackKeyEvent(){if(1==window.isRunEgret){var n=egret.MainContext.instance;n.stage.dispatchEventWith("jsNotifyts","退出")}else callAppKeyEvent()}function callAppKeyEvent(){window.interaction.jsBackFinsh()}function callAppUpdateGameStage(){window.interaction.jsUpdateGameStage()}function getAppWifiStatus(){return window.interaction.jsGetWifiStatus()}function sendJsSave(n){return window.interaction.jsSaveRequest(n)}function callAppjsCancleCollect(){return window.interaction.jsCancleCollect()}function callAppjsCollect(){return window.interaction.jsCollect()}function clearGif(){var n=document.getElementById("loading");n.style.display="none";var t=document.getElementsByTagName("style")[0];t.innerHTML="html,body {-ms - touch - action: none;background: #FFFFFF;padding: 0;border: 0;margin: 0;height: 100%;}"}function restleave(){document.body.scrollTop=document.documentElement.scrollTop=0}