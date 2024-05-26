
const questions = [
  {
      text: "How often do you feel overwhelmed with your schoolwork?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
      text: "How often do you feel anxious about exams or assignments?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
      text: "How well do you manage your time for school activities?",
      options: ["Very well", "Well", "Average", "Poorly", "Very poorly"]
  },
  {
      text: "How often do you take breaks during study sessions?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
  },
  {
      text: "How well do you sleep at night?",
      options: ["Very well", "Well", "Average", "Poorly", "Very poorly"]
  },
  {
      text: "How often do you engage in physical exercise?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
  },
  {
      text: "How balanced is your diet?",
      options: ["Very balanced", "Balanced", "Average", "Unbalanced", "Very unbalanced"]
  },
  {
      text: "How often do you feel you have a good support system?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
  }
];

function getRandomQuestions(num) {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function renderQuiz() {
  const form = document.getElementById('stressQuiz');
  form.innerHTML = ''; // Clear existing form content
  const selectedQuestions = getRandomQuestions(5); // Change the number here to select a different number of questions

  selectedQuestions.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');

      const label = document.createElement('label');
      label.textContent = `${index + 1}. ${question.text}`;
      questionDiv.appendChild(label);

      const select = document.createElement('select');
      select.name = `q${index + 1}`;

      question.options.forEach((option, i) => {
          const optionElement = document.createElement('option');
          optionElement.value = i;
          optionElement.textContent = option;
          select.appendChild(optionElement);
      });

      questionDiv.appendChild(select);
      form.appendChild(questionDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.onclick = calculateStressLevel;
  form.appendChild(submitButton);
}

function calculateStressLevel() {
  const form = document.getElementById('stressQuiz');
  const formData = new FormData(form);
  let score = 0;
  
  for (let value of formData.values()) {
      score += parseInt(value);
  }

  const result = document.getElementById('result');
  let stressLevel = "";

  if (score <= 3) {
      stressLevel = "Low Stress";
      result.style.color = "green";
  } else if (score <= 6) {
      stressLevel = "Moderate Stress";
      result.style.color = "orange";
  } else {
      stressLevel = "High Stress";
      result.style.color = "red";
  }

  result.textContent = `Your stress level is: ${stressLevel}`;
}

document.addEventListener('DOMContentLoaded', renderQuiz);
