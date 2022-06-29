let activeSystem = sessionStorage.getItem("activeSystem");
let systemObject = JSON.parse(sessionStorage.getItem(activeSystem));
let activeObject = sessionStorage.getItem("activeObject");

if(activeObject === "newObject"){
    systemObject.star.childrens["newObject"] = {"name": "new object",
        "mass": 1.0e1,
        "perihelion": 0,
        "eqRadius": 0,
        "eccentricity": 0,
        "color": "#919191"};
}

let object = activeObject === "star" ? systemObject.star : systemObject.star.childrens[activeObject]


document.getElementById("nameInputObject").value = object.name;
document.getElementById("massInputObject").value = object.mass;
document.getElementById("colorInputObject").value = object.color;
if(activeObject!=="star"){
    document.getElementById("objectSetupForm").insertAdjacentHTML("afterbegin", "<button type=\"button\" id=\"supprObjectButton\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d=\"M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z\"/></svg>Supprimer l'objet</button>\n");
    document.getElementById("massInputObject").insertAdjacentHTML("afterend", "        <label for=\"perihelionInputObject\">Périhélie: </label>\n" +
        "        <input type=\"text\" name=\"perihelion\" id=\"perihelionInputObject\" required>\n" +
        "        <label for=\"eqRadiusInputObject\">Demi grand axe: </label>\n" +
        "        <input type=\"text\" name=\"eqRadius\" id=\"eqRadiusInputObject\" required>\n" +
        "        <label for=\"eccentricityInputObject\">Exentricité: </label>\n" +
        "        <input type=\"text\" name=\"eccentricity\" id=\"eccentricityInputObject\" required>")
    document.getElementById("perihelionInputObject").value = object.perihelion;
    document.getElementById("eqRadiusInputObject").value = object.eqRadius;
    document.getElementById("eccentricityInputObject").value = object.eccentricity;
}

document.querySelector("input[type=button]:not(#supprObjectButton)").addEventListener("click", (e) => {
    document.querySelectorAll("input:not([type=button])").forEach((elem) => {
        if (activeObject === "star") {
            systemObject.star[elem.name] = elem.value;
        } else {
            systemObject.star.childrens[activeObject][elem.name] = elem.value;
        }
    })
    if(activeObject !== "star"){
        let save = systemObject.star.childrens[activeObject];
        let newName = document.querySelector("input#nameInputObject").value;
        delete systemObject.star.childrens[activeObject];
        systemObject.star.childrens[newName] = save;
        sessionStorage.setItem("activeObject", newName);
    }
    sessionStorage.setItem(activeSystem, JSON.stringify(systemObject));
    window.location.pathname = "panel/edit.html";
})

document.querySelector("#supprObjectButton").addEventListener("click", (e) => {
    delete systemObject.star.childrens[activeObject];
    sessionStorage.setItem(activeSystem, JSON.stringify(systemObject));
    window.location.pathname = "panel/edit.html";
})