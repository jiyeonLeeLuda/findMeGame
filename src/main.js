'use strict';
import * as sound from './sound.js';

const field = document.querySelector('.game__field');
const fieldReact = field.getBoundingClientRect();
const gameButton = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTitmer = document.querySelector('.game__timer');
const popup = document.querySelector('.pop-up');
const popupRefreshBtn = document.querySelector('.pop-up__refresh');

const ITEM_SIZE = 80;
const TARGET_COUNT = 5;
const NON_TARGET_COUNT = 3;
const GAME_DURATION_SEC = 10;

let timer;
let isStarted = false;
let score = 0;

gameButton.addEventListener('click', () => {
  if (isStarted) {
    stopGame('cancel');
  } else {
    startGame();
  }
});

field.addEventListener('click', (event) => {
  if (!isStarted) {
    return;
  }
  const clickedItem = event.target;
  if (clickedItem.matches('.target')) {
    clickedItem.remove();
    score++;
    updateScoreBoard();
    if (score === TARGET_COUNT) {
      stopGame('win');
    }
  } else if (clickedItem.matches('.non-target')) {
    stopGame('lose');
  }
});

function startGame() {
  isStarted = true;
  initGame();
  showGameButton();
  setButtonIconStop();
  showScore();
  showTimer();
  startTimer();
  sound.playBgSound();
}
function stopGame(reason) {
  isStarted = false;
  sound.stopBgSound();
  stopTimer();
  setButtonIconStart();
  hideGameButton();
  showPopupWithText(reason);
}
function initGame() {
  score = 0;
  setTimerBoard(GAME_DURATION_SEC);
  gameScore.innerText = TARGET_COUNT;
  field.innerHTML = '';
  addItem('target', 'img/target.png', TARGET_COUNT);
  addItem('non-target', 'img/minions01.png', NON_TARGET_COUNT);
  addItem('non-target', 'img/minions02.png', NON_TARGET_COUNT);
  addItem('non-target', 'img/minions03.png', NON_TARGET_COUNT);
  addItem('non-target', 'img/minions04.png', NON_TARGET_COUNT);
}

function addItem(className, src, count) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', src);
    item.style.left = `${getRandom(1, fieldReact.width - ITEM_SIZE)}px`;
    item.style.top = `${getRandom(1, fieldReact.height - ITEM_SIZE)}px`;

    field.appendChild(item);
  }
}

function setButtonIconStop() {
  const icon = gameButton.querySelector('.fas');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}
function setButtonIconStart() {
  const icon = gameButton.querySelector('.fas');
  icon.classList.remove('fa-stop');
  icon.classList.add('fa-play');
}
function showGameButton() {
  gameButton.style.visibility = 'visible';
}
function hideGameButton() {
  gameButton.style.visibility = 'hidden';
}
function showScore() {
  gameScore.style.visibility = 'visible';
}
function updateScoreBoard() {
  gameScore.innerText = `${TARGET_COUNT - score}`;
}
function showTimer() {
  gameTitmer.style.visibility = 'visible';
}
function startTimer() {
  let time = GAME_DURATION_SEC;
  timer = setInterval(() => {
    setTimerBoard(time);
    if (time <= 0) {
      stopTimer();
      stopGame(score === TARGET_COUNT ? 'win' : 'lose');
    }
    time--;
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
}

function setTimerBoard(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  gameTitmer.innerText = `${minutes}:${seconds}`;
}

function showPopupWithText(reason) {
  const message = popup.querySelector('.pop-up__message');

  switch (reason) {
    case 'cancel':
      message.innerText = 'Replay?';
      break;
    case 'win':
      message.innerText = 'YOU WIN!';
      break;
    case 'lose':
      message.innerText = 'YOU LOSE~';
      break;
    default:
      throw new Error(`${reason} is not in case`);
  }
  popup.classList.remove('pop-up--hide');
}
popupRefreshBtn.addEventListener('click', () => {
  popup.classList.add('pop-up--hide');
  startGame();
});
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
