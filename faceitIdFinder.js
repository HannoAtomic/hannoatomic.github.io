async function fetchFaceitID() {
    var faceitName = document.getElementById("faceitName").value;
    fetch("https://HannoAtomic.eu.pythonanywhere.com/faceitIdFetch/" + faceitName, {
        method: "GET"
    }).then((Response => Response.json())).then((json) => updatePage(json))
}

var faceit_id = document.getElementById("faceit_id").value;
var faceit_name = document.getElementById("faceit_nickname").value;
var faceit_country = document.getElementById("faceit_country").value;

function updatePage(faceit_information){
    console.table(faceit_information)
}