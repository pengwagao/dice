//"use strict";
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Roll dice function
const dice = function(){
    let numbers = Math.trunc(Math.random()*6+1);
    return numbers;
};
let count = 0;
let total = 0;
//let playTurn = (count%2 == 0) ? 0:1;
let playTurn = count%2;
let gameOver = false;
const btnNew = document.querySelector('.btn-new');
const activePlayer = [document.querySelector('.player-0-panel'),document.querySelector(".player-1-panel")];
const rollDice = document.querySelector(".btn-roll");
const hold = document.querySelector(".btn-hold");
let diceEl = document.querySelector(".dice");
let playerCurrentScore = document.querySelectorAll(".player-current-score");
let playerScore = document.querySelectorAll(".player-score");
let playerLabel = document.querySelectorAll(".player-current-label");
//console.log(playerScore[playTurn],playerCurrentScore[playTurn]);
btnNew.addEventListener("click", function () {
  total = 0;
  count = 0;
  activePlayer[0].classList.add("active");
  activePlayer[1].classList.remove("active");
  playerScore[0].textContent = 0;
  playerCurrentScore[0].textContent = 0;  
  playerScore[1].textContent = 0;
  playerCurrentScore[1].textContent = 0;
  document.querySelector(".btn-win").textContent="";
  playTurn = 0;
  diceEl.classList.add("hidden");
  gameOver = false;
});

rollDice.addEventListener("click", function () {
  if (!gameOver){
  let num = dice();  
  document.querySelector(".dice").src = "dice-" + num + ".png";
  playerCurrentScore[playTurn].textContent = num;
  diceEl.classList.remove("hidden");
  if (num !== 1){
    total = total + num;
    playerCurrentScore[playTurn].textContent = total;
    if (parseInt(playerScore[playTurn].textContent) >= 50) {
      playerLabel[playTurn].textContent = "Winner";
      // alert(`Player ${playTurn} is Winner,Game Over`);
      document.querySelector(".btn-win").textContent = `Game Over, Player ${
        playTurn + 1
      } is Winner`;
      diceEl.classList.add("hidden");
      gameOver = true;
    }}else{
    count++;
    total =0;
    activePlayer[playTurn].classList.remove("active");
    playTurn = count%2 ;
    activePlayer[playTurn].classList.add("active");  
    playerCurrentScore[playTurn].textConten = total;
    };
    //console.log(num, total, playerScore[playTurn].textContent);
  };
});
  hold.addEventListener("click", function () {
    if(!gameOver){
    playerScore[playTurn].textContent =
      parseInt(playerCurrentScore[playTurn].textContent) +
      parseInt(playerScore[playTurn].textContent);
      playerCurrentScore[playTurn].textContent = 0;
    if (parseInt(playerScore[playTurn].textContent) >= 50) {
      playerLabel[playTurn].textContent = "Winner";
      // alert(`Player ${playTurn+1} is Winner,Game Over`);
      document.querySelector(".btn-win").textContent = `Game Over,Player ${playTurn + 1 } is Winner`;
      diceEl.classList.add("hidden");    
      gameOver =true;
      diceEl.classList.remove("hidden");
    } else {
    count++;    
    total = 0;
    activePlayer[playTurn].classList.remove("active");
    playTurn = count % 2;
    activePlayer[playTurn].classList.add("active");
    playerCurrentScore[playTurn].textContent = 0;
    };
  };
  });