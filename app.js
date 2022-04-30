/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

let fotoDetail = document.querySelector("#recept-foto");
let receptKategorie = document.querySelector("#recept-kategorie");
let receptHodnoceni = document.querySelector("#recept-hodnoceni");
let receptNazev = document.querySelector("#recept-nazev");
let receptPopis = document.querySelector("#recept-popis");

let zobrazeneRecepty = recepty;

vypisRecepty(recepty);

// podívá se do localStorage pro naposledy otevřený recept
if (typeof localStorage.posledniRecept === "undefined") {
  console.log("Nebyl zvolen recept");
} else {    // a kdyžtak ho vypíše do detailu:
  let posledniRecept = JSON.parse(localStorage.posledniRecept);

  fotoDetail.setAttribute("src", posledniRecept.img);
  receptKategorie.innerHTML = posledniRecept.kategorie;
  receptHodnoceni.innerHTML = posledniRecept.hodnoceni;
  receptNazev.innerHTML = posledniRecept.nadpis;
  receptPopis.innerHTML = posledniRecept.popis;
}

//vypise recepty do leveho menu
function vypisRecepty(recepty) {
  for (let i in recepty) {
    let vypisReceptu = document.querySelector("#recepty");
    let polozkaRecept = document.createElement("div");
    
    polozkaRecept.classList.add("recept");

    let polozkaObrazek = document.createElement("img");

    polozkaObrazek.classList.add("recept-obrazek");
    polozkaObrazek.setAttribute("src", recepty[i].img);
    polozkaRecept.appendChild(polozkaObrazek);

    let receptInfo = document.createElement("div");
    receptInfo.classList.add("recept-info");
    let receptNadpis = document.createElement("h3");
    receptNadpis.textContent = recepty[i].nadpis;
    receptInfo.appendChild(receptNadpis);
    polozkaRecept.appendChild(receptInfo);

    //přidá dataset do všech prvků položky receptu => odešle identifikaci receptu
    polozkaRecept.dataset.index = i;
    polozkaObrazek.dataset.index = i;
    receptInfo.dataset.index = i;
    receptNadpis.dataset.index = i;

    // přidá eventListener na klik do menu receptů
    polozkaRecept.addEventListener("click", (e) => {
      zobrazDetail(recepty, i);
      stringifiedUlozenyRecept = JSON.stringify(recepty[i]);
      localStorage.posledniRecept = stringifiedUlozenyRecept;
    });

    vypisReceptu.appendChild(polozkaRecept);
  }
}
// funkce ZOBRAZ DETAIL
function zobrazDetail(objekt, i) {
    fotoDetail.setAttribute("src", objekt[i].img);
    receptKategorie.innerHTML = objekt[i].kategorie;
    receptHodnoceni.innerHTML = objekt[i].hodnoceni;
    receptNazev.innerHTML = objekt[i].nadpis;
    receptPopis.innerHTML = objekt[i].popis;
}

//vymaž recepty
function vymazRecepty() {
  let menu = document.querySelector("#recepty");
  let recept = document.querySelectorAll(".recept");
  let receptObrazek = document.querySelectorAll(".recept-obrazek");
  let receptInfo = document.querySelectorAll(".recept-info");
    // zkontroluje, kolik jich tam je a všechny vymaže
  let pocet = document.querySelectorAll(".recept").length;
  for (let i = 0; i < pocet; i++) {
    recept[i].removeChild(receptObrazek[i]);
    recept[i].removeChild(receptInfo[i]);
    menu.removeChild(recept[i]);
  }
}

// funkce HLEDÁNÍ
function hledejRecepty() {
  let hledanyText = document.querySelector("#hledat").value;
  let hledaneRecepty = recepty.filter(function (recept) {
    return recept.nadpis.toLowerCase().includes(hledanyText);
  });
  vymazRecepty();
  vypisRecepty(hledaneRecepty);
  zobrazeneRecepty = hledaneRecepty;
}

// funkce FILTROVAT
function filter() {
  let kategorie = document.querySelector("#kategorie").value;
  let filtrovaneRecepty = recepty.filter(filtrujKat);
  function filtrujKat(recept) {
    return recept.kategorie == kategorie;
  }

  vymazRecepty();
  vypisRecepty(filtrovaneRecepty);
  zobrazeneRecepty = filtrovaneRecepty;
}

// funkce SEŘADIT
function seradRecepty() {
  let jakSeradit = document.querySelector("#razeni").value;

  let serazeneRecepty = zobrazeneRecepty.sort((a, b) => {
    if (jakSeradit == 1) {
      return b.hodnoceni - a.hodnoceni;
    } else {
      return a.hodnoceni - b.hodnoceni;
    }
  });

  vymazRecepty();
  vypisRecepty(serazeneRecepty);
}