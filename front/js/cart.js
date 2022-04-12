//on récupère le local storage
let get_panier = localStorage.getItem("obj");
let objJson = JSON.parse(get_panier);

let contenu = "";

let product_price = 0;
let total_produits = 0;
let sum = 0;

objJson.forEach(element => 
{
  
  //on récupère les autres données du produit à partir de l'id
  fetch("http://localhost:3000/api/products/" + element.produit_id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value){
    
      //récupérer les données du produit
      let product_name = value.name;
      let product_price = value.price;
      let product_url = value.imageUrl;
      let product_alt = value.altTxt;	
      let product_color = element.produit_couleur;
      let product_quantity= element.produit_quantite;	
      contenu = contenu +
      "<article class=\"cart__item\" data-id=\"{product-ID}\" data-color=\"{product-color}\">" +
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
            "<input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value="+product_quantity+">"+
          "</div>" +
          "<div class=\"cart__item__content__settings__delete\">" +
            "<p class=\"deleteItem\">Supprimer</p>" +
          "</div>" +
        "</div>" +
      "</div>" +
      "</article>"

      document.getElementById("cart__items").innerHTML = contenu;

      
      //récupérer le nombre total d'articles
      sum += Number(element.produit_quantite);
      document.getElementById("totalQuantity").innerHTML = sum;
      
    })

   

});














