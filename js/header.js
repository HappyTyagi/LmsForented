
$(function(){
  if(window.localStorage.getItem('userRole') === 'Admin'){
    $("#header").load("headerAdmin.html");
  }else if(window.localStorage.getItem('userRole') === 'Student'){
    $("#header").load("headerUser.html");
  }else {
    $("#header").load("header.html");
  } 
});




function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userRole");
  window.location.href = './index.html';
}