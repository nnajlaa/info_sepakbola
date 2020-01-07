if(!("serviceWorker" in navigator)){
			console.log("ServiceWorker not supported for this browser :(");
		}else{
			navigator.serviceWorker.register("/sw-workbox.js")
			.then(function(registration){
				console.log("ServiceWorker Registered!, scope: ", registration.scope);
			}) .catch(function(error){
				console.log("ServiceWorker failed to register ._.", error);
			});

			requestPermission();
		}  


		function requestPermission(){
			if(!("Notification" in window)){
				console.error("Notifikasi tidak didukung pada browser ._.");
				}else{
					Notification.requestPermission().then(function(result){
						if(result === "denied"){
							console.log("Fitur notifikasi tidak diizinkan");
						}else if(result === "default"){
							console.error("Pengguna menutup dialog izin notifikasi");
							return;
						}

						if(("PushManager" in window)){
						navigator.serviceWorker.getRegistration().then(function(registration){
							registration.pushManager.subscribe({
								userVisibleOnly: true,
								applicationServerKey: "BGul_mKbtThe_hBvK9XM1PfAEOB7kF9K9o9IObw1D5PmSb1f6-SpcNViYUHnd3vuoFI7o1IdOiIpLVLq0zRyQ-M"
							}).then(function(subscribe){
								console.log("Subscribe Berhasil!");
								console.log("endpoint: ", subscribe.endpoint);
								console.log("p256dhKey: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
								console.log("auth key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
							}).catch(function(e){
								console.error("Tidak dapat melakukan subscribe", e.message);
							});
						});
					}

				});
			} 
		}