fetch('./systemsList.json')
    .then(res => res.json())
    .then(data => {
        let container = document.querySelector("section.center");
        for(let id of data){
            fetch(`./systems/${id}/config.json`)
                .then(res => res.json())
                .then(data2 => {
                    sessionStorage.setItem(id, JSON.stringify(data2));
                    container.insertAdjacentHTML("beforeend", `<button id="${id}"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 512\"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d=\"M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z\"/></svg>${data2.name}</button>`);
                    document.getElementById(id).addEventListener("click", (e) => {
                        sessionStorage.setItem("activeSystem", e.target.id);
                        window.location.pathname = "panel/edit.html";
                    })
                })
                .catch(err => console.error(err));
        }
    })
    .catch(err => console.error(err));

document.getElementById('newRandomSyst').addEventListener("click", () => {
    sessionStorage.setItem("activeSystem", "newRandomSyst");
    let jsonSchema = {
        "star": {
            "name": "newStar",
            "color": "#ffdd0",
            "mass": 1.988e30,
            "childrens": [
            ]
        },
        "id": "",
        "name": "",
        "method": "euler",
        "deltaTime": 8640
    };
    let randomPlanet = ["Romulus", "Vulcain", "Genesis", "Aldea"][getRandomInt(4)]
    jsonSchema.star.childrens[randomPlanet] = {color : "#919191"};
    jsonSchema.star.childrens[randomPlanet].name = randomPlanet;
    jsonSchema.star.childrens[randomPlanet].eccentricity = 0.1;
    jsonSchema.star.childrens[randomPlanet].eqRadius = Math.random()*100000000000;
    jsonSchema.star.childrens[randomPlanet].perihelion = Math.random()*100000000000;
    jsonSchema.star.childrens[randomPlanet].mass = Math.random()*1e24;
    sessionStorage.setItem("newSystem", JSON.stringify(jsonSchema));
    window.location.pathname = "panel/edit.html";
});

document.getElementById('newSyst').addEventListener("click", () => {
    sessionStorage.setItem("activeSystem", "newSystem");
    let jsonSchema = {
        "star": {
            "name": "newStar",
            "color": "#ffdd0",
            "mass": 1.988e30,
            "childrens": [
                {
                    "name": "newPlanet",
                    "mass": 0,
                    "perihelion": 0,
                    "eqRadius": 0,
                    "eccentricity": 0,
                    "color": "#919191"
                }
            ]
        },
        "id": "",
        "name": "",
        "method": "euler",
        "deltaTime": 8640
    };
    sessionStorage.setItem("newSystem", JSON.stringify(jsonSchema));
    window.location.pathname = "panel/edit.html";
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}