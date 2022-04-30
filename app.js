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


// zobrazí na začátek všechny recepty
let zobrazeneRecepty = recepty;
vypisRecepty(recepty);

//vypise recepty do leveho menu
function vypisRecepty (recepty){
for (let i in recepty) {
    let vypisReceptu = document.querySelector('#recepty');
    
    let polozkaRecept = document.createElement('div');
    
    polozkaRecept.classList.add('recept');
    
    
    
    let polozkaObrazek = document.createElement('img');

    polozkaObrazek.classList.add('recept-obrazek');
    polozkaObrazek.setAttribute('src', recepty[i].img);
    polozkaRecept.appendChild(polozkaObrazek);

    let receptInfo = document.createElement('div');
    receptInfo.classList.add('recept-info');
        let receptNadpis = document.createElement('h3');
        receptNadpis.textContent = recepty[i].nadpis;
        receptInfo.appendChild(receptNadpis);
    polozkaRecept.appendChild(receptInfo);

    //přidá dataset do všech prvků položky receptu => odešle identifikaci receptu
    polozkaRecept.dataset.index=i;
    polozkaObrazek.dataset.index=i;
    receptInfo.dataset.index=i;
    receptNadpis.dataset.index=i;

    // přidá eventListener
    polozkaRecept.addEventListener('click', (e)=> {

    /* zobrazDetail(); */
    let fotoDetail = document.querySelector('#recept-foto');
    fotoDetail.setAttribute('src', recepty[i].img);
    let receptKategorie = document.querySelector('#recept-kategorie');
    receptKategorie.innerHTML = recepty[i].kategorie;
    let receptHodnoceni = document.querySelector('#recept-hodnoceni');
    receptHodnoceni.innerHTML = recepty[i].hodnoceni;
    let receptNazev = document.querySelector('#recept-nazev');
    receptNazev.innerHTML = recepty[i].nadpis;
    let receptPopis = document.querySelector('#recept-popis');
    receptPopis.innerHTML = recepty[i].popis;
    });



    vypisReceptu.appendChild(polozkaRecept);

};
};
// funkce ZOBRAZ DETAIL
/* function zobrazDetail() {

} */

//vymaž recepty
function vymazRecepty(pocet){
    
    let menu = document.querySelector('#recepty');
    let recept = document.querySelectorAll('.recept');
    let receptObrazek = document.querySelectorAll('.recept-obrazek');
    let receptInfo = document.querySelectorAll('.recept-info');

    for (let i=0; i<pocet;i++) {
        recept[i].removeChild(receptObrazek[i]);
        recept[i].removeChild(receptInfo[i]);
        menu.removeChild(recept[i]);
}}

// funkce HLEDÁNÍ
function hledejRecepty() {
    let hledanyText = document.querySelector('#hledat').value;

    let hledaneRecepty = recepty.filter(function(recept) {
    return recept.nadpis.toLowerCase().includes(hledanyText);
    }
    );
    let pocet = document.querySelectorAll('.recept').length;
    vymazRecepty(pocet);
    vypisRecepty(hledaneRecepty);
    zobrazeneRecepty=hledaneRecepty;
};

// funkce FILTROVAT
function filter() {
    let kategorie = document.querySelector('#kategorie').value;
  
    let filtrovaneRecepty = recepty.filter(filtrujKat);
    function filtrujKat(recept){return recept.kategorie == kategorie};

    let pocet = document.querySelectorAll('.recept').length;
    vymazRecepty(pocet);
    vypisRecepty(filtrovaneRecepty);
zobrazeneRecepty=filtrovaneRecepty;
};

// funkce SEŘADIT
function seradRecepty() {
    let jakSeradit = document.querySelector('#razeni').value;

    let serazeneRecepty = zobrazeneRecepty.sort((a,b)=> {
        if (jakSeradit == 1){return b.hodnoceni - a.hodnoceni}
        else {return a.hodnoceni - b.hodnoceni};
   
    });
   
    let pocet = document.querySelectorAll('.recept').length;
    vymazRecepty(pocet);
    vypisRecepty(serazeneRecepty);
}

