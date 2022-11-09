function logout() {
    localStorage.clear("jwt");
    window.location.href = './login.html';
}