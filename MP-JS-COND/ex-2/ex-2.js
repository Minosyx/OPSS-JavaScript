let select = document.querySelector('select');

// Ta metoda monitoruje zachowanie obiektu 'select' i wywołuje funkcję createCalendar, jesli zaszła zmiana na obiekcie
// To na co jeszcze może zareagować metoda addEventlistener znajdziecie tutaj:
// https://developer.mozilla.org/en-US/docs/Web/Events
select.addEventListener('change', createCalendar);

let tab = document.createElement('table');
let h1 = document.createElement('h1');

function createCalendar(){
  let counter = 0;
  let monthName = "";
  let month = select.value;
  let date = new Date();
  let year = date.getFullYear();
  date.setDate(1);
  date.setMonth(month - 1);
  date.setYear(year);

  let firstDay = date.getDay();
  let numberOfDays = new Date(year, month, 0).getDate();
  switch(month){
    case '1':
    monthName = "Styczeń";
    break;
    case '2':
    monthName = "Luty";
    break;
    case '3':
    monthName = "Marzec";
    break;
    case '4':
    monthName = "Kwiecień";
    break;
    case '5':
    monthName = "Maj";
    break;
    case '6':
    monthName = "Czerwiec";
    break;
    case '7':
    monthName = "Lipiec";
    break;
    case '8':
    monthName = "Sierpień";
    break;
    case '9':
    monthName = "Wrzesień";
    break;
    case '10':
    monthName = "Październik";
    break;
    case '11':
    monthName = "Listopad";
    break;
    case '12':
    monthName = "Grudzień";
    break;
  }

  firstDay = (firstDay + 6) % 7;
  days = "<tr><th>Pon</th><th>Wt</th><th>Śr</th><th>Czw</th><th>Pt</th><th>Sob</th><th>Nd</th></tr>";
  tab.innerHTML = days;

  if(Math.floor((numberOfDays + firstDay)%7 == 0)){
    counter = Math.floor((numberOfDays + firstDay)/7);
  }
  else{
    counter = Math.floor((numberOfDays + firstDay)/7) + 1;
  }

  console.log()
  let k = 1;
  for (let i = 0; i < counter; i++){
    let row = document.createElement('tr');
    tab.appendChild(row);
    for (let j = 0; j < 7; j++){
      let cell = document.createElement('td');
      row.append(cell);
      if(i == 0 && j == firstDay){
        cell.innerHTML = k;
        k++;
      }
      else if((i == 0 && j > firstDay) || ((i > 0) && (k < numberOfDays + 1))){
        cell.innerHTML = k;
        k++;
      }
      cell.style.border = "2px solid black";
      cell.style.borderCollapse = "collapse";
      cell.style.width = "50px";
    }
  }
  th = document.getElementsByTagName('th');
  for(let k = 0; k < 7; k++){
    th[k].style.border = "2px solid black";
    th[k].style.borderCollapse = "collapse";
  }
  h1.innerHTML = monthName;
}

tab.style.border = "2px solid black";
tab.style.borderCollapse = "collapse";
document.body.appendChild(h1);
document.body.appendChild(tab);
