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
  console.log(data);

  if(!data.response.bookResponseList){
    Swal.fire({
      text: data.response.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  data.response.bookResponseList.forEach(e => {
    if(!BookSerialArray.includes(bookSerialId)){
      let row = tbl.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      var rowIndex = tbl.rows.length;
      cell1.innerHTML = rowIndex;
      //cell1.setAttribute("id",tbl.rows.length);
      cell2.innerHTML = e.addBook.bookName;
      cell3.innerHTML = "Type not present in Book API";
      cell4.innerHTML = "Publication not present in Book API";
      cell5.innerHTML = "CheckBox";
      BookSerialArray[rowIndex-1] = bookSerialId;    
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

function addDamageBook(){
    const repairable = document.getElementById("repairable").value;
    const replacement = document.getElementById("replacement").value;
   
    const body = {
        "repairable": repairable,  
        "replaceReq": replacement,
        "bookSerialNo" : BookSerialArray
        }
    console.log(JSON.stringify(body));    
    let url = BASE_URL+"/damageOrMaintenance/addDamageOrMaintenance";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("token",jwt);
    xhttp.send(JSON.stringify(body));
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        const response = objects['response'];
        if (objects['status'] == '200') {
          Swal.fire({
            text: 'Book issued successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              document.getElementById("damageBookform").reset();
              window.location.href = './damaged-book.html';
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
    document.getElementById("damageBookform").reset();
    return false;
  }