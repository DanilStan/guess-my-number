import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputRef: document.querySelector('input'),
  btnCheck: document.querySelector('.left__btn'),
  btnAgain: document.querySelector('.header__btn'),
  scoreValue: document.querySelector('.score'),
  highScoreValue: document.querySelector('.highscore'),
  infoText: document.querySelector('.left__start'),
};
let scoreCurrentValue = 20;
let highScoreCurrentValue = 0;
let randomNumber = getRandomNumber();

refs.inputRef.value = 1;
refs.inputRef.addEventListener('keyup', onInputChange);
refs.btnCheck.addEventListener('click', onCheckClick);
refs.btnAgain.addEventListener('click', onClickAgain);

function onCheckClick() {
  validateInput();
  scoreCurrentValue -= 1;
  refs.scoreValue.textContent = scoreCurrentValue;
  refs.scoreValue.value = scoreCurrentValue;
  numberIsGuessed(scoreCurrentValue);
}

function onClickAgain() {
  resetInterface();
  randomNumber = getRandomNumber();
}

function resetInterface() {
  refs.inputRef.value = 1;
  scoreCurrentValue = 20;
  refs.scoreValue.textContent = 20;
  document.body.style.backgroundColor = '#fff';
  refs.btnCheck.classList.remove('no-animation');
  refs.btnCheck.disabled = false;
  refs.infoText.textContent = 'Guess My Number!';
}

function numberIsGuessed(number) {
  if (randomNumber === Number(refs.inputRef.value)) {
    if (highScoreCurrentValue < number) {
      refs.highScoreValue.textContent = number;
    }
    highScoreCurrentValue = number;
    document.body.style.backgroundColor = '#4cfc49';
    refs.btnCheck.classList.add('no-animation');
    refs.btnCheck.disabled = true;
    refs.infoText.textContent = 'YOU WIN!!! 🎉🎉🎉';
  }

  if (randomNumber < Number(refs.inputRef.value)) {
    refs.infoText.textContent = 'To High!';
  }

  if (randomNumber > Number(refs.inputRef.value)) {
    refs.infoText.textContent = 'To Low!';
  }
}

function validateInput() {
  if (scoreCurrentValue <= 1) {
    refs.btnCheck.classList.add('no-animation');
    refs.btnCheck.disabled = true;
    Report.failure('Ops...', 'Play again', 'Okay');
  }

  if (!refs.inputRef.value) {
    Report.failure('Ops...', 'Please enter a number', 'Okay');
  }

  if (refs.inputRef.value <= 0) {
    refs.inputRef.value = 1;
    Report.failure('Ops...', 'Please enter a positive number', 'Okay');
  }

  if (refs.inputRef.value > 20) {
    refs.inputRef.value = 1;
    Report.failure('Ops...', 'Please enter smaller number', 'Okay');
  }
}

function getRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function onInputChange() {
  this.value = this.value.replace(/[^0-9]/g, '');
}
