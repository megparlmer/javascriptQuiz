const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz);

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if (seconds === 0) {
            alert('quiz over')
        }
    }, 1000);
}

startButton.addEventListener('click', startQuiz);
startButton.addEventListener('click', function() {
    var twoMinutes = 60 * 2,
        display = document.querySelector('#timer');
        startTimer(twoMinutes, display);
})

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
});

function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endQuiz() {

}

function timer() {
    setTimeout(endQuiz(), 100000)
}

function displayHighScore() {

}

const questions = [
    {
        question: 'What is an array?',
        answers: [
            { text: 'a fun song', correct: false },
            { text: 'a type of bread', correct: false },
            { text: 'an impressive display or range of a particular type of thing', correct: true },
            { text: 'an object that can store multiple values at once', correct: false }
        ]
    },
    {
        question: 'What is jQuery?',
        answers: [
            { text: 'a rapper', correct: false },
            { text: 'a type of juice', correct: false },
            { text: 'a javascript library', correct: true },
            { text: 'an electric car', correct: false }
        ]
    },
    {
        question: 'Where do you link the javascript file in HTML?',
        answers: [
            { text: 'at the church across the street', correct: false },
            { text: 'at the bottom of the file', correct: true },
            { text: 'at the top in the <head>', correct: false },
            { text: 'in the first <div>', correct: false }
        ]
    },
    {
        question: 'What is bubbling?',
        answers: [
            { text: 'a method of event propagation', correct: true },
            { text: 'a type of champagne', correct: false },
            { text: 'an object that can store multiple values at once', correct: false },
            { text: 'a method that makes every element the same after being applied', correct: false }
        ]
    }
];