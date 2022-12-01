const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null ){
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
  

  async function getmyBooks(data) {
    var data = await getapi(BASE_URL+"/loginController/getStudentInfo");   
    let tab = ``;
      let sr = 0; 
      
      data.response.bookResponseList.forEach(e => {
          sr++;
          tab += `<tr>
          <th scope="row">${sr}</th>
          <td>${e.addBook.bookName}</td>
          <td>${e.bookType.bookTypeName}</td>
          <td>${e.author.publication}</td>
          <td>Issue date present in API response</td>
          <td>Return date present in API response</td>
          <td>Penalty present in API response</td>
        </tr>`;
      });
      tab += `</tbody>`;
          document.getElementById("mybookList").getElementsByTagName('tbody')[0].innerHTML = tab;
      }
  getmyBooks();