// URL de la BDD
let myURL = "http://localhost:3000/api/products";

//récupération de toutes les données de la base de données
function getFromAPI(url_api){
	fetch(url_api)
		.then(function (res) {
			if (res.ok) {
				return res.json();
			}
		})
		.then(function (value) {
			displayAll(value);
		})
		.catch(function (err) {
			console.log(err);
		});
};

//affichage de toutes les données
function displayAll(value){
	let contenu = "";
	for (var i = 0; i < value.length; i++) {
		//récupération de tous les différents attributs de chaque produit depuis la BDD
		let product_name = value[i].name;
		let product_description = value[i].description;
		let product_url = value[i].imageUrl;
		let product_alt = value[i].altTxt;
		let product_id = value[i]._id;
		//intégration du contenu dans le bloc HTML
		contenu = contenu +
			"<a href=\"./product.html?id=" + product_id + "\">" +
			"<article>" +
			"<img src= \"" + product_url + "\" alt= \"" + product_alt + "\">" +
			"<h3 class=\"productName\">" + product_name + "</h3>" +
			"<p class=\"productDescription\">" + product_description + "</p>" +
			"</article>" +
			"</a>";
	}
	//récupération du contenu de la classe pour y intégrer le contenu
	document.getElementsByClassName("items")[0].innerHTML = contenu;
}

getFromAPI(myURL);



