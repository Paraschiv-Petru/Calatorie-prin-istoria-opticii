function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('active'); // Schimbă starea meniului (deschis / închis)
}

// Închide meniul când se face clic pe orice element din meniu
document.querySelectorAll(".menu a").forEach(function(link) {
    link.addEventListener("click", function() {
        var menu = document.querySelector(".menu");
        menu.classList.remove("active"); // Îndepărtează clasa 'active' pentru a închide meniul
    });
});
