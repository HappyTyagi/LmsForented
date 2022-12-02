const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");

if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}


function addAuthor(){
    const authorName = document.getElementById("author-name").value;
    const edition = document.getElementById("edition").value;
    const publishedDate = document.getElementById("publishedDate").value;
    const publication = document.getElementById("publication").value;

    const body = {  "fullName": authorName,
                    "edition": edition,
                    "publistionDate": publishedDate,
                    "publication": publication  
                 }; 

    let url = BASE_URL+"/author/addAuthor";
    console.log(JSON.stringify(body));
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
            text: 'Author added successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './manage-authors.html';
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

  function getCategories(){
    const category = document.getElementById("category-name").value;
    const body = {"categories": category  };
    console.log(jwt);    
    let url = BASE_URL+"/category/getAllCategories";
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
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
          
        } else {
        
        }
      }
    };
    return false;
  }
