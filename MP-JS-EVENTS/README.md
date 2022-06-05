# Wprowadzenie do obsługi zdarzeń
### Rodzaje obsługi zdarzeń: przez atrybut HTML
Najstarszy mechanizm do obsługi zdarzeń miesza kod JavaScript z HTML. To podejście
nie jest zalecane.
```html
<button onclick="bgChange()">Start</button>

<script>
	function blackPage() {
		document.body.style.backgroundColor = 'black';
	}
</script>
```

### Rodzaje obsługi zdarzeń: przez własność obiektu JavaScript
```js
  let but = document.querySelector('button');

  but.onclick = function() {
	document.body.style.backgroundColor = 'black';
  }
```
### Rodzaje obsługi zdarzeń: przez metodę addEventListener
```js
  let but = document.querySelector('button');

  but.addEventListener('click', blackPage);
  
  function blackPage() {
	document.body.style.backgroundColor = 'black';
  } 
```

### Różnice
```js
// Analogicznie do dodawania mamy metodę do usuwania obsługi zdarzenia z obiektu
but.removeEventListener('click', blackPage); 

// Można dodać kilka zdarzeń do tego samego obiektu
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);

// W tej metodzie druga intrukcja nadpiszę pierwszą
myElement.onclick = functionA;
myElement.onclick = functionB; 
```

### Obiekt zdarzenia 
```js
document.body.addEventListener('click', bgChange);

function random(number) {
	return Math.floor(Math.random()*(number+1));
}

// *e* jest obiektem zdarzenia tzn. jest obiektem, który zawiera informacje o
// zdarzeniu, w tym również o obiekcie, na który zdarzenie bezpośrednio
// zaszło. Referencja do takiego obiektu znajduje się w *e.target* - to jest
// referencja do obiektu zagnieżdźonego w obiekcie, na który została zdefionowana 
// obłsuga zdarzenia (w tym przypadku to jest body).
	function bgChange(e) {
	var rndCol = 'rgb(' + random(255) + ',' 
	+ random(255) + ',' + random(255) + ')';
	
   // Kliknięcie na element w *body* spowoduje zmianę koloru tylko tego obiektu -
   // zadziała mechanizm delegowania zdarzenia. O delegowaniu zdarzeń jeszcze na
   // końcu tego dokumnetu.
   e.target.style.backgroundColor = rndCol;
   console.log(e);
}

```

### Bąbelkowanie i przechwytywanie
Mechanizm bąbelkowania polega na tym, że podczas uruchomienia obsługi zdarzenia
dla danego obiektu, przeglądarka sprawdza, czy nadrzędne elementy tego obiektu
nie mają zdefiniowanego tego samego typu zdarzenia np. na kliknięcie. W przypadku przechwytywania
przeglądarka sprawdza, czy podrzędne elementy nie mają zdefiniowanego takiego
zdarzenia. Domyślnym mechanizmem w przeglądarkach to bąbelkowanie. W
poprzednim przykładzie, gdy klikneliśmy na dowolny obiekt w *body* przeglądarka
sprawdzała, czy nadrzędne elementy nie mają zdefiniowanego tego samego typu
zdarzenia. W poniższym przykładzie działa ten sam mechanizm, tylko w tym
przypadku mamy zdefiniowanych kilka zdarzeń tego samego typu.
```html
<html>
  <head>
    <style>
      #level1 {
	  width: 100%;
	  height: 100%;
	  background-color: white;
      }
      #level2 {
	  width: 50%;
	  height: 50%;
	  background-color: yellow;
      }
      #level3 {
	  width: 50%;
	  height: 50%;
	  background-color: red;
      }

    </style>
  </head>
  <body>
    <div id="level1" class="">
      <div id="level2">
	<div id="level3"></div>
      </div>
    </div>
    <script>
      div1 = document.querySelector('#level1');
      div2 = document.querySelector('#level2');
      div3 = document.querySelector('#level3');
            
      div1.addEventListener('click',()=>{
		  div1.style.backgroundColor = "black";
      })

      div2.addEventListener('click',()=>{
		  div2.style.backgroundColor = "orange";
      })
      
	  <!-- Gdy naciśniemy na ten element jaki pierwszy to wszystkie pozostałe zostaną -->
      <!-- uruchomione. Zadziała mechanizm bąbelkowania -->
      div3.addEventListener('click',()=>{
		  div3.style.backgroundColor = "blue";
      })

    </script>
  </body>
</html>
```

### Zatrzymanie mechanizmu bąbelkowania: stopPropagation()
```js
div3.addEventListener('click',(e)=>{
	e.stopPropagation();
})
div2.addEventListener('click',(e)=>{
	e.stopPropagation();
}
```

### Delegowanie zdarzeń
Umożliwia nam śledzenie zmian w obiektach podrzędnych za pomocą zdefiniowania
obsługi zdarzenia tylko do nadrzędnego elementu, a nie
dla każdego dziecka obiektu oddzielnie. Dzięki mechanizmowi bąbelkowania możemy przechwycić obiekt, na którym zaszło
zdarzenie, aby tylko na tym obiekcie wykonać określone zadania. 
```js
document.body.addEventListener('click', bgChange);

function random(number) {
	return Math.floor(Math.random()*(number+1));
}

// Wykonujemy określone działania tylko na dzieckach *body*, ktore
// spełniają dodatkowe warunki
function bgChange(e) {
	if(e.target && e.target.nodeName == "LI") {
		let rndCol = 'rgb(' + random(255) + ',' 
			+ random(255) + ',' + random(255) + ')';
	 e.target.style.backgroundColor = rndCol;
	}
}
```

### Zadanie: aplikacja do rysowania
Za pomocą elementów `<div>` zbuduj plansze do rysowania. Liczba użytych
elementów określa dokładność rysowania. Na stronie dodaj możliwość wyboru
koloru, np. za pomocą elementu `<select>` oraz wyboru precyzji rysowania za
pomocą elementu `<input>`. Wykorzystaj mechanizm delegowania zdarzeń do
zbudowania aplikacji. Rysowanie polega na klikaniu na elementach `<div>` w
efekcie czego dany element zmienia kolor.

