const BASE_URL = 'http://35.154.104.127:8080/LMS';
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

const getBookByBookId = (async(bookId) =>{
  //var data = await getapi(BASE_URL+"/book/searchBookById/"+bookId);
  let tab = ``;
  let sr = 0; 
  var tbl = document.getElementById("bookList").getElementsByTagName('tbody')[0];
 // data.response.forEach(e => {
    let row = tbl.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    
    cell1.innerHTML = tbl.rows.length;
    cell1.setAttribute("id",tbl.rows.length);
    cell2.innerHTML = 'JAHID';
    cell3.innerHTML = 23;
  //});
});

function addBook(){
    const bookName = document.getElementById("book-name").value;
    const publication = document.getElementById("publication-name").value;
    const edition = document.getElementById("edition").value;
    const publishDate = document.getElementById("publish-date").value;
    const category = document.getElementById("category").value;
    const localNo = document.getElementById("local-number").value;
    const noPages = document.getElementById("no-pages").value;
    const quantity = document.getElementById("quantity").value;
    const purchased = document.getElementById("purchased").value;
    const sourceName = document.getElementById("sourceName").value;
    const sourceAddress = document.getElementById("sourceAddress").value;
    const sourceContactNo = document.getElementById("sourceContactNo").value;
    const billNum = document.getElementById("billNum").value;
    const cost = document.getElementById("cost").value;
    const purchasedBy = document.getElementById("purchasedBy").value;
    const bookcondition = document.getElementById("bookcondition").value;
    const costWithBinding = document.getElementById("withBinding").value;
    const authorName = document.getElementById("authorName").value;

    const body = {
        "bookName": bookName,
        //"serialName": "ASDE987654df45",
        //"description" : "Computer bascis and programing language",
        "noOfPages": noPages,
        "sourceAddress": sourceAddress,
        "sourceContactNo": sourceContactNo,
        "purchasedBy": purchasedBy,
        "edition":edition,
        "billNo": billNum,
        "bookCondition": bookcondition,
        "sourceName": sourceName,
        "assignLocalNo": localNo,
        "cost": cost,
        "quantity": quantity,
        "purchased": purchased,
        "costWithBinding": costWithBinding,
        "authorsId": "LMS_KA_AU1667382124220",
        "categoriesId": "LMS_KA_CA1667378766657"
        }

    console.log(JSON.stringify(body));    
    
    let url = BASE_URL+"/book/addBook";
    
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
            text: 'Book addedd successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './manage-categories.html';
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