//JavaScript Document
//clicking
let popsicleStand_amount = 0
let popsicleStandClicks =  0
let popsicleStandUpgradeCost =  1246
let popsicleStandCPS = 0
let AllTowerClicksDecimal = 0
let dog_amount = 0
let dogClicks =  0
let dogUpgradeCost =  156
let dogCPS = 0
let Clicks = 0
let SunClicks = 0
let Suns = 0
let PopsicleLevel = 1
let SeaGullLevel = 1
let maxPopsicleLevel = 3
let SeaGulls = 0
//SunClicks and clicks combined
let AllClicks = 0
let SeaGullClicks = 0
let AllTowerClicks = 0
let heightMultiplier = 10
let level = 5
let levelUp = 0
let hue = 0
let pointsPerPopsicle = 1
//points per popsicle upgrade cost
let PopsicleUpgradeCost = 150
//clicks per second upgrade cost
let SunUpgradeCost = 2
let SeaGullUpgradeCost = 20
//total popsicles accumulated in all time
let popsicles = 0
//total amount of popsicles spent
let popsiclesSpent = 0
//total amount of popsicles
let popsicleNumber = 0
let sun_amount = 0
var showingUpgrades =  false	
let Name = "Change Name Here"
var userInput = document.getElementById("newName").value;
let showingSettings = false
let biggerWingsUpgradeCost = 200

//CPS
let SunCPS = 0
let SeaGullCPS = 0

//frame resize
let height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"

//game loop
let l = undefined

//webworker var (background loop)
var w;

//runs game loop
function startGameLoop(){
	l = setInterval(gameLoop, 16)
}

//runs background loop
function startWebworker(){
	w = new Worker("Scripts/BackgroundLoop.js");
}

//stops game loop
function stopGameLoop(){
	clearInterval(l)
	l = null
}

//stops background loop
function stopWebWorker(){
	w.terminate();
	w = undefined;
}

//start loops
startGameLoop();
startWebworker();

//load saved data
loadGame();

//hide shop on start
document.getElementById("UpgradesDiv").style.visibility = "hidden"
document.getElementById("SettingsDiv").style.visibility = "hidden"

function resize() 
{
	height = (heightMultiplier / 10) * 0.63 * window.innerHeight + "px"

	//apply height vars
	document.getElementById("PopsicleTop").style.setProperty('--height', height)
}

function popsiclePopup(){	
	var img = document.createElement('img');
	img.id = "popsiclePopup";
    img.src = "./Images/+.png";
	img.classList.add("unSelectable");
	img.classList.add("popsiclePopup");
	img.style.position = "absolute";
	img.style.left = "55vw"
	img.style.top = "50vh"
	img.style.transform = "translate(0vmin, 0vmin)"
	img.style.zIndex = "1000";
	img.style.height = "5vmin";
	img.style.opacity = "1";
    document.getElementById('body').appendChild(img);
	setTimeout(function(){
		img.style.height = "15vmin";
	}, 1);
	setTimeout(function(){
		img.style.transform = "translate(20vmin, -20vmin)";
	}, 1);
	setTimeout(function(){
		img.style.height = "7vmin";
	}, 1000);
	setTimeout(function(){
		img.parentNode.removeChild(img);
	}, 2000);
	setTimeout(function(){
		img.style.opacity = "0";
	}, 1000);	
}



//called when popsicle clicked
function clickFunction() {
	Clicks += 1
	level = (AllClicks) - (Math.floor(((AllClicks)) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = (AllTowerClicks + popsicles) - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber.toLocaleString('en-US')
	if ((Math.floor((AllClicks) / 10) * pointsPerPopsicle) > levelUp) {
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		if (popsicles <= 0)
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}
		else
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}
		
		popsicles += pointsPerPopsicle
	}

	resize()
}

document.addEventListener('contextmenu', event => event.preventDefault())

//called by upgradeSun to check if sun has been bought
//void -> boolean
//Example:
//sun_amount = 1 -> return true
//sun_amount = 0 -> return false
function sun_switch () {
	if(sun_amount >= 1) {
		return true;
	}
	else {
		return false;
	}
}

function upgradepopsicleStand() {
	if (popsicleStandUpgradeCost <= popsicleNumber )
	{
		popsicleStandCPS += 1.0666666664
		popsicleStand_amount += 1
		popsiclesSpent += popsicleStandUpgradeCost
		popsicleStandUpgradeCost = Math.ceil(popsicleStandUpgradeCost * 1.15)
	}
}


//called when sun is upgraded. Idly "melts" popsicle 
//void -> void
function upgradeSun() {
	if (SunUpgradeCost <= popsicleNumber )
	{
		Suns += 1
		SunCPS += 0.00333333333334
	    sun_amount += 1
		popsiclesSpent += SunUpgradeCost
		SunUpgradeCost = Math.ceil(SunUpgradeCost * 1.15)
		levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
	}
}

function upgradedog() {
	if (dogUpgradeCost <= popsicleNumber )
	{
		dogCPS += 0.1333333333336
		dog_amount += 1
		popsiclesSpent += dogUpgradeCost
		dogUpgradeCost = Math.ceil(dogUpgradeCost * 1.15)
	}
}


function biggerWings(){
	if (biggerWingsUpgradeCost <= popsicleNumber)
	{
		SeaGullLevel += 1
		popsiclesSpent += biggerWingsUpgradeCost
		biggerWingsUpgradeCost = Math.ceil(Math.pow(biggerWingsUpgradeCost, 1.32))
	}
}

//called when "bigger popsicle" has been upgraded. Increases points gained per popsicle
//void -> void
function upgradePopsicle()
{
	if (PopsicleUpgradeCost <= popsicleNumber )
	{
		PopsicleLevel += 1
		pointsPerPopsicle = pointsPerPopsicle * 2
		popsiclesSpent += PopsicleUpgradeCost
		PopsicleUpgradeCost = Math.ceil(Math.pow(PopsicleUpgradeCost, 1.45))
		levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
	}	
}

function upgradeSeaGull()
{
	if (SeaGullUpgradeCost <= popsicleNumber )
	{
		SeaGulls += 1
		SeaGullCPS += 0.0166666666667
		popsiclesSpent += SeaGullUpgradeCost
		SeaGullUpgradeCost = Math.ceil(1.16 * SeaGullUpgradeCost)
	}
	
}

//called every frame (60 fps)
//void -> void
function gameLoop()
{
	AllClicks = Clicks + SunClicks
	level = (AllClicks) - (Math.floor(((AllClicks)) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = (AllTowerClicks + popsicles) - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber.toLocaleString('en-US')
	document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
	document.getElementById("PopsicleTop").src="Images/Popsicle Top " + Math.min(PopsicleLevel, maxPopsicleLevel) + ".png"
	document.getElementById("PopsicleStickIn").src="Images/Popsicle Stick " + Math.min(PopsicleLevel, maxPopsicleLevel) + ".png"
	document.getElementById("PopsicleStick").src="Images/Popsicle Stick Bottom " + Math.min(PopsicleLevel, maxPopsicleLevel) + ".png"
	document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
	document.title = (popsicleNumber == 1) ? (popsicleNumber + " popsicle - Popsicle Licker Clicker") : (popsicleNumber + " popsicles - Popsicle Licker Clicker")

	if ((Math.floor(((AllClicks)) / 10) * pointsPerPopsicle) > levelUp) {
		popsiclePopup()
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		if (popsicles <= 0)
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}
		else
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}

		popsicles += pointsPerPopsicle
	}

	resize()
	saveGame()

	w.onmessage = function(e) {
		SunClicks = e.data.SunClicks;
		AllTowerClicks = e.data.AllTowerClicks;
		AllTowerClicksDecimal = e.data.AllTowerClicksDecimal;
		dogClicks= e.data.dogClicks;
		popsicleStandClicks= e.data.popsicleStandClicks;
	}

	w.postMessage({ 
		SunCPS: SunCPS,
		dogCPS: dogCPS,
		SeaGullCPS: SeaGullCPS,
		popsicleStandCPS: popsicleStandCPS,
		SeaGullLevel: SeaGullLevel
	})
	
	//set the cost banners to the cost of each upgrade
	document.getElementById("PopsiclePriceP").innerHTML = "$" + PopsicleUpgradeCost
	document.getElementById("SunPriceP").innerHTML = "$" + SunUpgradeCost
	document.getElementById("SeaGullPriceP").innerHTML = "$" + SeaGullUpgradeCost
	document.getElementById("BiggerWingsPriceP").innerHTML = "$" + biggerWingsUpgradeCost
	document.getElementById("DogPriceP").innerHTML = "$" + dogUpgradeCost
	
	document.getElementById("PopsicleStandPriceP").innerHTML = "$" + popsicleStandUpgradeCost
}

//shows and hides the shop
//void -> void
function show(){
	if (showingUpgrades == false)
	{
		document.getElementById("UpgradesDiv").style.visibility = "visible"
		showingUpgrades = true
	}
	else
	{
		document.getElementById("UpgradesDiv").style.visibility = "hidden"
		showingUpgrades = false
	}
}

function showSettings(){
	if (showingSettings == false)
	{
		document.getElementById("SettingsDiv").style.visibility = "visible"
		showingSettings = true
	}
	else
	{
		document.getElementById("SettingsDiv").style.visibility = "hidden"
		showingSettings = false
	}
}


function loadGame()
{
	var savedGame = JSON.parse(localStorage.getItem("gameSave"))
	if (typeof savedGame.popsicleStand_amount !== "undefined"){popsicleStand_amount = savedGame.popsicleStand_amount}
if (typeof savedGame.popsicleStandClicks !== "undefined"){popsicleStandClicks = savedGame.popsicleStandClicks}
if (typeof savedGame.popsicleStandUpgradeCost !== "undefined"){popsicleStandUpgradeCost = savedGame.popsicleStandUpgradeCost}
if (typeof savedGame.popsicleStandCPS !== "undefined"){popsicleStandCPS = savedGame.popsicleStandCPS}

	if (typeof savedGame.SeaGullLevel !== "undefined"){SeaGullLevel = savedGame.SeaGullLevel}
	if (typeof savedGame.Name !== "undefined"){Name = savedGame.Name}
	if (typeof savedGame.SunCPS !== "undefined"){SunCPS = savedGame.SunCPS}
	if (typeof savedGame.SeaGullCPS !== "undefined"){SeaGullCPS = savedGame.SeaGullCPS}
	if (typeof savedGame.SeaGulls !== "undefined"){SeaGulls = savedGame.SeaGulls}
	if (typeof savedGame.PopsicleLevel !== "undefined"){PopsicleLevel = savedGame.PopsicleLevel}
	if (typeof savedGame.Suns !== "undefined"){Suns = savedGame.Suns}
	if (typeof savedGame.Clicks !== "undefined"){Clicks = savedGame.Clicks}
	if (typeof savedGame.SunClicks !== "undefined"){SunClicks = savedGame.SunClicks}
	if (typeof savedGame.AllClicks !== "undefined"){AllClicks = savedGame.AllClicks}
	if (typeof savedGame.SeaGullClicks !== "undefined"){SeaGullClicks = savedGame.SeaGullClicks}
	if (typeof savedGame.AllTowerClicks !== "undefined"){AllTowerClicks = savedGame.AllTowerClicks}
	if (typeof savedGame.AllTowerClicksDecimal !== "undefined"){AllTowerClicksDecimal = savedGame.AllTowerClicksDecimal}
	if (typeof savedGame.heightMultiplier !== "undefined"){heightMultiplier = savedGame.heightMultiplier}
	if (typeof savedGame.level !== "undefined"){level = savedGame.level}
	if (typeof savedGame.hue !== "undefined"){hue = savedGame.hue}
	if (typeof savedGame.pointsPerPopsicle !== "undefined"){pointsPerPopsicle = savedGame.pointsPerPopsicle}
	if (typeof savedGame.PopsicleUpgradeCost !== "undefined"){PopsicleUpgradeCost = savedGame.PopsicleUpgradeCost}
	if (typeof savedGame.SunUpgradeCost !== "undefined"){SunUpgradeCost = savedGame.SunUpgradeCost}
	if (typeof savedGame.SeaGullUpgradeCost !== "undefined"){SeaGullUpgradeCost = savedGame.SeaGullUpgradeCost}
	if (typeof savedGame.levelUp !== "undefined"){levelUp = savedGame.levelUp}
	if (typeof savedGame.popsicles !== "undefined"){popsicles = savedGame.popsicles}
	if (typeof savedGame.popsiclesSpent !== "undefined"){popsiclesSpent = savedGame.popsiclesSpent}
	if (typeof savedGame.popsicleNumber !== "undefined"){popsicleNumber = savedGame.popsicleNumber}
	if (typeof savedGame.sun_amount !== "undefined"){sun_amount = savedGame.sun_amount}
	if (typeof savedGame.biggerWingsUpgradeCost !== "undefined"){biggerWingsUpgradeCost = savedGame.biggerWingsUpgradeCost}
	if (typeof savedGame.dog_amount !== "undefined"){dog_amount = savedGame.dog_amount}
if (typeof savedGame.dogClicks !== "undefined"){dogClicks = savedGame.dogClicks}
if (typeof savedGame.dogUpgradeCost !== "undefined"){dogUpgradeCost = savedGame.dogUpgradeCost}
if (typeof savedGame.dogCPS !== "undefined"){dogCPS = savedGame.dogCPS}

	document.getElementById("name").innerHTML = Name
	w.postMessage({ 
		SunCPS: SunCPS, 
		dogCPS: dogCPS,
		SeaGullCPS: SeaGullCPS,
		SunClicks: SunClicks,
		dogClicks: dogClicks,
		AllTowerClicksDecimal: AllTowerClicksDecimal,
		popsicleStandCPS: popsicleStandCPS,
		popsicleStandClicks: popsicleStandClicks,
		SeaGullLevel: SeaGullLevel
	})	
}

function saveGame()
{
	var gameSave = 
	{
		dog_amount: dog_amount,
dogClicks: dogClicks,
dogUpgradeCost: dogUpgradeCost,
dogCPS: dogCPS,
popsicleStand_amount: popsicleStand_amount,
popsicleStandClicks: popsicleStandClicks,
popsicleStandUpgradeCost: popsicleStandUpgradeCost,
popsicleStandCPS: popsicleStandCPS,
AllTowerClicksDecimal: AllTowerClicksDecimal,
		SeaGullLevel: SeaGullLevel,
		Name: Name,
		Clicks: Clicks,
		SunClicks: SunClicks,
		AllClicks: AllClicks,
		SeaGulls: SeaGulls,
		Suns: Suns,
		PopsicleLevel: PopsicleLevel,
		SeaGullClicks: SeaGullClicks,
		AllTowerClicks: AllTowerClicks,
		heightMultiplier: heightMultiplier,
		level: level,
		levelUp: levelUp,
		SunCPS: SunCPS,
		SeaGullCPS: SeaGullCPS,
		hue: hue,
		pointsPerPopsicle: pointsPerPopsicle,
		PopsicleUpgradeCost: PopsicleUpgradeCost,
		SeaGullUpgradeCost: SeaGullUpgradeCost,
		SunUpgradeCost: SunUpgradeCost,
		popsicles: popsicles,
		popsiclesSpent: popsiclesSpent,
		popsicleNumber: popsicleNumber,
		sun_amount: sun_amount,
		biggerWingsUpgradeCost: biggerWingsUpgradeCost
	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

function clearSave(){
	//stop all loops
	stopGameLoop()
	stopWebWorker()
	//clear old data
	localStorage.clear();
	//set vars to defualt
	Name = "Change Name Here"
	biggerWingsUpgradeCost = 200
	dog_amount = 0
	AllTowerClicksDecimal = 0
dogClicks =  0
dogUpgradeCost =  156
dogCPS = 0
popsicleStand_amount = 0
popsicleStandClicks =  0
popsicleStandUpgradeCost =  1246
popsicleStandCPS = 0

	Clicks = 0
	SunClicks = 0
	AllClicks = 0
	SeaGulls = 0
	PopsicleLevel = 1
	SeaGullLevel = 1
	Suns = 0
	SeaGullClicks = 0
	AllTowerClicks = 0
	heightMultiplier = 10
	level = 5
	levelUp = 0
	hue = 0
	pointsPerPopsicle = 1
	PopsicleUpgradeCost = 150
	SunUpgradeCost = 2
	SeaGullUpgradeCost = 20
	popsicles = 0
	popsiclesSpent = 0
	popsicleNumber = 0
	sun_amount = 0
	showingUpgrades =  false	
	SunCPS = 0
	SeaGullCPS = 0
	//save new (defualt) values
	saveGame()
	//start all loops
	startWebworker()
	startGameLoop()
	//load new (defualt) data
	loadGame()
}


function showOverlay() {
	document.getElementById("overlay").style.display = "block";
}
  
  function hideOverlay() {
	document.getElementById("overlay").style.display = "none";
}

function setNewName(){
	userInput = document.getElementById("newName").value;
	document.getElementById("name").innerHTML = userInput;
	Name = document.getElementById("name").value;
}
