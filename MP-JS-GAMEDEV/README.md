# Wprowadzenie do tworzenia gier
### Plansza gry
[Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage)
```html
<html>
  <head>
  </head>
  <body>

    <!-- plansze tworzymy za pomocą elementu <cavas> -->
    <canvas id="canvas" width="600" height="400"></canvas>
      
    <script src="ex.js"></script>
  </body>
</html>

```
Plik *ex.js*
```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
```

### Dodawanie elementów do planszy
[Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
```js
// Prostokąt
ctx.fillRect(x, y, width, height);

// Kółko
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(x, y, 10,0, 2 * Math.PI);
ctx.fill();
```
### Dodawanie kontroli nad elementami planszy
[Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event)
```js
document.addEventListener('keydown', function(e){
	e.preventDefault();
	if(e.code == "ArrowRight") //Jeśli naciśniemy klawisz "strzałka w prawo" to..
	else if(e.code == "ArrowLeft") //Jeśli naciśniemy klawisz "strzałka w lewo to..
	else if (e.code == "Space") //Jeśli naciśniemy spację to..
	//itp.
});
```
### Przykład
```js
// Tworzymy obiekt
let deska = {x:10,y:10,width:40,height:10};

// Definiujemy metodę obiektu deska; metoda manipuluje polami obiektu, więc
// musimy dodać słowo 'this' 
deska.draw = function() {
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

document.addEventListener('keydown', function(e){
	e.preventDefault();
	if(e.code == "ArrowRight") deska.x +=5;
	else if(e.code == "ArrowLeft") deska.x -=5;
})

deska.draw();

// Wartość pozycji x będzie się zmieniała o 5 po każdnym naciśnieciu klawisza, ale
// dopiero po wywołaniu metody draw zobaczymy efekt na planszy.

```

### Dodawanie automatycznego odświeżania planszy
[Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
```js
function update() {
	// czyszczenie planszy
	ctx.clearRect(0,0, canvas.width, canvas.height);
	// rysowanie deski
	deska.draw();
	// włączenie automatycznego odświeżania.
	window.requestAnimationFrame(update);
	// jak funkcja update zostaje wywołana to metoda deska.draw()
	// spowoduje narysowanie deski ponownie z wartoścami x i y uaktualnionym przez
	// obsługę zdarzenie na naciśnięcie klawisza. 
}

```

### Dodawanie samodzielnie poruszających się obiektów
```js
let pilka = {x:20,y:20,vx:2,vy:2};
// Definiujemy metodę obiektu pilka
pilka.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(this.x, this.y, 10,0, 2 * Math.PI);
	ctx.fill();
};

function update() {
	// czyszczenie planszy
	ctx.clearRect(0,0, canvas.width, canvas.height);
	// przesuwanie pilki w prawo
	pilka.x += pilka.vx;
	// rysowanie pilki
	pilka.draw();
	// włączenie automatycznego odświeżania.
	window.requestAnimationFrame(update);
}

// narysowanie pilki na planszy
pilka.draw();

//włączenie animacji
update()

```

### Dodawanie warunków brzegowych
```js
function update() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	if (pilka.x + pilka.vx > canvas.width || pilka.x + pilka.vx < 0) {
		pilka.vx = -pilka.vx;
	}
	
	pilka.x += pilka.vx;
	pilka.draw();
	window.requestAnimationFrame(update);
}

```
### Zadanie
[Tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)

Zbuduj grę ping-pong. Po obu stronach planszy mamy rakietki w formie prostokątów
a pomiędzy nimi samodzielnie porusza się piłeczka. Rakietkami steruje się za
pomocą klawiszy po to, aby odbijać piłeczkę. Ustaw warunki brzegowe tak, aby
piłeczka odbijała się od rakietek oraz od górnych i dolnych granic stołu. Gracz
zdobywa punkt, jeśli wyjdzie piłeczka poza stół na stronie
przeciwnika. Informacja o zdobytych punktach jest umieszczana w elementach
`<p>`. Gra toczy się do uzyskania 21 punktów.
