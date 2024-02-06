// get request - fetch json file of all the players and their elos
function search(){
    fetch("https://HannoAtomic.eu.pythonanywhere.com/faceitAPIfetch", {
        method: "GET"
    }).then((Response => Response.json())).then((json) => replace(json))
}

var newPlayerNames = [];
var newPlayerElos = [];
var newPlayerElosChange = [];
var previousPlayerElos = [];
var previousPlayerNames = [];
var currentPlayerElosList = []; 
var currentPlayerNamesList = []; 

function replace(text){
    //fetch the UL html text elements
    var currentPlayerNames = document.getElementById("nameList");
    var currentPlayerElos = document.getElementById("eloList");
    var currentPlayerEloChange = document.getElementById("changeList");

    // if a list is already present, take the names/elos and compare to new values
    if(currentPlayerElos.firstChild && currentPlayerNames.firstChild){
        listNames = currentPlayerNames.getElementsByTagName("li")
        listElos = currentPlayerElos.getElementsByTagName("li")
        nameData = [];
        eloData = [];
        for(let i=0; i< listNames.length;i++) {
            nameData.push(listNames[i].innerText);
            eloData.push(listElos[i].innerText)
          }
        previousPlayerNames = Array.from(nameData);
        previousPlayerElos = Array.from(eloData);
    }

    // clear any current list
    while(currentPlayerElos.firstChild){
        currentPlayerElos.innerHTML = "";
        currentPlayerNames.innerHTML = "";
        currentPlayerEloChange.innerHTML = "";
        newPlayerNames = [];
        newPlayerElos = [];
        newPlayerElosChange = [];
    }
    
    // go through json and push to list
    text.forEach((item) => {
        newPlayerNames.push(item[0]);
        newPlayerElos.push(item[1]);
      });

    newPlayerNames.forEach((item)=>{
        newPlayerElosChange.push("0");
    })

    // go through player names and check if they had a previous elo - if they did update the changeInElo value
    for (var i = 0; i < newPlayerNames.length; i++) {
        var nameIndex = previousPlayerNames.indexOf(newPlayerNames[i]);
        if(nameIndex > -1){
            var changeInElo = parseInt(newPlayerElos[i]) - parseInt(previousPlayerElos[nameIndex]);
            newPlayerElosChange[i] = changeInElo;
            console.log(changeInElo)
        } else {
            newPlayerElosChange[i] = "0";
        }
    }

    // go through list and create html list element for NAMES
    newPlayerNames.forEach((name) => {
        var listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(name));
        currentPlayerNames.appendChild(listElement);
    })

    // go through list and create hmtl coloured list element for ELO
    newPlayerElos.forEach((elo) => {
        var listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(elo));
        var eloInt = parseInt(elo);
        if(eloInt > 2000){
            listElement.className = "redELO";
        }else if(eloInt > 1700){
            listElement.className = "orangeELO";
        }else if(eloInt > 1100){
            listElement.className = "yellowELO";
        }else if(eloInt > 800){
            listElement.className = "greenELO";
        }else{
            listElement.className = "greyELO";
        }
        currentPlayerElos.appendChild(listElement);
    })

    //creat the list with all the new elo changes
    newPlayerElosChange.forEach((eloChange) => {
        var listElement = document.createElement("li");
        var eloChangeInt = parseInt(eloChange);
        if(eloChangeInt == 0){
            console.log("0 detected")
            eloChange = "0";
            listElement.appendChild(document.createTextNode(eloChange))
        } else if(eloChangeInt < 0){
            listElement.className = "redELO";
            listElement.appendChild(document.createTextNode(eloChange))
            console.log("loss detected")
        } else if(eloChangeInt > 0){
            listElement.className = "greenELO";
            listElement.appendChild(document.createTextNode(eloChange))
            console.log("gain detected")
        } else {
            console.log("Error in elo change")
            console.table(eloChangeInt)
        }
        currentPlayerEloChange.appendChild(listElement);
        
    })
    //chart the player elos
    chartElo();
}


function chartElo(){
    yAxisEloArray = newPlayerElos.reverse();
    xAxisNameArray = newPlayerNames.reverse();

    const barColors = "orange";

    new Chart("eloChart", {
        type: "bar",
        data: {
            labels: xAxisNameArray,
            datasets: [{
                backgroundColor: barColors,
                data: yAxisEloArray
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{
                  display: true,
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Player',
                    fontColor: "#D1D1D1"
                  },
                  ticks: {
                    fontColor: "#D1D1D1"
                  }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                      display: false
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Elo',
                      fontColor: "#D1D1D1"
                    },
                    ticks: {
                        fontColor: "#D1D1D1"
                    }
                  }]
                }
        }
    });
}