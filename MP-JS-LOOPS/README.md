# Pętle
### Składnia pętli *for(){}*
```js
for ([inicjator]; [warunek_wyjścia]; [inkrementacja]) {
  // instrukcja;
}
```
### Przykład
```js
let tydzien = ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek','sobota','niedziela'];
let info = 'Dni tygodnia to: ';
let para = document.querySelector('p');

for (let i = 0; i < tydzien.length; i++) {
  info += tydzien[i] + ', ';
}
para.textContent = info;
```
### Przerywanie wykonania pętli
```js
for (let i = 0; ; i++) {
	console.log(i);
	if (i > 10) break;
}
```

### Przeskakiwanie do kolejnych iteracji pętli:
```js
for (let i = 0; i<20; i++) {
	console.log(i);
	continue;
	if (i > 10) break; // nigdy nie zostałnie wywołana.
}
```

### Etykieta
```js
dom: {
	pokoj: {
		console.log('1');
		break dom; 
		console.log('lozko'); // nigdy nie zostanie wywołana
	}
	console.log('2'); //nigdy nie zostanie wywołana
}
hotel: {
	console.log('1');
		pokoj: {
			break pokoj;
			console.log('lozko'); //nigdy nie zostanie wywołana
		}
	console.log('1.1');
}
```
### Etykieta
```js
  let rezerwacja = "";

  hotel:
  for (let i = 1; i < 150; i++) {
	if (rezerwacja) {
		console.log('zarezerowowano pokoj nr: '+i);
		break hotel;
	}
	pokoj: {
	console.log('sprawdzam stan pokoju: ' + i);
	rezerwacja = Math.floor(Math.random()+0.1);
	}

}
```
### Składnia pętli *while(){}*
```js
while (warunek) {
  // instrukcja
}
```
### Przykład
```js
let i = 0;

while (i < 100) {
	console.log(i);
	i++;
}
```

### Składnia pętli *do{}while()*'
```js
do {
  // instrukcja
} while (warunek)
```

### Przykład 
```js
let i = 0;
let tydzien = ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek','sobota','niedziela'];
let info = 'Dni robocze to: ';
let para = document.querySelector('p');

do {
	info += tydzien[i] + ', ';
	i++;
	if(i>100) break;
}while(tydzien[i]!="sobota" && tydzien[i]!="niedziela");

para.textContent = info;
```
### Składania pętli *for(...in...)*
```js
let info = "Wlasnosci obiektu to: ";
var obj = {a: 1, b: 2, c: 3, d:40};

for (let prop in obj) {
  info += prop + " ";
}
```

### Składnia pętli *for(...of...)*
```js
let arr = [3, 5, 7];
arr.pora='lato';

for (let i in arr) {
   console.log(i);
}

// dotyczy obiektów iterowalnych
for (let i of arr) {
   console.log(i);
}

// obj nie jest obiektem iterowalnym
for (let i of obj) {
   console.log(i); 
}
```

### Zadanie: laboratorium obliczeń statystycznych
Laboratorium służy do graficznej prezentacji (histogram) wygenerowanych liczb
losowych podlegających rozkładowi normalnemu lub jednorodnemu. Za pomocą dwóch
elementów `<input>` pobierane są informacje niezbędne do stworzenia histogramu
t.j. liczba próbek do wygenerowania oraz liczba przedziałów histogramu. Za
pomocą elementu `<select>` użytkownik określa, czy liczby losowe mają podlegać
rozkładowi normalnemu bądź jednorodnemu. Histogram pojawia się na stronie po
naciśnięciu elementu `<button>`.


