const api_key =  "3abd854de8ea4a918abd95700d6befa1";
const base_url = "https://api.football-data.org/v2";
const league_id = 2014;
const ep_kompetisi = `${base_url}/competitions/${league_id}/standings`; //standings
const ep_detail_tim = `${base_url}/teams`;
const ep_jadwal = `${base_url}/competitions/${league_id}/matches`; //match


const fetchAPI = url => {
  return fetch(url, {
    headers: {"X-Auth-Token": api_key}
  }).then(res => {
  	if(res.status !== 200){
  		console.log("error! " + res.status);
  		return Promise.reject(new Error(res.statusText))
  	}else{
  		return Promise.resolve(res)
  	}
  }).then(res => res.json())
    .catch(error => {
    	console.log(error);
    })
};

// request data JSON
function getAllStandings(){
	if("caches" in window){
		caches.match(ep_kompetisi)
		.then(function(response){
			if(response){
				response.json().then(function(data){
					console.log("Competition Data: " + data);
					showStanding(data);
				})
			}
		})
	}

	fetchAPI(ep_kompetisi).then(data=> {
		showStanding(data);
	}).catch(error => {
		console.log(error);
	})
}

function showStanding(data){
	let standings = "";
	let standingElm = document.getElementById("tabel-klasemen");

	data.standings[0].table.forEach(function(standing){
		standings += `
		<tr>
			<td>${standing.position}</td>
			<td>
				<a href="../tim.html?id=${standing.team.id}">
				<img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="float:left; height:25px; padding:5px;">
				<p style="margin:5px;">
					${standing.team.name}
				</p>
			</td>
			<td>${standing.playedGames}</td>
			<td>${standing.won}</td>
			<td>${standing.draw}</td>
			<td>${standing.lost}</td>
			<td>${standing.points}</td>
			<td>${standing.goalsFor}</td>
			<td>${standing.goalsAgainst}</td>
			<td>${standing.goalDifference}</td>
		</tr>`;
	});

	standingElm.innerHTML = `
	<div class="card">
		<table class="responsive-table center-align">
			<thead>
				<tr>
					<th>Posisi</th>
					<th>Tim</th>
					<th>Play</th>
					<th>Won</th>
					<th>Draw</th>
					<th>Lost</th>
					<th>Points</th>
					<th>GF</th>
					<th>GA</th>
					<th>GD</th>
				</tr>
			</thead>
			<tbody>${standings}</tbody>
		</table>
	</div>`;
}

function getAllMatches(){
	if("caches" in window){
		caches.match(ep_jadwal).then(function(response){
			if(response){
				response.json().then(function(data){
					console.log("matches: " + data);
					showMatches(data);
				})
			}
		})
	}
	fetchAPI(ep_jadwal).then(data => {
		showMatches(data);
	}).catch(error => {
		console.log(error);
	})
}

function showMatches(data){
	let match = "";
	let matchElm = document.getElementById("jadwal");

	data.matches.slice(0, 10).forEach(function(mtc){
		match += `
		<div class="card grey lighten-5 center-align" style="padding:5px;">
			<div class="blue-grey-text">
				<h5>${mtc.homeTeam.name} <span><h6>VS</h6></span> ${mtc.awayTeam.name}</h5>
			</div>
			<p>${new Date(mtc.utcDate).toLocaleString("id",
				{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p></br>
		</div>
		`;
	});

	matchElm.innerHTML = `${match}`;
}

function getTimById(){
	return new Promise(function(resolve, reject){
		var urlParams = new URLSearchParams(window.location.search);
		var idParam = urlParams.get("id");

		if("caches" in window){
			caches.match(`${ep_detail_tim}/${idParam}`).then(function(response){
				if(response){
					response.json().then(function(data){
						console.log(data);
						let timHTML = `
							<div class="card" style="padding:5px">
								<div class="card-title center-align"><b>${data.shortName}</b></div>
								<table class="striped" style="text-align:center;">
									<tbody>
										<tr>
											<td>Area</td>
											<td>:</td>
											<td><p>${data.area.name}</p></td>
										</tr>
										<tr>
											<td>Nama Lengkap</td>
											<td>:</td>
											<td><p>${data.name}</p></td>
										</tr>
										<tr>
											<td>Alamat</td>
											<td>:</td>
											<td><p>${data.address}</p></td>
										</tr>
										<tr>
											<td>Handphone</td>
											<td>:</td>
											<td><p>${data.phone}</p></td>
										</tr>
										<tr>
											<td>Website</td>
											<td>:</td>
											<td><p><a href="${data.website}">${data.website}</p></td>
										</tr>
										<tr>
											<td>Email</td>
											<td>:</td>
											<td><p>${data.email}</p></td>
										</tr>
									</tbody>
								</table>
							</div>`;
							document.getElementById("body-content-tim").innerHTML = `${timHTML}`;
							resolve(data);
				});
				}
			});
		}

		fetchAPI(`${ep_detail_tim}/${idParam}`).then(function(data){
				console.log(data);
					let timHTML = `
						<div class="card" style="padding:5px">
							<div class="card-title center-align"><b>${data.shortName}</b></div>
							<table class="striped" style="text-align:center;">
								<tbody>
									<tr>
										<td>Area</td>
										<td>:</td>
										<td><p>${data.area.name}</p></td>
									</tr>
									<tr>
										<td>Nama Lengkap</td>
										<td>:</td>
										<td><p>${data.name}</p></td>
									</tr>
									<tr>
										<td>Alamat</td>
										<td>:</td>
										<td><p>${data.address}</p></td>
									</tr>
									<tr>
										<td>Handphone</td>
										<td>:</td>
										<td><p>${data.phone}</p></td>
									</tr>
									<tr>
										<td>Website</td>
										<td>:</td>
										<td><p><a href="${data.website}">${data.website}</p></td>
									</tr>
									<tr>
										<td>Email</td>
										<td>:</td>
										<td><p>${data.email}</p></td>
									</tr>
								</tbody>
							</table>
						</div>`;
					document.getElementById("body-content-tim").innerHTML = `${timHTML}`;
					resolve(data);
				});
		
	});	
}

function getSavedTim(){
	getAll().then(function(teams){
		console.log(teams);
		let timFav = "";
		let timFavElm = document.getElementById("favorit");
		teams.forEach(function(team){
			timFav += `
			<div class="card center-align" style="padding:10px">		
				<div class="card-image">
					<img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:50px; display:inline;">
				</div>
				<div class="card-title center-align">
					<a href="../tim.html?id=${team.id}&saved=true"><b style="font-size:20px;">${team.shortName}</b></a>
				</div>
			</div>`;
		});
		timFavElm.innerHTML = `${timFav}`;
	});
}