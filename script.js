const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
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
    setStatusClass(button, button.dataset.correct)
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
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is Ross afraid of?',
    answers: [
      { text: 'Lizards', correct: false },
      { text: 'Snakes', correct: false },
      { text: 'Spiders', correct: true},
      { text: 'Dinosaurs', correct: false}
    ]
  },
  {
    question: 'Whose Grandmother returns from the dead momentarily after dying during the season 1 episode "The One Where Nana Dies"?',
    answers: [
      { text: 'Rachel', correct: false },
      { text: 'Monica', correct: true },
      { text: 'Joey', correct: false },
      { text: 'Phoebe', correct: false }
    ]
  },
  {
    question: 'Who said: "I cannot believe I have to walk down the aisle in front of 200 like like something you drink when you are nauseous"?',
    answers: [
      { text: 'Phoebe', correct: false },
      { text: 'Rachel', correct: true },
      { text: 'Monica', correct: false },
      { text: 'Janice', correct: false }
    ]
  },
  {
    question: 'Which body abnormality does Chandler have?',
    answers: [
      { text: 'third nipple', correct: true },
      { text: 'whilte mole', correct: false },
      { text: 'permanent pimple', correct: false},
      { text: 'nothing', correct: false}      

    ]
  }
]