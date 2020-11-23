function articlesPanier() {


    let total = 0

    // condition de redirection vers la page paniervide.html si localStorage vide
    const lienPanier = document.getElementById("lienpanier")
    if (localStorage.length === 0) {
        lienPanier.setAttribute('href', 'paniervide.html')
    }

    // Modification DOM pour créer Div récapitulative du panier
    const rowId = document.getElementById('contenupanier')
    const divCol = document.createElement('div')
    divCol.setAttribute('class', 'col-md-8 order-md-2 mb-4')
    rowId.appendChild(divCol)


    const panierTitle = document.createElement('h4')
    panierTitle.setAttribute('class', 'd-flex justify-content-between align-items-center mb-3')
    panierTitle.innerHTML = '<span class="text-muted">Panier</span>'
    divCol.appendChild(panierTitle)

    const ulList = document.createElement('ul')
    ulList.setAttribute('class', "list-group mb-3")
    divCol.appendChild(ulList)

    let product = ""
    // DECLARATION CONSTANTE cartInformation QUI VA SERVIR POUR POST DANS L'API
    const cartInformation = {
        contact: {},
        products: []
    }

    ///// AFFICHE CHARQUE PRODUIT AJOUTE DANS LOCALSTORAGE DANS LE RECAPITULATIF PANIER

    products = JSON.parse(localStorage.getItem(('cartProducts')))
    products.forEach((product, index) => {

        total = total + (product.price * product.quantity)

        const nomProd = product.name
        const priceProd = product.price
        const quantProd = product.quantity
        const idProd = product._id
        sousTotal = (quantProd * priceProd)

        const liList = document.createElement('li')
        liList.setAttribute('class', 'list-group-item d-flex justify-content-between lh-condensed')
        ulList.appendChild(liList)

        const div = document.createElement('div')
        liList.appendChild(div)


        const itemTitle = document.createElement('h6')
        itemTitle.setAttribute("class", 'my-0')
        itemTitle.textContent = `${nomProd} | Quantité: ${quantProd}`
        div.appendChild(itemTitle)

        const price = document.createElement('span')
        price.setAttribute('class', 'text-muted')
        price.textContent = `${priceProd} €/pce = ${sousTotal} €`
        liList.appendChild(price)

        cartInformation.products.push(idProd) // push des id produit dans cartInformation

    })

    console.log(cartInformation)
    console.log(localStorage)

    // Affichage du prix total dans récapitulatif panier
    const liPrice = document.createElement('li')
    liPrice.setAttribute('class', 'list-group-item d-flex justify-content-between')
    liPrice.innerHTML = `<span>Total (EUR)</span><strong>${total} €</strong>`
    ulList.appendChild(liPrice)

    // bouton qui vide le localStorage et redirige vers page paniervide.html
    const butVider = document.getElementById('viderpanier')
    butVider.addEventListener('click', function () {
        localStorage.clear()
        butVider.textContent = "Veuillez patienter ..."
        window.setTimeout(function () { location.replace("paniervide.html") }, 2000)
    })

    // Déclaration emplacement DOM pour formulaire
    const prenomId = document.getElementById('prenom')
    const nomId = document.getElementById('nom')
    const adresseId = document.getElementById('adresse')
    const villeId = document.getElementById('ville')
    const emailId = document.getElementById('email')
    const btnCommande = document.getElementById('confirmercommande')

    //////// FONCTION DE VERIFICATION CHAMPS FORMULAIRE ///////////
    const validationForm = () => {

        const isNotEmpty = value => value !== "" ? true : false;
        const isLongEnough = value => value.length >= 3 ? true : false;
        const containNumber = /[0-9]/;
        const doNotContainNumber = value => !value.match(containNumber) ? true : false;
        const specialCharacter = /[$£°&+,:;=?@#|'<>.^*()!"{}_]/
        const doNotContainSpecialCharacter = value => !value.match(specialCharacter) ? true : false;
        const regexEmail = /.+@.+\..+/
        const isValidEmail = (value) => value.match(regexEmail) ? true : false;
        const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);

        const prenom = prenomId.value
        const nom = nomId.value
        const adresse = adresseId.value
        const ville = villeId.value
        const email = emailId.value

        if (isValidInput(prenom)) {
            prenomId.setAttribute('class', 'form-control bg-success')
            true
        } else {
            prenomId.setAttribute('placeholder', 'Votre prénom est requis !')
            return false
        }

        if (isValidInput(nom)) {
            nomId.setAttribute('class', 'form-control bg-success')
            true
        } else {
            nomId.setAttribute('placeholder', 'Votre nom est requis !')
            return false
        }

        if (isNotEmpty(adresse) && isLongEnough(adresse)) {
            adresseId.setAttribute('class', 'form-control bg-success')
            true
        } else {
            adresseId.setAttribute('placeholder', 'Votre adresse est requise !')
            return false
        }
        if (isValidInput(ville)) {
            villeId.setAttribute('class', 'form-control bg-success')
            true
        } else {
            villeId.setAttribute('placeholder', 'Votre ville est requise !')
            return false
        }

        if (isValidEmail(email)) {
            emailId.setAttribute('class', 'form-control bg-success')
            true
        } else {
            emailId.setAttribute('placeholder', 'Votre email est requis !')
            return false
        }
        // return des inputs contact dans cartInformation
        return cartInformation.contact = {
            "firstName": prenom,
            "lastName": nom,
            "address": adresse,
            "city": ville,
            "email": email
        }
    }

    console.log(cartInformation)
    console.log(JSON.stringify(cartInformation))


    /////// FONCTION REQUETE POST FETCH ///////
    const postData = async (method, url, dataElt) => {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(dataElt)
        })
        return await response.json();
    }

    ////// ECOUTEUR EVENEMENT BOUTON ENVOI DE CARTINFORMATION DANS API ////// 
    btnCommande.addEventListener('click', async function (e) {
        e.preventDefault()
        if (validationForm()) {

            btnCommande.textContent = "Veuillez patienter ..."
            const formValid = validationForm()
            // Utilisation fonction postData avec paramètre, inscription retour api dans l'url 
            if (formValid !== false) {
                const response = await postData('POST', 'http://localhost:3000/api/cameras/order', cartInformation)
                window.setTimeout(function () { window.location = `confirmation.html?id=${response.orderId}&price=${total}&user=${prenom.value}` }, 2000)

            }
        } else {
            validationForm()
            btnCommande.textContent = "Veuillez remplir correctement les champs ..."
        }


        console.log(cartInformation)
    })


}

articlesPanier()

