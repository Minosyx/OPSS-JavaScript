// Zbuduj grę ping-pong. Po obu stronach planszy mamy rakietki w formie prostokątów
// a pomiędzy nimi samodzielnie porusza się piłeczka. Rakietkami steruje się za
// pomocą klawiszy po to, aby odbijać piłeczkę. Ustaw warunki brzegowe tak, aby
// piłeczka odbijała się od rakietek oraz od górnych i dolnych granic stołu. Gracz
// zdobywa punkt jeśli wyjdzie piłeczka poza stół na stronie przeciwnika. Informacja
// o zdobytych punktach jest umieszczana w elementach '<p>'. Gra toczy się do
// uzyskania 21 punktów.
let keyState = [];
const KEY_UP = 38;
const KEY_DOWN = 40;
const W = 87;
const S = 83;
// stałe odpowiadające klawiszom na klawiaturze, by móc później obsługiwać ruch

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const wrapper = document.createElement('div');
const wrapP = document.createElement('div');
const info = document.createElement('div');
let moveStatus = 0;
// zmienna przechowująca informację czy układ jest w ruchu
let popSeen = 0;
// zmienna zapobiegająca wyświetlaniu się komunikatu końcowego w nieskończoność

let player1 = 0;
let player2 = 0;
// wyniki każdego z graczy

info.id = "info";
const controls = document.createElement('p');
controls.id = "controls";
controls.textContent = "Sterowanie";
document.body.appendChild(info);
info.appendChild(controls);
const c1 = document.createElement('p');
c1.id = "c1";
c1.innerHTML = "W/&#8593; - ruch rakietki w górę <br />S/&#8595; - ruch rakietki w dół";
info.appendChild(c1);
// wypisanie sterowania użytkownikowi

function dir(){
  if(Math.random() > 0.5)
    return 1;
  else return -1;
}
// funkcja losująca liczby -1 lub 1 służąca do nadania kierunku piłce

function randNum(){
  return (Math.floor(Math.random() * (10 - 5 + 1) + 5)) * dir();
}
// funkcja losująca liczby z przedziału 5 - 10, które posłużą za prędkość początkową piłki

const sballx = 0.5 * width - 10;
const sbally = 0.5 * height;
const sballvx = 5 * dir();
const sballvy = randNum();
const sleftrx = 0;
const sleftry = 0.5 * height - 50;
const srightrx = width - 20;
const srightry = 0.5 * height - 50;
// warunki początkowe rakietek i piłki

let p1 = prompt("Podaj nazwę pierwszego gracza! (max 16 znaków)");
while (p1.length > 16)
  p1 = prompt("Podaj nazwę pierwszego gracza! (max 16 znaków)");
let p2 = prompt("Podaj nazwę drugiego gracza! (max 16 znaków)");
while (p2.length > 16)
  p2 = prompt("Podaj nazwę drugiego gracza! (max 16 znaków)");
// wprowadzenie nazwy użytkownika

if (p1 === null || p1 === "")
  p1 = "Player 1";
if (p2 === null || p2 === "")
  p2 = "Player 2";

const score1 = document.createElement('p');
const score2 = document.createElement('p');
const names = document.createElement('p');
document.body.appendChild(wrapper);
wrapper.textContent = '\t:\t';
wrapper.insertBefore(score1, wrapper.firstChild);
wrapper.appendChild(score2);
wrapper.id = "wrapper";
score1.className = "score";
score2.className = "score";
score1.id = "s1";
score2.id = "s2";
score1.textContent = '\xa0' + player1;
score2.textContent = player2 + '\xa0';
// wypełniam tablicę wyników non-breakable spacjami, żeby łatwiej ją później centrować
wrapP.id = "wrapP";
p1.id = "p1";
p2.id = "p2";
document.body.appendChild(wrapP);
wrapP.appendChild(names);
while (p1.length < p2.length)
  p1 = '\xa0' + p1;
while (p2.length < p1.length)
  p2 = p2 + '\xa0';
names.textContent = p1 + "\t:\t" + p2;
// dopełniam nazwy użytkowników non-breakable spacjami, żeby móc je wycentrować


const leftr = {x: sleftrx, y: sleftry, width: 20, height: 100};
const rightr = {x: srightrx, y: srightry, width: 20, height: 100};
const ball  = {x: sballx, y: sbally, radius: 10, vx: sballvx, vy: sballvy};
const speed = 15;
let hitcount = 0;

leftr.draw = function() {
  ctx.fillStyle = "white";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

rightr.draw = function() {
  ctx.fillStyle = "white";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

ball.draw = function() {
  ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	ctx.fill();
};
// wyrysowanie obiektów

const keyEventLogger =  function (e) {  keyState[e.keyCode] = e.type == 'keydown';};
window.addEventListener("keydown", keyEventLogger);
window.addEventListener("keyup", keyEventLogger);
// rejestruję naciskane klawisze

function move() { // ruszam odpowiednią rakietką we wskazanym kierunku po wciśnięci przycisku
  if(keyState[KEY_UP]) {
    if(rightr.y <= 0) rightr.y = rightr.y;
    else rightr.y -= speed;
    moveStatus = 1;
  }
  else if(keyState[KEY_DOWN]) {
    if(rightr.y >= height - rightr.height) rightr.y = rightr.y;
    else rightr.y += speed;
    moveStatus = 1;
  }
  if(keyState[W]) {
    if(leftr.y <= 0) leftr.y = leftr.y;
    else leftr.y -= speed;
    moveStatus = 1;
  }
  else if(keyState[S]) {
    if(leftr.y >= height - leftr.height) leftr.y = leftr.y;
    else leftr.y += speed;
    moveStatus = 1;
  }
};

function hit() { // funkcja obsługująca zderzenie piłeczki z rakietką
  if(ball.y + ball.vy >= rightr.y && ball.y + ball.vy <= rightr.y + rightr.height && ball.x < rightr.x && ball.x + ball.vx >= rightr.x){
  	ball.vx = -ball.vx;
    hitcount += 1;
  }
  else if(ball.y + ball.vy >= leftr.y && ball.y + ball.vy <= leftr.y + leftr.height && ball.x > leftr.x + leftr.width && ball.x + ball.vx <= leftr.x + leftr.width){
    ball.vx = -ball.vx;
    hitcount += 1;
  }
};

function point(){ // funkcja sprawdzająca czy piłka wyszła poza stół
  if (ball.x + ball.vx > width + ball.radius) {
    player1 += 1;
    if (player1 < 10)
      score1.textContent = '\xa0' + player1;
    else
      score1.textContent = player1;
    return true; // w przypadku wypadnięcia piłki resetuję układ do stanu domyślnego
  }
  else if (ball.x + ball.vx < 0 - ball.radius) {
    player2 += 1;
    if (player2 < 10)
      score2.textContent = player2 + '\xa0';
    else
      score2.textContent = player2;
    return true; // w przypadku wypadnięcia piłki resetuję układ do stanu domyślnego
  }
};

function reset(){
  ball.x = sballx;
  ball.y = sbally;
  ball.vx = 5 * dir();
  ball.vy = randNum();
  leftr.x = sleftrx;
  leftr.y = sleftry;
  rightr.x = srightrx;
  rightr.y = srightry;
  ball.draw();
  rightr.draw();
  leftr.draw();
  moveStatus = 0;
  hitcount = 0;
}; // resetowanie układu do stanu domyślnego

function update() {
	ctx.clearRect(0,0, width, height);
  hit();
  move();
	leftr.draw();
  rightr.draw();
  if (ball.y + ball.vy > height - ball.radius || ball.y + ball.vy < 0 + ball.radius) {
    ball.vy = -ball.vy;
  } // zderzenie piłki z górną lub dolną częścią stołu
  if (point() === true){
    reset();
  }
  if(hitcount == 5){
    if (ball.vx < 0)
      ball.vx -= 1;
    if (ball.vx > 0)
      ball.vx += 1;
    hitcount = 0;
  } // zwiększam prędkość po x w momencie, gdy liczba odbić piłki od rakiety osiągnie pewną wartość
  if(moveStatus == 1){
    ball.x += ball.vx;
    ball.y += ball.vy;
  } // zaczynam ruch piłki, gdy jedna z rakietek zostanie wprawiona w ruch
	ball.draw();
  if (player1 < 21 && player2 < 21){
	  window.requestAnimationFrame(update);
  } // odświeżam układ dopóki, któryś z graczy nie osiągnie 21 punktów
  if (player1 == 21 && popSeen === 0){
    ctx.clearRect(0,0, width, height);
    reset();
    leftr.draw();
    rightr.draw();
    alert("Gratulacje " + p1 + "\nUdało Ci się pokonać przeciwnika.");
    popSeen = 1;
  }
  else if (player2 == 21 && popSeen === 0){
    ctx.clearRect(0,0, width, height);
    reset();
    leftr.draw();
    rightr.draw();
    alert("Gratulacje " + p2 + "\nUdało Ci się pokonać przeciwnika.");
    popSeen = 1;
  }
};

leftr.draw();
rightr.draw();
update();
