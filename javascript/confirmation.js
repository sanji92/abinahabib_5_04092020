const lienPanier = document.getElementById("lienpanier")
if (localStorage.length === 0) {
    lienPanier.setAttribute('href', 'paniervide.html')
}

//Recherche de données dans l'URL
const urlInfo = window.location.search.substr(1).split('&');
const orderId = urlInfo[0].replace('id=', '');
const total = urlInfo[1].replace('price=', '');
const pseudo = urlInfo[2].replace('user=', '');

// Emploi des données capturées un peu plus tôt pour afficher message de confirmation
const pseudoHtml = document.getElementById('pseudo');
const orderHtml = document.getElementById('numcommande');
const prixHtml = document.getElementById('prix');

pseudoHtml.textContent = pseudo;
orderHtml.textContent = orderId;
prixHtml.textContent = total;

// Suppression du localStorage
localStorage.clear();