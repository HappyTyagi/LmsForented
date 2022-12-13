$(function(){
  if(window.localStorage.getItem('userRole') === 'Admin'){
    $("#header").append("<nav class='navbar navbar-default navbar-fixed-top'><div class='main-nav'><div class='container-fluid'><div class='navbar-header page-scroll'><button type='button' class='navbar-toggle' data-toggle='collapse'data-target='.navbar-ex1-collapse'><span class='sr-only'>Library</span><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button><h1><a class='navbar-brand' href='dashboard.html'><img src='images/lms-logo.png'></a></h1></div><div class='collapse navbar-collapse navbar-ex1-collapse nav-right'><ul class='nav navbar-nav navbar-left cl-effect-15'><li class='hidden'><a class='page-scroll' href='#page-top'></a></li><li id='dashboardPage'><a href='dashboard.html' class='dropdown-toggle'>Dashboard</a></li><li class='dropdown' id = 'bookPage'><a href='Books.html' class='dropdown-toggle effect-3' data-toggle='dropdown'>Books<b class='caret'></b></a><ul class='dropdown-menu'><li id='addBook'><a href='add-book.html'>Add Book</a></li><li id='manageBook'><a href='manage-books.html'>Manage Books</a></li><li id='damagedBook'><a href='damaged-books.html'>Damaged Books</a></li><li id='maintenanceBook'><a href='books-maintenance.html'>Books Maintenance</a></li><li id='manageMaintenanceBook'><a href='manage-maintenance-books.html'>Manage Maintenance Books</a></li><li id='subscriptionBook'><a href='subscription.html'>Subscription</a></li></ul></li><li class='dropdown'  id='issuePage'><a href='#' class='dropdown-toggle effect-3' data-toggle='dropdown'>Issue Books<b class='caret'></b></a><ul class='dropdown-menu'><li id='issueBook'><a href='issue-book.html'>Issue New Book</a></li><li id='reissueBook'><a href='reissue-books.html'>Reissue Books</a></li><li id='returnBook'><a href='return-book.html'>Return Book</a></li></ul></li><li class='dropdown' id='categoryPage'><a href='#' class='dropdown-toggle effect-3' data-toggle='dropdown'>Categories<b class='caret'></b></a><ul class='dropdown-menu'><li id='addCategories'><a href='add-categories.html'>Add Category</a></li><li id='manageCategories'><a href='manage-categories.html'>Manage Categories</a></li></ul></li><li class='dropdown' id = 'adminPage'><a href='#' class='dropdown-toggle effect-3' data-toggle='dropdown'>Admin<b class='caret'></b></a><ul class='dropdown-menu'><li id='addauthors'><a href='add-authors.html'>Add Author</a></li><li id='manageAuthors'><a href='manage-authors.html'>Manage Author</a></li><li id='addDepartment'><a href='add-department.html'>Add Department</a></li><li id='manageDepartment'><a href='manage-department.html'>Manage Department</a></li><li id='reminderService'><a href='reminder-services.html'>Reminder Services</a></li><li id='generateReports'><a href='generate-reports.html'>Generate Reports</a></li></ul></li><li id='studentPage'><a href='users-reg.html' class='dropdown-toggle'>Reg. Users</a></li><li><a href='#modalError' class='dropdown-toggle effect-3 btn-logout' data-toggle='modal' data-target='#modalError'><span class='fa fa-user fa-sign-out' aria-hidden='true' style='font-size:2em !important;line-height: 16px !important;'></span></a></li></ul></div><div class='clearfix'></div></div></div></nav><div id='modalError' class='modal fade'><div class='modal-dialog modal-confirm'><div class='modal-content'><div class='modal-header'><div class='icon-box icon-box-error' data-dismiss='modal'><i class='fa fa-close'></i></div><h4 class='modal-title w-100'>Are You Sure!</h4></div><div class='modal-body'><p class='text-center'>You want to logout?</p></div><div class='modal-footer'><button class='btn btn-danger btn-block' data-dismiss='modal' onclick='logout()'>Logout</button></div></div></div></div>");
  }else if(window.localStorage.getItem('userRole') === 'Student'){
    $("#header").append("<nav class='navbar navbar-default navbar-fixed-top'><div class='main-nav'><div class='container-fluid'><div class='navbar-header page-scroll'><button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'><span class='sr-only'>Library</span><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button><h1><a class='navbar-brand' href='index.html'><img src='images/lms-logo.png'></a></h1></div><div class='collapse navbar-collapse navbar-ex1-collapse nav-right'><ul class='nav navbar-nav navbar-left cl-effect-15'><li class='hidden'><a class='page-scroll' href='#page-top'></a></li><li id ='indexPage'><a href='index.html' class='dropdown-toggle'>Home</a></li><li id='mybookPage'><a href='my-books.html' class='dropdown-toggle'>My Books</a></li><li id ='bookPage'><a href='books.html' class='dropdown-toggle'>Books</a></li><li id ='contactPage'><a href='contact.html' class='dropdown-toggle'>Contact us</a></li><li><a href='#modalError' class='dropdown-toggle effect-3 btn-logout' data-toggle='modal' data-target='#modalError'><span class='fa fa-user fa-sign-out' aria-hidden='true' style='font-size:2em !important;line-height: 16px !important;'></span></a></li></ul></div></div></nav><div id='modalError' class='modal fade'><div class='modal-dialog modal-confirm'><div class='modal-content'><div class='modal-header'><div class='icon-box icon-box-error' data-dismiss='modal'><i class='fa fa-close'></i></div><h4 class='modal-title w-100'>Are You Sure!</h4></div><div class='modal-body'><p class='text-center'>You want to logout?</p></div><div class='modal-footer'><button class='btn btn-danger btn-block' data-dismiss='modal' onclick='logout()'>Logout</button></div></div></div></div>");
  }else {
    $("#header").append("<nav class='navbar navbar-default navbar-fixed-top'><div class='main-nav'><div class='container-fluid'><div class='navbar-header page-scroll'><button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'><span class='sr-only'>Library</span><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button><h1><a class='navbar-brand' href='index.html'><img src='images/lms-logo.png'></a></h1></div><div class='collapse navbar-collapse navbar-ex1-collapse nav-right'><ul class='nav navbar-nav navbar-left cl-effect-15'><li class='hidden'><a class='page-scroll' href='#page-top'></a></li><li id ='indexPage'><a href='index.html' class='dropdown-toggle'>Home</a></li><li id ='bookPage'><a href='books.html'  class='dropdown-toggle'>Books</a></li><li id ='contactPage'><a href='contact.html' class='dropdown-toggle'>Contact us</a></li><li id ='loginPage'><a href='login.html' title='SignIn & SignUp'><span class='fa fa-user nav-icon' aria-hidden='true'></span></a></li></ul></div></div></nav>");
  }
});


// $(function(){
//   if(window.localStorage.getItem('userRole') === 'Admin'){
//     $("#header").load("headerAdmin.html");
//   }else if(window.localStorage.getItem('userRole') === 'Student'){
//     $("#header").load("headerUser.html");
//   }else {
//     $("#header").load("header.html");
//   }
 
// });

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


