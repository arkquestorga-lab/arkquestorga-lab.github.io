var ticker = [];
var team = [];
var personal = [];
var score = [];
var challenge = [];
//var cNames = ["unbekannt","unbekannt","unbekannt","unbekannt","unbekannt","unbekannt","unbekannt","unbekannt","unbekannt"];
var cNames = ["Goo Gun", "Bison Race", "Xiphactinus Akrobatik", "Speerwerfen", "Karki Zielwurf", "Master Yi", "Jump and Run 1", "Jump and Run 2", "Jump and Run 3", "Castle Collect", "Manta Collect", "Cosmo Swing", "Stopwatch", "Kaizo Ark", "Wave of Teeth"];
var challengePoints = [3,3,3,3,3,3,3,3,3,3,3,3,3,5,0];
var wNames = ["Tagebuch", "Hauskatze", "Pack Opener", "Otter Sammler", "Boss Rush", "Schönbau"];
var weeklyMax = [21, 140, 18, 60, 30, 40];
var nNames = ["Ringko", "Chava", "John", "Henry", "Kor", "Nerva"];
var redNPC = [0,0,0,0,0,0];
var greenNPC = [0,0,0,0,0,0];
var blueNPC = [0,0,0,0,0,0];
const idLookup = new Map([
  ["66f852d6-4824-415a-b9bf-8e0d2c445568", 0],  ["c13c474e-f1f2-4020-9bdc-6df6dc4b3a1f", 1],  ["0aed75af-2757-49c2-a5c8-03d27be0ee00", 2],  ["ff99b65f-112e-4774-b3c9-4e9063a520b0", 3],  ["f95db9a6-981f-4775-afbf-47085b515045", 4],
  ["ca7dad2d-8ad1-439d-a42d-683f0bb1c8ff", 5],  ["be0e6603-29f0-4653-a5ff-c92b17c2f56f", 6],  ["4ffe0d1e-925e-4612-a0c7-3f888f1f0885", 7],  ["af1f9448-b626-4708-8e91-6968f7bc17db", 8],  ["eb9e293c-6636-4c76-8251-bff7a7d12b7e", 9],
  ["198a6fd8-fbe9-4902-ae3e-b435243c48b1", 10],  ["09bfc29e-ede5-4041-b0e8-76f00baa8cb2", 11],  ["36854962-4244-4803-8103-42afe6a5a297", 12],  ["5f9d23c5-bcbf-4404-b6f5-8a64216b4bef", 13],  ["b106e18f-1d2c-43a3-8e9b-649ab526174c", 14],
  ["216a92e3-c42b-4554-bfae-cd32b8227b0a", 15],  ["775487cc-ef8d-4853-ada0-54fb3a899484", 16],  ["2b845a47-53ca-41b5-a003-5bc18a3c6fec", 17],  ["027832ef-2238-4e66-ae47-c292fa7f4c04", 18],  ["497a04fd-b3a6-4e37-a466-320fadbc8249", 19],
  ["86336a97-1c47-4c73-9a07-8d3277fa9b1f", 20],  ["36baf411-655e-4476-a188-f5ca231d15c5", 21],  ["6bb7fa24-087f-402d-9f36-8e494526df20", 22],  ["2ad0c5af-f18f-4369-bb6f-d50f99646047", 23],  ["b3cfde70-0556-4491-83c0-553b0cc3a82e", 24],
  ["2afca794-7968-4bc1-97c4-25b0906066de", 25],  ["7c1e1c4c-f33e-4489-9ff7-8d3c591dabae", 26], ["0453bae3-b25b-4c81-bbe1-f6875c580e84", 27],  ["8155a2b0-4b8f-4cf6-ae33-d30c44c81efd", 28],  ["252d09cb-29c5-4278-baf1-2e6a7085a826", 29],
  ["9ebab010-184a-408b-9af4-84edb9a144c5", 30],  ["cca2232d-22af-4b2f-95f0-ccbf6ed48b74", 31],  ["4159f7d8-8232-4276-a44f-1004c310281c", 32]
]);

//max points 20/Challenge 10/Record 250 NPC ?Weekly
// TODO initialize var max with artificial first place points of Wave of Teeth
var max = [0, 0, 0, 0, 0];
const recordValue = 6;
const secondValue = 3;
const highestWaveBonus = 20;
const secondHighestWaveBonus = 10;


function fillTicker(tickerId) {
	console.log("attempt filling ticker");
	fetch("https://arkquest.me/api/public/ticker")
	//fetch("./data/ticker.json")
		.then(response => response.json())
		.then(data => {
			for (const event of data) {
				ticker[event.ID] = event;
			}
			console.log(ticker);
			const box = document.getElementById(tickerId);
			box.innerHTML = "";
			for (let i = 0; i < ticker.length; i++) {
				let messageA = "+++ ";
				let messageB = "";
				switch (ticker[i].Type) {
					case "Rekord":
						messageA += "Rekord: " + ticker[i].Event + " +++";
						messageB += ticker[i].Player + " - " + ticker[i].Score;
						break;
					case "NPC":
						messageA += "NPC beendet: " + ticker[i].Event + " +++";
						messageB += ticker[i].Player + " hat die letzte Quest geschafft";
						break;
					case "Orga":
						messageA += "Orga News +++";
						messageB += ticker[i].Score;
						break;
					default:
						messageA = "well... this is akward...";
						messageB = "there is some wrong data here...";
				}
				let entry = "<div class=\"boxInABoxTicker ";
        switch(ticker[i].Team){
          case 'Team Rot':
            entry += "red";
            break;
          case 'Team Gr\u00FCn':
            entry += "green";
            break;
          case 'Team Blau':
            entry += "blue";
            break;
          default:
            entry += "admins";
        }
        entry += "Hue\">" +
					"<div class=\"infoboxContentTicker\">" + messageA + "</div>" +
					"<div class=\"infoboxContentTicker\">" + messageB + "</div></div>";
				console.log(entry);
				box.innerHTML = entry + box.innerHTML;
			}
		})
		.catch(error => console.error('Fehler beim Abrufen der Punkte:', error));
}

async function fillTeam() {
	console.log("attempt filling Teams");
	const response = await fetch("./data/player.json")
		.then(response => response.json())
		.then(data => {
			for (const player of data) {
				team[player.ID] = [player];
			}
      })
		.catch(error => console.error('Fehler beim Abrufen der Punkte:', error));
      // TODO den Bums von API auf player überschreiben
      // const response2 = await fetch("./data/playerupdate.json")
      const response2 = await fetch("https://arkquest.me/api/public/players")
		    .then(response2 => response2.json())
		    .then(data => {
			  for (const player of data) {
          let id = idLookup.get(player.Name);
          if(id != undefined){
            team[id][0].Live = player.Live;
            team[id][0].Times = player.Times;
            team[id][0].Rankings = player.Rankings;
            team[id][0].Npcs = player.Npcs; 
          }
			  }
			//DEBUG: console.log(team);
			var onlineRed = "";
			var onlineGreen = "";
			var onlineBlue = "";
			var offlineRed = "";
			var offlineGreen = "";
			var offlineBlue = "";
			var captainRed = "";
			var captainGreen = "";
			var captainBlue = "";
			var playerRed = "";
			var playerGreen = "";
			var playerBlue = "";
			var bigPortraits = "";
			bigPortraits.innerHTML = "";
			for (let i = 0; i < team.length; i++) {
				//add player from list of all players
				var entry = "<div class=\"flexPlayer clickable\" style=\"background-image: url(https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/" + team[i][0].Team +
					"PlayerBox.png)\")><div class=\"playerImg\"><img alt=\"" + team[i][0].Name +
					" Logo\" style=\"border-radius: 50%; width: 44px; height: 44px;\" src=\"" +
					team[i][0].Icon + "\"></div><div class=\"playerName ";
				entry += "\"><div onclick=\"openDetails('portraitBig" + team[i][0].Name + "')\">" + team[i][0].Name + "</div></div><div class=\"";
				//is player live? add indicator
				if (team[i][0].Live) {
					entry += "onlineIndicator\" onclick=window.open(\"https://www.twitch.tv/" +
						team[i][0].Link + "\")><div>" +
						"<img alt=\"live\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/liveIcon.png\" width=45px; height 23px; style=\"float: left; margin-right: 10px;\">" +
						"<img alt=\"link\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/linkIcon.png\" width=16px; height 16px;>" +
						"</div></div></div>";
				} else {
					entry += "offlineIndicator\" onclick=window.open(\"https://www.twitch.tv/" +
						team[i][0].Link + "\")><div>" +
						"<img alt=\"live\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/liveIcon.png\" width=45px; height 23px; style=\"filter: grayscale(100%); float: left; margin-right: 10px;\">" +
						"<img alt=\"link\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/linkIcon.png\" width=16px; height 16px;>" +
						"</div></div></div>";
				}
				//DEBUGG: console.log(entry);
				//switch Team -> Live? -> Captain? to position in the ranking
				switch (team[i][0].Team) {
					case "red":
						if (team[i][0].Live) {
							team[i][0].Captain ? onlineRed = entry + onlineRed : onlineRed += entry;
						} else {
							team[i][0].Captain ? offlineRed = entry + offlineRed : offlineRed += entry;
						}
						break;
					case "green":
						if (team[i][0].Live) {
							team[i][0].Captain ? onlineGreen = entry + onlineGreen : onlineGreen += entry;
						} else {
							team[i][0].Captain ? offlineGreen = entry + offlineGreen : offlineGreen += entry;
						}
						break;
					case "blue":
						if (team[i][0].Live) {
							team[i][0].Captain ? onlineBlue = entry + onlineBlue : onlineBlue += entry;
						} else {
							team[i][0].Captain ? offlineBlue = entry + offlineBlue : offlineBlue += entry;
						}
						break;
					default:
						//DEBUG
						console.log("there was an Upsi");
				}
				//TODO add small portraits to portraits section
				//prepare small portrait
				var small = "<div class=\"portrait clickable\" onclick=\"openDetails('portraitBig" + team[i][0].Name + "')\">" +
					"<div class=\"innerPortrait\">" +
					"<img alt=\"Portrait \"" + team[i][0].Name + "\" src=\"" + team[i][0].Portrait + "\" width=100% height=100%>" +
					"</div>" +
					"<div class=\"portraitNameplate\">" +
					"<span class=\"nameplateStyle\">";
				team[i][0].Captain ? small += "Captain " : small += "";
				small += team[i][0].Name + "</span></div></div>";
				//TODO add big portraits to portraitsBig section
				//add section with display none
				var big = "<div id=\"portraitBig" + team[i][0].Name + "\" class=\"bigShell\">" +
					"<div class=\"closeLayer clickable\"onclick=\"closeDetails('portraitBig" + team[i][0].Name + "')\"></div>" +
					"<div class=\"innerShell\"style=\"background-image: url(https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/portraitBG" + team[i][0].Team + ".png); background-size: 100% 100%;\">" +
					"<div class=\"innerShellName\">" + team[i][0].Name + "</div>" +
					"<img class=\"innerShellImg\" alt=\"Portrait \"" + team[i][0].Name + "\" src=\"" + team[i][0].Portrait + "\">";
				// possibly change the BG Color or switch up the Styles per Team
				big += "<div class=\"innerShellInfo\">" +
					"<div style=\"width: 7%; margin-left: 10px;\">" +
					"<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconTwitch.png\" class=\"clickable\" style=\"margin-bottom: 3px; margin-top: 10px\" width=24px height=30px onclick=\"window.open(\'https://www.twitch.tv/" + team[i][0].Link + "\')\">";
				if (team[i][0].Socials[0] != "None") {
					big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconYoutube.png\" class=\"clickable\" style=\"margin-bottom: 4px\" width=28px height=19px onclick=\"window.open(\'" + team[i][0].Socials[0] + "\')\">";
				} else {
					big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconYoutube.png\" style=\"margin-bottom: 4px; filter: grayscale(100%) opacity(25%)\" width=28px height=19px>";
				}
				if (team[i][0].Socials[1] != "None") {
					big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconInstagram.png\" class=\"clickable\" style=\"margin-bottom: 4px\" width=24px height=24px onclick=\"window.open(\'" + team[i][0].Socials[1] + "\')\">";
				} else {
					big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconInstagram.png\" style=\"margin-bottom: 4px; filter: grayscale(100%) opacity(25%);\" width=24px height=24px>";
				}
				if (team[i][0].Socials[2] != "None") {
					big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconTwitter.png\" class=\"clickable\" width=26px height=24px onclick=\"window.open(\'" + team[i][0].Socials[2] + "\')\">";
				} else {
					if (team[i][0].Socials[3] != "None") {
						big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconTiktok.png\" class=\"clickable\" width=24px height=24px onclick=\"window.open(\'" + team[i][0].Socials[3] + "\')\">";
					} else {
						big += "<img alt=\"\" src=\"https://cdn.glitch.global/6124399f-029d-40e4-81c6-ce140bce2f4d/iconTiktok.png\" style=\"filter: grayscale(100%) opacity(25%);\" width=24px height=24px>";
					}
				}
				big += "</div>" +
					"<div style=\"width: 85%; margin-left: 16px;\">" +
					"<div style=\"width: 85%; text-align: center; font-size: 15px; padding-top: 5px;\">PLAYER INFO</div>" +
					"<div style=\"width: 100%; text-align: left; font-size: 15px; margin-top: 10px;\">" + team[i][0].Info + "</div>" +
					"</div></div>";
				// possibly change the BG Color or switch up the Styles per Team
				big += "<div class=\"innerShellProgress\">";
				//textbox challenges
				big += "<div class=\"innerShellProgressFull\"style=\"padding-top: 5px;\">QUESTS</div>";
				// TODO remove * to enable progress logging
				//for loop challenges
				big += "<div class=\"innerShellProgressFull\"style=\"text-align: left; margin-left: 10px;\">Challenges</div>";
				// CHANGE FOR QUEST 3 count to second last challenge
				for (let j = 0; j < team[i][0].Rankings.length-1; j++) {
					big += "<div class=\"innerShellProgressHalf\">";
					switch (team[i][0].Rankings[j]) {
						case 1:
							big += "<span class=\"record\">&starf;</span> " + cNames[j] + " - " + team[i][0].Times[j];
							break;
						case 2:
							big += "<span class=\"second\">&starf;</span> " + cNames[j] + " - " + team[i][0].Times[j];
							break;
						case 99:
							big += cNames[j] + " kein Run";
							break;
						default:
							big += team[i][0].Rankings[j] + ". " + cNames[j] + "-" + team[i][0].Times[j];
	
					}
					big += "</div>";
				}
				let wot = team[i][0].Rankings.length-1;
				(team[i][0].Times[wot] != "None") ? big += "<div class=\"innerShellProgressHalf\">Welle "+team[i][0].Times[wot]+" besiegt</div>" : big += "<div class=\"innerShellProgressHalf\">Keine Welle besiegt</div>";
				//textboxnpc
				big += "<div class=\"innerShellProgressFull\"style=\"text-align: left; margin-left: 10px;\">NPCs</div>";
				//for loop npc
				for (let j = 0; j < team[i][0].Npcs.length; j++) {
					big += "<div class=\"innerShellProgressThird\">";
          console.log(team[i][0].Name+" NPC "+j+" : "+team[i][0].Npcs[j]);
					switch (team[i][0].Npcs[j]) {
						case 0:
							big += "unbekannt";
							break;
						case 1:
							big += nNames[j] + " gefunden";
							break;
						case 2:
              console.log("add 1 to NPC "+j);
							big += nNames[j] + " abgeschlossen";
              switch(team[i][0].Team){
                case "red":
                  redNPC[j] += 1;
                  console.log(redNPC)
                  break;
                case "green":
                  greenNPC[j] += 1;
                  console.log(greenNPC)
                  break;
                case "blue":
                  blueNPC[j] += 1;
                  console.log(blueNPC)
                  break;
              }
							break;
						default:
							big += "HOW TF YOU DID THIS?";
					}
					big += "</div>";
				}
				/**/
				big += "</div></div></div></div>";
				bigPortraits += big;
				//captain? -> add to captainColor OR playerColor AND add to bigPortraits
				switch (team[i][0].Team) {
					case "red":
						if (team[i][0].Captain == true) {
							captainRed += small;
						} else {
							playerRed += small;
						}
						break;
					case "green":
						if (team[i][0].Captain == true) {
							captainGreen += small;
						} else {
							playerGreen += small;
						} break;
					case "blue":
						if (team[i][0].Captain == true) {
							captainBlue += small;
						} else {
							playerBlue += small;
						} break;
					default:
				}
			}
			document.getElementById("portraitsBig").innerHTML = bigPortraits;
			document.getElementById("red").innerHTML += onlineRed + offlineRed;
			document.getElementById("green").innerHTML += onlineGreen + offlineGreen;
			document.getElementById("blue").innerHTML += onlineBlue + offlineBlue;
		})
		.catch(error => console.error('Fehler beim Abrufen der Punkte:', error));
    console.log("end of filling Teams");
    fillScore();
}

async function fillScore() {
  console.log("attempt filling score from local json");
	const response = await fetch("./data/score.json")
		.then(response => response.json())
		.then(data => {
      console.log(data);
			for (const points of data) {
				score[points.ID] = [points];
			}
      console.log(score);
    })
  .catch(error => console.error('Fehler beim Abrufen der Punkte:', error));
      console.log("attempt filling api score");
      fetch("https://arkquest.me/api/public/scores")
      //fetch("./data/score.json")
        .then(response => response.json())
        .then(data => {
          console.log("data2: " + data);
          for (const points of data) {
				    score[points.ID][0].Score = points.Score;
            console.log("new Score: "+points.Score);
            score[points.ID][0].Challenges = points.Challenges;
            score[points.ID][0].Records = points.Records;
            score[points.ID][0].Npcs = points.Npcs;
            score[points.ID][0].ShowWeekly = points.ShowWeekly;
            score[points.ID][0].Weekly = points.Weekly;
			    }   
      console.log("nach url fetch ist score");
      console.log(score);
      		// abort on second to last entry because "Wave of Teeth" is calculated differently
			for (let i = 0; i < score[0][0].Challenges.length-1; i++) {
				//get max Challenge Points
				max[0] += 5 * challengePoints[i];
				max[1] += recordValue+secondValue;
			}
			max[2] = score[0][0].Npcs[1];
			for (let i = 0; i < score[0][0].Weekly.length; i++) {
				//get max Weekly Points
				max[3] += weeklyMax[i];
			}
			max[4] = max[0] + max[1] + max[2];
			if (score[0][0].ShowWeekly == true)
				max[4] += max[3];
			//fill each score section
			for (let i = 0; i < score.length; i++) {
				//set score in scorebox
				let scoreDiv = document.getElementById(score[i][0].Team + "Score");
				scoreDiv.innerHTML = score[i][0].Score;

				//empty variables
				let detailDiv = document.getElementById(score[i][0].Team + "ScoreDetail");
				let block = "";
				let cPoints = 0;
				let rPoints = 0;
				let nPoints = score[i][0].Npcs[0];
				let wPoints = 0;
				//basic shell of points display
				let blockTop = "<div class=\"flexScore ";
				switch (score[i][0].Team) {
					case "red":
						blockTop += "teamRedPlayer";
						break;
					case "green":
						blockTop += "teamGreenPlayer";
						break;
					case "blue":
						blockTop += "teamBluePlayer";
						break;
				}
				blockTop += "\">";
				let blockBot = "</div>";
				//fill challenges
				// changed to "length-1" because of "Wave of Teeth"
				for (let j = 0; j < score[i][0].Challenges.length-1; j++) {
					//skip challenge entry if no run was made
					//if (score[i][0].Challenges[j] != 0) {
					//open challenge
					let entry = "<div class=\"flexThird\">";
					//add name
					entry += "<div class=\"textBar\">"+cNames[j]+"</div>";
					// TEMP DISABLE for Season 3, trying out spoiler on every challenge name this iteration
					/*
          			if(score[i][0].Challenges[j] > 0) {
              			entry += cNames[j] + "</div>";
          			} else {
              			entry += "Challenge "+ (j+1) + "</div>";
          			}
          			*/
					//add gray bar
					entry += "<div class=\"grayBar\"></div>";
					//add red bar
					entry += "<div class=\"redBar\" style=\"width:" + (20 * score[i][0].Challenges[j]) + "%;\"></div>";
					//add challenge name, progress, record and points
					//calc points
					let temp = score[i][0].Challenges[j] * challengePoints[j];
					cPoints += temp;
					//add progress
					let message = " Punkte (" + score[i][0].Challenges[j] + "/5) ";
					//add record? record currently increases shwon points
					if (score[i][0].Records[(2 * j)] == true) {
						rPoints += recordValue;
						temp += recordValue;
						message += "<span class=\"record\">&starf;</span>";
					} else {
						message += "<span class=\"noRecord\">&star;</span>";
					}
					if (score[i][0].Records[(2 * j) + 1] == true) {
						rPoints += secondValue;
						temp += secondValue;
						message += "<span class=\"second\">&starf;</span>";
					} else {
						message += "<span class=\"noRecord\">&star;</span>";
					}
					message = temp + message;
					entry += "<div class=\"textBar\">" + message + "</div>";
					//close challenge
					entry += "</div>";
					block += entry;
					//
				}
				//TODO add challenge 15 seperately
				let wot = score[i][0].Challenges.length-1;
				let entry = "<div class=\"flexThird\">";
					//add name
					entry += "<div class=\"textBar\">"+cNames[wot]+"</div>";
					entry += "<div class=\"grayBar\"></div>";
					//add red bar
					max[1] += 20;
					entry += "<div class=\"redBar\" style=\"width:" + (1 * score[i][0].Challenges[wot]) + "%;\"></div>";
					//add challenge name, progress, record and points
					//no calc points needed, points only come from placement in relation to the other teams
					let temp = 0;
					//add progress
					let message = "Welle "+score[i][0].Challenges[wot]+" besiegt";
					//add record? record currently increases shwon points
					if (score[i][0].Records[(2 * wot)] == true) {
						rPoints += highestWaveBonus;
						temp += highestWaveBonus;
						message += "<span class=\"record\">&starf;</span>";
					} else {
						message += "<span class=\"noRecord\">&star;</span>";
					}
					if (score[i][0].Records[(2 * wot) + 1] == true) {
						rPoints += secondHighestWaveBonus;
						temp += secondHighestWaveBonus;
						message += "<span class=\"second\">&starf;</span>";
					} else {
						message += "<span class=\"noRecord\">&star;</span>";
					}
					entry += "<div class=\"textBar\">" + message + "</div>";
					//close challenge
					entry += "</div>";
					block += entry;
				//END OF TODO
				//add text "CHALLENGES"
				block = "<div class=\"titleBar\">Challenges (" + (cPoints + rPoints) + "/" + (max[0] + max[1]) + ")</div>" + block;
				//add Title NPC
				block += "<div class=\"titleBar\">NPC (" + score[i][0].Npcs[0] + "/" + score[i][0].Npcs[1] + ")</div>";
				//open progress NPC
				block += "<div class=\"flexFull\">";
				//add gray bar
				block += "<div class=\"grayBar\"></div>";
				//add green bar
				block += "<div class=\"greenBar\" style=\"width:" + (100 * score[i][0].Npcs[0] / score[i][0].Npcs[1]) + "%;\"></div>";
				// TODO NPCs nach Stand eintragen
				block += "<div class=\"textBar\">";
        for (let k = 0; k < 6; k++){
          	switch(score[i][0].Team){
          	//
          		//
          			// TODO sind alle NPCs mit 5 Abschlüssen für Max Punkte geplant?
          		//
          	//
            	case "red":
                	if(redNPC[k] >= 5) block += nNames[k] + " &#10003; ";
              		break;
            	case "green":
              		if(greenNPC[k] >= 5) block += nNames[k] + " &#10003; ";            
              		break;
            	case "blue":
              		if(blueNPC[k] >= 5) block += nNames[k] + " &#10003; ";            
              		break;
              	default:
              		console.log("what team is dis?");
          	}
        }
        block += "</div>";
		//close progress NPC
		block += "</div>";
		//add weekly?
		let tempBlock = "";
		if (score[i][0].ShowWeekly == true) {
			for (let j = 0; j < score[i][0].Weekly.length; j++) {
				//open challenge
				let entry = "<div class=\"flexThird\">";
				//add name
				entry += "<div class=\"textBar\">" + wNames[j] + "</div>";
				//add gray bar
				entry += "<div class=\"grayBar\"></div>";
				//add cyan bar
				entry += "<div class=\"cyanBar\" style=\"width:" + (100 * score[i][0].Weekly[j] / weeklyMax[j]) + "%;\"></div>";
				//add challenge name, progress, record and points
				//calc points
				wPoints += score[i][0].Weekly[j];
				//add progress
				entry += "<div class=\"textBar\">" + score[i][0].Weekly[j] + " Punkte</div>";
				//close challenge
				entry += "</div>";
				tempBlock += entry;
			}
		} else {
			//add full width text "to be determined"
			tempBlock += "<div class=\"flexFull\"><div class=\"textBar\">Auswertung offen</div></div>";
		}
		//add Title WEEKLY
		block += "<div class=\"titleBar\">Weekly (" + wPoints + "/" + max[3] + ")</div>";
		block += tempBlock;
		//build full Score Overview
		let allScore = "<div class=\"flexFull\"><div class=\"titleBar\" style=\"margin-bottom: 5px;\">Gesamtpunktzahl</div>";
		allScore += "<div class=\"grayBigBar\"></div>";
		let offset = 0;
		let width = 100 * (cPoints + rPoints) / (max[0] + max[1]) * (max[0] + max[1]) / max[4];
		//					console.log(width);
		allScore += "<div class=\"redBigBar\" style=\"margin-left: " + offset + "%; width:" + width + "%\"></div>";
		offset += width;
		//width = 90 * rPoints / max[1] * max[1] / max[4];
		//					console.log(width);
		//allScore += "<div class=\"yellowBigBar\" style=\"margin-left: " + offset + "%; width:" + width + "%\"></div>";
		//offset += width;
		width = 100 * nPoints / max[2] * max[2] / max[4];
		//					console.log(width);
		allScore += "<div class=\"";
		if (score[i][0].ShowWeekly == true) {
			allScore += "greenBigBar";
		} else {
			allScore += "greenBigRoundBar";
		}
		allScore += "\" style=\"margin-left: " + offset + "%; width:" + width + "%\"></div>";
		offset += width;
		width = 100 * wPoints / max[3] * max[3] / max[4];
		//					console.log(width);
		allScore += "<div class=\"cyanBigBar\" style=\"margin-left: " + offset + "%; width:" + width + "%\"></div></div>";
		//add all Score on top of block
		block = allScore + block;
		//insert content into website
		detailDiv.innerHTML = blockTop + block + blockBot;
		}
		console.log(score);
        console.log(redNPC);
        console.log(greenNPC);
        console.log(blueNPC);
		})
		.catch(error => console.error('Fehler beim Abrufen der Punkte:', error));
}

function fillChallenge() {
	console.log("attempt filling challenges");
  	fetch("https://arkquest.me/api/public/rankings")
  	//fetch("./data/rankingupdate.json")
	//fetch("./data/ranking.json")
		.then(response => response.json())
		.then(data => {
			for (const event of data) {
				challenge[event.ID] = [event];
			}
			console.log(challenge);
			for (let i = 0; i < challenge.length; i++) {
				let leaderboard = document.getElementById("tickerRekordChallenge" + (i + 1));
				for (let j = 0; j < challenge[i][0].Players.length; j++) {
          			let front = "";
					let rank = "";
					switch (j) {
						case 0:
							rank = "<span class=\"record\">&starf; </span>";
							break;
						case 1:
							rank = "<span class=\"second\">&starf; </span>";
							break;
						default:
							rank = (j + 1) + ". ";
					}
					let run = "";
					if (challenge[i][0].Runs[j] === 'None') {
						run = "\">";
					} else {
						run = " clickable\" onclick=window.open(\"" +
							challenge[i][0].Runs[j] + "\")>";
					}
					front += "<div class=\"boxInABoxTickerSmall ";
          			switch(challenge[i][0].Teams[j]){
          				case "Team Rot":
            				front += "red";
            			break;
          				case "Team Gr\u00FCn":
            				front += "green";
            			break;
          				case "Team Blau":
            				front += "blue";
            			break;
          				default:
            				front += "admins";
          			}
          			leaderboard.innerHTML += front +"Hue" + run + "<div class=\"infoboxContentLeaderboard\">" + rank + challenge[i][0].Players[j] + " - " + challenge[i][0].Times[j] + "</div></div>";
				}
				console.log(leaderboard.innerHTML);
			}
		})
		.catch(error => console.error('Fehler beim Abrufen der Punkte:', error));
}

function setText(i) {
	let text = document.getElementById('sectionNText');
	let image = document.getElementById('sectionNImage');
	switch (i) {
		case 1:
			text.innerHTML = "Text NPC 1";
			image.innerHTML = "<img src=\"NPC1.png\" style=\"width: 100%; height: 100%;\">";
			break;
		case 2:
			text.innerHTML = "John ist ein amerikanischer Ureinwohner aus dem 19. Jahrhundert, durch seinen Stamm hat er gelernt das Hilfsbereitschaft und Zusammenhalt das Wichtigste ist. Um diese Werte an andere Zeitreisende weiterzugeben, versucht er eine Grundversorgung bereit zu stellen.";
			image.innerHTML = "<img src=\"NPC1.png\" style=\"width: 100%; height: 100%;\">";
			break;
		case 3:
			text.innerHTML = "Kor der Prophet oder wie er sich selbst gerne nennt \"der Dino-Flüsterer\" ist aus den längst vergangenen Zeiten der Dinos daher auch seine Affinität zu diesen majestätischen Wesen und diese möchte er an euch weitergeben.";
			image.innerHTML = "<img src=\"NPC1.png\" style=\"width: 100%; height: 100%;\">";
			break;
		case 4:
			text.innerHTML = "Chava ist eine Heilerin die ihr gesamtes Leben darauf ausgerichtet hat so vielen Lebewesen zu helfen wie möglich. Genau aus diesem Grund versucht sie aus allen verfügbaren Mitteln die beste Arznei zu machen.";
			image.innerHTML = "<img src=\"NPC1.png\" style=\"width: 100%; height: 100%;\">";
			break;
		case 5:
			text.innerHTML = "Henry ist ein wiederkehrender Abenteurer, der für den Nervenkitzel die größte Herausforderung sucht. Diese Erfahrung möchte er ein weiteres Mal teilen, weshalb er die Spieler auf waghalsige Missionen schickt.";
			image.innerHTML = "<img src=\"NPC1.png\" style=\"width: 100%; height: 100%;\">";
			break;
		case 6:
			text.innerHTML = "Gaius Marcellus Nerva ist ein römischer Zenturio, der, nachdem er ein Pantheon auf Abberation errichten ließ, nun eine göttliche Elite Truppe aufbaut. Für welchen Gott? Für sich selbst! Ist er mit euren Rekruten zufrieden wird er sich auch erkenntlich zeigen.";
			image.innerHTML = "<img src=\"NPC1.png\" style=\"width: 100%; height: 100%;\">";
			break;
		default:
			text.innerHTML = "Coming Soon...";
	}
}