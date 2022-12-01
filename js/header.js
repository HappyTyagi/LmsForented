$(function(){
  if(window.localStorage.getItem('userRole') === 'Admin'){
    $("#header").load("headerAdmin.html");
  }else if(window.localStorage.getItem('userRole') === 'Student'){
    $("#header").load("headerUser.html");
  }else {
    $("#header").load("header.html");
  } 
});