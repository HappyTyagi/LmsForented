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
  var data = await getapi(BASE_URL+"/issuedBook/returnBookFindByBookId/"+bookSerialId);
  var tbl = document.getElementById("bookList").getElementsByTagName('tbody')[0];
  if(data.status != 200){
    Swal.fire({
      text: "Invalid Serial Number",
      icon: 'error',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("bookId").value = "";
      }
    });
    return false;
  }
  var book = data.response;
    if(!BookSerialArray.includes(bookSerialId)){
      let row = tbl.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      let cell7 = row.insertCell(6);
      var rowIndex = tbl.rows.length;
      cell1.innerHTML = rowIndex;
      //cell1.setAttribute("id",tbl.rows.length);
      cell2.innerHTML = book.bookName;
      cell3.innerHTML = "Type not present in Book API";
      cell4.innerHTML = book.publicationName;
      cell5.innerHTML = book.bookIssueDate;
      cell6.innerHTML = book.bookReturnDate;
      cell7.innerHTML = "CheckBox";
      BookSerialArray[rowIndex-1] = bookSerialId;
      document.getElementById("delayDays").value = book.totalDueDay;
      getUserByUserId(book.userId);
  }else{
    Swal.fire({
      text: 'Book already added in list',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
document.getElementById("bookId").value ="";
};

async function getUserByUserId(userId){
  //let userId = document.getElementById("user-id").value;
  var data = await getapi(BASE_URL+"/loginController/getUsersByIdOrMail/"+userId);
    document.getElementById("user-id").value = data.response.email;
    document.getElementById("student-name").value = data.response.fullName;
    document.getElementById("student-id").value = data.response.loginId;
};


function addReturnBook(){
    const userId = document.getElementById("student-id").value;
    const departmentId = document.getElementById("departmentId").value;
    const reissuedTo = document.getElementById("student-name").value;
    const reissueDateTime = document.getElementById("redatetime").value;
    const userType = document.getElementById("issueType").value;
    const waveOff = document.getElementById("waveoffInput").value;

    const body = {
          "userOrDepartmentId":(userType == 1 ? userId : departmentId),
          "reIssuedTo":reissuedTo,
          "penaltyPerBook":"10",
          "waveOff":waveOff,
          "returnDateTime":reissueDateTime,
          "bookSerialNo":BookSerialArray
        }

    console.log(JSON.stringify(body));    
    let url = BASE_URL+"/issuedBook/returnIssuedBook";
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
            text: 'Book return successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './return-book.html';
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