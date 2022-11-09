
var jwt = localStorage.getItem("jwt");
//if (jwt != null) {
  //window.location.href = './.html'
//}
const BASE_URL = 'http://35.154.104.127:8080/LMS';

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  let url = BASE_URL+"/loginController/login";
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "emailId" : username,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      const response = objects['response'];
      if (objects['status'] == '200') {
        localStorage.setItem("jwt", response['tokenNo']);
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'dashboard.html';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}


function addUser(){
  const email = document.getElementById("email").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const role = document.getElementById("role").value;
  const password = document.getElementById("passwd").value;
  let url = BASE_URL+"/loginController/createUser";
  const body = {
            "mailId"   : email ,
            "password" : password,
            "userName" : firstname+' '+lastname,
            "role"     : "001"
          };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(body));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects)
      const response = objects['response'];
      console.log(response);
      if (objects['status'] == '200') {
        Swal.fire({
          text: response['message']+'User Id is '+response['userId'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'login.html';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}