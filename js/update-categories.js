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

  const showCategoryData = (async() =>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const categoryId = urlParams.get('catId');
    var data = await getapi(BASE_URL+"/category/findByCategoryId/"+categoryId);
    var category = data.response;
    document.getElementById("categoryName").value = category.categories;
    document.getElementById("penaltyRate").value= category.penaltyRate;
    document.getElementById("categoryId").value= category.categoryId; 
    showBookType(category.bookOrJournel.bookTypeId);
    if (category.isActive==1)
      document.getElementById("status").options.selectedIndex = 1;
    else 
      document.getElementById("status").options.selectedIndex = 2; 

});
showCategoryData();




function updateCategory(){
    const categoryId =  document.getElementById("categoryId").value;
    const category = document.getElementById("categoryName").value;
    const isActive = document.getElementById("status").value;
    const itemType = document.getElementById("itemType").value;
    const penaltyRate = document.getElementById("penaltyRate").value;
    const body = {
                    "categoryId" : categoryId,
                    "categories": category , 
                    "isActive" : isActive ,
                    "bookJournel" :  itemType,
                    "penaltyRate" : penaltyRate
                  };
    let url = BASE_URL+"/category/updateCategory";
    console.log(body);
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
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
          Swal.fire({
            text: response['categories']+' Category update successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './manage-categories.html';
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

  
  const showBookType = (async(bookJournelId) =>{
    var data = await getapi(BASE_URL+"/bookType/getAllBookType");
    console.log(data);
    let tab = `<option value = ""> Select Category</option>`;
    let sr = 0; 
    data.response.forEach(e => {
      if(bookJournelId == e.bookTypeId)
      tab += `<option value = ${e.bookTypeId} selected>${e.bookTypeName}</option>`;
      else 
      tab += `<option value = ${e.bookTypeId}>${e.bookTypeName}</option>`;
    });
    document.getElementById("itemType").innerHTML = tab;
  });


  