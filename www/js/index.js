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

    //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
    //Here you define your application behaviour based on the notification data.
    FCMPlugin.onNotification(function (data) {
        if (data.wasTapped) {

            //Notification was received on device tray and tapped by the user.
            log({ onNotification: data });

        } else {
            //Notification was received in foreground. Maybe the user needs to be notified.
            log({ onNotification: data });
        }
    });

    push.on('error', e => {
        log({ error: e })
    });

    PushNotification.createChannel(
        () => {
            console.log('success');
        },
        () => {
            console.log('error');
        },
        {
            id: 'testchannel1',
            description: 'My first test channel',
            importance: 3,
            vibration: true
        }
    );
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

        navigator.vibrate(1000);
        navigator.notification.alert(
            data.body,         // message
            null,                 // callback
            data.title,           // title
            'Ok'                  // buttonName
        );
    });


}
