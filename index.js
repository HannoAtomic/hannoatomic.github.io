var lostConsec = 1;

function changeMoney(amount) {
	const money = document.getElementById('money').textContent;
	let raw_value = money.slice(1);
	raw_value = parseInt(raw_value) + amount;
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
	console.log("Loss Registered")
}

function force(){
	const money = document.getElementById('money').textContent;
	let raw_value = money.slice(1);
	if parseInt(raw_value)
	console.log("Force Registered")	
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
	reset()
	console.log("SIDEFLIP RESET")
}