const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const info = document.createElement('div');
const infoL = document.createElement('div');

const keyState = [];
const missles = [];
let enemies = [];
const eAttack = [];

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;
// stałe, które służą do obsługi sterowania statku

const l1_h = 20; // wysokość 1 poziomu statku
const l2_h = 15; // wysokość 2 poziomu statku
const l1_w = 75; // szerokość 1 poziomu statku
const l2_w = 50; // szerokość 2 poziomu statku
const can_w = 15; // szerokość lufy statku
const can_h = 10; // wysokość lufy statku
const can_x = (width - can_w)* 0.5; // współrzędna x położenia początkowego lufy
const ship_x1 = (width - l1_w)* 0.5; // współrzędna x położenia początkowego 1 poziomu statku
const ship_x2 = (width - l2_w)* 0.5; // współrzędna x położenia początkowego 2 poziomu statku
const ship_y = height - l1_h; // współrzędna y położenia statku
// wartości początowe statku

const speed = 10; // prędkość ruchu statku
const m_speed = 15; // prędkość poruszania się pocisku
const a_speed = 10; // prędkość poruszania się pocisku przeciwników
let enemyCount = 0;
const setEnLives = 3; // ilość uderzeń potrzebnych do zabicia przeciwnika
let alertSeen = 0;

info.id = "info";
const controls = document.createElement('p');
controls.id = "controls";
controls.textContent = "Sterowanie";
document.body.appendChild(info);
info.appendChild(controls);
const c1 = document.createElement('p');
c1.id = "c1";
c1.innerHTML = "&#8592; - ruch statku w lewo<br />&#8594; - ruch statku w prawo<br />Spacja - strzał";
info.appendChild(c1);
// wypisanie sterowania graczowi

const ship = {
	x1: ship_x1,
	x2: ship_x2,
	y: ship_y,
	h: l1_h,
	h2: l2_h,
	w: l1_w,
	w2: l2_w,
	cx: can_x,
	cy: can_h,
	cw: can_w,
	lives: 3
};

infoL.id = "lives";
const pL = document.createElement('p');
pL.id = "pLives";
infoL.appendChild(pL);
document.body.appendChild(infoL);
pL.textContent = "Życia: " + ship.lives;
// wypisanie ilości żyć graczowi

ship.draw = function(){
	roundRect(this.x1, this.y, this.w, this.h, "blue");
	roundRect(this.x2, height - this.h - this.h2/2, this.w2, this.h2, "blue");
	ctx.fillStyle = "blue";
	ctx.fillRect(this.cx, height - this.h - this.h2/2 - this.cy, this.cw, this.cy);
};
// metoda rysująca statek

function Missle(xmissle, ymissle, color) {
  this.x = xmissle;
  this.y = ymissle;
	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		ctx.fill();
	};
};
// konstruktor pocisków gracza i przeciwników

function randomColor() {
  const tabColor = '0123456789ABCDEF';
  let cVal = '#';
  for (let i = 0; i < 6; i++) {
    cVal += tabColor[Math.floor(Math.random() * 16)]; // budowanie stringu postaci #klmnop, gdzie kolejne litery oznaczają znaki jakie może przyjąć określanie koloru
  }
  return cVal;
};
// funcja generująca losowy kolor

function Enemy(xenemy, yenemy) {
	this.width = 50;
	this.height = 50;
	this.x = xenemy;
	this.y = yenemy;
	this.lives = setEnLives;
	this.color = randomColor();
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(this.x + this.width/4, this.y + this.height/4, 5, 0, 2 * Math.PI);
		ctx.arc(this.x + this.width*3/4, this.y + this.height/4, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.arc(this.x + this.width/2, this.y + this.height*5/6, 10, 0, Math.PI, true);
		ctx.lineWidth = 3;
		ctx.stroke();
	}
};
// kontruktor wykorzystywany do tworzenia przeciwników

let enemSpeed = 0.5 // prędkość ruchu przeciwników
const numEnem = 7; // ilość przeciwników w rzędzie
const enRows = 4;	// ilość rzędów z przeciwnikami
enemyCount = setEnLives * numEnem * enRows; // ilość całkowitych trafień potrzebna do wygrania gry
function createEnemy(){
	let pwidth = 0;
	const enW = 50;
	let enY = 50;
	for(let i = 0; i < enRows; i++){
		enemies.push([]);
		pwidth = width * 1.0 / numEnem;
		for(let j = 0; j < numEnem; j++){
			const enemy = new Enemy((j * pwidth) + ((pwidth - enW) * 0.5), enY);
			enemies[i].push(enemy);
		}
		enY += 100;
	}
};
// funkcja tworząca przeciwników i umieszczająca ich w tablicy enemies

function roundRect(x, y, w, h, color){
	const radius = 5;
  const r = x + w;
  const b = y + h;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x+radius, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y + radius);
  ctx.lineTo(r, y + h - radius);
  ctx.quadraticCurveTo(r, b, r - radius, b);
  ctx.lineTo(x + radius, b);
  ctx.quadraticCurveTo(x, b, x, b - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
};
// funkcja wykorzystywana do rysowania prostokątów z zaokrąglonymi rogami

const keyEventLogger =  function (e) {  keyState[e.keyCode] = e.type == 'keydown';};
window.addEventListener("keydown", keyEventLogger);
window.addEventListener("keyup", keyEventLogger);
// obsługa wydarzeń związana z naciskaniem odpowiednich klawiszy

function newMissle(x, y, color, tab){
	const aMissle = new Missle(x, y, color);
	if(tab == 0)
		missles.push(aMissle);
	else if(tab == 1)
		eAttack.push(aMissle);
};
// funkcja tworząca nowe pociski i odpowiednio je grupująca jako pociski przeciwników lub gracza

function move(){
	if(keyState[KEY_LEFT]){
		if(ship.x1 <= 0) {
			ship.x1 = ship.x1;
			ship.x2 = ship.x2;
			ship.cx = ship.cx;
		}
		else {
			ship.x1 -= speed;
			ship.x2 -= speed;
			ship.cx -= speed;
		}
	}
	else if(keyState[KEY_RIGHT]){
		if(ship.x1 >= width - ship.w) {
			ship.x1 = ship.x1;
			ship.x2 = ship.x2;
			ship.cx = ship.cx;
		}
		else {
			ship.x1 += speed;
			ship.x2 += speed;
			ship.cx += speed;
		}
	}
};
// obługa ruchu statku

document.addEventListener('keyup', function(e){
	e.preventDefault();
	if(e.code == "Space" && missles.length < 3){ // maksymalna ilość pocisków na ekranie wynosi 3
		newMissle(ship.cx + 7.2, height - ship.h - ship.h2/2, "white", 0);
	}
});
// tworzenie nowego pocisku gracza

function misslesUpdate(){
	if(missles.length != 0){
		for(let k = 0; k < missles.length; k++){
			missles[k].y -= m_speed;
			missles[k].draw();
			if (missles[0].y < 0)
				missles.shift(); // jeśli pocisk wyjdzie z planszy to wyrzucamy pierwszy pocisk z tablicy pocisków
		}
	}
};
// funkcja obsługująca ruch pocisku gracza

function wallhit(pos){
	if(pos.x + enemSpeed >= width - pos.width){
		enemSpeed *= -1;
		return true;
	}
	else if(pos.x + enemSpeed <= 0){
		enemSpeed *= -1;
	}
};
// funkcja obługująca zmianę kierunku poruszania się przeciwników w przypadku zderzenia krańcowych przedstawicieli ze ścianą

function enMove(){
	let rHit = false;
	if(enemSpeed > 0){
		rHit = wallhit(enemies[0][enemies[0].length - 1]); // sprawdzam czy ostatni przeciwnik w rzędzie uderza w prawą ścianę
	}
	else if(enemSpeed < 0){
		wallhit(enemies[0][0]); // sprawdzam czy pierwszy przciwnik uderza w lewą ścianę
	}
	for(let l = 0; l < enemies.length; l++){
		if(enemies[l].length != 0){
			for(let m = 0; m < enemies[l].length; m++){
				enemies[l][m].x += enemSpeed; // obsługa ruchu przeciwników horyzontalnie
				if(rHit === true) // jeśli przeciwnicy uderzą w prawą ścianę to zbliżają się do gracza
					enemies[l][m].y += 25;
				if(enemies[l][m].lives != 0) // jeśli liczba trafionych uderzeń do zabicia przeciwnika nie została osiągnięta to jest on rysowany
					enemies[l][m].draw();
			}
		}
	}
};

function mHit(){
	if(missles.length != 0){
		for(let i = 0; i < missles.length; i++){
			for(let j = enRows - 1; j >= 0; j--){ // iteruję po tablicy z przeciwnikami od końca, bo przeciwnicy, którzy znajdują się bliżej są dalej w tablicy
				let escape = false;
				for(let k = 0; k < enemies[j].length; k++){
					if(missles[i].x >= enemies[j][k].x && missles[i].x <= enemies[j][k].x + enemies[j][k].width && missles[i].y >= enemies[j][k].y + enemies[j][k].height && missles[i].y - m_speed <= enemies[j][k].y + enemies[j][k].height && enemies[j][k].lives != 0){
						enemies[j][k].lives--;
						enemyCount--;
						missles.splice(i, 1); // w przypadku trafienia przeciwnika pociskiem zmniejszam ilość trafień potrzebnych do zabicia przeciwnika oraz całkowitych trafień do wygrania gry oraz wyrzucam pocisk z tablicy
						escape = true;
						break;
					}
				}
				if(escape == true) // jeśli przeciwnik został trafiony to wychodzę z pętli, gdyż pocisk już nie istnieje
					break;
			}
		}
	}
};

function shipKill(){
	for(let k = 0; k < eAttack.length; k++){
		if(eAttack[k].x >= ship.x1 && eAttack[k].x <= ship.x1 + ship.w && eAttack[k].y >= height - ship.h && eAttack[k].y - a_speed < height - ship.h){
			eAttack.splice(k, 1);
			ship.lives--;
			return true; // obługa trafienia statku przez pocisk przeciwnika
		}
	}
	for(let i = enRows - 1; i >= 0; i--){
		if(enemies[i][0].y + enemies[i][0].height >= height - ship.h - ship.h2/2 - ship.cy){
			for(let j = 0; j < enemies[i].length; j++){
				if(enemies[i][j].y + enemies[i][j].height >= height - ship.h - ship.h2/2 - ship.cy && enemies[i][j].lives != 0){
					ship.lives--;
					return true; // zdarzenie, gdy przeciwnicy za bardzo zbliżą się do statku gracza
				}
			}
		}
	}
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// funkcja zwracająca losową liczbę z określonego przedziału

function enAttack(){
	const row = randomInteger(0, enRows - 1);
	const eNum = randomInteger(0, numEnem - 1);
	if(enemies[row][eNum].lives != 0){
		newMissle(enemies[row][eNum].x + enemies[row][eNum].width/2, enemies[row][eNum].y + enemies[row][eNum].height, "red", 1);
	}
};
// funkcja obsługująca strzał przez losowego przeciwnika

function enUpdate(){
	if(eAttack.length != 0){
		for(let i = 0; i < eAttack.length; i++){
			eAttack[i].y += a_speed;
			eAttack[i].draw();
			if(eAttack[i].y >= height) // jeśli pocisk wyjdzie poza planszę to jest wyrzucany z tablicy
				eAttack.splice(i, 1);
		}
	}
};
// funkcja obługująca ruch pocisków przeciwnika

function reset(){
	ship.x1 = ship_x1;
	ship.x2 = ship_x2;
	ship.y = ship_y;
	ship.h = l1_h;
	ship.h2 = l2_h;
	ship.w = l1_w;
	ship.w2 = l2_w;
	ship.cx = can_x;
	ship.cy = can_h;
	ship.cw = can_w;
	enemies = [];
	createEnemy();
};
// funkcja resetująca układ do stanu początkowego

let timer = 0;
let sTime = randomInteger(25, 150);
function update(){
	timer++;
	let is_Killed = false;
	ctx.clearRect(0,0, width, height);
	move();
	misslesUpdate();
	enMove();
	mHit();
	if(timer == sTime){
		timer = 0;
		sTime = randomInteger(25, 150);
		enAttack();
	} // wywołanie strzału przeciwnika w losowym momencie czasu z określonego przedziału
	enUpdate();
	is_Killed = shipKill();
	if(is_Killed == true){
		if(ship.lives > 0)
			pL.textContent = "Życia: " + ship.lives;
		else
			pL.textContent = "Życia: 0";
		reset();
	} // aktualizacja żyć gracza i reset układu w przypadku zostania trafionym
	ship.draw();
	if(ship.lives > 0 && enemyCount > 0){
		window.requestAnimationFrame(update);
	}
	else if(ship.lives == 0 || enemyCount == 0){ // zakończenie gry z odpowiednim komunikatem końcowym
		reset();
		if(ship.lives == 0 && alertSeen == 0){
			alert("Koniec gry!!!\nNie udało Ci się pokonać przeciwników!");
		}
		else if(enemyCount == 0 && alertSeen == 0){
			alert("Brawo!!!\nPokonałeś wszystkich przeciwników!");
		}
		alertSeen = 1;
		update();
	}
};

createEnemy();
ship.draw();
update();
