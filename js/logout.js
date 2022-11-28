function logout() {
    localStorage.clear("jwt");
    localStorage.clear("userRole");
    window.location.href = './login.html';
}