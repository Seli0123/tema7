document.addEventListener("DOMContentLoaded", start);
const container = document.querySelector("#data-container");
const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
let retter = [];
let filter = "alle";

const detalje = document.querySelector("#detalje");



function start() {
    loadData();
    addEventListenersToButton();

}


async function loadData() {
    const response = await fetch(endpoint);
    console.log(response);
    retter = await response.json();
    console.log(retter);
    visRetter();

}



function visRetter() {
    detalje.querySelector("button").addEventListener("click", () => {
        history.back();
    });


    container.innerHTML = "";
    /*const container = document.querySelector("#data-container");*/


    const retterTemplate = document.querySelector("template");
    retter.feed.entry.forEach(retterne => {
        /* Henter bestemt ret*/
        if (filter == "alle" || filter == retterne.gsx$kategori.$t) {

            let klon = retterTemplate.cloneNode(true).content;

            klon.querySelector("h3").textContent = "kategori: " + retterne.gsx$kategori.$t;
            klon.querySelector("img").src = `imgs/small/${retterne.gsx$billede.$t}-sm.jpg`;
            klon.querySelector("h4").textContent = retterne.gsx$kort.$t;
            klon.querySelector("h5").textContent = "pris: " + `${retterne.gsx$pris.$t
            },-`;

            container.appendChild(klon);
        }
    });

}

function visDetalje(retterne) {

    document.querySelector("#detalje").style.display = "block";

    document.querySelector("#detalje .luk").addEventListener("click", skjulDetalje);

    document.querySelector("#detalje img").src = retter.gsx$billede.$t;
    document.querySelector("#detalje img").alt = `Portræt af ${retter.gsx$billede.$t}`;

}



function addEventListenersToButton() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtering);

    })
}

function skjulDetalje() {
    document.querySelector("#detalje").style.display = "none";
}





function filtering() {
    console.log("This", this.dataset.kategori);
    filter = this.dataset.kategori;
    /*console.log("FILTER");

    document.querySelector("h3").textContent = this.textContent;



    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })

    this.classList.add("valgt");

    visRetter();
}
