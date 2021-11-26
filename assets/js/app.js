//setting the framework for the quiz questions
var questions = [
    {
        question: "What are the two types of JavaScript values?",
        choices: ["Fixed and Variable values", "Fixed and Fluid values", "Variable and Static values", "Number and Variable values"],
        correct: "Fixed and Variable values"
    },
    {
        question: "What is a JavaScript Expression?",
        choices: ["A mathmatical function", "A shorter way to commuicate meaning", "A function", "A combination of values, variables, and operators, which computes to a value"],
        correct: "A combination of values, variables, and operators, which computes to a value"
    },
    {
        question: "Which of the following is NOT treated as a comment in JavaScript?",
        choices: ["//", "<!---->", "*/", "/*"],
        correct: "<!---->"
    },
    {
        question: "What are JavaScript Identifiers used for?",
        choices: ["Identifying different lines of code", "Marking comments in code", "Naming variables and keywords, and functions, and labels", "Listing different kinds of potato salads"],
        correct: "Naming variables and keywords, and functions, and labels"
    },
]

//variables for the page elements
var startBtn = document.getElementById('start-btn')
var questionContainer = document.getElementById('question')
var optionsContainer = document.getElementById('options')
var inputContainer = document.getElementById('user')
var highScoreBtn = document.getElementById('highscore-btn')

var questionIndex = 0
var currentScore = 0
var timeRemaining = 60
var timeInterval = null

//starts the quiz and hides buttons. runs the render questions function and begins the countdown timer
function startQuiz() {
    startBtn.setAttribute('class', 'hidden')
    highScoreBtn.setAttribute('class', 'hidden')

    renderQuestion()

    //timer countdown start and clear at time end
    timeInterval = setInterval(function () {
        seconds = parseInt(timeRemaining / 60, 10);
        timeRemaining--;
        quizTimer.textContent = "Time Remaining: " + timeRemaining;

        if (timeRemaining === 0) {
            //stop the timer and display player score/highscore
            endQuiz();
        }
    }, 1000);

}

//stops the timer at 0
function stopTimer() {
    //reset time remaining to 0
    if (timeRemaining <= 0) {
        timeRemaining = 0;
    }
    quizTimer.textContent = "Time Remaining: " + timeRemaining;
    clearInterval(timeInterval)
}

//end quiz will run the stop timer function, create an input variable and a submit button which will collect the player name. on submit click it will run the save function and navigate to another page.
function endQuiz() {
    stopTimer()
    questionContainer.textContent = ""
    optionsContainer.textContent = ""
    //input name
    var input = document.createElement('input')
    input.setAttribute('placeholder', 'Enter Your Name To See Scores')
    inputContainer.append(input)
    //submit
    var btn = document.createElement('button')
    btn.textContent = 'Submit'
    inputContainer.append(btn)

    btn.addEventListener('click', function (e) {
        e.preventDefault()
        saveHighScore(input)
        navigateToHighScorePage()
    })
}

//this section will collect the players previous input from the endQuiz function and assigns it to the current name variable then it merges the name and score variables into the new current user variable before pushing it into the local storage.
function saveHighScore(input) {
    var currentName = input.value

    var storage = JSON.parse(localStorage.getItem('quizScore'))
    if (storage === null) {
        storage = []
    }

    var currentUser = {
        name: currentName,
        score: currentScore
    }

    storage.push(currentUser)
    localStorage.setItem('quizScore', JSON.stringify(storage))
}

//this links the second html created for the hiighscores page
function navigateToHighScorePage() {
    location.href = "highscore.html";
}

//renders questions and collects the players score
function renderQuestion() {
    if (questionIndex > questions.length - 1) {
        // call getUser function
        console.log('over');
        endQuiz()
        return
    }

    questionContainer.textContent = ""
    optionsContainer.textContent = ""
    var questionEl = document.createElement('h1')
    questionEl.textContent = questions[questionIndex].question
    questionContainer.append(questionEl)
    //this loop will render questions
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var listEl = document.createElement('li')
        listEl.setAttribute('id', questions[questionIndex].choices[i])
        listEl.textContent = questions[questionIndex].choices[i]
        optionsContainer.append(listEl)
        //rewards and penalties for correct and incorrect answers
        listEl.addEventListener('click', function (event) {
            if (event.target.id === questions[questionIndex].correct) {
                console.log('correct')
                currentScore += 25;
            } else {
                console.log('incorrect')
                timeRemaining -= 10;
            }
            questionIndex++
            renderQuestion();
        })
    }
}

//starts the quiz by running the start quiz function
startBtn.addEventListener('click', startQuiz)
