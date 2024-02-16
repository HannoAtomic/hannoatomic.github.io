async function fetchFaceitID() {
    var faceitName = document.getElementById("faceitName").value;
    fetch("https://HannoAtomic.eu.pythonanywhere.com/faceitIdFetch/" + faceitName, {
        method: "GET"
    }).then((Response => Response.json())).then((json) => updatePage(json))
}

var displayID = document.getElementById("faceit_id");

function updatePage(faceit_information){
    console.table(faceit_information)
    displayID.textContent = faceit_information;
}