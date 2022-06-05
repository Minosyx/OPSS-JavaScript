# Funkcje

### Składnia
```js
// Definicja
function name([param[, param[, ... param]]]) {
   // intrukcja;
}
// Wyrażenie 
let myFun = function [name]([param[, param[, ... param]]]) {
   // intrukcja;
}
// Maksymalnie 255 parametrów
```


### Funkcja jest obiektem 
```js
function sum(a,b) {
   return a+b;
}

let diff = function(a,b) {
   return a-b;
}

sum instanceoff Object;  // true
diff instanceoff Object; // true

```
## Wywołanie funkcji
```js
sum(2,3) // 5
diff(5,3) // 2
```

### Metody, czyli wbudowane funkcje działające w obrębie danego obiektu
```js
let tydzien = ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek','sobota','niedziela'];
let los = Math.round(Math.random()*7); // korzystamy z metod dostępnych w obiekcie Math.
let lustro = tydzien[los].split('').reverse().join(); 
// Zmienną łańcuchową dzielimy na tablice znakow za pomocą metody *split*. 
// Metoda ta zwraca tablicę, więc dalej korzystamy z metod dostępnch dla tablic. 
// Metoda *revers* odwaraca znaki tyłem do przodu. 
// Na koniec łączym ponownie znaki w jedną zmienną łańcuchową za pomocą metody *join* */
```
### 

## Funkcje anonimowe
```js
let but = document.querySelector('button');

but.addEventListener('click',function(){
	alert('hello');
});

let diff = function(a,b) {
   return a-b;
}
```

### Samowywołujące się funkcje
```js
(function() {
  alert('hello');
})()
```
### Funkcje strzałkowe
```js
let but = document.querySelector('button');

but.addEventListener('click',() => {
	alert('hello');
});

let diff = (a,b) => {
   return a-b;
}
```

### Zagnieżdżanie funkcji
```js
function hotel() {
	let numer = 2;
	pokoj(numer);
}

function pokoj(numer){
	if(numer==1) pokoj1(numer);
	else if(numer==2) pokoj2(numer);
	else if(numer==3) pokoj3(numer);
}

function pokoj1(a) {
  console.log("Jesteśmy w pokoju:" + a);
}

function pokoj2(a) {
  console.log("Jesteśmy w pokoju:" + a);
}

function pokoj3() {
  console.log("Jesteśmy w pokoju:" + a);
}
```
### Zwracana wartość
```js
let diff1 = (a,b) => {
   return a-b;
}

// Gdy nie ma słowa *return* zwraca *undefined*
let diff2 = (a,b) => {
	a-b;
}

// Możemy pominąć słowo *return* jeśli ciało funkcji ma jedną istrukcję bez nawiasów klamrowych
let diff3 = (a,b) => a-b; 
```
### Zadanie: dynamiczna lista zakupów
Dynamiczna lista zakupów składa się z dwóch elementów `<input>` do uzyskiwania
informacji o nazwie produktu i jego cenie; z dwóch przycisków `<button>` - po
naciśnięciu pierwszego produkt zostaje dodany do listy, a po naciśnięciu drugiego
jest obliczana całkowita cena zakupów. Produkty są umieszczane w liście `<ul>` i
każdy jej element `<li>` można usunąć po naciśnięciu na niego. Zaraz za listą
znajduje się element `<p>`, w którym znajduje się informacja o całkowitej sumie
za zakupy.


