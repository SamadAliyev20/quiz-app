const quizData = [
  {
    question: "Commonly used data types DO NOT include:",
    a: "Strings",
    b: "Booleans",
    c: "Alerts",
    d: "Numbers",
    correct: "c",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    a: "Quotes",
    b: "Curly brackets",
    c: "Parentheses",
    d: "Square brackets",
    correct: "a",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    a: "Numbers and strings",
    b: "Other arrays",
    c: "Booleans",
    d: "All of the above",
    correct: "d",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    a: "Commas",
    b: "Curly brackets",
    c: "Quotes",
    d: "Parentheses",
    correct: "b",
  },
];
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("submit_btn");
const prevBtn = document.getElementById("prev_btn");

let currentQuestion = 0;
let score = 0;
const selectedAnswers = [];

const deselectAll = () => {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
};

function loadQuestion() {
  deselectAll();
  const questionList = quizData[currentQuestion];
  questionEl.innerText = questionList.question;
  a_text.innerText = questionList.a;
  b_text.innerText = questionList.b;
  c_text.innerText = questionList.c;
  d_text.innerText = questionList.d;

  if (selectedAnswers[currentQuestion]) {
    const selectedAnswerId = selectedAnswers[currentQuestion];
    const selectedAnswerEl = document.getElementById(selectedAnswerId);
    selectedAnswerEl.checked = true;

  }
}
loadQuestion();

const getSelected = () => {
  let answer;
  answerEls.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
};
const prevSelect = () => {
  answerEls.forEach((answerEl) => {
    if (answerEl.id === selectedAnswers[currentQuestion]) {
      answerEl.checked = true;
    }
  });
};

nextBtn.addEventListener("click", () => {
  const answer = getSelected();
  selectedAnswers[currentQuestion] = answer;
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>`;
      setTimeout(() => {
        location.reload();
      }, 10000);
    }
  }
});
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
    prevSelect();
  }
});
