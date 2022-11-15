const BASE_URL = 'http://35.154.104.127:8080/LMS';
const BookSerialArray = [];

const jwt = localStorage.getItem("jwt");
if (jwt == null) {
  window.location.href = './login.html'
}

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html';
}

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

async function getBookByBookId(){
  let bookSerialId = document.getElementById("bookId").value;
  var data = await getapi(BASE_URL+"/book/findBookBySerialNo/"+bookSerialId);
  var tbl = document.getElementById("bookList").getElementsByTagName('tbody')[0];
  
  data.response.addBooks.forEach(e => {
    if(!BookSerialArray.includes(e.bookId)){
      let row = tbl.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      var rowIndex = tbl.rows.length;
      cell1.innerHTML = rowIndex;
      //cell1.setAttribute("id",tbl.rows.length);
      cell2.innerHTML = e.bookName;
      cell3.innerHTML = "Type not present in Book API";
      cell4.innerHTML = "Publication not present in Book API";
      cell5.innerHTML = "CheckBox";
      BookSerialArray[rowIndex-1] = bookId;
      
  }else{
    alert("Book already added in list");
  }
});
document.getElementById("bookId").value ="";
};

async function getUserByUserId(){
  let userId = document.getElementById("user-id").value;
  var data = await getapi(BASE_URL+"/loginController/getAllUsersById/"+userId);
    document.getElementById("issued-to").value = data.response.fullName;
};


function getUserType(){
  var ele = document.getElementsByName('issuetype');
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked) { return ele[i].value;}
    }  
    return "0";
}

function addIssuedBook(){
    const userId = document.getElementById("user-id").value;
    const departmentId = document.getElementById("departmentId").value;
    const issuedTo = document.getElementById("issued-to").value;
    const issueDateTime = document.getElementById("issueDateTime").value;
    const issuedNoDays = document.getElementById("issuedNoDays").value;
    const userType = getUserType();
    
    const body = {
        "userId": userId,
        "issuedTo": issuedTo,
        "departmentId": departmentId,
        "returnDate": "2022-12-30",
        "bookSerialNo" : BookSerialArray,
        "userType" : userType
        }
    console.log(JSON.stringify(body));    
    let url = BASE_URL+"/issuedBook/addIssuedBook";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("token",jwt);
    xhttp.send(JSON.stringify(body));
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        console.log(objects)
        const response = objects['response'];
        console.log(response);
        if (objects['status'] == '200') {
          Swal.fire({
            text: 'Book issued successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './issue-book.html';
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