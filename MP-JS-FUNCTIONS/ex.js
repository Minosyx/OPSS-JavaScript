const dodaj = document.querySelector('#but1');
const oblicz = document.querySelector('#but2');

const wrapper = document.createElement('div');
const h3 = document.createElement('h3');
h3.textContent = "Lista zakupów: ";
const ul = document. createElement('ul');
const p = document.createElement('p');

document.body.appendChild(wrapper); // dodaję diva, który przechowuje listę zakupów, by paragraf nie zmienił swojego położenia

dodaj.addEventListener('click',() => {
    // Gdy pojawi się zdarzenie kliknięcia na przycisk *dodaj* to wykonanj ten kod
    // Dodaj kolejną obsługę zdarzenia na kliknięcie elementu listy *li*, aby go usunąć
    const product = document.querySelector('#product').value;
    const price = document.querySelector('#price').value;
    let check = 0;
    if(price.split(".")[1]) // sprawdzam czy cena jest liczbą wymierną
      check = price.split(".")[1].length;
    if (product === '')
      alert("Podaj poprawną nazwę produktu");
    else if (price === '' || price < 0)
      alert("Podaj poprawną cenę produktu");
    else if (check > 2) // sprawdzam ilość podanych liczb po przecinku
      alert("Podano zbyt dużą ilość liczb po przecinku!");
    else{
      wrapper.appendChild(h3);
      wrapper.appendChild(ul);
      const li = document.createElement('li');
      li.textContent = product + ", cena: " + price;
      ul.appendChild(li);
      document.querySelector('#product').value = ''; // czyszczenie inputów, po dodaniu elementu do listy zakupów
      document.querySelector('#price').value = '';

      document.querySelector('ul').addEventListener('click', (element) => {
        const delEl = element.target;
        if (delEl){
          if (delEl.tagName.toUpperCase() == 'LI'){
            delEl.remove(); // usuwanie elementu li po kliknięciu na niego
          }
        }
      });
    }
});

oblicz.addEventListener('click',() => {
    // Gdy pojawi się zdarzenie kliknięcia na przycisk *oblicz* to wykonanj ten kod
    // Oblicza całkowitą sumę zakupów
    let sum = 0;
    const it = document.querySelector('ul').children;
    for(let i = 0; i < it.length; i++){
      let val = it[i].textContent.split(':'); // dzielę tekst zawarty w elementach listy
      let fprice = parseFloat(val[1].substring(1)); // wykorzystuję sposób zapisu produktu i ceny na liście zakupów, by wyodrębnić z niego cenę za pomocą substring i zamieniam tekst na liczbę
      sum += fprice;
    }
    document.body.appendChild(p);
    p.textContent = "Łączna cena zakupów wynosi: " + sum.toFixed(2); // zaokrąglanie do 2 liczb po przecinku, w przypadku jeśli suma ma więcej niż 2 liczby po przecinku
});
