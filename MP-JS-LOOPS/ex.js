let but = document.querySelector('button');

but.addEventListener('click',statlab);

const table = document.createElement('table');
const td = document.createElement('td');
const h1 = document.createElement('h1');
const title = document.createTextNode("Histogram wygenerowanych liczb losowych");
h1.appendChild(title);
const minimum = document.createElement('p');
const maksimum = document.createElement('p');
const secLen = document.createElement('p');

function statlab(){
  const amount = document.getElementById('amount').value;
  const section = document.getElementById('section').value;
  const switcher = document.getElementById('rozklad').value;

  if (amount == '' || amount == 0)
    alert("Wprowadź poprawną liczbę próbek!");
  else if (section == '' || section == 0)
    alert("Wprowadź poprawną liczbę przedziałów!");
  else if (switcher == '')
    alert("Wybierz poprawny sposób rozkładu!");
  else{
    document.body.appendChild(h1);
    let tab = [];
    let group = [];
    let quantity = [];

    function normal() { //implementacja transformacji Boxa-Mullera do generowania liczb o rozkładzie normalnym
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //ograniczenie generowanych liczb z [0,1) do (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ); //wzór transformacji Boxa-Mullera
        num = num / 10.0 + 0.5;
        /*Istnieje prawdopodobieństwo wygenerowania liczby spoza przedziału (0,1); W ekstremalnych przypadkach
        u i v potrafią wygenerować nam liczbę o wartości większej od 10 czy też mniejszej od -10;
        Dzielimy i dodajemy, by zmniejszyć szansę na ponowne generowanie liczby, by znalazła się w przedziale (0,1)*/
        if (num > 1 || num < 0) return normal();
        /*Powtarzamy generowanie liczby o rozkładzie normalnym, gdy wygenerowana liczba jest nadal spoza zakresu, ponieważ pomimo próby ograniczenia przedziału
        wciąż możemy otrzymać wartości mniejsze od 0 bądź większe od 1*/
        return num;
    }

    switch(switcher){ //wypełnianie tablicy wygenerowanymi liczbami w zależności od sposobu rozkładu
      case "normalny":
      for(let j = 0; j < amount; j++){
        tab.push(normal());
      }
      break;

      case "jednorodny":
      for(let i = 0; i < amount; i++){
        tab.push(Math.random());
      }
      break;
    }
    const min = Math.min(...tab);
    const max = Math.max(...tab);
    const numInSect = (max - min)/section; //ustalenie długości jednego przedziału na podstawie wygenerowanych liczb

    let cond = min; //zmienna pomocnicza do iterowania po przedziałach
    for (let l = 0; l < section; l++){
      let counter = 0; //zmienna do zliczania ilości liczb w danym przedziale
      group.push(l); //numerujemy przedziały
      group[l] = [];
      for (let k = 0; k < tab.length; k++){
        if (tab[k] >= cond && tab[k] < cond + numInSect){
          group[l].push(tab[k]); //do każdego przedziału przyporządkowujemy pasujące do niego liczby
          counter++;
        }
        if (l == section - 1 && tab[k] == max && !group[l].includes(tab[k])){ //ostatni przedział domykamy z prawej strony, by zawierał wartość maksymalną
          group[l].push(tab[k]);
          counter++;
        }
      }
      quantity.push(counter);
      cond += numInSect;
    }

    let intd = "";
    for (let a = 0; a < section; a++){
      intd += "<td></td>"; //generowanie odpowiedniej ilości komórek do wypełnienia wiersza
    }

    let intr = "";
    document.body.appendChild(table);
    for (let it = 0; it < Math.max(...quantity); it++){
      intr += "<tr>"+ intd +"</tr>"; //generowanie odpowiedniej ilości wierszy do wypełnienia tabeli
    }
    table.innerHTML = intr;

    let changecolor = 0;
    for (let b = 0; b < section; b++){
      let iterator = Math.max(...quantity);
      let countdown = quantity[b];
      let trcount = document.getElementsByTagName('tr');
      if(iterator - countdown < iterator){
        trcount[iterator - countdown].getElementsByTagName('td')[b].innerHTML = quantity[b]; //wpisywanie ilości liczb z danego przedziału w maksimum słupka
        if(changecolor == 0)
          trcount[iterator - countdown].getElementsByTagName('td')[b].style.color = "white";
        else
          trcount[iterator - countdown].getElementsByTagName('td')[b].style.color = "black";
      changecolor ^= 1;
      }
      while(countdown > 0){
        trcount[iterator - 1].getElementsByTagName('td')[b].style.backgroundColor = "red"; //zmiana koloru odpowiednich komórek w celu stworzenia słupka
        countdown--;
        iterator--;
      }
    }
    const mint = "Najmniejsza wygenerowana liczba wynosi: "+ min;
    const maxt = "Największa wygenerowana liczba wynosi: "+ max;
    const lent = "Długość przedziału wynosi: "+ numInSect;
    minimum.textContent = mint;
    maksimum.textContent = maxt;
    secLen.textContent = lent;
    document.body.appendChild(minimum);
    document.body.appendChild(maksimum);
    document.body.appendChild(secLen);
  }
}
