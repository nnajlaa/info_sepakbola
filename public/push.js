var webPush = require("web-push");

const vapidKeys = {
	"publicKey" : "BGul_mKbtThe_hBvK9XM1PfAEOB7kF9K9o9IObw1D5PmSb1f6-SpcNViYUHnd3vuoFI7o1IdOiIpLVLq0zRyQ-M",
  	"privateKey" : "pro_oRsOCwVNSb6Bj0GnxqTQbAUm-qjV4SMmGGAns5s"
};

webPush.setVapidDetails('mailto:example@yourdomain.org', 
	vapidKeys.publicKey,
	vapidKeys.privateKey)

var pushSubscription = {
	"endpoint" : "https://fcm.googleapis.com/fcm/send/dGoYfzhYeyY:APA91bEaGZFFAEnPKLBJB40BWB8a8KAzmxJeq0Y1ksB3SNN-uRC_tA6rP4IM-o7ysOSI3Q4IyLJlkUg4SWidSrDXSc9Qx_b0KOUxaGtH6lPZsOBYphQ8AIkHssY-NTioDRwBJzTSIPA6",
	"keys" : {
		"p256dh" : "BK3YnHpLfQHJUw7BlfFH2TzKr4WrnliGAULLEg5LNF2w0oz3ndEoPwIf9psG/clSh7vUye7h2CseDJAlm2X+qIc=",
		"auth" : "ugxB+oVdmkQb39sFW1sGLg=="
	}
};

var payload = "Selamat!! App sudah dapat menerima push notifikasi!";

var options = {
	gcmAPIKey : "AIzaSyBL_-hHwefLJmAFFgV-vdZuE2oj2ewwgjk",
	TTL : 60
};

webPush.sendNotification(pushSubscription, payload, options);