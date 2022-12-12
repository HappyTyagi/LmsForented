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

const authorList=[];
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
  show(data.response);
}

getapi(BASE_URL+"/author/authors");


function show(data) {
    // Loop to access all rows 
    let sr = 0;
    //for (let r of data.list) 
    data.forEach(e => {
      authorList[sr] = e;
      sr++;
    });
    var tab = `<li class="page-item disabled" onclick="populatePreviousPage()" id="page-1">
                  <a class="page-link" href="#" tabindex="-1" >Previous</a>
              </li>
              <li class="page-item" onclick="populateAuthorDetailsTable(1)" id ="page1">
                <a class="page-link" href="#" value="1" >1</a>
              </li>`;
    var noPages = authorList.length/pageDivision;
    for(var i=2;i<=noPages;i++){
      tab += `<li class="page-item" onclick= "populateAuthorDetailsTable(${i})" id="page${i}">
                <a class="page-link" href="#" value="1" >${i}</a>
              </li>`;
      totalPage = i;        
    }
    tab +=`<li class="page-item" onclick="populateNextPage()" id="page+1">
              <a class="page-link" href="#">Next</a>
            </li>`;
    document.getElementById("paginationL").innerHTML = tab;        
    populateAuthorDetailsTable(1);  
  }
    
    
function populateAuthorDetailsTable(gotoPage){
  //alert(gotoPage === 1? 1 : ((gotoPage*pageDivision)/pageDivision)+1);
  var startFrom = (gotoPage === 1? 1 : (gotoPage*pageDivision)-pageDivision+1);
  var endAt = gotoPage*pageDivision;
  var tab = ``;
  for(; startFrom <= endAt && startFrom <= authorList.length ; startFrom++){
    var e = authorList[startFrom - 1];
    tab += `<tr>
    <th scope="row">${startFrom}</th>
    <td>${e.fullName}</td>
    <td>${e.isActive === 1? 'Active' : 'Inactive'}</td>
    <td> 
        <button type="button" class="btn btn-primary" onClick="updateauthorShow('${e.autherId}')"><i class="fa fa-edit"></i></button>
        <button type="button" class="btn btn-danger" onClick="removeAuthor('${e.autherId}')"><i class="fa fa-trash"></i></button>

     </td>
    </tr>`;
  }
  currentPage = gotoPage;
  document.getElementById("authorList").getElementsByTagName('tbody')[0].innerHTML = tab;
  document.getElementById("page"+gotoPage).classList.add("active");
  document.getElementById("page"+gotoPage--).classList.remove("active");
}

function populateNextPage(){
  if(currentPage < totalPage)
  var gotoPage = currentPage+1
  populateAuthorDetailsTable(gotoPage);
}

function populatePreviousPage(){
  var gotoPage = currentPage-1
  if(currentPage > 1)
  populateAuthorDetailsTable(gotoPage);
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
          const url = BASE_URL+"/author/activeOrInActiveAuthor/"+authorId; 
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
    });  
        return false;
    }