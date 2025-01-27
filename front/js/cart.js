//on récupère le local storage
let get_panier = localStorage.getItem("obj");
let panier = JSON.parse(get_panier);

let contenu = "";
let quantite_totale = 0;
let prix_total = 0;

function checkCart(){
  if(panier){
    getData();
  }
  else{
    alert("Votre panier est vide.");
    return false;
  }
}

//récupération du prix non stocké et de l'ID
function getData(){
  panier.forEach(element => {
    let product_id = element.produit_id;
    fetch("http://localhost:3000/api/products/" + product_id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) 
    {
      displayPanier(element,value);
    });
  });
}

//affichage des produits présents dans le panier
function displayPanier(element,value) {

  //récupérer les données du produit
  let product_id = element.produit_id;
  let product_name = element.produit_nom;
  let product_url = element.produit_url;
  let product_alt = element.produit_alt;
  let product_color = element.produit_couleur;
  let product_quantity = element.produit_quantite;
  let product_price = value.price;

  //on les intègre dans l'HTML
  contenu = contenu +
    "<article class=cart__item data-id=" + product_id + "data-color =" + product_color + ">" +
    "<div class=\"cart__item__img\">" +
    "<img src= \"" + product_url + "\" alt= \"" + product_alt + "\">" +
    "</div>" +
    "<div class=\"cart__item__content\">" +
    "<div class=\"cart__item__content__description\">" +
    "<h2>" + product_name + "</h2>" +
    "<p>" + product_color + "</p>" +
    "<p>" + product_price + "€</p>" +
    "</div>" +
    "<div class=\"cart__item__content__settings\">" +
    "<div class=\"cart__item__content__settings__quantity\">" +
    "<p> Qté :</p>" +
    "<input type=\"number\" id=" + product_id + " class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=" + product_quantity + ">" +
    "</div>" +
    "<div class=\"cart__item__content__settings__delete\">" +
    "<p id=" + product_id + " value=" + product_color + " class=\"deleteItem\">Supprimer</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</article>";

    document.getElementById("cart__items").innerHTML = contenu;

    updatePanier(element,product_price);
    modifPanier();
    suppPanier();
    getFormContact();
      
}

//fonction qui met à jour le prix et quantité totaux
function updatePanier(element,product_price) {

  quantite_totale += Number(element.produit_quantite);
  document.getElementById("totalQuantity").innerHTML = quantite_totale;

  //récupérer le prix total
  prix_total += Number(element.produit_quantite) * Number(product_price);
  document.getElementById("totalPrice").innerHTML = prix_total;
}

//modification quantité objets
function modifPanier() {
  var modif = document.querySelectorAll(".itemQuantity");
  modif.forEach(el => {
    el.addEventListener('change', (event) => {
      //on récupère la nouvelle quantité et l'id correspondant
      new_product_quantity = event.target.value;
      id_productToChange = el.id;
      if (new_product_quantity == 0) {
        alert("Veuillez sélectionner au moins un produit.")
      }
      else {
        if (event.target.value < 100) {
          const findObject = panier.find(objet => objet.produit_id === id_productToChange);
          const objectNewQuantity = { ...findObject, produit_quantite: Number(new_product_quantity) };
          newPanier = panier
            .filter(objet => !(objet.produit_id === id_productToChange))
            .concat(objectNewQuantity);
          let produit_json = JSON.stringify(newPanier);
          localStorage.setItem("obj", produit_json);
          window.location.reload();
        }
        else {
          alert("Veuillez sélectionner un maximum de 100 articles.");
          return false;
        }
      }
    });

  });
}

//suppression d'un objet
function suppPanier() {
  var supp = document.querySelectorAll(".deleteItem");
  supp.forEach(el => {
    el.addEventListener('click', () => {
      //on récupère la nouvelle quantité et l'id correspondant
      let id_productToDelete = el.id;
      const productToDelete = panier.find(objet => objet.produit_id === id_productToDelete);
      let couleur_productToDelete = productToDelete.produit_couleur;
      newPanier = panier
        .filter(objet => !(objet.produit_id === id_productToDelete && objet.produit_couleur === couleur_productToDelete))
      let produit_json = JSON.stringify(newPanier);
      localStorage.setItem("obj", produit_json);
      window.location.reload();

    });

  });
}

//formulaire de contact - récupération des données rentrées par l'utilisateur
function getFormContact() {
  var prenom_query = document.getElementById("firstName");
  prenom_query.addEventListener('input', (event) => {
    //on récupère le prénom
    prenom = event.target.value;
    if (/^((?=.{1,50}$)[a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/i.test(prenom)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
      return true;
    }
    else {
      document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom n'est pas dans le bon format.";
    }
  });
  if (prenom_query.value === ""){
    document.getElementById("firstNameErrorMsg").innerHTML = "Ce champ ne peut pas être vide.";
  }

  var nom_query = document.getElementById("lastName");
  nom_query.addEventListener('input', (event) => {
    //on récupère le nom
    nom = event.target.value;
    if (/^((?=.{1,50}$)[a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/i.test(nom)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
      return true;
    }
    else {
      document.getElementById("lastNameErrorMsg").innerHTML = "Le nom n'est pas dans le bon format.";
    }
  });
  if (nom_query.value === ""){
    document.getElementById("lastNameErrorMsg").innerHTML = "Ce champ ne peut pas être vide.";
  }

  var adresse_query = document.getElementById("address");
  adresse_query.addEventListener('input', (event) => {
    //on récupère l'adresse
    adresse = event.target.value;
    if (/^[a-zàáâäçèéêëìíîïñòóôöùúûüA-Z0-9\s,.'-]{3,}$/.test(adresse)) {
      document.getElementById("addressErrorMsg").innerHTML = "";
      return true;
    }
    else{
    document.getElementById("addressErrorMsg").innerHTML = "L'adresse n'est pas dans le bon format.";
    }
  });
  if (adresse_query.value === ""){
    document.getElementById("addressErrorMsg").innerHTML = "Ce champ ne peut pas être vide.";
  }

  var ville_query = document.getElementById("city");
  ville_query.addEventListener('input', (event) => {
    //on récupère la ville
    ville = event.target.value;
    if (/^((?=.{3,}$)[a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$/i.test(ville)) {
      document.getElementById("cityErrorMsg").innerHTML = "";
      return true;
    }else{
    document.getElementById("cityErrorMsg").innerHTML = "La ville n'est pas dans le bon format.";
    }
  });
  if (ville_query.value === ""){
    document.getElementById("cityErrorMsg").innerHTML = "Ce champ ne peut pas être vide.";
  }

  var email_query = document.getElementById("email");
  email_query.addEventListener('input', (event) => {
    //on récupère l'email
    email = event.target.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.getElementById("emailErrorMsg").innerHTML = "";
      return true;
    }
    document.getElementById("emailErrorMsg").innerHTML = "L'adresse email n'est pas dans le bon format.";
  });
  if (email_query.value === ""){
    document.getElementById("emailErrorMsg").innerHTML = "Ce champ ne peut pas être vide.";
  }

  //lors du clic sur le bouton Envoyer, toutes les données sont récupérées
  var order = document.getElementById("order");
  order.addEventListener('click', () => {
    let contact_form =
    {
      firstName: prenom_query.value,
      lastName: nom_query.value,
      address: adresse_query.value,
      city: ville_query.value,
      email: email_query.value
    }
    let products_array = JSON.parse(localStorage.getItem("obj"));
      let array = [];
      products_array.forEach(objet => {
        array.push(objet.produit_id);
      });
      let jsonToPost = {
        contact: contact_form,
        products: array
      }
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonToPost),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (response) {
          let orderId = response.orderId;
          document.location.href = `confirmation.html?orderId=${orderId}`;
        })
        //Making a catch to display an error if something went wrong
        .catch(function (err) {
          console.log(err);
        });
    
  });

}

checkCart();



















































