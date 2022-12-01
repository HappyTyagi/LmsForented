
var jwt = localStorage.getItem("jwt");
if (jwt == null) {
  
  window.location.href = './login.html'
}

function logout() {
  localStorage.clear("jwt");
  window.location.href = './login.html';
}
