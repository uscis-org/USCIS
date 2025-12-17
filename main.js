function toggleMenu() {
    const menu = document.getElementById("menuMovil");
    const btn = document.getElementById("menuBtn");
    menu.classList.toggle("show");
    btn.textContent = menu.classList.contains("show") ? "✖ CERRAR" : "MENÚ";
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const correctPassword = 'IOE8356142790';
    if (password === correctPassword) {
        window.location.href = 'case-status.html?receiptNumber=' + encodeURIComponent(password);
    } else {
        alert('Número de recibo incorrecto. Inténtalo de nuevo.');
    }

});
