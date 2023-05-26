/* Gestion de la traduction de la page */

const langSelect = document.getElementById("lang-select")
const tradElements = document.querySelectorAll("[data-trad]")

const langs = [
    {name: "Français", tag: "fr"}, 
    {name: "English", tag: "en"},
    {name: "Espanol", tag: "es"},
    {name: "Italiano", tag: "it"},
    {name: "Deutsch", tag: "de"}
]
let currentLang = "fr"

function tradPage(){
    tradElements.forEach((el) => {
        fetch(`/api/${currentLang}/${el.dataset.trad}`)
            .then(res => {
                return res.text()
            })
            .then(trad => {
                let txt = trad
                const regex = /\$\{(a|sub|code);([^;}]*)(;([^\}]*))?\}/
                let result
                let backup = 10
                while((result = txt.match(regex)) !== null && backup > 0){
                    switch(result[1]){
                        case "a": 
                            txt = txt.replace(result[0], `<a class="facteurs__link" href="${result[4]}">${result[2]}</a>`)
                        break
                        case "sub":
                            txt = txt.replace(result[0], `<sub>${result[2]}</sub>`)
                        break
                        default:
                            txt = txt.replace(result[0], `<span class="${result[1]}">${result[2]}</span>`)
                    }
                    backup --
                }
                el.innerHTML = txt
            })
            .catch(() => {
                el.innerText = ""
            })
    })
}

langSelect.addEventListener("change", function () {
    currentLang = this.value
    tradPage()
})

langs.forEach(lang => {
    const el = langSelect.appendChild(document.createElement("option"))
    el.value = lang.tag
    el.innerText = lang.name
})

tradPage()

/* Délai sur l'apparition des éléments */

const spawnList = Array.from(document.querySelectorAll("[data-spawn]"))

const intervalId = setInterval(() => {
    const element = spawnList.pop()
    element.removeAttribute("data-spawn")
    if(spawnList.length === 0){
        clearInterval(intervalId)
    }
}, 150)

/* SEO version 2005 */

const augmentDom = document.getElementById("augment-dom")
const keywords = ["ecoindex", "écoconception", "émission de CO2", "eau", "mesure d'impact", "environnement", "numérique responsable", "normes", "ademe", "analyse de cycle de vie", "acv", "avenir", "eco conception", "économie circulaire", "évaluation", "indicateurs"]
const DOM_SIZE_GOAL = 10000
const DOM_LOOP_REQUIRED = DOM_SIZE_GOAL / keywords.length
for(let i = 0; i < DOM_LOOP_REQUIRED; i++){
    const div = augmentDom.appendChild(document.createElement("div"))
    keywords.forEach(word => {
        const span = div.appendChild(document.createElement("span"))
        span.innerText = word
        span.classList.add("augment__span")
    })
}