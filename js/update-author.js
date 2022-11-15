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
 

const showAuthorData = (async() =>{
    var data = await getapi(BASE_URL+"/author/authors");
    var author = data.response.    
    const authorName = document.getElementById("author-name").value;
    const edition = document.getElementById("edition").value;
    const publishedDate = document.getElementById("publishedDate").value;
    const publication = document.getElementById("publication").value;
});
}