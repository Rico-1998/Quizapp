let currentQuestion = 0;
let rightAnswers = 0;
let selectedQuiz = html_questions;
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/fail.mp3');




function init() {
    document.getElementById('number').innerHTML = selectedQuiz.length;
    showQuestion();
}


function changeQuiz(select) {
    selectedQuiz = select;
    replay();
}


function showHtml(select) {
    changeQuiz(select);
}


function showCSS(select) {
    changeQuiz(select);
}


function showAuto(select) {
    changeQuiz(select);
}


function showQuestion() {
    let question = selectedQuiz[currentQuestion];

    if (gameIsOver()) {
        showEndScreen();
    } else {
        document.getElementById('overlay').style = 'display: none';
        updateProgressBar();
        updateToNextQuestion(question);
    }
}


function answer(selection) {
    let question = selectedQuiz[currentQuestion];
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
    document.getElementById('overlay').style = 'display: block';
    document.getElementById('next-Button').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-Button').disabled = true;
    resetButtonAnswer();
    showQuestion();
}


function resetButtonAnswer() {
    resetBtn('answer_1');
    resetBtn('answer_2');
    resetBtn('answer_3');
    resetBtn('answer_4');
}

function resetBtn(btnId) {
    document.getElementById(btnId).parentNode.classList.remove('bg-danger');
    document.getElementById(btnId).parentNode.classList.remove('bg-success');
}

function replay() {
    document.getElementById('endscreen').style = ('display: none;');
    document.getElementById('question-body').style = ('');
    document.getElementById('overlay').style = 'display: none';
    currentQuestion = 0;
    rightAnswers = 0;
    resetButtonAnswer();
    init();
}

function updateToNextQuestion(question) {
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    update('answer_1', question);
    update('answer_2', question);
    update('answer_3', question);
    update('answer_4', question);
}


function update(questionId, question) {
    document.getElementById(questionId).innerHTML = question[questionId];
}



function showEndScreen() {
    document.getElementById('endscreen').style = ``;
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('all-questions').innerHTML = selectedQuiz.length;
    document.getElementById('right-answers').innerHTML = rightAnswers;
}


function gameIsOver() {
    return currentQuestion >= selectedQuiz.length;
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / selectedQuiz.length; // die variable wird deklariert
    percent = Math.round(percent * 100); // hier wird sie nicht ersetzt sondern ein neuer wert hinzugefügt
    document.getElementById('progress').innerHTML = `${percent} %`;
    document.getElementById('progress').style = `width: ${percent}%;`;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}
