

function popHighscores() {
//    questionContainer.textContent = "";
 //   optionsContainer.textContent = "";

    var highscores = JSON.parse(localStorage.getItem("quizScore")) || [];
    var scoreTableEl = document.querySelector('.scoretable');

    const results = document.querySelector('#results')

    for (i = 0; i < highscores.length; i++) {
        var newScoreEntry = document.createElement("tr");
        newScoreEntry.textContent = highscores[i].name + " " + highscores[i].score;
        results.appendChild(newScoreEntry)
    }
}

console.log("scores")

function Top5() {

}

popHighscores()