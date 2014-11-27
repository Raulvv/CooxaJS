// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require_self

// set X-CSRF-Token for all requests
$.ajaxSetup( {
  beforeSend: function (xhr) {
    xhr.setRequestHeader( 'X-CSRF-Token', $('meta[name="csrf-token"]').attr('content') );
  }
});

var editor = ace.edit("editor");
document.getElementById('editor').style.fontSize='16px';
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");

// Make sure the DOM is loaded
$(document).ready(function(){
	/*editor.getSession().on("changeAnnotation", execute);*/

  initAccordion();
	initQuestion(app.currentQuestion);
  initQuestionClick();
  initExecution();
  initTips();
});

initQuestionClick = function(){
  $('#acc-menu1 a.question').on('click', function(e){
    // Prevent the native action of the link.
    e.preventDefault()

    // Similar to $(this) but you are more sure you get the actual link.
    var element = $(e.currentTarget)
    // you can get all data attributes with .data('name')
    var questionId = element.data('id')
    console.log('question id:', questionId)

    // Here you can fetch the question
    $.ajax({
      type: "GET",
      url: "/questions/" + questionId,
      error: function(result){
        console.log('something went wrong', result);
      },
      success: function (question){
        console.log('success!:', question);
        // Set the global
        app.currentQuestion = question;
        // Now set the question
        initQuestion(app.currentQuestion);
      }
    })
    return false;
  });
}

initAccordion = function(){
  $('#acc-menu1').AccordionImageMenu({
    'openDim': 300,
    'closeDim': 100,
    'fadeInTitle': true,
    'position':'horizontal'
  });
}

initQuestion = function(question){
	$('#question').text(question['question']);
	$('#explanation').text(question['explanation']);
	$('#final_result').text(question['final_result']);
}

initExecution = function(){
  $("#btn-exe").on('click', function(){
    execute();
  })
}

function hasPassedTest(){
  var pass = false;

  if (eval(editor.getValue()).toString() === $("#expectedResult span").text())
    pass = true;

  if (pass === true){
    for(var i = 0 ; i<app.currentQuestion.rules.length ; i++){
      var rule = app.currentQuestion.rules[i];

      if(rule.mandatory === true){
        if(!RegExp(rule.expression).test(editor.getValue())){
          return false;
        }
      }
    }
  }
  return pass;
}

function execute(){
	try {

    $("#realResult").text("Result: " + eval(editor.getValue()));
	} catch(err){
		var annot = editor.getSession().getAnnotations();

		for (var key in annot){
		    if (annot.hasOwnProperty(key)){
          $("#errorWindow").text(annot[key].text + " Line " + " " + (parseInt(annot[key].row)+1));
		    }
		}
    return;
	}

	if (hasPassedTest()){
		var congrats = "Congratulations!";
		alert(congrats);
	} else {
    initTips();
  }

	if (TogetherJS.running) {
	    TogetherJS.send({type: "execute"});
	}
};

initTips = function(){
  $("#btn-tip").on('click', function(){
    $("#tipsOutput").empty();
    var fResult = $("#expectedResult span").text();

    for(var i = 0 ; i<app.currentQuestion.rules.length ; i++){
      if(!(RegExp(app.currentQuestion.rules[i].expression).test(editor.getValue()))){
        if(app.currentQuestion.rules[i].mandatory === true){
          console.log('Reg ex not matching and mandatory true',app.currentQuestion.rules[i].hint);
        }
        $("#tipsOutput").append("<li>"+app.currentQuestion.rules[i].tip+"</li>");
      }
    }
  })
}

TogetherJS.hub.on("execute", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    execute();
});