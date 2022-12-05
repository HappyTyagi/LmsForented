
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

// $(window).on('load', function() {
//   switch (window.localStorage.getItem('userRole')) { 
//     case 'Admin': 
//       alert("admin");
//       $("#dashboardPage").attr("style", "display:block");
//       $("#bookPages").attr("style", "display:block");
//       $("#issuePage").attr("style", "display:block");

//       break;
//     case 'Student': 
//       alert('prototype Wins!');
//       break;
//     default:
      
//   }
// });


