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

const showCategory = (async() =>{
  var data = await getapi(BASE_URL+"/category/getAllCategories");
  console.log(data);
  let tab = `<option value = ""> Select Category</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    tab += `<option value = ${e.categoryId}>${e.categories}</option>`;
  });
  document.getElementById("category").innerHTML = tab;
});

const showBookType = (async() =>{
  var data = await getapi(BASE_URL+"/bookType/getAllBookType");
  console.log(data);
  let tab = `<option value = ""> Select Item Type</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    tab += `<option value ="${e.bookTypeId}">${e.bookTypeName}</option>`;
  });
  document.getElementById("bookJournelType").innerHTML = tab;
});

const showAuthorName = (async() =>{
  var data = await getapi(BASE_URL+"/author/authors");
  console.log(data);
  let tab = `<option value = ""> Select Author</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    tab += `<option value = ${e.autherId}>${e.fullName}</option>`;
  });
  document.getElementById("authorName").innerHTML = tab;
});

const getPublication = (async() =>{
  var authorId =  document.getElementById("authorName").value;
  var data = await getapi(BASE_URL+"/author/findAuthorById/"+authorId);
    document.getElementById("publication-name").value = data.response.publication;
});


//showCategory();
showAuthorName();
showBookType();

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
    const withBinding = document.getElementById("withBinding").value;
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
        "enableBinding": withBinding,
        "authorsId": authorName,
        "categoriesId": category
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
        const response = objects['response'];
        if (objects['status'] == '200') {
          document.getElementById("addBookform").reset(); 
          Swal.fire({
            text: 'Book addedd successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.open(response.filePath, "_blank")
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


  const showCategorySelect = (async() =>{
    var bookOrJournel =  document.getElementById("bookJournelType").value 
    var data = await getapi(BASE_URL+"/category/findByBookType/"+bookOrJournel);
    let tab = `<option value = ""> Select Category</option>`;
    let sr = 0; 
    data.response.forEach(e => {
      tab += `<option value = ${e.categoryId}>${e.categories}</option>`;
    });
    document.getElementById("category").innerHTML = tab;
  });