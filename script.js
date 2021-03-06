const winningCombos = {
  rock: { win: 'scissors', lose: 'paper' },
  scissors: { win: 'paper', lose: 'rock' },
  paper: { win: 'rock', lose: 'scissors' }
}

function disableChoiceButtons() {
  const choicesP = document.querySelector('#choices-p');
  const choiceButtons = document.querySelectorAll('#btns-container button');

  choicesP.textContent = 'Game Over';

  [...choiceButtons].forEach(btn => {
    btn.disabled = true;
    btn.style.backgroundColor = '#eee';
    btn.style.borderColor = '#aaa';
  });
}

function displayScore(scores) {
  return `Player: ${scores.player} | Computer: ${scores.computer}`;
}

function displayMatchResults(scores, matchResults, roundsToPlay, roundNumber) {
  let roundResultsContainer;
  let roundResultsH2;
  let roundResultsP;
  let roundScoresP;

  if (!document.querySelector('.round-results-container')) {
    roundResultsContainer = document.createElement('div');
    roundResultsH2 = document.createElement('h2');
    roundResultsP = document.createElement('p');
    playerScoreP = document.createElement('p');
    computerScoreP = document.createElement('p');
    
    roundResultsH2.id = 'round-results-h2';
    roundResultsContainer.classList.add('round-results-container')
    roundResultsP.classList.add('round-results');
    playerScoreP.classList.add('round-scores');
    computerScoreP.classList.add('round-scores');

    [roundResultsH2, roundResultsP, playerScoreP, computerScoreP].forEach(el => roundResultsContainer.appendChild(el));
    document.querySelector('body').appendChild(roundResultsContainer);
  } else {
    roundResultsContainer = document.querySelector('.round-results-container');
    roundResultsH2 = document.querySelector('#round-results-h2');
    roundResultsP = document.querySelector('.round-results');
    [playerScoreP, computerScoreP] = [...document.querySelectorAll('.round-scores')];
  }

  if (roundNumber < 5) { 
    roundResultsH2.textContent = `Round: ${roundNumber}`;
    roundResultsP.textContent = matchResults;
    playerScoreP.textContent = `Player: ${scores.player}`;
    computerScoreP.textContent = `Computer: ${scores.computer}`;
  } else {
    roundResultsH2.textContent = '';
    roundResultsP.textContent = '';
    playerScoreP.textContent = '';
    computerScoreP.textContent = '';
  }
}

function displayEndMessage(scores, roundHistory) {
  let roundResultsH2 = document.querySelector('#round-results-h2');
  let roundResultsP = document.querySelector('.round-results');
  let [playerScoreP, computerScoreP] = [...document.querySelectorAll('.round-scores')];

  const gameResultsContainer = document.createElement('div');
  let roundBreakdownP = document.createElement('p');
  let roundHistoryContainer = document.createElement('div');

  gameResultsContainer.id = 'game-results-container';
  roundBreakdownP.id = 'round-breakdown';
  roundHistoryContainer.id = 'round-history-container';

  roundResultsH2.textContent = 'Results';
  playerScoreP.textContent = `Player: ${scores.player}`;
  computerScoreP.textContent = `Computer: ${scores.computer}`;
  
  roundBreakdownP.textContent = 'Round breakdown:';
  
  roundHistory.forEach((round, index) => {
    const roundHistoryP = document.createElement('p');

    roundHistoryP.classList.add('round-history');
    roundHistoryP.textContent = `Round #${index + 1}: ${round}`;

    roundHistoryContainer.appendChild(roundHistoryP);
  });
  
  if (scores.player > scores.computer) {
    roundResultsP.textContent = `Player beats computer!`;
  } else if (scores.computer > scores.player) {
    roundResultsP.textContent = `Computer beats player!`;
  } else {
    roundResultsP.textContent = `It's a tie!`;
  }

  [roundBreakdownP, roundHistoryContainer].forEach(el => gameResultsContainer.appendChild(el));
  document.querySelector('body').appendChild(gameResultsContainer);
}

function computerPlay() {
  const moves = ['rock', 'paper', 'scissors'];

  return moves[Math.floor(Math.random() * moves.length)];
}

function playRound(playerSelection, computerSelection, scores, matchHistory) {
  if (winningCombos[playerSelection].win === computerSelection) {
    scores.player++;
    matchHistory.push(`The player wins! ${playerSelection} beats ${computerSelection}`);
  } else if (winningCombos[computerSelection].win === playerSelection) {
    scores.computer++;
    matchHistory.push(`The player loses. ${playerSelection} loses to ${computerSelection}`);
  } else {
    matchHistory.push("It's a tie!");
  }
}

function game() {
  const scores = { player: 0, computer: 0 };
  const matchHistory = [];
  let gameOver = false;
  let roundsToPlay = 5;
  let roundNumber = 1;

  (function displayChoices() {
    const btnsContainer = document.createElement('div');
    const choicesP = document.createElement('p');
    const rockBtn = document.createElement('button');
    const paperBtn = document.createElement('button');
    const scissorsBtn = document.createElement('button');
  
    btnsContainer.id = 'btns-container';
    choicesP.id = 'choices-p';
    rockBtn.id = 'rock-btn';
    paperBtn.id = 'paper-btn';
    scissorsBtn.id = 'scissors-btn';
  
    choicesP.textContent = 'Choose your weapon...';
    rockBtn.textContent = 'rock';
    paperBtn.textContent = 'paper';
    scissorsBtn.textContent = 'scissors';
  
    btnsContainer.appendChild(choicesP);

    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameOver) return;

        console.log(roundNumber);
        playRound(btn.textContent, computerPlay(), scores, matchHistory);
        displayMatchResults(scores, matchHistory[matchHistory.length - 1], roundsToPlay, roundNumber);
        roundNumber++;

        if (roundNumber > roundsToPlay) {
          displayEndMessage(scores, matchHistory);
          disableChoiceButtons();
          gameOver = true;
        }
      });
      btnsContainer.appendChild(btn);
    });
  
    document.querySelector('body').appendChild(btnsContainer);
  })();
}

game();