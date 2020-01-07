importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if(workbox){
	console.log("yaaiii!!");
}else{
	console.log("no workbox ._.");
}

workbox.precaching.precacheAndRoute([
	{url: "/assets/football.png", revision: 1},
	{url: "/assets/icon-152x152.png", revision: 1},
	{url: "/assets/icon-192x192.png", revision: 1},
	{url: "/assets/laliga_2014.jpg", revision: 1},

	{url: "/css/materialize.min.css", revision: 1},

	{url: "/js/api.js", revision: 1},
	{url: "/js/db.js", revision: 1},
	{url: "/js/idb.js", revision: 1},
	{url: "/js/materialize.min.js", revision: 1},
	{url: "/js/nav.js", revision: 1},

	{url: "/index.html", revision: 1},
	{url: "/manifest.json", revision: 1},
	{url: "/navigasi.html", revision: 1},
	{url: "/push.js", revision: 1},
	{url: "req.js", revision: 1},
	{url: "tim.html", revision: 1},
]);

workbox.routing.registerRoute(
	new RegExp("/pages/"),
	workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
	/\.(?:png|jpg|gif|svg|jpeg)$/,
	workbox.strategies.cacheFirst({
		cacheName: "assets",
		plugin: [
			new workbox.expiration.Plugin({
				maxEtries: 70,
				maxAgeSeconds: 30 * 24 * 60 * 60 //hari jam menit detik
			}),
		],
	}),
);

workbox.routing.registerRoute(
	/\.(?:css)$/,
	workbox.strategies.cacheFirst({
		cacheName: "css",
		plugin: [
			new workbox.expiration.Plugin({
				maxEtries: 10,
				maxAgeSeconds: 30 * 24 * 60 * 60 //hari jam menit detik
			}),
		],
	}),
);

workbox.routing.registerRoute(
	/\.(?:js)$/,
	workbox.strategies.cacheFirst({
		cacheName: "assets",
		plugin: [
			new workbox.expiration.Plugin({
				maxEtries: 20,
				maxAgeSeconds: 30 * 24 * 60 * 60 //hari jam menit detik
			}),
		],
	}),
);

workbox.routing.registerRoute(
	new RegExp("https://api.football-data.org/v2"),
	new workbox.strategies.NetworkFirst({
		networkTimeoutSeconds: 5,
		cacheName: "url_football_api",
		plugin: [
			new workbox.expiration.Plugin({
				maxEtries: 50,
				maxAgeSeconds: 30 * 24 * 60 * 60 //hari jam menit detik
			}),
		],
	}),
);

self.addEventListener("push", function(event){
	var body;
	if(event.data){
		body = event.data.text();
	}else{
		body = "Push message no playload";
	}
	var options = {
		body: body,
		icon: "assets/football.png",
		vibrate: [100, 50, 100],
		data: {
			dateofArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification(options)
	);
});