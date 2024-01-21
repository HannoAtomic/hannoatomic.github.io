//track the consecutive losses
var lostConsec = 1;
//side = 0 is CT, 1 for T
var side = 0;

function changeMoney(amount) {
	const money = document.getElementById('money').textContent;
	let raw_value = money.slice(1);
	raw_value = parseInt(raw_value) + amount;
    //consecutive losses cannot be negative
    if(amount > 0 && lostConsec > 0){
        lostConsec = lostConsec -1;
    }
	document.getElementById('money').textContent = "$" + raw_value;
	console.log("Value Changed")
}

function loss(bombPlant){
	let bonus = 0;
	if(bombPlant){
		bonus = 800;
	console.log("Bomb Exploded")
	}
	switch(lostConsec){
		case 0:
			changeMoney(1400 + bonus);
			break;
		case 1:
			changeMoney(1900 + bonus);
			break;
		case 2:
			changeMoney(2400 + bonus);
			break;
		case 3:
			changeMoney(2900 + bonus);
			break;
		case 4:
			changeMoney(3400 + bonus);
			break;
	}
    //consecutively losses cap at 4
    if(lostConsec < 4){
        lostConsec = lostConsec + 1;
    } else {
        lostConsec = 4;
    }
	console.log("Loss Registered")
}

function force(){
	document.getElementById('money').textContent = "$150";
}

function reset(){
	//set lostConsec to 1
	lostConsec = 1;
	document.getElementById('money').textContent = "$800";
	console.log("RESET")	
}

function changeSide(){
	//remove bomb addition
	//add alive counter
    //swap side coin
    console.log(document.getElementById('sideImg').src)
    if(document.getElementById('sideImg').src.indexOf( "images/ct.png" ) > 0){
        document.getElementById('sideImg').src = "images/T.png";
        document.getElementById('sideImg').alt = "T";
        console.log("CT detected, Swapping to T")
        side = 0;
        document.getElementById("lossWithPlant").disabled = false;
        document.getElementById("winCondition").textContent = "Win by Explode";
    } else {
        document.getElementById('sideImg').src = "images/ct.png";
        document.getElementById('sideImg').alt = "CT";
        console.log("T detected, Swapping to CT")
        side = 1;
        document.getElementById("lossWithPlant").disabled = true;;
        document.getElementById("winCondition").textContent = "Win by Defuse";
    }
	reset()
	console.log("SIDEFLIP RESET")
}