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
var inputContainer = document.getElementById('user')

var questionIndex = 0
var currentScore = 0
var timeRemaining = 60

function startQuiz() {
    startBtn.setAttribute('class', 'hidden')
    renderQuestion()
}

function endQuiz() {
    questionContainer.textContent = ""
    optionsContainer.textContent = ""
    var input = document.createElement('input')
    input.setAttribute('placeholder', 'Please Enter Your Name')
    inputContainer.append(input)

    var btn = document.createElement('button')
    btn.textContent = 'Submit'
    inputContainer.append(btn)

    btn.addEventListener('click', function(e) {
        e.preventDefault()
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
    })
}

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

            //need to stop the time when questions run out
        })
    }
}

startBtn.addEventListener('click', startQuiz)