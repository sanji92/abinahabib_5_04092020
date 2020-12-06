// condition de redirection vers la page paniervide.html si localStorage vide

const lienPanier = document.getElementById("lienpanier")
if (localStorage.length === 0) {
    lienPanier.setAttribute('href', 'paniervide.html')
}
else {
    location.replace("panier.html")
}