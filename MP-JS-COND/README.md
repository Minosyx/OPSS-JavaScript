# Instrukcje warunkowe 
### Podstawowa składnia: if...else
```js
  if (warunek) {
      instrukcja do wykonania, jeśli warunek jest spełniony;
  } else {
	  instrukcja do wykonania, jeśli poprzedni warunkek nie został spełniony;
  }
  
  // Instrukcja warunkowa w jednej linii
  if (warunek) instrukcja do wykonania, jeśli warunek jest spełniony;

```
### Przykład
```js
let lato = false;

if (lato === true) {
  console.log("jezioro");
} else {
  console.log("szkoła")
}
```
### Wartość 'true'
```js
// Wszystko oprócz false, undefined, null, 0, NaN, "" jest traktowane jako
wartość 'true'

let programowanie = 'js';

if (programowanie) {
	console.log(":)");
} else {
	console.log(":(");
}
```
### Zagnieżdżanie
```js
if (lato) {
	if (temperatura >25) {
		console.log("jezioro");
	} else if (temperature < 25) {
	  console.log("jezioro");
  }
}
```
### Operatory logiczne
```js
if (lato && temperatura > 25) {
	if (portfel >= 2000 || urodziny) {
		console.log("ocean");
	} else {
		console.log("jezioro");
  }
}
```

### Operatory logiczne
```js
if(1=='1') console.log("porównanie wartości");
if(1!=='1') console.log("porównanie wartości i typu");
if(1==='1') console.log("to się nie pojawi w konsoli");
```

### Podstawowa składnia: switch
```js
switch (wyrażenie) {
  case wybór1:
    instrukcja do wykonania, jeśli wyrażenie zwrócic wartość 'wybór1';
    break;

  case wybór2:
    instrukcja do wykonania, jeśli wyrażenie zwrócic wartość 'wybór2';
    break;
  
  itd...

  default:
    domyślna instrukcja do wykonania, jeśli pozostałe warunki nie zosały spełnione;
}
```
### Operator wyrażenia warunkowego
```js
//( warunek ) ? instrukcja do wykonania jeśli warunek jest spełniony : instrukcja do wykonania jeśli warunek nie jest spełniony
( lato ) ? 'jezioro' : 'szkoła';
```

### Zadania
1. Wróżbita - zbuduj stronę, na której użytkownik będzie mógł wybrać z listy
   rozwijanej `<select>` swój znak zodiaku. W kodzie *js* z wykorzystaniem
   instrukcji warunkowych zaimplementuj działanie wróżbity. Na podstawie znaku
   zodiaku pojawia się na stronie wymyślona informacja oraz strona zmienia
   adekwatnie swój kolor.

2. Kalendarz - na stronie pojawia się kalendarz na dany miesiąc, gdy z listy
   rozwijanej `<select>` użytkownik dokona wyboru. Zaimplementuj funkcje
   *createCalendar()*, która tworzy kalendarz i wyświetla nazwę wybranego
   miesiąca w elemencie `<h1>`
