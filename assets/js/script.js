var question = []


var startBtn = document.getElementById('start-btn')

startBtn.addEventListener('click', startQuiz)

function startQuiz() {
    startBtn.setAttribute('class', 'hidden')
    renderQuestion()
}