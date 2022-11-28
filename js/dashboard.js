const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
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

async function getDashboardData() {
    const url = BASE_URL+"/dashboard/getDashboardData";
    const body = {
        toDate:"",
        typeId:"1",
        fromDate:""
    };
        const response = await fetch(url,{
                method : 'POST',
                headers : {
                            'Content-Type' : 'application/json',
                            'token': localStorage.getItem("jwt")
                         },
                body : JSON.stringify(body)
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
        showDashboardData(data);
      }

function showDashboardData(data){
    if(data.status != 200){
        return false;
      }
      const dashboard = data.response;
      document.getElementById("total-books").innerHTML = dashboard.totalBook;
      document.getElementById("issued-books").innerHTML = dashboard.allIssuedBookListData;
      document.getElementById("returned-books").innerHTML = dashboard.returnBookListData;
      document.getElementById("maintn_books").innerHTML = dashboard.maintenanceBook;
      document.getElementById("damaged-books").innerHTML = dashboard.damageBook;
      document.getElementById("return-overdue").innerHTML = dashboard.overDueBook;
}

getDashboardData();