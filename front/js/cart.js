//on récupère le local storage
let get_panier = localStorage.getItem("obj");
let objJson = JSON.parse(get_panier);


//on récupère les différentes données que l'on veut
product_id = objJson[0].produit_id;
product_color = objJson[0].produit_couleur;
product_quantity= objJson[0].produit_quantite;

//on récupère les autres données du produit à partir de l'id
fetch("http://localhost:3000/api/products/" + product_id)
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

    let contenu = "";
    contenu =
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
  })



