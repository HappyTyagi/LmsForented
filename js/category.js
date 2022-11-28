const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}

function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userRole");
  window.location.href = './login.html';
}

// function not needed
// function getSelectedValueforCheckboxRadio(elementName){
//   var ele = document.getElementsByName(elementName); 
//   for(i = 0; i < ele.length; i++) {
//       if(ele[i].type="radio") {
//           if(ele[i].checked)
//             return (ele[i].value);
//       }
//   }
// }

function addCategory(){
    const category = document.getElementById("categoryName").value;
    const isActive = document.getElementById("status").value;
    const itemType = document.getElementById("itemType").value;
    const penaltyRate = document.getElementById("penaltyRate").value;
    const body = {
                    "categories": category , 
                    "isActive" : isActive ,
                    "bookJournel" :  itemType,
                    "penaltyRate" : penaltyRate
                  };
    let url = BASE_URL+"/category/addCategory";
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
            text: response['categories']+' Category created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
             // window.location.href = './manage-categories.html';
             document.getElementById("addCategoryForm").reset();
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
  
  const showBookType = (async() =>{
    var data = await getapi(BASE_URL+"/bookType/getAllBookType");
    console.log(data);
    let tab = `<option value = ""> Select Category</option>`;
    let sr = 0; 
    data.response.forEach(e => {
      tab += `<option value = ${e.bookTypeId}>${e.bookTypeName}</option>`;
    });
    document.getElementById("itemType").innerHTML = tab;
  });


  showBookType();