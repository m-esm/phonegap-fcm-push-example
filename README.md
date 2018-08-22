# phonegap-fcm-push-example
Phonegap push example using FCM(Firebase Cloud Messaging) for android 



### example of standard request for push

```curl
curl -X POST \
  https://fcm.googleapis.com/fcm/send \
  -H 'Authorization: SERVER_KEY_HERE' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"to" : "DEVICE_REGISTRATION_TOKEN",

    "notification":{
    "title":"sample title",
    "body":"sample text for body",
    "sound":"default",
    "click_action":"FCM_PLUGIN_ACTIVITY",
    "color":"#ff0000"
      }
      
}'
```