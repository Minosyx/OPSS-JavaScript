const pallette = document.querySelector('#color');
const precIn = document.querySelector('#precision');

const wrapper = document.createElement('div');
wrapper.id = 'wrapper';
document.body.appendChild(wrapper);

pallette.value = '#000000';
precIn.value = 0;

var color = pallette.value;
var precision = precIn.value;
var oldPrec;

pallette.addEventListener('input', () => {
    color = pallette.value; // pobranie koloru z elementu input
});

precIn.addEventListener('blur', () => {
    precision = precIn.value; // pobranie precyzji z elementu input
    if (precision < 1) {
        alert("Precyzja musi być większa bądź równa 1!");
    } else {
        if (precision.split('.')) { // sprowadzenie precyzji do liczby naturalnej
            precision = precision.split('.')[0];
            precIn.value = precision;
        }
        const choice = confirm("Ta akcja spowoduje usunięcie aktualnie zakolorowanych pól.\nCzy chcesz kontynuować?");
        if (choice === true) {
            if (document.querySelector('#wrapper').style.display != 'table') { // zmiana sposobu wyswietlania diva zawierajacego planszę do rysowania
                document.querySelector('#wrapper').style.display = 'table';
            }
            let insert = '';
            for (let j = 0; j < precision; j++) { // tworzenie divów do wypełnienia planszy
                insert += "<div class='row'>";
                for (let i = 0; i < precision; i++) {
                    insert += "<div class='cell'></div>";
                }
                insert += "</div>";
            }
            document.querySelector('#wrapper').innerHTML = insert;
            oldPrec = precision; // zapisanie aktualnej precyzji do zmiennej
        } else {
            precIn.value = oldPrec; // przywracanie wartości elementu input w razie anulowania zmiany precyzji
        }
    }
});

document.querySelector('#wrapper').addEventListener('click', (el) => {
    const square = el.target;
    if (square) {
        if (square.className.toUpperCase() == 'CELL') {
            square.style.backgroundColor = color; // zmiana koloru tła divów z klasą cell
            if (color === '#000000') { // zmiana koloru ramki w przypadku czarnego tła
                square.style.borderColor = 'rgb(255, 255, 255, 0.4)';
            } else {
                square.style.borderColor = 'rgb(0, 0, 0, 0.4)';
            }
        }
    }
});
