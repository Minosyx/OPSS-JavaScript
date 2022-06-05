# Obiektowy model dokumentu - DOM

### DOM umożliwia nam traktowanie strony html jako hierarchicznie uporządkowane obiekty JavaScript
![DOM](/images/dom-model.png)

###### (Autor obrazka: Birger Eriksson, Licencja: Creative Commons Attribution-Share Alike 3.0 Unported)

### Przykład: hierarchiczna struktura kodu html
```html
  <!DOCTYPE html>
  <html>
      <head>
		  <meta charset="utf-8">
		  <title>Simple DOM example</title>
      </head>
      <body>
		  <section>
			  <p>Pierwszy paragraf</p>
			  <p>Drugi paragraf</p>
		  </section>
      </body>
  </html>
```
W taki sposób widzi to przeglądarka Chrome: każda widoczna linia kodu HTML to
obiekt, który możemy manipulować za pomocą JavaScript. 
![DOM w Chrome](/images/html_dom_chrome.png)

### Składowe DOM - z odniesieniem się do elementów widocznych na obrazku powyżej
- węzeł elementu (każdy element html np. `<html></html>`, `<p></p>` itp)
- węzeł główny - element `<html>` 
- węzeł dziecka - bezpośredni potomek węzła nadrzędnego; element `<p>` jest
  dzieckiem elementu `<section>`
- węzeł potomny - nie musi to być bezpośredni potomek; element `<p>` jest
  potomkiem elementu `<body>`
- węzeł rodzica - bezpośredni element nadrzędny; `<section>` jest rodzicem `<p>`
- rodzeństwo węzłów - elementy równorzędne w hierarchii np. paragrafy, `<body>` i
  `<head>` 
- węzeł tekstowy - "Pierwszy paragraf"
- atrybutu 

### Typu węzłów opisywane jako wartość numeryczna (Node.prototype)
![Node.protype](/images/node_prototype.png)

- DOCUMENT_NODE (np. #document)
- DOCUMENT_TYPE_NODE (`<!DOCTYPE html>`)
- ELEMENT_NODE (np `<body>`,`<a>`, `<p>`, `<script>`, `<style>`, `<html>`, `<h1>`)
- DOCUMENT_FRAGMENT_NODE 
- ATTRIBUTE_NODE (np. href="https://www.umk.pl/")
- TEXT_NODE (np. "Pierwszy paragraf")
 
### Identyfikacja typu i nazwy węzła 
(do przetestowania w konsoli)
```js
  // DOCUMENT_TYPE_NODE == 10
  document.doctype
  document.doctype.nodeName
  document.doctype.nodeType

  //DOCUMENT_NODE == 9 
  document.nodeName
  document.nodeType

  //DOCUMENT_FRAGMENT_NODE == 11
  document.createDocumentFragment().nodeName
  document.createDocumentFragment().nodeType 

  //ELEMENT_NODE == 1
  document.querySelector('p').nodeName
  document.querySelector('p').nodeType

  //TEXT_NODE == 3
  document.querySelector('p').firstChild.nodeName
  document.querySelector('p').firstChild.nodeType
```

### Lista własności obiektu
1. Tworzymy własny obiekt t.j definiujemy jego własności i przypisujemy im
wartość. Sprawdzamy jakie własności są w obiekcie.
2. Uzyskujemy referencje do obiektu "paragraf" i sprawdzamy jakie własności
posiada ten obiekt.

(do przetestowania w konsoli)

```js
let obj = {a:1,b:2,c:"test"}
let tab = [];
for(let key in obj){
	tab.push(key);
}
//drukujemy do kosoli
console.log(tab.sort());
```
```js
//przypisujemy referencję do obiektu
let p = document.querySelector('p');
let tab = [];
for(let key in p){
	tab.push(key);
}
//drukujemy do kosoli
console.log(tab.sort());
```

### Najbardziej powszechnie używane własności interfejsu Node
childNodes, firstChild, lastChild, nextSibling, nodeName, nodeType, nodeValue,
parentNode, previousSibling
  
### Najbardziej powszechnie używane metody interfejsu Node
appendChild(), cloneNode(), compareDocumentPosition(), contains(),
hasChildNodes(), insertBefore(), isEqualNode(), removeChild(), replaceChild(), 

### Najbardziej powszechnie używane metody interfejsu Document
document.querySelector(), document.createElement(), document.createTextNode()

### Najbardziej powszechnie używane własności interfejsu HTML Element
innerHTML, outerHTML, textContent, innerText, outerText, firstElementChild,
lastElementChild, nextElementSibling, previousElementSibling, children,
  
### Najbardziej powszechnie używane metody interfejsu HTML Element
insertAdjacentHTML()

### Pozyskiwanie wartości węzła 
Tylko węzeł tekstowym zwróci wartość różną od Null. 
(do przetestowania w konsoli)
```js
document.doctype.nodeValue;
document.nodeValue;
document.createDocumentFragment().nodeValue;
document.querySelector('p').nodeValue;
document.querySelector('p').firstChild.nodeValue; 
```

### Tworzenie węzłów: element (ELEMENT_NODE == 1) i tekst (TEXT_NODE == 3)
(do przetestowania w konsoli)
```js
let newElement = document.createElement('p');
newElement; 
newElement.nodeType; //==1?

let newText = document.createTextNode('umk');
newText;
newText.nodeType; //==3? 
```
### Modyfikacja węzłów: element i tekst za pomocą stringów
Stringi będą kodem html (do przetestowania w konsoli na pliku business.html).
```js
document.querySelector('h3').innerHTML //dostajemy zawartość elementu h3
document.querySelector('h3').outerHTML //dostajemy kod html elementu h3
//przypisujemy tekst do zawartości elementu h3:
document.querySelector('h3').innerText = "<strong>umk</strong>" 
//przypisujemy kod html do zawartości elementu h3:
document.querySelector('h3').innerHTML = "<strong>umk</strong>"
document.querySelector('h3').outerHTML // sprawdzamy zmiany
//przypisujemy kod html do elementu h3 przez co zmieniamy ten element:
document.querySelector('h3').outerHTML = "<h1>umk</h1>"
document.querySelector('h3') // co dostaniemy?
document.querySelector('h3').outerText = "mazanie"

```
### Metoda insertAdjacentHTML()
(do przetestowania w konsoli na pliku business.html).
```html
<!-- beforebegin -->
<p>
	<!-- afterbegin -->
	foo
	<!-- beforeend -->
</p>
<!-- afterend -->
```

```html
<html>
	<body>
		<script>
			let p = document.querySelector('p');
			p.insertAdjacentHTML('beforebegin', '<span>Start-</span>');
			p.insertAdjacentHTML('afterend', '<span>-przerwa?</span>');
		</script>
    </body>
</html>
```

### Dodawanie węzła do obiektowej struktury strony html
(do przetestowania w konsoli na pliku business.html).
```js
// Tworzenie węzłów
let newNode = document.createElement('strong');
let newText = document.createTextNode('Dodawania węzła');

// Dodawanie węzła
document.querySelector('p').appendChild(newNode);
document.querySelector('strong').appendChild(newText);
```

### Dodawanie węzła do obiektowej struktury strony html
(do przetestowania w konsoli na pliku business.html).
```js
//Tworzenie wezłów
let li = document.createElement('li');
let txt = document.createTextNode('1');

//Dodawanie węzła tekstowego do elementu
li.appendChild(txt);

let ul = document.querySelector('ul');
// dodanie elementu do miejsca na liście ul przed pierwszym elementem
ul.insertBefore(li,ul.firstChild);

```

### Usuwanie węzła z obiektowej struktury strony html
(do przetestowania w konsoli na pliku business.html).
```js
let p = document.querySelector('p');
// usunięcie paragrafu
p.parentNode.removeChild(p);

// usunięcie węzła tekstowego z paragrafu
let b = document.querySelector('p').firstChild;
b.parentNode.removeChild(b);
```

### Zastępowanie węzła w obiektowej strukturze strony html
(do przetestowania w konsoli na pliku business.html).
```js
let a = document.querySelector('p');
let b = document.createElement('span');
b.textContent = 'umk';
a.parentNode.replaceChild(b,a);

let atxt = document.querySelector('p').firstChild;
let btxt = document.createTextNode('lato');
atxt.parentNode.replaceChild(btxt, atxt);
```

### Napisz skrypt, który wykonana następujące zadania na stronie _business.html_:

*Zadanie 1:* zwróci informacje o typie węzła nagłówka, własnościach obiektu o id
"contact" i zawartości elementu HTML o id "about".

*Zadanie 2:* doda nowy paragraf do "About" tuż za pierwszym paragrafem.

*Zadanie 3:* doda nową pozycję na liście pomiędzy Facebook a Twitter: link do strony UMK.

*Zadanie 4:* usunie obiekt o id "banner".

*Zadanie 5:* odwróci tekst na całej stronie, aby czytało się go od prawej do lewej.

