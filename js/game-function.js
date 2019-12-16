console.log('Игра запущена!');

var inputNamePlayer = document.querySelector('#start-user-name');
var inputButtonPlay = document.querySelector('.play-button');
var startWindow = document.querySelector('.start');
var resultWindow = {
    el: document.querySelector('.results'),
    username: document.querySelector('tr:last-child .result-username'),
    points: document.querySelector('tr:last-child  .result-points'),
    replay: document.querySelector('.result-button'),
}
var pauseWindow = {
    active: false,
    el: document.querySelector('.pause'),
    window: document.querySelector('.window-pause'),
}
var elSplashes = document.querySelector(".splashes");
var requestId;
// var boom = document.querySelector('img');
var clickFruits;
var fruit;
var setBoom;
var ctx;
var player = {
    name: 'tester',
    elName: document.querySelector('span.name'),
    points: 0,
    elPoints: document.querySelector('span.points'),
    time: {
        mm: 2,
        ss: 59,
    },
    elTime: document.querySelector('span.time'),
    catchFruit: 'banana',
    elCatchFruit: document.querySelector('.catch-fruit > img'),
    health: 3,
    elHealth: document.querySelector('.health:nth-child(3)'),
};

var lines = {
    'fruitLine1': {
        el: document.querySelector('.fruit-game:nth-child(1)'),
        elImg: document.querySelector('.fruit-game:nth-child(1) > img'),
        y: 0,
        x: innerWidth / 10 * 1 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine2': {
        el: document.querySelector('.fruit-game:nth-child(2)'),
        elImg: document.querySelector('.fruit-game:nth-child(2) > img'),
        y: 0,
        x: innerWidth / 10 * 2 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine3': {
        el: document.querySelector('.fruit-game:nth-child(3)'),
        elImg: document.querySelector('.fruit-game:nth-child(3) > img'),
        y: 0,
        x: innerWidth / 10 * 3 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine4': {
        el: document.querySelector('.fruit-game:nth-child(4)'),
        elImg: document.querySelector('.fruit-game:nth-child(4) > img'),
        y: 0,
        x: innerWidth / 10 * 4 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine5': {
        el: document.querySelector('.fruit-game:nth-child(5)'),
        elImg: document.querySelector('.fruit-game:nth-child(5) > img'),
        y: 0,
        x: innerWidth / 10 * 5 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine6': {
        el: document.querySelector('.fruit-game:nth-child(6)'),
        elImg: document.querySelector('.fruit-game:nth-child(6) > img'),
        y: 0,
        x: innerWidth / 10 * 6 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine7': {
        el: document.querySelector('.fruit-game:nth-child(7)'),
        elImg: document.querySelector('.fruit-game:nth-child(7) > img'),
        y: 0,
        x: innerWidth / 10 * 7 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine8': {
        el: document.querySelector('.fruit-game:nth-child(8)'),
        elImg: document.querySelector('.fruit-game:nth-child(8) > img'),
        y: 0,
        x: innerWidth / 10 * 8 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine9': {
        el: document.querySelector('.fruit-game:nth-child(9)'),
        elImg: document.querySelector('.fruit-game:nth-child(9) > img'),
        y: 0,
        x: innerWidth / 10 * 9 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
    'fruitLine10': {
        el: document.querySelector('.fruit-game:nth-child(10)'),
        elImg: document.querySelector('.fruit-game:nth-child(10) > img'),
        y: 0,
        x: innerWidth / 10 * 10 - innerWidth / 10 / 2,
        fruit: 'banana',
        speed: 0,
        search: false,
    },
};
var boom = {
    canvas: document.querySelector(".boom"),
    image: new Image(165, 165),
    width: 165,
    height: 165,
    frames: 16,
    currentFrame: 0,
};
var gun = {
    el: document.querySelector('.gun'),
    rotate: 0,
    coursorX: 0,
    coursorY: 0,
};
var fruits = ['banana', 'apple', 'diet', 'orange', 'papaya', 'pear', 'pineapple'];
var arrLine = ['fruitLine1', 'fruitLine2', 'fruitLine3', 'fruitLine4', 'fruitLine5', 'fruitLine6', 'fruitLine7', 'fruitLine8', 'fruitLine9', 'fruitLine10'];

// Генерация рандомного числа
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Рандомная генерация фруктов в начале игры
function getRandomFruits() {
    for (var j = 0; j < arrLine.length; j++) {
        var randomNum = Math.ceil(getRandom(0, 6));
        lines[arrLine[j]].fruit = fruits[randomNum];
        lines[arrLine[j]].el.classList.add(lines[arrLine[j]].fruit);
        lines[arrLine[j]].elImg.src = 'img/' + lines[arrLine[j]].fruit + ".svg";
    }
}

// Рандомная генерация отдельного фрукта
function getRandomFruit(i) {
    var randomNum = Math.ceil(getRandom(0, 6));

    lines[arrLine[i]].el.classList.remove(lines[arrLine[i]].fruit);
    lines[arrLine[i]].el.classList.add(fruits[randomNum]);

    lines[arrLine[i]].fruit = fruits[randomNum];
    lines[arrLine[i]].elImg.src = 'img/' + lines[arrLine[i]].fruit + ".svg";
}

// Рандомная генерация скорости фруктов в начале игры
function getSpeedFruits() {
    for (var j = 0; j < arrLine.length; j++) {
        var randomNum = getRandom(10, 25);
        lines[arrLine[j]].speed = randomNum;
    }
}

// Рандомная генерация скорости отдельного фрукта
function getSpeedFruit(i) {
        var randomNum = getRandom(7, 25);
        lines[arrLine[i]].speed = randomNum;
}

// Генерация выбранного фрукта
function getCatchFruit() {
    var randomNum = Math.ceil(getRandom(0, 6));
    player.catchFruit = fruits[randomNum];
    player.elCatchFruit.src = 'img/' + player.catchFruit + '.svg';
    clickFruits = document.querySelectorAll('.' + player.catchFruit);
}

// Отображение очков
function getScore() {
    player.elPoints.innerHTML = player.points;
}

function timer() {
    // console.log(player.time.ss);
    if (player.time.ss < 1) {
        player.time.mm -= 1;
        player.time.ss = 59;
        if (player.time.mm < 10) {
            player.time.mm = '0' + String(player.time.mm);
        }
    } else {
        player.time.ss -= 1;
        if (player.time.ss < 10) {
            player.time.ss = '0' + String(player.time.ss);
        }
    }
    player.elTime.innerHTML = player.time.mm + ':' + player.time.ss;
    if (Number(player.time.mm) <= 0 && player.time.ss <= 0) {
        stopPlay();
        resultWindow.el.style.display = "flex"; // Открытие окна результата
    }
}

// Вычитание жизней
function getMinusHealth() {
    player.elHealth = document.querySelector('.health:nth-child(' + player.health + ')');
    player.elHealth.style.visibility = 'hidden';
    player.health -= 1;

    if (player.health <= 0) {
        console.log('Игра окончена!');
    }
}

// Добавление жизней
function getPlusHealth() {
    for(var t = 1; t <= 3; t++) {
        player.elHealth = document.querySelector('.health:nth-child(' + t + ')');
        player.elHealth.style.visibility = 'visible';
        player.health = t;
    }
}

// Добавление брызг
function getSplashes(fruitSplash) {
    var createSplash = document.createElement('img');
    createSplash.src = 'img/splashes/' + lines[arrLine[fruitSplash.index()]].fruit + '/' + Math.ceil(getRandom(1, 9)) + '.png';
    createSplash.classList.add("splash");

    createSplash.style.width = Math.ceil(getRandom(150, 200)) + 'px';
    createSplash.style.height = 'auto';
    createSplash.style.position = 'absolute';
    // createSplash.style.transform = 'translate(' + (lines[arrLine[fruitSplash.index()]].x - 50) + 'px,' + lines[arrLine[fruitSplash.index()]].y + 'px)';
    createSplash.style.left = (lines[arrLine[fruitSplash.index()]].x - 80) + 'px';
    createSplash.style.top = lines[arrLine[fruitSplash.index()]].y + 'px';

    elSplashes.appendChild(createSplash);
}

// Анимация взрыва
function getBoom() {
    console.log('Анимация!');

    ctx.clearRect(0, 0, boom.width, boom.height);
    ctx.drawImage(boom.image, 0, boom.height * boom.currentFrame, boom.width, boom.height, 0, 0, boom.width, boom.height);

    if (boom.currentFrame == boom.frames) {
        boom.currentFrame = 0;
        clearInterval(setBoom);
    } else {
        boom.currentFrame++;
    }
}

// Движение пушки
function moveGun(a) {
    console.log('Выполнено');
    gun.rotate += (((innerWidth / 2) + a.pageX) + (innerHeight + a.pageY)) / 5;
    coursorX = innerWidth / 2 - a.pageX;
    coursorY = innerHeight - a.pageY;
    console.log(a.pageX + ', ' + a.pageY);
    console.log(coursorX + ', ' + coursorY);
    if (gun.rotate > 0) {
        gun.el.style.transform = 'rotate(' + gun.rotate + 'deg)';
        // console.log(gun.rotate);
    } else {
        gun.el.style.transform = 'rotate(' + gun.rotate + 'deg)';
        // console.log(gun.rotate);
    }
}

function stopPlay() {
    window.cancelAnimationFrame(requestId);
    clearInterval(setTimer);
}

// Обработка клика по всем фруктам
var y = 1;
function getClick() {
    console.log('Клик!');
    if (lines[arrLine[$(this).index()]].fruit === player.catchFruit) {
        lines[arrLine[$(this).index()]].search = true;
    } else {
        lines[arrLine[$(this).index()]].search = false;
    }

    if (lines[arrLine[$(this).index()]].search) {
        getCatchFruit(); // Генерируется новый выбранный фрукт
        if (boom.currentFrame === 0) {
            boom.canvas.style.left = lines[arrLine[$(this).index()]].x - 80 + 'px';
            boom.canvas.style.top = lines[arrLine[$(this).index()]].y + 'px';
            setBoom = setInterval(getBoom, 35, $(this)); // Вызов взрыва
        }
        getSpeedFruit($(this).index()); // ...Генерируется новая скорость
        getRandomFruit($(this).index()); // ...Генерируется новый фрукт
        getSplashes($(this)); // Добавление брызг
        lines[arrLine[$(this).index()]].y = -100; // Элемент перемещается на стартовую позицию
        player.points += 1; // Добавление очков
    } else {
        if (boom.currentFrame === 0) {
            boom.canvas.style.left = lines[arrLine[$(this).index()]].x - 80 + 'px';
            boom.canvas.style.top = lines[arrLine[$(this).index()]].y + 'px';
            setBoom = setInterval(getBoom, 35); // Вызов взрыва
        }
        getSplashes($(this)); // Добавление брызг
        getMinusHealth(); // Вычитание жизней
        if (!player.health) {
            lines[arrLine[$(this).index()]].el.style.visibility = 'hidden'; // Скрытие взорванного элемента
            resultWindow.el.style.display = "flex"; // Открытие окна результата
            resultWindow.username.innerHTML = player.name;
            resultWindow.points.innerHTML = player.points;
            stopPlay(); // Остановка игры
        } else {
            lines[arrLine[$(this).index()]].y = -100; // Элемент перемещается на стартовую позицию
            getSpeedFruit($(this).index()); // ...Генерируется новая скорость
            getRandomFruit($(this).index()); // ...Генерируется новый фрукт
        }
    }
    getScore(); // Отображение очков
}

function getPause() {
    if (pauseWindow.active == false) {
        stopPlay();
        pauseWindow.window.style.display = 'block';
        pauseWindow.active = true;
    } else {
        requestId = window.requestAnimationFrame(moveFruits);
        pauseWindow.window.style.display = 'none';
        pauseWindow.active = false;
    }
}

// Перезапуск игры
function getReplay() {
    for (var j = 0; j < arrLine.length; j++) {
        lines[arrLine[j]].y = 0; // Изменение позиции
        lines[arrLine[j]].el.style.visibility = 'visible'; // Видимость элемента
        lines[arrLine[j]].el.style.transform = 'translateY(' + lines[arrLine[j]].y + 'px)'; // Перемещение элемента на стартовую позицию
    }

    player.points = 0;
    getPlusHealth();

    player.time.mm = 2;
    player.time.ss = 59;

    if (player.time.mm < 10) {
        player.time.mm = '0' + String(player.time.mm);
    }
    if (player.time.ss < 10) {
        player.time.ss = '0' + String(player.time.ss);
    }

    player.elTime.innerHTML = player.time.mm + ':' + player.time.ss;

    setTimer = setInterval(timer, 1000);
    getRandomFruits(); // Генерация случайных фруктов
    getCatchFruit(); // Генерация выбранного фрукта
    getSpeedFruits(); // Генерация случайной скорости передвижения
    getScore(); // Отображение очков
    resultWindow.el.style.display = "none";
    requestId = window.requestAnimationFrame(moveFruits);
}

// Запуск игры по нажатию на кнопку
var setTimer;
function getPlay() {
    if (inputNamePlayer.value !== '') {
        for (var k = 0; k < arrLine.length; k++) {
            lines[arrLine[k]].el.addEventListener('click', getClick);
        }

        resultWindow.replay.addEventListener('click', getReplay);
        pauseWindow.el.addEventListener('click', getPause);
        // document.addEventListener('mousemove', moveGun); // Вызов движения пушки

        boom.image.src = 'img/sprites/boom.png';
        ctx = boom.canvas.getContext("2d");
        setTimer = setInterval(timer, 1000);

        startWindow.style.display = 'none';

        player.name = inputNamePlayer.value;
        player.elName.innerHTML = player.name;

        if (player.elName.textContent == 'tester') {
            player.elName.style.boxShadow = 'inset 0px -3px 0px 0px #f00';
        }

        // var i; // index элемента
        // var timestampSwap = timestamp; // Запись "предыдущего времени" для вычисления разницы

        requestId = window.requestAnimationFrame(moveFruits);
    }
}

// Очистка поля
function removeSplashes() {
    var removeSplash = document.querySelectorAll('.splash'); // Запись коллекции элементов
    for (var i = 0; i < removeSplash.length; i++) { // i элемент коллекции...
        removeSplash[i].remove(); // ...удален
    }
}

function moveFruits() {
    var speedFruits = 35; // Скорость перемещения элементов (порпорционально)

    // Выбор элемента
    for (i = 0; i < arrLine.length; i++) {
        clickFruits = document.querySelectorAll('.' + player.catchFruit);
        fruit = document.querySelector('.fruit-game:nth-child(' + (i + 1) + ')');

        // Анимация, если элемент линии не опустился ниже экрана то он опускается дальше
        if (lines[arrLine[i]].y < innerHeight) {
            lines[arrLine[i]].y += speedFruits   / lines[arrLine[i]].speed;
            fruit.style.transform = 'translateY(' + lines[arrLine[i]].y + 'px)';
        }
        // Иначе, если опустился...
        else if (lines[arrLine[i]].y >= innerHeight) {
            getSpeedFruit(i); // ...Генерируется новая скорость
            getRandomFruit(i); // ...Генерируется новый фрукт
            lines[arrLine[i]].y = -100; // Элемент перемещается на стартовую позицию
        }
    }
    requestId = window.requestAnimationFrame(moveFruits);
}

if (player.time.mm < 10) {
    player.time.mm = '0' + String(player.time.mm);
}
if (player.time.ss < 10) {
    player.time.ss = '0' + String(player.time.ss);
}

player.elTime.innerHTML = player.time.mm + ':' + player.time.ss;
player.elPoints.innerHTML = player.points;

getRandomFruits(); // Генерация случайных фруктов
getCatchFruit(); // Генерация выбранного фрукта
getSpeedFruits(); // Генерация случайной скорости передвижения
getScore(); // Отображение очков

// console.log(lines.fruitLine1.y);

inputButtonPlay.addEventListener('click', getPlay);
