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

for(var i=0;i<imgClass.length;i++){
    imgClass[i].addEventListener('click', function(){console.log(this.id)}, false);
}

$('#acc-menu1').AccordionImageMenu({
	  'openDim': 300,
	  'closeDim': 100,
	  'fadeInTitle': true,
	  'position':'horizontal'
	});

function execute(){
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