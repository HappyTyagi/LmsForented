
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
        localStorage.setItem("userRole", response['userRole']);
        console.log( response['userRole']);
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          timer : 2000,
          showConfirmButton: false
        }).then((result) => {
            response['userRole'] == "Admin" ?
            window.location.href = './dashboard.html' :
            window.location.href = './my-books.html';
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




//get Role

async function getapi(url) {
  const response = await fetch(url,{
          method : 'GET',
          headers : {
                      'Content-Type' : 'application/json',
                      'token': localStorage.getItem("jwt")
                   }
      });
  var data = await response.json();
  if (response) {
     if(!response.ok){
          if(response.status=='401'){
              //localStorage.removeItem('jwt');
              //window.location.href = './login.html'
              //console.log(localStorage.getItem("jwt"));
          }
          return false;
     }
  }
  return data;
}

const showRole = (async() =>{
  var data = await getapi(BASE_URL+"role/getAllRole");
  console.log(data);
  let tab = `<option value = ""> Select Role</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    tab += `<option value = ${e.categoryId}>${e.categories}</option>`;
  });
  document.getElementById("role").innerHTML = tab;
});

