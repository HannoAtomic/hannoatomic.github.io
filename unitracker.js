//const playerNames = document.getElementById('playerNames').textContent;
const playerNameList = document.getElementById("nameList");
const playerEloList = document.getElementById("eloList");


function search(){
    fetch("http://HannoAtomic.eu.pythonanywhere.com/faceitAPIfetch", {
        method: "GET"
    }).then((Response => Response.json())).then((json) => replace(json))
}

var playerNamesList = [];
var playerElosList = [];

function replace(text){
    console.log("replace text")
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
        playerEloList.appendChild(listElement);
    })

}