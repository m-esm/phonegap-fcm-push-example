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

    registerPhonegapPushPlugin();

}

function registerPhonegapPushPlugin() {
    const push = PushNotification.init({
        android: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {}
    });

    PushNotification.hasPermission(data => {
        log({ hasPermission: data });
    });

    push.on('registration', data => {
        log({ registration: data });
    });


    push.on('notification', data => {
        log({ notification: data });
    });

    push.on('error', e => {
        log({ error: e });
    });

}

function registerFCMPlugin() {



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

        navigator.vibrate(500);


    });
}
