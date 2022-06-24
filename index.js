fetch('test.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.error(err));

function buildSaveButton(parentElement, data, filename) {
    parentElement.insertAdjacentHTML("beforeend", "<button class='download' id='download_'" + filename + "'><i class=\"fas fa-download\"></i>Télécharger</button>");
    let downloadButton = parentElement.querySelector(`#download_${filename}`);
    return function (data, fileName) {
        let blob = new Blob([JSON.stringify(data)], {type: "octet/stream"});
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        window.URL.revokeObjectURL(a.href);
    };
};

let data = { x: 42, s: "hello, world", d: new Date() },
    fileName = "my-download.json";