function httpPost(url, json) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));
}

function log(input) {
    console.log(input);
    document.getElementById('push_token').innerHTML += JSON.stringify(input) + '\n\n';
}

log({ message: 'hello' });
var i = 0;
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {

    log({ message: 'device is ready' });


    //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
    //Note that this callback will be fired everytime a new token is generated, including the first time.
    FCMPlugin.onTokenRefresh(function (token) {
        log({ onTokenRefresh: token });
    });

    //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
    //Keep in mind the function will return null if the token has not been established yet.
    FCMPlugin.getToken(function (token) {
        log({ getToken: token });
    });

    //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
    //Here you define your application behaviour based on the notification data.
    FCMPlugin.onNotification(function (data) {
        log({ onNotification: data });

        navigator.vibrate(1000);


    });

    var a =
    {
        "to": "SERVER_API_KEY_From_fcm_console",

        "notification": {
            "title": "salam",
            "body": "chetori",
            "collapse_key": "hello",
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "color": "#ff0000"
        }

    }


}
