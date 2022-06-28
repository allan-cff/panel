let activeSystem = sessionStorage.getItem("activeSystem");
let systemObject = JSON.parse(sessionStorage.getItem(activeSystem));

if(activeSystem !== undefined || activeSystem !== "newRandomSyst"){
    let system = JSON.parse(sessionStorage.getItem(activeSystem));
    document.querySelector(".center").insertAdjacentHTML("beforeend", `<button id="star"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>${system.star.name}</button>`);
    for(let child of system.star.childrens){
        document.querySelector(".center").insertAdjacentHTML("beforeend", `<button id="${child.name}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>${child.name}</button>`);
        document.getElementById(child.name).addEventListener("click", (e) => {
            sessionStorage.setItem("activeObject", e.target.id);
            window.location.pathname = "panel/object.html";
        })
    }
}

document.getElementById("viewSyst").addEventListener("click", () => {
    window.location.pathname = "panel/projet.html";
})

let downloadButton = document.getElementById("downloadButton");
downloadButton.download = systemObject.id + '.json';
let blob = new Blob([JSON.stringify(systemObject)], {type: "octet/stream"});
downloadButton.href = window.URL.createObjectURL(blob);