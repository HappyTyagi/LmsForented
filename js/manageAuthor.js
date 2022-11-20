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
  show(data.response);
}

getapi(BASE_URL+"/author/authors");


function show(data) {
    let tab = 
        ` <thead class="thead-dark">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Authors Name</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>`;
    
    // Loop to access all rows 
    let sr = 0;
    //for (let r of data.list) 
    data.forEach(e => {
        sr++;
        tab += `<tr>
        <th scope="row">${sr}</th>
        <td>${e.fullName}</td>
        <td>Active</td>
        <td> 
            <button type="button" class="btn btn-primary" onClick="updateauthorShow('${e.autherId}')"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-danger" onClick="removeAuthor('${e.autherId}')"><i class="fa fa-trash"></i></button>

         </td>
      </tr>`;
    });
    tab += `</tbody>`;
        document.getElementById("authorList").innerHTML = tab;
    }

    function updateauthorShow(authorId){
      window.location.href = './update-authors.html?authId='+authorId;
    }


    async function removeAuthor(authorId){
      Swal.fire({
        text: 'Are you sure to delete the Book?',
        icon: 'question',
        confirmButtonText: 'OK',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const url = BASE_URL+"/author/removeAuthor/"+authorId; 
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