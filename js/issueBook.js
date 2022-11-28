const BASE_URL = 'http://35.154.104.127:8080/LMS';
const BookSerialArray = [];
const BookIDs = [];

const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}

function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userRole");
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
     }
  }
  return data;
}

async function getBookByBookId(){
  let bookSerialId = document.getElementById("bookId").value;
  if(bookSerialId =="") return false;
  var data = await getapi(BASE_URL+"/book/findBookBySerialNo/"+bookSerialId);
  var tbl = document.getElementById("bookList").getElementsByTagName('tbody')[0];
  console.log(data);
  if(!data.response.bookResponseList){
    Swal.fire({
      text: data.response.message,
      icon: 'error',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("bookId").value = "";
      }
    });
  }
  data.response.bookResponseList.forEach(e => {
    if(!BookSerialArray.includes(bookSerialId) && !BookIDs.includes(e.addBook.bookId)){
      let row = tbl.insertRow();
      //let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(0);
      let cell3 = row.insertCell(1);
      let cell4 = row.insertCell(2);
      let cell5 = row.insertCell(3);
      var rowIndex = tbl.rows.length;
      //cell1.innerHTML = rowIndex;
      //cell1.setAttribute("id",tbl.rows.length);
      cell2.innerHTML = e.addBook.bookName;
      cell3.innerHTML = e.categories.bookJournel;
      cell4.innerHTML = e.author.publication;
      cell5.innerHTML = `<i class="fa fa-trash trash-icon" onclick="deleteRow(${rowIndex})"></i>`;
      BookSerialArray[rowIndex-1] = bookSerialId;
      BookIDs[rowIndex-1] = e.addBook.bookId;
  }else{
    Swal.fire({
      text: 'Book already added in list',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
});
document.getElementById("bookId").value ="";
};

async function getUserByUserId(userId){
  var data = await getapi(BASE_URL+"/loginController/getUsersByIdOrMail/"+userId);
    document.getElementById("issued-to").value = data.response.fullName;
    document.getElementById("student-Id").value = data.response.loginId;
};


function addIssuedBook(){
    const userId = document.getElementById("student-Id").value;
    const departmentId = document.getElementById("departmentId").value;
    const issuedTo = document.getElementById("issued-to").value;
    const issueDateTime = document.getElementById("returnDate").value;
    const userType = document.getElementById("userType").value;
    const body = {
        "userId": userId,
        "issuedTo": issuedTo,
        "departmentId": departmentId,
        "returnDate": issueDateTime,
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

  
const showDepartmentList = (async() =>{
  var data = await getapi(BASE_URL+"/department/getAllActiveDepartment");
  console.log(data);
  let tab = `<option value = "" > Select Department</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    tab += `<option value = ${e.departmentId}>${e.departmentName}</option>`;
  });
  document.getElementById("departmentSelect").innerHTML = tab;
  document.getElementById("departmentId").innerHTML = tab;
 
});
showDepartmentList();


function deleteRow(ele){
  document.getElementById("bookList").deleteRow(ele);
  BookSerialArray.splice(ele-1,1);
  BookIDs.splice(ele-1,1);
}


function showItemTypeByCategory(categoryId){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", BASE_URL+"/category/findByCategoryId/"+categoryId, false ); // false for synchronous request
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.setRequestHeader("token",jwt);
  xmlHttp.send( null );
  console.log(xmlHttp.responseText);
  const data = JSON.parse (xmlHttp.responseText);
  console.log( data.response.bookOrJournel.bookTypeName);
  return data.response.bookOrJournel.bookTypeName
 }

 function checkforPastDate(id){
  var date = new Date(document.getElementById(id).value);
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date <= today) {
    Swal.fire({
      text: 'Only future date is allowed',
      icon: 'error',
      confirmButtonText: 'OK',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
          document.getElementById(id).value="";
        }
      }); 
  }
}
