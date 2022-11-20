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



const showBookData = (async() =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get('bookId');
    var data = await getapi(BASE_URL+"/book/searchBookById/"+bookId);
    data.response.bookResponseList.forEach(e => {
    document.getElementById("book-name").value = e.addBook.bookName;
    document.getElementById("publication-name").value = "not available"; 
    document.getElementById("edition").value = e.addBook.edition;
    document.getElementById("publish-date").value = "not available";
    document.getElementById("local-number").value =e.addBook.assignLocalNo;
    document.getElementById("no-pages").value = e.addBook.noOfPages;
    document.getElementById("quantity").value = e.addBook.quantity;
    document.getElementById("purchased").value = e.addBook.purchased;
    document.getElementById("sourceName").value = e.addBook.sourceName;
    document.getElementById("sourceAddress").value = e.addBook.sourceAddress;
    document.getElementById("sourceContactNo").value =e.addBook.sourceContactNo;
    document.getElementById("billNum").value =e.addBook.billNo;
    document.getElementById("cost").value = e.addBook.cost;
    document.getElementById("purchasedBy").value = e.addBook.purchasedBy;
    document.getElementById("bookcondition").value = e.addBook.bookCondition;
    document.getElementById("withBinding").value = e.addBook.enableBinding;
  });
});

  
  const showCategory = (async(catId) =>{
    var data = await getapi(BASE_URL+"/category/getAllCategories");
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