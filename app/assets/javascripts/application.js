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

var sitio = document.getElementById("sitio");

var boton = document.getElementById("btn-exe");

boton.addEventListener('click', execute, true);

function execute(){
  sitio.innerHTML = eval(editor.getValue());
}