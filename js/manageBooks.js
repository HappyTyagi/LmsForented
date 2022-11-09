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

getapi(BASE_URL+"/book/getAllBook");


function show(data) {
    let tab = 
        `<thead class="thead-dark">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Book/Journal Name</th>
          <th scope="col">Publication</th>
          <th scope="col">Category</th>
          <th scope="col">Photos</th>
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
        <td>${e.bookName}</td>
        <td>"Publication name not present in API response"</td>
        <td>"Get Category by categoryID API is needed"</td>
        <td><img src="./images/a1.jpg" class="manage-image"></td>
        <td> 
            <button type="button" class="btn btn-primary"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button>

         </td>
      </tr>`;
    });
    tab += `</tbody>`;
        document.getElementById("bookList").innerHTML = tab;
    }
