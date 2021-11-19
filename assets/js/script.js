//setting the framework for the quiz questions
var questions = [
    {
        question: "this is question 1",
        choices: ["option 1 of 1", "option 2 of 1", "option 3 of 1", "option 4 of 1"],
        correct: "option 1 of 1"
    },
    {
        question: "this is question 2",
        choices: ["option 1 of 2", "option 2 of 2", "option 3 of 2", "option 4 of 2"],
        correct: "option 2 of 2"
    },
    {
        question: "this is question 3",
        choices: ["option 1 of 3", "option 2 of 3", "option 3 of 3", "option 4 of 3"],
        correct: "option 3 of 3"
    },
    {
        question: "this is question 4",
        choices: ["option 1 of 4", "option 2 of 4", "option 3 of 4", "option 4 of 4"],
        correct: "option 4 of 4"
    },
]

//variables for the page elements
var startBtn = document.getElementById('start-btn')
var questionContainer = document.getElementById('question')
var optionsContainer = document.getElementById('options')

var questionIndex = 0
var score = 0
var timer = 60

//start quiz button function
function startQuiz() {
    startBtn.setAttribute('class', 'hidden')
    renderQuestion()
}

function getUser() {
    // get username, add the users name and score to an object and push the object into local storage and then send the user to the highscores page
}

//question rendering function
function renderQuestion() {
    if (questionIndex > questions.length) {
        // call getUser function 
        return
    }

    questionContainer.textContent = ""
    optionsContainer.textContent = ""
    var questionEl = document.createElement('h1')
    questionEl.textContent = questions[questionIndex].question
    questionContainer.append(questionEl)
//this loop will render questions through the length of the choices
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var listEl = document.createElement('li')
        listEl.setAttribute('id', questions[questionIndex].choices[i])
        listEl.textContent = questions[questionIndex].choices[i]
        optionsContainer.append(listEl)

        listEl.addEventListener('click', function (event) {
            if (event.target.id === questions[questionIndex].correct) {
                console.log('correct')
                score += 20;
            } else {
                console.log('incorrect')
                time -= 10;
            }
            questionIndex++
            renderQuestion()
        })
    }
}


startBtn.addEventListener('click', startQuiz)
