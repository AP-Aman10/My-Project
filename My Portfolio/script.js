let teamA = { runs: 0, wickets: 0, balls: 0 };
let teamB = { runs: 0, wickets: 0, balls: 0 };

function updateDisplay(team, idPrefix) {
  const overs = Math.floor(team.balls / 6) + "." + (team.balls % 6);
  document.getElementById(`score${idPrefix}`).textContent = `${team.runs}/${team.wickets}`;
  document.getElementById(`overs${idPrefix}`).textContent = overs;
}

function addRun(teamId) {
  const team = teamId === 'A' ? teamA : teamB;
  team.runs += 1;
  updateDisplay(team, teamId);
}

function addWicket(teamId) {
  const team = teamId === 'A' ? teamA : teamB;
  if (team.wickets < 10) {
    team.wickets += 1;
    updateDisplay(team, teamId);
  }
}

function addBall(teamId) {
  const team = teamId === 'A' ? teamA : teamB;
  team.balls += 1;
  updateDisplay(team, teamId);
}

function resetMatch() {
  teamA = { runs: 0, wickets: 0, balls: 0 };
  teamB = { runs: 0, wickets: 0, balls: 0 };
  updateDisplay(teamA, 'A');
  updateDisplay(teamB, 'B');
}
