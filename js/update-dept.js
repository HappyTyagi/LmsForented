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


const showDepartmentData = (async() =>{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deptId = urlParams.get('deptId');
  var data = await getapi(BASE_URL+"/department/searchDepartmentById/"+deptId);
  var department = data.response;
  document.getElementById("deptId").value = department.departmentId;
  document.getElementById("departmentName").value = department.departmentName;
  if (department.isActive==1)
    document.getElementById("status").options.selectedIndex = 1;
  else 
    document.getElementById("status").options.selectedIndex = 2; 

});
showDepartmentData();

function updateAuthor(){
  const deptId = document.getElementById("deptId").value;  
  const departmentName = document.getElementById("departmentName").value;
  const isActive = document.getElementById("status").value;
    const body = {
                    "depertmentId" : deptId,
                    "departmentName": departmentName , 
                    "isActive" : isActive 
                  };
    let url = BASE_URL+"/department/updateDepartment";
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
            text: ' Department updated successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './manage-department.html';
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

