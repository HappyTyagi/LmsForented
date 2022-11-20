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


const showAuthorData = (async() =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const authId = urlParams.get('authId');
  var data = await getapi(BASE_URL+"/author/findAuthorById/"+authId);
  var author = data.response;
  document.getElementById("author-id").value = author.autherId;
  document.getElementById("author-name").value = author.fullName;
  document.getElementById("edition").value = author.edition;
  document.getElementById("publishedDate").value = author.publistionDate;
  document.getElementById("publication").value = author.publication;
});
showAuthorData();


function updateAuthor(){
  const authorId =  document.getElementById("author-id").value;
  const authorName = document.getElementById("author-name").value;
  const edition = document.getElementById("edition").value;
  const publishedDate = document.getElementById("publishedDate").value;
  const publication = document.getElementById("publication").value;

  const body = {  
                  "autherId" : authorId,
                  "fullName": authorName,
                  "edition": edition,
                  "publistionDate": publishedDate,
                  "publication": publication  
               }; 

  let url = BASE_URL+"/author/updateAuthor";
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

