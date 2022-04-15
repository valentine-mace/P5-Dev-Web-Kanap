//on récupère le local storage
let get_panier = localStorage.getItem("obj");
let panier = JSON.parse(get_panier);

let contenu = "";
let quantite_totale = 0;
let prix_total = 0;

//affichage des produits présents dans le panier
panier.forEach(element => 
{
  //récupérer les données du produit
  let product_id = element.produit_id;
  let product_name = element.produit_nom;
  let product_price = element.produit_prix;
  let product_url = element.produit_url;
  let product_alt = element.produit_alt;	
  let product_color = element.produit_couleur;
  let product_quantity= element.produit_quantite;	
  //on les intègre dans l'HTML
  contenu = contenu +
  "<article class=cart__item data-id=" + product_id+ "data-color =" +product_color+ ">" +
  "<div class=\"cart__item__img\">" +
    "<img src= \""+product_url+"\" alt= \""+product_alt+"\">" +
  "</div>" +
  "<div class=\"cart__item__content\">" +
    "<div class=\"cart__item__content__description\">" +
      "<h2>"+product_name+"</h2>" +
      "<p>"+product_color+"</p>" +
      "<p>"+product_price+"€</p>" +
    "</div>" +
    "<div class=\"cart__item__content__settings\">" +
      "<div class=\"cart__item__content__settings__quantity\">" +
        "<p> Qté :</p>" +
        "<input type=\"number\" id="+product_id+" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value="+product_quantity+">"+
      "</div>" +
      "<div class=\"cart__item__content__settings__delete\">" +
        "<p id="+product_id+" value="+product_color+" class=\"deleteItem\">Supprimer</p>" +
      "</div>" +
    "</div>" +
  "</div>" +
  "</article>"

});

//on intègre tout dans l'html
document.getElementById("cart__items").innerHTML = contenu;
updatePanier();
modifPanier();
suppPanier();

//modification quantité objets
function modifPanier(){
  var modif = document.querySelectorAll(".itemQuantity");
  modif.forEach(el => 
  {
    el.addEventListener('change', (event) => {
      //on récupère la nouvelle quantité et l'id correspondant
      new_product_quantity = event.target.value;
      id_productToChange = el.id;
      if(new_product_quantity == 0){
        alert("Veuillez sélectionner au moins un produit.")
      }
      else{

        const findObject = panier.find(objet => objet.produit_id === id_productToChange);
        const objectNewQuantity = {...findObject, produit_quantite: Number(new_product_quantity)};
        newPanier = panier
          .filter(objet => !(objet.produit_id === id_productToChange))
          .concat(objectNewQuantity);
        let produit_json = JSON.stringify(newPanier);
        localStorage.setItem("obj",produit_json);
        //on met à jour le prix et quantité totaux avec les nouvelles valeurs
        updatePanier();
        window.location.reload();

      }
      });
  
  });
}

//suppression d'un objet
function suppPanier(){
  var supp = document.querySelectorAll(".deleteItem");
  supp.forEach(el => 
    {
      el.addEventListener('click', () => 
      {
        //on récupère la nouvelle quantité et l'id correspondant
        let id_productToDelete = el.id;
        const productToDelete = panier.find(objet => objet.produit_id === id_productToDelete);
        let couleur_productToDelete = productToDelete.produit_couleur;
        newPanier = panier
          .filter(objet => !(objet.produit_id === id_productToDelete  && objet.produit_couleur === couleur_productToDelete))
        let produit_json = JSON.stringify(newPanier);
        localStorage.setItem("obj",produit_json);
        window.location.reload();

      });
    
    });
}

//fonction qui met à jour le prix et quantité totaux
function updatePanier(){

  quantite_totale = 0;

  //récupérer le nombre total d'articles
  panier.forEach(function(element){
    quantite_totale += Number(element.produit_quantite);
    document.getElementById("totalQuantity").innerHTML = quantite_totale;

    //récupérer le prix total
    prix_total += Number(element.produit_quantite) * Number(element.produit_prix);
    document.getElementById("totalPrice").innerHTML = prix_total;
  });

}

//formulaire de contact - récupération des données rentrées par l'utilisateur
var prenom_query = document.getElementById("firstName");
prenom_query.addEventListener('change', (event) => {
  //on récupère le prénom
  prenom = event.target.value;
  if (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(prenom))
  {
    return true;
  }
  else{
    document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom n'est pas dans le bon format.";
    return (false)
  }
});

var nom_query = document.getElementById("lastName");
nom_query.addEventListener('change', (event) => {
  //on récupère le nom
  nom = event.target.value;
  //prob??????????????? -> rajouter les accents
  if (/^(([ ,.'-](?<!( {2}|[,.'-]{2})))*[A-Za-z])+[ ,.'-]?$/i.test(nom))
  {
    return (true)
  }
  document.getElementById("lastNameErrorMsg").innerHTML = "Le nom n'est pas dans le bon format.";
  return (false)
});

var adresse_query = document.getElementById("address");
adresse_query.addEventListener('change', (event) => {
  //on récupère l'adresse
  adresse = event.target.value;
  if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(adresse))
  {
    return (true)
  }
  document.getElementById("addressErrorMsg").innerHTML = "L'adresse n'est pas dans le bon format.";
  return (false)
});

var ville_query = document.getElementById("city");
ville_query.addEventListener('change', (event) => {
  //on récupère la ville
  ville = event.target.value;
  if (/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/.test(ville))
  {
    return (true)
  }
  document.getElementById("cityErrorMsg").innerHTML = "La ville n'est pas dans le bon format.";
  return (false)
});

var email_query = document.getElementById("email");
email_query.addEventListener('change', (event) => {
   //on récupère l'email
  email = event.target.value;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
  document.getElementById("emailErrorMsg").innerHTML = "L'adresse email n'est pas dans le bon format.";
  return (false)
});

//lors du clic sur le bouton Envoyer, toutes les données sont récupérées
var order = document.getElementById("order");
order.addEventListener('click', () => 
{
  let contact_form =
  {
  firstName : prenom_query.value,
  lastName : nom_query.value,
  address : adresse_query.value,
  city : ville_query.value,
  email : email_query.value
  }
  let products_array = JSON.parse(localStorage.getItem("obj"));
  products_array.forEach(objet =>{
    let array = {
    id : objet.produit_id,
    quantity : objet.produit_quantite,
    color : objet.produit_couleur
    }
    let jsonToPost = {
      contact_form : contact_form,
      products_array : array
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
          console.log("test");
          return res.json();
        }
        //Making a function that clear the local storage and put the orderId in the confirmation's Url
      })
      .then(function orderId(response) {
        console.log(response);
        //localStorage.clear();
        //document.location.href = `confirmation.html?orderId=${response.orderId}`;
      })
      //Making a catch to display an error if something went wrong
      .catch(function (err) {
        "Impossible de récupérer les données de l'API (" + err + ")";
      });
  });


}
);



  











        























