const BASE_URL = 'http://35.154.104.127:8080/LMS';
const BookSerialArray = [];

const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}

function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("UserRole");
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
  if(!data.response.bookResponseList){
    Swal.fire({
      text: data.response.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  data.response.bookResponseList.forEach(async e => {
    if(!BookSerialArray.includes(bookSerialId)){
      var itemType = showItemTypeByCategory(e.categories.categoryId);
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
      cell3.innerHTML = itemType;
      cell4.innerHTML = e.author.publication;
      cell5.innerHTML = `<i class="fa fa-trash trash-icon" onclick="deleteRow(${rowIndex})"></i>`;
      BookSerialArray[rowIndex-1] = bookSerialId;  
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


function deleteRow(ele){
  document.getElementById("bookList").deleteRow(ele);
  BookSerialArray.splice(ele-1,1);
}

function submitDamageBook(){
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
        console.log("hello " +this.response);
        const objects = JSON.parse(this.responseText);
        const response = objects['response'];
        if (objects['status'] == '200') {
          Swal.fire({
            text: 'Book added to Damage/Maintenance',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              
              window.location.href = './damaged-books.html';
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