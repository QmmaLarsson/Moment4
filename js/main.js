/*
Här lägger du din JavaScript-kod
*/

//Variabler
let newToDoEl = document.getElementById("newtodo");
let toDoListEl = document.getElementById("todolist");
let newToDoButtonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message");
let clearButtonEl = document.getElementById("clearbutton");

//Händelsehanterare
window.onload = init;
newToDoButtonEl.addEventListener("click", addItem, false);
newToDoEl.addEventListener("keyup", checkInput, false);
clearButtonEl.addEventListener("click", clearStorage, false);

/*Startfunktioner*/
function init() {
    newToDoButtonEl.disabled = true;     //Funktion som inaktiverar "Lägg till"-knappen

    loadItem();                      //Laddar data sparad i Web Storage
}

/*Funktion som lägger till nya saker i "Att göra"-listan och skriver ut dessa till skärmen*/
function addItem() {
    let newToDoInput = newToDoEl.value;                  //Textnoden ska ha värdet av det som skrivs in i newtodo-fältet
    let newEl = document.createElement("article");       //Nytt article-element
    let newText = document.createTextNode(newToDoInput); //Ny text-nod

    newEl.appendChild(newText);                          //Lägg till textnoden till article-elementet
    newEl.className = "newelement";                      //Ny klass

    newEl.addEventListener("click", function (e) {       //Tar bort element från listan om man klickar på det
        e.target.remove();
        storeItem();                                     //Sparar data i Web storage
    });

    toDoListEl.appendChild(newEl);                       //Lägg till article-elemtet till sektionen todolist
    newToDoEl.value = "";                                //Tar bort text i rutan efter lyckad lagring
    newToDoButtonEl.disabled = true;

    storeItem();                                         //Sparar data i Web storage
}

/*Funktion som kontrollerar inmatningen. Om det som skrivs in i textfältet är kortare än fem tecken kan det inte läggas till i "Att göra"-listan.*/
function checkInput() {
    let newToDoInput = newToDoEl.value;
    if (newToDoInput.length < 5) {
        messageEl.innerHTML = "Måste innehålla minst 5 tecken";
        newToDoButtonEl.disabled = true;
    } else {
        messageEl.innerHTML = "";         //Tömmer textfältet efter att texten lagts till i "Att göra"-listan
        newToDoButtonEl.disabled = false; //Funktion som inaktiverar "Lägg till"-knappen
    }
}

/*Funktion som sparar data i Web Storage*/
function storeItem() {
    let loadList = document.getElementsByClassName("newelement"); //Läser in
    let tempArr = [];                                             //Temporär array

    for (i = 0; i < loadList.length; i++) {                       //Går igenom alla element i arrayen
        tempArr.push(loadList[i].innerHTML);                      //Lägger till alla element i en array
    }

    let jsonStr = JSON.stringify(tempArr);                        //Lagrar arrayen i en JSON-string

    localStorage.setItem("itemlist", jsonStr);                    //Sparar till Web Storage
}

/* Funktion som laddar data som är sparad i Web Storage. Det som är sparat visas i "Att göra"-listan.*/
function loadItem() {
    let loadList = JSON.parse(localStorage.getItem("itemlist")); //Hämtar sparad JSON-string och gör den till en array

    if (localStorage.length != 0) {                                  //If-sats som kollar om det finns data sparat i local storage
        for (i = 0; i < loadList.length; i++) {                      //Går igenom alla element i arrayen
            let newEl = document.createElement("article");           //Nytt article-element
            let newText = document.createTextNode(loadList[i]);      //Ny text-nod

            newEl.appendChild(newText);                              //Lägg till textnoden till article-elementet
            newEl.className = "newelement";                          //Ny klass
            toDoListEl.appendChild(newEl);                           //Lägg till article-elemtet till sektionen todolist

            newEl.addEventListener("click", function (e) {           //Tar bort element från listan om man klickar på det
                e.target.remove();

                storeItem();                                         //Sparar data i Web Storage
            });
        }
    }
}

/*Funktion som rensar Web Storage och "Att göra"-listan när man trycker på "Rensa"-knappen*/
function clearStorage() {
    let newElementEl = document.getElementsByClassName("newelement"); //Rensar "Att göra"-listan
    while (newElementEl.length > 0) {
        newElementEl[0].parentNode.removeChild(newElementEl[0])
    }

    localStorage.clear();                                             //Rensar Web Storage
}