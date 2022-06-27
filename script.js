


let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('https://cdn.freesound.org/previews/528/528957_10334845-lq.mp3');
let AUDIO_FAIL = new Audio('https://cdn.freesound.org/previews/483/483598_6436863-lq.mp3');




function init() {
    document.getElementById('number').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    let question = questions[currentQuestion];

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion(question);
    }
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    // idOfRightAnswer bekommt als wert einen html code zugewiesen und zwar answer an der stelle question was null ist und die richtige antwort 

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightAnswers++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        // weil als parameter im html code die id mitgegeben wurde kann man selection ansprechen und brauch nicht jede id einzeln ansprechen.
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-Button').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-Button').disabled = true;
    resetButtonAnswer();
    showQuestion();
}


function resetButtonAnswer() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function replay() {
    document.getElementById('endscreen').style = ('display: none;');
    document.getElementById('question-body').style = ('');
    currentQuestion = 0;
    rightAnswers = 0;
    init();
}

function updateToNextQuestion(question) {
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function showEndScreen() {
    document.getElementById('endscreen').style = ``;
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('right-answers').innerHTML = rightAnswers;
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function updateProgressBar() {
    let percent = currentQuestion / questions.length; // die variable wird deklariert
    percent = Math.round(percent * 100); // hier wird sie nicht ersetzt sondern ein neuer wert hinzugefügt
    document.getElementById('progress').innerHTML = `${percent} %`;
    document.getElementById('progress').style = `width: ${percent}%;`;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}