let scores = {
    red: 0,
    blue: 0
};

let history = {
    red: [],
    blue: []
};

function modifyScore(team, amount) {
    scores[team] += amount;
    history[team].push(amount);
    updateDisplay(team);
}

function undoScore(team) {
    if (history[team].length > 0) {
        scores[team] -= history[team].pop();
        updateDisplay(team);
    }
}

function resetScores() {
    scores = { red: 0, blue: 0 };
    history = { red: [], blue: [] };
    updateDisplay('red');
    updateDisplay('blue');
}

function updateDisplay(team) {
    document.getElementById(`${team}Score`).textContent = scores[team];
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay('red');
    updateDisplay('blue');
});
