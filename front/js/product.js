//on récupère l'id du produit dans l'url
let current_url = window.location.href;
var url = new URL(current_url);
let id = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/" + id)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
  .then(function(value){
		//récupérer les données du produit
		let product_name = value.name;
		let product_price = value.price;
		let product_description = value.description;
		let product_url = value.imageUrl;
		let product_alt = value.altTxt;	
		let product_colors = value.colors;	

    //insérer dans les balises html
		let nom = document.getElementById('title');
		nom.innerHTML =  product_name;
		let prix = document.getElementById('price');
		prix.innerHTML =  product_price;
		let description = document.getElementById('description');
		description.innerHTML =  product_description;
		let image = document.getElementsByClassName("item__img");
		image[0].innerHTML = "<img src= \""+product_url+"\" alt= \""+product_alt+"\">";
		let couleurs = document.getElementById("colors");
		product_colors.forEach(product_color => {
			couleurs.innerHTML += `<option value="${product_color}">${product_color}</option>`;
		});

  })

//créer array pour panier 
let panier = [];

//récupérer id, quantité et couleur et insérer dans un objet

//fonction pour récupérer la couleur
document.addEventListener('DOMContentLoaded', function(){
	document.querySelector('select[name="color-select"]').onchange=changeEventHandler;
}, false);
function changeEventHandler(event){
	color = event.target.value;
};

//fonction pour récupérer la quantité
document.addEventListener('input', function(event){
	document.getElementById('quantity').innerHTML = event.target.value;
	let quantité = event.target.value;
});
const produit_selectionne = {
	produit_id : id,
	produit_couleur : color,
	produit_quantite : quantité
};
// console.log(produit_selectionne);

//stocker objet dans array avec push ou object create??

//utiliser local storage

//gérer plusieurs produits existants
