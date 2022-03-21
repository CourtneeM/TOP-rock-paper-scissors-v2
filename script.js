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
  if (winningCombos[playerSelection].win === computerSelection) {
    return { winner: 'player', winningMove: playerSelection, losingMove: computerSelection};
  } else if (winningCombos[computerSelection].win === playerSelection) {
    return { winner: 'computer', winningMove: computerSelection, losingMove: playerSelection};
  } else {
    return 'tie';
  }
}

function game() {
  const scores = { player: 0, computer: 0 };
  const matchHistory = [];
  const moves = ['rock', 'paper', 'scissors'];
  
  let roundsToPlay = 5;
  let playerSelection = prompt('Which move would you like to make? rock, paper, or scissors?').toLowerCase();

  while (!moves.includes(playerSelection)) {
    alert(`${playerSelection} is not a valid choice.`);
    playerSelection = prompt('Which move would you like to make? rock, paper, or scissors?');
  }

  while (roundsToPlay > 0) {
    let { winner, winningMove, losingMove } = playRound(playerSelection, computerPlay());
     
    if (winner === 'player' || winner === 'computer') {
      winner === 'player' ? scores.player++ : scores.computer++; 
      matchHistory.push(`The ${winner} wins! ${winningMove} beats ${losingMove}`);
    } else {
      matchHistory.push("It's a tie!");
    }
    
    roundsToPlay--;
  }

  console.log(`Round breakdown:\n`);
  matchHistory.forEach(round => console.log(round));

  if (scores.player > scores.computer) {
    return `Player beats computer ${scores.player} to ${scores.computer}!`;
  } else if (scores.computer > scores.player) {
    return `Computer beats player ${scores.computer} to ${scores.player}!`;
  } else {
    return `It's a tie! ${scores.player} to ${scores.computer}`;
  }
}

console.log(game());