//JavaScript Document
let SunClicks = 0;
let SunCPS = 0
let SeaGullCPS = 0
let AllTowerClicksDecimal = 0
let AllTowerClicks = 0
let SeaGullLevel = 1
let dogClicks = 0
let dogCPS = 0
let popsicleStandClicks = 0
let popsicleStandCPS = 0



onmessage = function(e) {
    SunCPS = e.data.SunCPS
    SeaGullCPS = e.data.SeaGullCPS
    dogCPS = e.data.dogCPS
    popsicleStandCPS = e.data.popsicleStandCPS

    if (e.data.popsicleStandClicks != undefined) {
        popsicleStandClicks = e.data.popsicleStandClicks
    }
    if (e.data.SunClicks != undefined) {
        SunClicks = e.data.SunClicks
    }
    if (e.data.AllTowerClicksDecimal != undefined) {
        AllTowerClicksDecimal = e.data.AllTowerClicksDecimal
    }
    if (e.data.SeaGullLevel != undefined) {
        SeaGullLevel = e.data.SeaGullLevel
    }
    if (e.data.dogClicks != undefined) {
        dogClicks = e.data.dogClicks
    }
}

function timedCount() {
    SunClicks += SunCPS;
    dogClicks += dogCPS;
    popsicleStandClicks += popsicleStandCPS;
    AllTowerClicksDecimal += SeaGullCPS * SeaGullLevel;
    AllTowerClicks = (Math.floor(AllTowerClicksDecimal / SeaGullLevel) * SeaGullLevel) + Math.floor(dogClicks) + Math.floor(popsicleStandClicks);
    postMessage({
        SunClicks: SunClicks,
        dogClicks: dogClicks,
        AllTowerClicks: AllTowerClicks,
        AllTowerClicksDecimal: AllTowerClicksDecimal,
        popsicleStandClicks: popsicleStandClicks
    });
    setTimeout("timedCount()", 16);
}

timedCount();