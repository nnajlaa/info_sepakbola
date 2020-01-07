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
			store.put(team);
			return trans.complete;
		}).then(function(){
			console.log("Tim disimpan!");
			M.toast({
				html: team.shortName + " disimpan di favorit!"
			})
		}).catch(error => {
			M.toast({
				html: "[ GAGAL MENYIMPAN ] </br> " + team.shortName + " mungkin sudah di favorit :)"
			})
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
		idbPromised.then(function(db){
			var trans = db.transaction("teams", "readwrite");
			var store = trans.objectStore("teams");
			console.log(id);
			store.delete(id.id);
			return trans.complete;
		}).then(function(id){
			M.toast({
				html: "Tim dihapus dari favorit"
			})
		}).catch(error => {
			M.toast({
				html: "terjadi kesalahan dalam menghapus"
			})
			console.log(error);
		});	
}