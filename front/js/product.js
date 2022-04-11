//on récupère l'id du produit dans l'url
let current_url = window.location.href;
var url = new URL(current_url);
let id = url.searchParams.get("id");

//on récupère les données spécifiques au produit depuis la BDD
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

//clic sur le bouton
document.getElementById('addToCart').onclick = function() 
{
	//récupérer quantité et couleur
	let newQuantite = document.getElementById('quantity').value;
	let couleur = document.querySelector('select[name="color-select"]').value;
	//vérifier qu'au moins une couleur et un produit ont été sélectionnés
	if(newQuantite == 0){
		alert("Vous devez sélectionner au moins un produit.");
	}
	if(couleur == 0){
		alert("Veuillez sélectionner une couleur.");
	}
	else{
		//on stock les valeurs id, couleur et quantité dans un objet
		const produit_selectionne = {
			produit_id : id,
			produit_couleur : couleur,
			produit_quantite : newQuantite
		}
		//on vérifie que dans le local storage l'id est existant
		let get_panier = localStorage.getItem("obj");
		let objJson = JSON.parse(get_panier) || [];
		const identicalObject = objJson.find(objet => objet.produit_id === id && objet.produit_couleur === couleur);
		//nouveau panier ou on va mettre les nouvelles valeurs
		let newPanier = [];
		//condition au cas ou on rajoute un objet existant
		if(identicalObject)
		{
		const identicalObjectNewQuantity = {...identicalObject, produit_quantite: Number(identicalObject.produit_quantite) + Number(newQuantite) };
		newPanier = objJson
			.filter(objet => !(objet.produit_id === id && objet.produit_couleur === couleur))
			.concat(identicalObjectNewQuantity);
		}
		else{
			newPanier = objJson.concat(produit_selectionne);
		}
		let produit_json = JSON.stringify(newPanier);
		localStorage.setItem("obj",produit_json);
	}
};



