const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
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

getBooks();

async function getBooks(data) {
  var data = await getapi(BASE_URL+"/book/getAllBook");   
  let tab = 
        `<thead class="thead-dark">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Book/Journal Name</th>
          <th scope="col">Publication</th>
          <th scope="col">Category</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
        <tbody>`;
    
    // Loop to access all rows 
    let sr = 0;
    //for (let r of data.list) 
    data.response.bookResponseList.forEach(e => {
        sr++;
        tab += `<tr>
        <th scope="row">${sr}</th>
        <td>${e.addBook.bookName}</td>
        <td>${e.author.fullName}</td>
        <td>${e.categories.categories}</td>
        <td>Active</td>
        <td> 
            <button type="button" class="btn btn-primary" onClick ="updateBookShow('${e.addBook.bookId}')"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-danger"  data-toggle="modal" data-target="#myModal"><i class="fa fa-eye"></i></button>
         </td>
      </tr>`;
    });
    tab += `</tbody>`;
        document.getElementById("bookList").innerHTML = tab;
    }

async function removeBook(bookId){
  Swal.fire({
    text: 'Are you sure to delete the Book?',
    icon: 'question',
    confirmButtonText: 'OK',
    showCancelButton: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
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