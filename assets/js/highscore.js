
//this will dynamically populate the payers scores onto the highscores page by pulling them from the local storage and adding them to a results const, creating a table element with designated name and score rows with each new entry being appended to the previous entry
function popHighscores() {

    var highscores = JSON.parse(localStorage.getItem("quizScore")) || [];
    var scoreTableEl = document.querySelector('.scoretable');

    const results = document.querySelector('#results')
    //sorts the highscores
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    
    for (i = 0; i < highscores.length; i++) {
        //create a results table
        var newTableRow = document.createElement("tr");
        var newNameEntry = document.createElement("td");
        var newScoreEntry = document.createElement("td")
        //pull local storage
        newNameEntry.textContent = highscores[i].name;
        newScoreEntry.textContent = highscores[i].score;
        //append to the list
        newTableRow.appendChild(newNameEntry)
        newTableRow.appendChild(newScoreEntry)
        results.appendChild(newTableRow)
    }
}

//clears scores from local storage
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

console.log("scores")


popHighscores()