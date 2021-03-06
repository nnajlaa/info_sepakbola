var idbPromised = idb.open("info-sepakbola", 1, function(upgradeDb){
	if(!upgradeDb.objectStoreNames.contains("teams")){
		var infosbolObjectStore = upgradeDb.createObjectStore("teams", {
			keyPath: "id"
		});
		infosbolObjectStore.createIndex("shortName", "shortName", {unique: false});
	}
});

function simpanTim(team){
	idbPromised.then(function(db){
			var trans = db.transaction("teams", "readwrite");
			var store = trans.objectStore("teams");
			console.log(team);
			store.add(team);
			return trans.complete;
		}).then(function(){
			console.log("Tim disimpan!");
		});
}

function getAll(){
	return new Promise(function(resolve, reject){
		idbPromised.then(function(db){
			var trans = db.transaction("teams", "readonly");
			var store = trans.objectStore("teams");
			return store.getAll();
		}).then(function(team){
			resolve(team);
		});
	});
}

function hapusTim(id){
	return new Promise(function(resolve, reject){
		idbPromised.then(function(db){
			var trans = db.transaction("teams", "readwrite");
			var store = trans.objectStore("teams");
			console.log(id);
			let id = { id: id}
			store.delete(id);
			return trans.complete;
		}).then(function(id){
			if(id != undefined){
				resolve(id);
			}else{
				reject(id);
			}
		});
	});
	
}