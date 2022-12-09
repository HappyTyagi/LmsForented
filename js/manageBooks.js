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

const bookList=[];
var currentPage = 1; 
var totalPage = 0;
var pageDivision = 5;
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

getBooks();

async function getBooks(data) {
  var data = await getapi(BASE_URL+"/book/getAllBook");   
    // Loop to access all rows 
    let sr = 0;
    //for (let r of data.list) 
    //for (let r of data.list) 
    data.response.bookResponseList.forEach(e => {
      bookList[sr] = e;
      sr++;
    });
     
    var tab = `<li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" onclick="populatebookDetailsTable(${currentPage--})">Previous</a>
              </li>
              <li class="page-item active" id ="nav">
                <a class="page-link" href="#" value="1" onclick="populatebookDetailsTable(1)">1</a>
              </li>`;
    
    for(var i=2;i<=bookList.length%pageDivision;i++){
      tab += `<li class="page-item" id ="nav">
                <a class="page-link" href="#" value="1" onclick= "populatebookDetailsTable(${i})">${i}</a>
              </li>`;
      totalPage = i;        
    }
    tab +=`<li class="page-item">
              <a class="page-link" href="#" onclick="populatebookDetailsTable(${currentPage++})">Next</a>
            </li>`;
    document.getElementById("paginationL").innerHTML = tab;        
    populatebookDetailsTable(1);
  }

async function changeActiveInactiveBook(){
  Swal.fire({
    text: 'Are you sure to change status of the Book?',
    icon: 'question',
    confirmButtonText: 'OK',
    showCancelButton: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      var bookId = document.getElementById("book-id").value;
      alert(bookId);
      const url = BASE_URL+"/book/activeOrInactive/"+bookId; 
      const response = await fetch(url,{
          method : 'GET',
          headers : {
                      'Content-Type' : 'application/json',
                      'token': localStorage.getItem("jwt")
                   }
      });
        if (response.status == '200') {
          Swal.fire({
            text: 'Book deleted',
            icon: 'success',
            confirmButtonText: 'OK'

          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './manage-books.html';       
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
});  
    return false;
}

  function updateBookShow(bookId){
    window.location.href = './update-book.html?bookId='+bookId;
  }
  
  function  getCategoryName(catId) {
    console.log(catId);
    let url = BASE_URL+"/category/findByCategoryId/"+catId;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("token",jwt);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        const response = objects['response'];
        if (objects['status'] != '200') {
          return "";
        }
        return (response['categories']);
      }
    }; 
  }

  async function loadBookDataModal(bookId){
    var data = await getapi(BASE_URL+"/book/searchBookById/"+bookId);
    data.response.bookResponseList.forEach(e => {
    document.getElementById("book-id").value = e.addBook.bookId;
    document.getElementById("book-name").value = e.addBook.bookName;
    document.getElementById("publication-name").value = e.author.publication; 
    document.getElementById("edition").value = e.addBook.edition;
    document.getElementById("publish-date").value = e.author.publistionDate;
    document.getElementById("local-number").value =e.addBook.assignLocalNo;
    document.getElementById("no-pages").value = e.addBook.noOfPages;
    document.getElementById("categoryM").value = e.categories.categories;
    document.getElementById("dateTime").value = e.addBook.purchasedDate;
    document.getElementById("bookJournelType").value = e.bookType.bookTypeName;
    document.getElementById("authorM").value = e.author.fullName;
    if (e.addBook.isActive==1){
        document.getElementById("status").options.selectedIndex = 0;
    }
    else{ 
        document.getElementById("status").options.selectedIndex = 1; 
    }
    });
  }

function populatebookDetailsTable(gotoPage){
  alert(gotoPage === 1? 1 : ((gotoPage*pageDivision)/pageDivision)+1);
  var startFrom = (gotoPage === 1? 1 : ((gotoPage*pageDivision)/pageDivision)+1);
  var endAt = gotoPage*pageDivision;
  var tab = ``;
  for(; startFrom <= endAt && startFrom <= bookList.length ; startFrom++){
    var e = bookList[startFrom - 1];
      tab += `<tr>
      <th scope="row">${startFrom}</th>
      <td>${e.addBook.bookName}</td>
      <td>${e.author.fullName}</td>
      <td>${e.categories.categories}</td>
      <td>${e.addBook.isActive === 1? 'Active' : 'Inactive'}</td>
      <td> 
          <button type="button" class="btn btn-primary" onClick ="updateBookShow('${e.addBook.bookId}')"><i class="fa fa-edit"></i></button>
          <button type="button" class="btn btn-danger"  data-toggle="modal" data-target="#myModal" onclick="loadBookDataModal('${e.addBook.bookId}')"><i class="fa fa-eye"></i></button>
       </td>
    </tr>`;
  }
  document.getElementById("bookList").getElementsByTagName('tbody')[0].innerHTML = tab;

}