const BASE_URL = 'http://35.154.104.127:8080/LMS';
const BookSerialArray = [];
var lateFees = 0; 
var noDays = 0;
var feesDayArray = [];

const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}

function logout() {
  localStorage.removeItem("jwt");
  localStorage.clear("userRole");
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
  var userId = document.getElementById("student-id").value;
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
  if(userId != ""  && book.userId != userId ){
    Swal.fire({
      text: "Book is issued to different user",
      icon: 'error',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("bookId").value = "";
      }
    });
    return false;
  }
    if(!BookSerialArray.includes(bookSerialId)){
      let row = tbl.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      let cell7 = row.insertCell(6);
      let cell8 = row.insertCell(7);
      let cell9 = row.insertCell(8);
      let cell10 = row.insertCell(9);

      var rowIndex = tbl.rows.length;
      cell1.innerHTML = rowIndex;
      //cell1.setAttribute("id",tbl.rows.length);
      cell2.innerHTML = book.bookName;
      cell3.innerHTML = book.booktype;
      cell4.innerHTML = book.publicationName;
      cell5.innerHTML = new Date(book.bookIssueDate).toISOString().slice(0, 10);
      cell6.innerHTML = book.bookReturnDate;
      cell7.innerHTML = book.totalDueDay;
      cell8.innerHTML = book.totalPenalty;
      if(book.totalPenalty <= 0){
        cell9.innerHTML = `<input id="${bookSerialId}" type="text" class="form-control" name="wave off" value="0"  placeholder="Enter Amount" onchange="addWaveoff(this.id)"  disabled="true">`;
      }else{
        cell9.innerHTML = `<input id="${bookSerialId}" type="text" class="form-control" name="wave off" value="0"  placeholder="Enter Amount" onchange="addWaveoff(this.value,${rowIndex})">`;
      }
      cell10.innerHTML = `<i class="fa fa-trash trash-icon" onclick="deleteRow(${rowIndex})"></i>`;
      BookSerialArray[rowIndex-1] = {bookSerialNo: bookSerialId , waveOffAmount : 0 };
      feesDayArray[rowIndex-1] = {lateFees : book.totalPenalty , delayDays : parseInt(book.totalDueDay)};
      getUserOrDepartment(book.issuedType,book.userId);
      lateFees +=book.totalPenalty;
      noDays += parseInt(book.totalDueDay);
      document.getElementById("late-fee").value = lateFees;
      document.getElementById("delayDays").value = noDays;
  }else{
    Swal.fire({
      text: 'Book already added in list',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
document.getElementById("bookId").value ="";
};

async function getUserOrDepartment(issuedType,id){
  if(issuedType === "Individual"){
    getUserByUserId(id);
  }else if(issuedType === "Department"){
    getDepartmentByDeptId(id);
  }
}

async function getDepartmentByDeptId(id){
  //let userId = document.getElementById("user-id").value;
  var data = await getapi(BASE_URL+"/loginController/getUsersByIdOrMail/"+id);
    document.getElementById("user-id").value = data.response.email;
    document.getElementById("student-name").value = data.response.fullName;
    document.getElementById("student-id").value = data.response.loginId;
}


async function getUserByUserId(id){
  //let userId = document.getElementById("user-id").value;
  var data = await getapi(BASE_URL+"/loginController/getUsersByIdOrMail/"+id);
    document.getElementById("user-id").value = data.response.email;
    document.getElementById("student-name").value = data.response.fullName;
    document.getElementById("student-id").value = data.response.loginId;
}


function addReturnBook(){
    const userId = document.getElementById("student-id").value;
    //const departmentId = document.getElementById("departmentId").value;
    const reissuedTo = document.getElementById("student-name").value;
    const reissueDateTime = document.getElementById("redatetime").value;
    //const userType = document.getElementById("userType").value;
    const waveOff = document.getElementById("waveoffInput").value;
    
    const body = {
          "userOrDepartmentId":userId,
          "reIssuedTo":reissuedTo,
          "penaltyPerBook":"10",
          "waveOff":waveOff,
          "reIssueDateTime":reissueDateTime,
          "bookSerialNo":BookSerialArray
        }

    console.log(JSON.stringify(body));    
    let url = BASE_URL+"/issuedBook/reIssuedBook";
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
              document.getElementById("returnBookform").reset();
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
  document.getElementById(" departmentId").innerHTML = tab;
 
});
//showDepartmentList();


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

function addWaveoff(value, rowIndex){
  var objValue = BookSerialArray[rowIndex-1];
  BookSerialArray[rowIndex-1] = {bookSerialNo: objValue.bookSerialNo , waveOffAmount : value};
}

function deleteRow(ele){
  document.getElementById("bookList").deleteRow(ele);
  BookSerialArray.splice(ele-1,1);
  var varFeesDays = feesDayArray[ele-1];
  lateFees -= varFeesDays.lateFees;
  noDays -= varFeesDays.delayDays;
  document.getElementById("late-fee").value = lateFees;
  document.getElementById("delayDays").value = noDays;
  feesDayArray.splice(ele-1,1);
}