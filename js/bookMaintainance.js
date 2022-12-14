const BASE_URL = 'http://35.154.104.127:8080/LMS';
const BookSerialArray = [];

const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}

// function logout() {
//   localStorage.removeItem("jwt");
//   localStorage.removeItem("UserRole");
//   window.location.href = './login.html';
// }

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

async function loadBookDetail(bookSerialId){
    if(bookSerialId===""){
        Swal.fire({
            text: "Please Enter Book Serial Number",
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return false;    
    }
   var data = await getapi(BASE_URL+"/book/findBookBySerialNo/"+bookSerialId);
   
  if(!data.response.bookResponseList){
    Swal.fire({
      text: data.response.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return false;
  }
  data.response.bookResponseList.forEach(async e => {
      document.getElementById("book-name").value = e.addBook.bookName;  
      document.getElementById("publication").value = e.author.publication;  
      document.getElementById("edition").value = e.author.edition;  
      document.getElementById("publishDate").value = e.author.publistionDate;  
      document.getElementById("category").value = e.categories.categories;  
      document.getElementById("localNo").value = e.addBook.assignLocalNo; 
      document.getElementById("itemType").value = e.bookType.bookTypeName;  
  });
};


function deleteRow(ele){
  document.getElementById("bookList").deleteRow(ele);
  BookSerialArray.splice(ele-1,1);
}

function submitBookMaintainance(){
const bookSerialId = document.getElementById("bookSerialNo").value;
    if(bookSerialId===""){
        Swal.fire({
            text: "Please Enter Book Serial Number",
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return false;    
    }
    const vendorName = document.getElementById("vendor-name").value;
    const returnDate = document.getElementById("returnDate").value;
    const maintenanceCost = document.getElementById("maintenance-cost").value;
    const remarks = document.getElementById("remark").value;
    const body = {
          remark:remarks,
          returnDate: returnDate,
          maintenanceCost: maintenanceCost,
          serialNo: bookSerialId
        }
    console.log(JSON.stringify(body));    
    let url = BASE_URL+"/damageOrMaintenance/addMaintenance";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("token",jwt);
    xhttp.send(JSON.stringify(body));
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        console.log("hello " +this.response);
        const objects = JSON.parse(this.responseText);
        const response = objects['response'];
        if (objects['status'] == '200') {
          Swal.fire({
            text: 'Book added to Maintenance',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              
              window.location.href = './books-maintenance.html';
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


function showItemTypeByCategory(categoryId){
 var xmlHttp = new XMLHttpRequest();
 xmlHttp.open( "GET", BASE_URL+"/category/findByCategoryId/"+categoryId, false ); // false for synchronous request
 xmlHttp.setRequestHeader("Content-Type", "application/json");
 xmlHttp.setRequestHeader("token",jwt);
 xmlHttp.send( null );
 console.log(xmlHttp.responseText);
 const data = JSON.parse (xmlHttp.responseText);
 return data.response.bookOrJournel.bookTypeName
}