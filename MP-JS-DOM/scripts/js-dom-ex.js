// Napisz skrypt, który wykonana następujące zadania na stronie _business.html_:

// *Zadanie 1:* zwróci informacje o typie węzła nagłówka, własnościach obiektu o id
// "contact" i zawartości elementu HTML o id "about".

let typeN = document.head.nodeType;
let nameN = document.head.nodeName;
console.log("Węzeł nagłówka");
console.log(nameN, typeN);

console.log("Własności obiektu o id 'contact'");
let p = document.getElementById('contact');
let tab = [];
for (let val in p){
	tab.push(val);
}
console.log(tab.sort());

let about = document.getElementById('about');
console.log("Zawartość elementu o id 'about'");
/*
for (let i = 0; i < about.children.length; i++) {
  let tableChild = about.children[i];
	console.log(tableChild.firstChild.nodeValue); // Jeśli interesuje nas tylko tekst wewnątrz elementu o id "about"
}
*/

console.log(about.innerHTML); // Jeśli interesuje nas cała zawartość elementu o id "about" włącznie ze znacznikami

// *Zadanie 2:* doda nowy paragraf do "About" tuż za pierwszym paragrafem.

let paragraf = document.getElementById('about').querySelector('p');
paragraf.insertAdjacentHTML("afterend", "<p>Nowy paragraf</p>");

// *Zadanie 3:* doda nową pozycję na liście pomiędzy Facebook a Twitter: link do strony UMK.

let txt = document.createTextNode("UMK page");
let a = document.createElement('a');
a.href = "https://www.umk.pl";
a.target = "_blank";
a.appendChild(txt);
let newNode = document.createElement('li');
newNode.appendChild(a);
let parentN = document.getElementById('contact').querySelector('ul');
let twitter = parentN.children[2];

parentN.insertBefore(newNode,twitter);

// *Zadanie 4:* usunie obiekt o id "banner".

let del = document.getElementById('banner');
del.parentNode.removeChild(del);

// *Zadanie 5:* odwróci tekst na całej stronie, aby czytało się go od prawej do lewej.

var descendants = Array.prototype.slice.call(
  document.body.querySelectorAll("*")
);

function reverseString(str) {
  return str.split("").reverse().join("");
}

for (let k = 0; k < descendants.length - 1; k++){
	let obiekt = descendants[k].firstChild;
	if (obiekt.nodeValue && obiekt.nodeValue.trim().length !== 0){
		let reversed = reverseString(obiekt.nodeValue);
		obiekt.nodeValue = reversed;
	}
}
