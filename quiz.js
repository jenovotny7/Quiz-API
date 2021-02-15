    
//global scope variables
var points = 0;
var presentQuestion = -1;
var shotClock= 30;
var tikTok;



//Begins the countdown function
function begin() {
shotCLock = 30;
document.getElementById("timeClock").innerHTML = shotClock;
tikTok = setInterval(function() {
    shotClock--;
    document.getElementById("timeClock").innerHTML = shotClock;
      if (shotClock <= 0) {
        clearInterval(tikTok);
        finish(); 
    }
}, 1000);

nextQuestion();
}






//End the game function
function finish() {
clearInterval(tikTok);

var quizFeedback = `
<h2>Quiz Completed!</h2>
<h3>You score is ` + points +  ` /60!</h3>
<h3>You got ` + points / 20 +  ` right!</h3>
<input type="text" id="name" placeholder="Initials"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizMain").innerHTML = quizFeedback;
}






//Local Storage function 
function setScore() {
localStorage.setItem("highscore", points);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}




// Score Display Function
function getScore() {
var quizFeedback = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="restartGame()">Play Again!</button>

`;

document.getElementById("quizMain").innerHTML = quizFeedback;
}






//Clear score function
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

restartGame();
}





//restarts the game 
function restartGame() {
clearInterval(tikTok);
points = 0;
presentQuestion = -1;
shotClock = 30;
tikTok = null;

document.getElementById("timeClock").innerHTML = shotClock;

var quizRestart = `
<h1>
    JS Quiz!
</h1>
<h3>
    Play Again!   
</h3>
<button onclick="begin()">Start!</button>`;

document.getElementById("quizMain").innerHTML = quizRestart;
}






//Incorrect answer function
function wrongAnswer() {
    nextQuestion();
    }
    

//Keeps track of point total
function correct() {
    points += 20;
    nextQuestion();
    }
    


//Question Loop
function nextQuestion() {
presentQuestion++;

if (presentQuestion > preguntas.length - 1) {
    finish();
    return;
}

var quizContent = "<h3>" + preguntas[presentQuestion].title + "</h3>"

for (var buttonLoop = 0; buttonLoop < preguntas[presentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", preguntas[presentQuestion].choices[buttonLoop]);
    if (preguntas[presentQuestion].choices[buttonLoop] == preguntas[presentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "wrongAnswer()");
    }
    quizContent += buttonCode
}

document.getElementById("quizMain").innerHTML = quizContent;
}









//Question prompt  

var preguntas= [{
    title: "What is considered to be the most popular programming language in the world?",
    choices: ["js", "html", "spanish", "swift"],
    answer: "js"
},
{
    title: "In JavaScript, what element is used to store and manipulate text, usually in multiples??",
    choices: ["recorders", "variables", "arrays", "strings"],
    answer: "arrays"
},

{
    title: "What is the element so named because it is used to exchange data with a server, in order to update parts of a web page?",
    choices: ["ajax", "html", "css", "elon musk"],
    answer: "ajax"
}
]
