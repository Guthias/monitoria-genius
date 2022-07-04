const colorBlue = document.getElementById('color-blue');
const colorRed = document.getElementById('color-red');
const colorGreen = document.getElementById('color-green');
const colorYellow = document.getElementById('color-yellow');
const counter = document.getElementById('point-counter')
const startGameButton = document.getElementById('start-game')

// Gerar uma sequencia aleatoria 😁
// Trocar de cor para mostrar a ordem 😁
// Armazenar a sequencia de cliques do usuario 😁
// Comparar a sequencia de cliques com a sequencia correta 😁
// Incrementa a sequencia aleatoria depois que todos os cliques foram corretos 😁
// Mostrar a pontuação 😁
// Botão para reiniciar o jogo 😁

let colorsOrder = []; // Ordem das cores corretas
let movesOrder = []; // Ordem dos movimentos
let gameStarted = false;

function increaseColorOrder() {
  const possibleColors = ['blue', 'green', 'yellow', 'red'];
  const randomIndex = Math.floor(Math.random() * possibleColors.length);
  colorsOrder.push(possibleColors[randomIndex]);
}

function glowColor(color) {
  let hintColor;

  switch (color) {
    case 'blue': hintColor = colorBlue;
      break;

    case 'green': hintColor = colorGreen;
      break;

    case 'yellow': hintColor = colorYellow;
      break;

    case 'red': hintColor = colorRed;
      break;
  }

  hintColor.classList.add('active');

  setTimeout(function () {
    hintColor.classList.remove('active');
  }, 700);
}

function showHints() {
  for (let i = 0; i < colorsOrder.length; i += 1) {
    setTimeout(() => {
      glowColor(colorsOrder[i]);
    }, i * 1000)
  }
}

function colorClick(event) {
  const color = event.target.id.replace('color-', '');
  movesOrder.push(color);
  glowColor(color);
  playerMove();
}

function verifyMoves() {
  for (let i = 0; i < movesOrder.length; i += 1) {
    if (colorsOrder[i] !== movesOrder[i]) {
      return false;
    }
  }
  return true;
}

function playerMove() {
  if (!gameStarted) return;

  const allMovesCorrect = verifyMoves();

  if (!allMovesCorrect) {
    gameOver();
    return
  }

  if (colorsOrder.length === movesOrder.length) {
    movesOrder = [];
    setTimeout(function () {
      increaseColorOrder();
      showHints();
    }, 1000)
  }

  increasePoints();
}

function resetPoints() {
  counter.innerText = 'Pontos: 0';
}

function increasePoints() {
  const points = counter.innerText.replace('Pontos: ', '');
  counter.innerText = 'Pontos: ' + (+points + 1);
}

function gameOver() {
  const points = counter.innerText.replace('Pontos: ', '');
  counter.innerText = `Você perdeu e fez um total de ${points} pontos`;
  startGameButton.innerText = 'Jogar novamente';
}

function startNewGame() {
  movesOrder = [];
  colorsOrder = [];
  gameStarted = true;

  startGameButton.innerText = 'Reiniciar'
  resetPoints();
  increaseColorOrder();
  showHints();
}

colorBlue.addEventListener('click', colorClick);
colorRed.addEventListener('click', colorClick);
colorGreen.addEventListener('click', colorClick);
colorYellow.addEventListener('click', colorClick);
startGameButton.addEventListener('click', startNewGame);