////// RECUPERATION DE L'ID DU PRODUIT ////////
const queryString = window.location.search;
const cameraId = new URLSearchParams(queryString).get('id');
console.log(cameraId);
const api = "http://localhost:3000/api/cameras/" + cameraId;


///// REQUETE API VIA FETCH ////////
const getProduct = async function () {
  try {
    let response = await fetch(api);
    if (response.ok) {
      let data = await response.json();
      console.log(data)


      ////// FONCTION MODIFICATION DOM ///////
      function templateItems() {



        // Ajout de la Div Col dans la div row items
        const cardItems = document.getElementById("items")
        const divCol = document.createElement('div');
        divCol.setAttribute('class', 'col-12')
        cardItems.appendChild(divCol)

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
        const desProd = document.createElement('p')
        const priProd = document.createElement('p')
        desProd.textContent = data.description
        priProd.textContent = `${data.price} €`
        cardText.appendChild(desProd)
        cardText.appendChild(priProd)


        //ajout choix lenses via form
        const form = document.createElement("form");
        form.setAttribute("id", "formSelect");

        const selectLenses = document.createElement("select"); // ON CREE UN ELEMENT SELECT
        selectLenses.setAttribute("class", "form-control custom-select mb-4");
        selectLenses.setAttribute("required", ""); // CHOIX OBLIGATOIRE

        let optionTitle = document.createElement("option"); // ON CREE UNE PREMIERE OPTION QUI SERVIRA D'INFORMATION
        optionTitle.setAttribute("selected", ""); // ON CHOISI LA PREMIERE OPTION DE BASE
        optionTitle.setAttribute("disabled", ""); // ON LA DESACTIVE AFIN QU'ELLE NE SOIT PAS SELECTIONNABLE
        optionTitle.setAttribute("value", "");
        optionTitle.textContent = "Choisissez la taille de la lentille:";
        cardText.appendChild(form)
        form.appendChild(selectLenses);
        selectLenses.appendChild(optionTitle)

        let lenses = data.lenses;
        for (let lense of lenses) {
          let choixLentille = document.createElement('option');
          choixLentille.textContent = lense;
          selectLenses.appendChild(choixLentille);
        }


        // Ajout Bouton Ajouter au panier
        const butProd = document.createElement('button')
        butProd.setAttribute('class', 'float-right btn btn-danger')
        butProd.textContent = 'Ajouter au panier'
        cardText.appendChild(butProd)



        // Ecouteur d'évènement sur le clic pour ajouté un produit dans localStorage
        butProd.addEventListener('click', function () {
          if (selectLenses.value === "") {
            butProd.textContent = "Selectionnez une lentille !"
          } else {
            if (quantity <= 0, quantity++) {
            }
            addToCart(data)
            butProd.textContent = `Ajouté ! +${quantity}`
          }
        })


        let quantity = 0;

        // fonction Ajout au panier avec gestion de la quantité 

        /////// FONCTION AJOUT DANS LE PANIER //////
        function addToCart(data) {
          let cartProducts = []
          let saveToCartProduct = {
            _id: data._id,
            name: data.name,
            price: data.price,
            quantity: 1,
            selectLenses: selectLenses.value
          }
          let newDifferentProduct = true;

          if (localStorage.getItem('cartProducts') === null) {
            cartProducts.push(saveToCartProduct);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
          }
          else {
            cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
            cartProducts.forEach((prod) => {
              if (data._id === prod._id && data.selectLenses === prod.selectlenses) {
                prod.quantity++;
                newDifferentProduct = false;
              }
            })
            if (newDifferentProduct) cartProducts.push(saveToCartProduct);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts))

          }
          checkCart()
        }

        /////// FONCTION DU CONTROLE DE PANIER (possibilité afficher quantité total dans panier) //////////
        function checkCart() {
          let nb = 0;

          if (localStorage.getItem('cartProducts') !== null) {
            let cp = JSON.parse(localStorage.getItem("cartProducts"));

            cp.forEach((prod) => {
              nb = nb + prod.quantity;
            });
          }
          console.log(nb)
        }


        // Ajout de l'image dans la div card text
        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img mt-3')
        cardText.appendChild(cardImg)
        const imgProd = data.imageUrl
        cardImg.setAttribute('src', imgProd)

        // condition de redirection vers la page paniervide.html si localStorage vide
        const lienPanier = document.getElementById("lienpanier")
        if (localStorage.length === 0) {
          lienPanier.setAttribute('href', 'paniervide.html')
        }
        console.log(localStorage)
      }

      templateItems()

    } else {
      console.error('reponse serveur : ', response.status);
    }
  } catch (e) { //catch permet de capturer l'erreur
    console.log(e) //le console.log de (e) affiche l'erreur en question
  }
}

getProduct();

