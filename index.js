function Quiz(questions){
    this.score=0;
    this.questionIndex=0;
    this.questions=questions;

}

Quiz.prototype.getQuestionByIndex=function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded=function(){
return this.questions.length===this.questionIndex;
}

Quiz.prototype.checkOptionWithAnswer=function(answer){
if(this.getQuestionByIndex().isCorrectAnswer(answer)){
    this.score++;
}
this.questionIndex++;
}

function Question(text, choices, answer){
this.text=text;
this.choices=choices;
this.answer=answer;
}

Question.prototype.isCorrectAnswer=function(choice){
    return this.answer===choice;
}

function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    }
    else{
       var element= document.getElementById("question");
       element.innerHTML=quiz.getQuestionByIndex().text;
       var choices=quiz.getQuestionByIndex().choices;
       for(var i=0;i<choices.length;i++){
         var element_choice=document.getElementById("choice"+i);
         element_choice.innerHTML=choices[i];
         handleOptionButton("btn"+i,choices[i]);
       }
       showProgress();
    }
}

function handleOptionButton(id,choice){
    var button=document.getElementById(id);
    button.onclick=function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

function showProgress(){
    var currentQuestionNumber=quiz.questionIndex+1;
    var progressbar=document.getElementById("progress");
    progressbar.innerHTML="Question "+currentQuestionNumber + " of "+ quiz.questions.length;
}

function showScores(){
 var result="<h1>Result<h1><h2 id='score'> Your Score :: ";
 result+=quiz.score;
 result+="<br>Percentage is :: "+(quiz.score/questions.length*100) +" %"
 var element=document.getElementById("quiz");
 element.innerHTML=result;
}

var questions = [
    new Question("Which of the following is not javascript data types?",["Null type","Undefined type","Number type","All of the mentioned"],"All of the mentioned"),
    new Question("Where is Client-side JavaScript code is embedded within HTML documents?",["A URL that uses the special javascript:code","A URL that uses the special javascript:protocol","A URL that uses the special javascript:encoding","A URL that uses the special javascript:stack"],"A URL that uses the special javascript:protocol"),
    new Question("Which of the following object is the main entry point to all client-side JavaScript features and APIs?",["Position","Window","Standard","Location"],"Window"),
    new Question("Which of the following can be used to call a JavaScript Code Snippet?",["Function/Method","Preprocessor","Triggering Event","RMI"],"Function/Method"),
    new Question("Which of the following scoping type does JavaScript use?",["Sequential","Segmental","Lexical","Literal"],"Lexical")
  ];
  
var quiz=new Quiz(questions);
loadQuestions();