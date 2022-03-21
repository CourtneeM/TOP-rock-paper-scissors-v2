const winningCombos = {
  rock: { win: 'scissors', lose: 'paper' },
  scissors: { win: 'paper', lose: 'rock' },
  paper: { win: 'rock', lose: 'scissors' }
}

function computerPlay() {
  const moves = ['rock', 'paper', 'scissors'];

  return moves[Math.floor(Math.random() * moves.length)];
}

function playRound(playerSelection, computerSelection) {
  // console.log(`Player: ${playerSelection} |`, `Computer: ${computerSelection}`);

  if (winningCombos[playerSelection].win === computerSelection) {
    return 'The player wins!';
  } else if (winningCombos[computerSelection].win === playerSelection) {
    return 'The computer wins!';
  } else {
    return "It's a tie!";
  }
}

console.log(playRound('rock', computerPlay()));