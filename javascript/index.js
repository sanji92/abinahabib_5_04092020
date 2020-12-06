////////// REQUETE API VIA FETCH ///////////
const api = "http://localhost:3000/api/cameras";

const getProduct = async function () {
  try {
    let response = await fetch(api);
    if (response.ok) {
      let data = await response.json();
      console.log(data)

      ///////////FONCTION MODIFICATION DOM///////////
      function templateItems(data) {


        // Ajout de la Div Col dans la div row items

        const cardItems = document.getElementById("items");
        let divCol = document.createElement('div');
        divCol.setAttribute('class', 'col-12 col-lg-4 mt-3');
        cardItems.appendChild(divCol);


        // Creation div card dans la div col

        const card = document.createElement('div');
        card.setAttribute('class', 'card')
        divCol.appendChild(card)


        // Creation div card body dans la div card

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body')
        card.appendChild(cardBody)


        // Creation Div title (+ ajout du titre)  dans la div card body

        const cardTitle = document.createElement('div');
        cardTitle.setAttribute('class', 'card-title')
        cardBody.appendChild(cardTitle)
        const titleProd = document.createElement('h5')
        titleProd.textContent = data.name
        cardTitle.appendChild(titleProd)


        // Creation div text/description (+ ajout du prix + ajout du bouton acheter) dans la div cardItems

        const cardText = document.createElement('div');
        cardText.setAttribute('class', 'card-text')
        cardTitle.appendChild(cardText)

        // Creation div text/description (+ ajout du prix + ajout du bouton acheter) dans la div cardItems
        const desProd = document.createElement('p')
        const priProd = document.createElement('p')
        const butProd = document.createElement('button')
        butProd.setAttribute("class", "float-right btn btn-danger")
        butProd.setAttribute("type", "button")
        butProd.setAttribute("id", "acheter")
        butProd.innerHTML = `<a class="text-decoration-none text-white" href="produit.html?id=${data._id}">Voir produit</a>`
        desProd.textContent = data.description
        priProd.textContent = `${data.price} €`
        cardText.appendChild(desProd)
        cardText.appendChild(priProd)
        cardText.appendChild(butProd)


        // Ajout de l'image dans la div card text

        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img mt-3')
        cardText.appendChild(cardImg)
        const imgProd = data.imageUrl
        cardImg.setAttribute('src', imgProd)


      }
      ///////// BOUCLE AFIN DE RECUPERER CHAQUE PRODUIT DE L'API ///////   
      for (let i = 0; i < data.length; i++) {
        templateItems(data[i]);
      }
      // condition de redirection vers la page paniervide.html si localStorage vide
      const lienPanier = document.getElementById("lienpanier")
      if (localStorage.length === 0) {
        lienPanier.setAttribute('href', 'paniervide.html')
      }
      console.log(localStorage)
    }
    else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}

getProduct();

