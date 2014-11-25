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

// Make sure the DOM is loaded
$(document).ready(function(){

	var editor = ace.edit("editor");
	document.getElementById('editor').style.fontSize='16px';
	editor.setTheme("ace/theme/twilight");
	editor.getSession().setMode("ace/mode/javascript");

	var exeWindow = document.getElementById("exeWindow");
	var errorWindow = document.getElementById("errorWindow");
	var tipList = document.getElementById("tipsOutput");
	var realResult = document.getElementById("realResult");
	editor.getSession().on("changeAnnotation", execute);

	var idQuestion;
	var imgClass = document.getElementsByClassName("img");
	var currentQuestion;

	// All the magic happens here
	// The initial question is located in app.currentQuestion. Check the application.html for this.
	initQuestion = function(question){
		console.log('setQuestion', question)
  	// Set the question details in DOM
  	$('#question').text(question['question'])
  	$('#explanation').text(question['explanation'])
  	$('#final_result').text(question['final_result'])
  	// TODO
  	// Init all the click events you have at the bottom of this document etc etc.
	}


	// You could use a little bit more jQuery here.
	// Much easier and it works in all the browsers.
	// for(var i=0;i<imgClass.length;i++){
	//     imgClass[i].addEventListener('click', function(){console.log(this.id)}, false);
	// }

	// For example:
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

	// load the first question.
	initQuestion(app.currentQuestion)


	$('#acc-menu1').AccordionImageMenu({
		  'openDim': 300,
		  'closeDim': 100,
		  'fadeInTitle': true,
		  'position':'horizontal'
		});

	function execute(){
		// TODO make use here of app.currentQuestion
		// You can iterate in app.currentQuestion.rules for the rules of this question.
		try {
			realResult.innerHTML = "Result: " + eval(editor.getValue());
		} catch(err){
			var annot = editor.getSession().getAnnotations();

			for (var key in annot){
			    if (annot.hasOwnProperty(key)){
			    	errorWindow.innerHTML = annot[key].text + " Line " + " " + (parseInt(annot[key].row)+1);
			    }
			}
		}

		if (eval(editor.getValue()).toString() === $("#expectedResult span").text()){
			var congrats = "Congratulations!"
			if(/for[(].+[)]/.test(editor.getValue()) || /do.+while/.test(editor.getValue())){
				congrats+= " If you use the for loop or the do while loop, its not the better choice. This is because you may don´t need to execute code and with this two loops, you´re doing it."
			}
			alert(congrats);
		}

		if (TogetherJS.running) {
		    TogetherJS.send({type: "execute"});
		}
	};

	// TODO make this jquery events like: $('#btn-tip').on('click', function(){});
	document.getElementById("btn-tip").onclick = function (){
		tipList.innerHTML = "";
		var fResult = $("#expectedResult span").text()

		$.ajax({
		    type: "POST",
		    url: "/tip",
		    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		    data: fResult,
		    success: function (data){
			    for(var i = 0 ; i<data.length ; i++){
					if (!(RegExp(data[i].expression).test(editor.getValue()))){
						var li = document.createElement("li");
						li.appendChild(document.createTextNode(data[i].tip));
						tipList.appendChild(li);
					}
				}
		    }
		  })

		/*$.get( "/tip", function( data ) {
			for(var i = 0 ; i<data.length ; i++){
				if (!(RegExp(data[i].expression).test(editor.getValue()))){
					var li = document.createElement("li");
					li.appendChild(document.createTextNode(data[i].tip));
					tipList.appendChild(li);
				}
			}
		});*/
	}

	TogetherJS.hub.on("execute", function (msg) {
	    if (! msg.sameUrl) {
	        return;
	    }
	    execute();
	});

});

