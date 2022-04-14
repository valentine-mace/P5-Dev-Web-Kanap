//on récupère le local storage
let get_panier = localStorage.getItem("obj");
let panier = JSON.parse(get_panier);

let contenu = "";
let quantite_totale = 0;
let prix_total = 0;

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
        "<p class=\"deleteItem\">Supprimer</p>" +
      "</div>" +
    "</div>" +
  "</div>" +
  "</article>"

});

//fonction qui met à jour le prix et quantité totaux
function updatePanier(){

  //récupérer le nombre total d'articles
  panier.forEach(element => {
    quantite_totale += Number(element.produit_quantite);
    document.getElementById("totalQuantity").innerHTML = quantite_totale;
    console.log(element.produit_quantite);

    //récupérer le prix total
    prix_total += Number(element.produit_quantite) * Number(element.produit_prix);
    document.getElementById("totalPrice").innerHTML = prix_total;
  });

}

//on intègre tout dans l'html
document.getElementById("cart__items").innerHTML = contenu;
updatePanier();

var arr = document.querySelectorAll(".itemQuantity");
arr.forEach(el => 
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
      console.log(newPanier);
      updatePanier();

      //on met à jour le prix et quantité totaux avec les nouvelles valeurs
    }

    });

});









        























