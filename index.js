let rounds = 0
let isRunning = true;
let planetConfig = {};
let playSpeed = 1;


function preload(){
    data = loadJSON('./mercury.json');
}

function setup() {
    let width = 500;
    let height = 700;
    let canvas = createCanvas(height, width);
    canvas.parent('canvasContainer');
    for(key in data){
        let select = document.querySelector("#planetSelect");
        select.insertAdjacentHTML("beforeend", "<option>" + key + "</option>");
        planetConfig[key] = {color: "#ffbb00"};
        planetConfig[key].visible= true;
    }
    document.querySelector("#planetSetup input[type=color]").value = "#ffbb00";
    frameRate(30);
    loop();
}

function draw() {
    resetPos();
    for (const [key, value] of Object.entries(data)) {
        setPlanet(key);
        if(planetConfig[key].visible){
            placePoint(value[rounds][0], Math.max(width, height), 2.000000e+11);
        }
    }
    if(data["mercury-euler"][rounds+playSpeed]!==undefined){
        rounds+=playSpeed;
    }
}

function resetPos(){
    clear();
    translate(width/2, height/2); //moving to center of repere
    background("#00132d");
    fill("#ffdd00");
    circle(0, 0, 20);
}

function setPlanet(planet){
    fill(planetConfig[planet].color);
}

function placePoint(coordinates, canvaMaxLen, realMaxLen){
    let x = coordinates[0]===0 ? 0 : coordinates[0]/realMaxLen*(canvaMaxLen-10);
    let y = coordinates[1]===0 ? 0 : coordinates[1]/realMaxLen*(canvaMaxLen-10);
    circle(x, y, 10);
}

document.querySelector(".pauseButton").addEventListener("click", (event) => {
    document.querySelector(".pauseButton i").classList.toggle("fa-pause");
    document.querySelector(".pauseButton i").classList.toggle("fa-play");
    if(isRunning){
        noLoop();
        isRunning = false;
    } else {
        loop();
        isRunning = true;
    }
});


document.querySelector("#planetSetup input[type='color']").addEventListener("change", (e)=>{
    planetConfig[document.querySelector("#planetSetup select").value].color = e.target.value;
})
document.querySelector("#planetSetup input[type='checkbox']").addEventListener("click", (e) => {
    planetConfig[document.querySelector("#planetSetup select").value].visible = !planetConfig[document.querySelector("#planetSetup select").value].visible;
})
document.querySelector("#planetSetup select").addEventListener("change", (e) => {
    document.querySelector("#planetSetup input[type='checkbox']").checked = planetConfig[e.target.value].visible;
    document.querySelector("#planetSetup input[type='color']").value = planetConfig[e.target.value].color;
})
document.querySelector("#playSpeed").addEventListener("click", (e) => {
    console.log(e.target.innerHTML);
    if(e.target.innerHTML === "X1"){
        e.target.innerHTML = "X2";
        playSpeed = 2;
        return;
    }
    if(e.target.innerHTML === "X2"){
        e.target.innerHTML = "X4";
        playSpeed = 4;
        return;
    }
    if(e.target.innerHTML === "X4"){
        e.target.innerHTML = "X10";
        playSpeed = 10;
        return;
    }
    if(e.target.innerHTML === "X10"){
        e.target.innerHTML = "X50";
        playSpeed = 50;
        return;
    }
    if(e.target.innerHTML === "X50"){
        e.target.innerHTML = "X1";
        playSpeed = 1;
    }
})