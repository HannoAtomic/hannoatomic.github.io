//const playerNames = document.getElementById('playerNames').textContent;
const playerNameList = document.getElementById("nameList");
const playerEloList = document.getElementById("eloList");


function search(){
    fetch("https://HannoAtomic.eu.pythonanywhere.com/faceitAPIfetch", {
        method: "GET"
    }).then((Response => Response.json())).then((json) => replace(json))
}

var playerNamesList = [];
var playerElosList = [];

function replace(text){
    while(playerEloList.firstChild){
        playerEloList.innerHTML = "";
        playerNameList.innerHTML = "";
        var playerNamesList = [];
        var playerElosList = [];
    }
    
    text.forEach((item) => {
        playerNamesList.push(item[0]);
        playerElosList.push(item[1]);
      });


    playerNamesList.forEach((name) => {
        var listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(name));
        playerNameList.appendChild(listElement);
    })

    playerElosList.forEach((elo) => {
        var listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(elo));
        eloInt = parseInt(elo);
        console.log(eloInt)
        if(eloInt > 2000){
            listElement.className = "redELO";
            console.log("red elo detected");
        }else if(eloInt > 1700){
            listElement.className = "orangeELO";
            console.log("orange elo detected");
        }else if(eloInt > 1100){
            listElement.className = "yellowELO";
            console.log("yellow elo detected");
        }else if(eloInt > 800){
            listElement.className = "greenELO";
            console.log("green elo detected");
        }else{
            listElement.className = "greyELO";
            console.log("grey elo detected");
        }
        playerEloList.appendChild(listElement);
    })

}