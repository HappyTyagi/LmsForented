const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}

// function logout() {
//   localStorage.removeItem("jwt");
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
            return false;
       }
    }
    return data;
}

const showBookType = (async(bookJournelId) =>{
  var data = await getapi(BASE_URL+"/bookType/getAllBookType");
  console.log(data);
  let tab = `<option value = ""> Select Item Type</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    if(bookJournelId == e.bookTypeId)
      tab += `<option value ="${e.bookTypeId}" selected>${e.bookTypeName}</option>`;
    else
      tab += `<option value ="${e.bookTypeId}">${e.bookTypeName}</option>`;
  });
  document.getElementById("bookJournelType").innerHTML = tab;
});

const showAuthorName = (async(authorId) =>{
  var data = await getapi(BASE_URL+"/author/authors");
  console.log(data);
  let tab = `<option value = ""> Select Author</option>`;
  let sr = 0; 
  data.response.forEach(e => {
    if(authorId == e.autherId)
      tab += `<option value = ${e.autherId} selected>${e.fullName}</option>`;
    else
      tab += `<option value = ${e.autherId}>${e.fullName}</option>`;
  });
  document.getElementById("authorName").innerHTML = tab;
});

const getPublication = (async() =>{
  var authorId =  document.getElementById("authorName").value;
  var data = await getapi(BASE_URL+"/author/findAuthorById/"+authorId);
    document.getElementById("publication-name").value = data.response.publication;
});

const showBookData = (async() =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get('bookId');
    var data = await getapi(BASE_URL+"/book/searchBookById/"+bookId);
    data.response.bookResponseList.forEach(e => {
    document.getElementById("book-id").value = e.addBook.bookId;
    document.getElementById("book-name").value = e.addBook.bookName;
    document.getElementById("publication-name").value = e.author.publication; 
    document.getElementById("edition").value = e.addBook.edition;
    document.getElementById("publish-date").value = e.author.publistionDate;
    document.getElementById("local-number").value =e.addBook.assignLocalNo;
    document.getElementById("no-pages").value = e.addBook.noOfPages;
    document.getElementById("quantity").value = e.addBook.quantity;
    //document.getElementById("purchased").value = e.addBook.purchased;
    document.getElementById("sourceName").value = e.addBook.sourceName;
    document.getElementById("sourceAddress").value = e.addBook.sourceAddress;
    document.getElementById("sourceContactNo").value =e.addBook.sourceContactNo;
    document.getElementById("billNum").value =e.addBook.billNo;
    document.getElementById("cost").value = e.addBook.cost;
    document.getElementById("purchasedBy").value = e.addBook.purchasedBy;
    document.getElementById("bookcondition").value = e.addBook.bookCondition;
    //document.getElementById("withBinding").value = e.addBook.enableBinding;
    document.getElementById("dateTime").value = e.addBook.purchasedDate;
    dateTime
    showAuthorName(e.author.autherId);
    showBookType(e.categories.bookJournel);
    showCategory(e.categories.categoryId,e.categories.bookJournel)
    if(e.addBook.enableBinding === "Yes"){ 
      document.getElementById("withBinding").options.selectedIndex = 0;}
    else{
      document.getElementById("withBinding").options.selectedIndex = 1;}

    if(e.addBook.purchased === "Purchased") 
      document.getElementById("purchased").options.selectedIndex = 0;
    if(e.addBook.purchased === "Promotional") 
      document.getElementById("purchased").options.selectedIndex = 1;
    if(e.addBook.purchased === "Donated") 
      document.getElementById("purchased").options.selectedIndex = 2; 
   
  });
});
  const showCategory = (async(catId,bookJournelId) =>{
    var data = await getapi(BASE_URL+"/category/findByBookType/"+bookJournelId);
    console.log(data);
    let tab = `<option value = ""> Select Category</option>`;
    let sr = 0; 
    data.response.forEach(e => {
        (catId == e.categoryId ? tab += `<option value = ${e.categoryId} selected>${e.categories}</option>`
        : tab += `<option value = ${e.categoryId}>${e.categories}</option>`);
    });
    document.getElementById("category").innerHTML = tab;
  });
  
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
  showBookData();



  function updateBook (){
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
    const bookId = document.getElementById("book-id").value;
    const purchasedDate = document.getElementById("dateTime").value;
    const body = {
      "bookId" :   bookId,
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
        "purchasedDate" : purchasedDate,
        "categoriesId": category
        }

    console.log(JSON.stringify(body));    
    
    let url = BASE_URL+"/book/updateBook";
    
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
            text: 'Book updated successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './manage-books.html'; 
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
