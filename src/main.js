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
let randomNumber = 1;
refs.inputRef.value = 1;
refs.inputRef.addEventListener('keyup', onInputChange);
refs.btnCheck.addEventListener('click', onCheckClick);

function onInputChange() {
  this.value = this.value.replace(/[^0-9]/g, '');
}

function onCheckClick() {
  validateInput();
  getRandomNumber();
  console.log(refs.inputRef.value);
  console.log(randomNumber);
}

function validateInput() {
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
  randomNumber = Math.trunc(Math.random() * 20) + 1;
}
