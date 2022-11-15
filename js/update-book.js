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

const showBookData = (async() =>{
    var data = await getapi(BASE_URL+"book/searchBookById/LMS_KA_BK1668140975648");
    var book = data.response.addBooks;
    document.getElementById("book-name").value = book.bookName;
    document.getElementById("publication-name").value = "not available"; 
    document.getElementById("edition").value = book.edition;
    document.getElementById("publish-date").value = "not available";
    document.getElementById("local-number").value = book.assignLocalNo;
    document.getElementById("no-pages").value = book.noOfPages;
    document.getElementById("quantity").value = book.quantity;
    document.getElementById("purchased").value = book.purchased;
    document.getElementById("sourceName").value = book.sourceName;
    document.getElementById("sourceAddress").value = book.sourceAddress;
    document.getElementById("sourceContactNo").value = book.sourceContactNo;
    document.getElementById("billNum").value = book.billNo;
    document.getElementById("cost").value = book.cost;
    document.getElementById("purchasedBy").value = book.purchasedBy;
    document.getElementById("bookcondition").value = book.bookCondition;
    document.getElementById("withBinding").value = book.enableBinding;
    showCategory(book.categoriesId);
    showAuthorName(book.authorsId);
  
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
  
  showBookData();