const winningCombos = {
  rock: { win: 'scissors', lose: 'paper' },
  scissors: { win: 'paper', lose: 'rock' },
  paper: { win: 'rock', lose: 'scissors' }
}

function displayScore(scores) {
  return `Player: ${scores.player} | Computer: ${scores.computer}`;
}

function displayMatchResults(scores, matchResults, roundsToPlay, roundNumber) {
  let roundResultsContainer;

  if (!document.querySelector('#round-results-container')) {
    roundResultsContainer = document.createElement('div');
    roundResultsContainer.id = 'round-results-container';

    document.querySelector('body').appendChild(roundResultsContainer);
  } else {
    roundResultsContainer = document.querySelector('#round-results-container');
  }

  let roundResultsP = document.createElement('p');
  let roundScoresP = document.createElement('p');

  roundResultsP.classList.add('round-results');
  roundScoresP.classList.add('round-scores');

  roundResultsP.textContent = `Round #${roundNumber}/${roundsToPlay}: ${matchResults}`;
  roundScoresP.textContent = `Player: ${scores.player} | Computer: ${scores.computer}`;

  [roundResultsP, roundScoresP].forEach(p => roundResultsContainer.appendChild(p));
}

function displayEndMessage(scores, matchHistory) {
  console.log(`----------------\nRound breakdown:\n`);
  matchHistory.forEach((round, index) => console.log(`Round #${index + 1}: ${round}`));
  
  if (scores.player > scores.computer) {
    console.log(`Overall Results: Player beats computer ${scores.player} to ${scores.computer}!`);
  } else if (scores.computer > scores.player) {
    console.log(`Overall Results: Computer beats player ${scores.computer} to ${scores.player}!`);
  } else {
    console.log(`Overall Results: It's a tie! ${scores.player} to ${scores.computer}`);
  }
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
    const rockBtn = document.createElement('button');
    const paperBtn = document.createElement('button');
    const scissorsBtn = document.createElement('button');
  
    btnsContainer.id = 'btns-container';
    rockBtn.id = 'rock-btn';
    paperBtn.id = 'paper-btn';
    scissorsBtn.id = 'scissors-btn';
  
    rockBtn.textContent = 'rock';
    paperBtn.textContent = 'paper';
    scissorsBtn.textContent = 'scissors';
  
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameOver) return;

        playRound(btn.textContent, computerPlay(), scores, matchHistory);
        displayMatchResults(scores, matchHistory[matchHistory.length - 1], roundsToPlay, roundNumber);
        roundNumber++;

        if (roundNumber > roundsToPlay) {
          displayEndMessage(scores, matchHistory);
          gameOver = true;
        }
      });
      btnsContainer.appendChild(btn);
    });
  
    document.querySelector('body').appendChild(btnsContainer);
  })();
}

game();