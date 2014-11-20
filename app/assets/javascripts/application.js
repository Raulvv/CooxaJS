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
var btnExe = document.getElementById("btn-exe");
btnExe.addEventListener('click', execute, true);

function execute(){
	
  		exeWindow.innerHTML = eval(editor.getValue());
  		errorWindow.innerHTML = "";
  		editor.getSession().on("changeAnnotation", function(){

			var annot = editor.getSession().getAnnotations();

			for (var key in annot){
			    if (annot.hasOwnProperty(key))
			        errorWindow.innerHTML = annot[key].text + "on line " + " " + (parseInt(annot[key].row)+1);
			}
		});
  	

  	if (TogetherJS.running) {
	    TogetherJS.send({type: "execute"});
	}
}

TogetherJS.hub.on("execute", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    execute();
});