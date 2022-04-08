//récupération de toutes les données
fetch("http://localhost:3000/api/products")
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function(value){
		let contenu = "";
		for (var i = 0; i < value.length; i++){
			//récupération de tous les différents attributs de chaque produit depuis la BDD
			let product_name = value[i].name;
			let product_description = value[i].description;
			let product_url = value[i].imageUrl;
			let product_alt = value[i].altTxt;
			let product_id = value[i]._id;	
			contenu = contenu +
			"<a href=\"./product.html?id="+product_id+"\">" +
			"<article>" +
			"<img src= \""+product_url+"\" alt= \""+product_alt+"\">" +
			"<h3 class=\"productName\">"+product_name+"</h3>" +
			"<p class=\"productDescription\">"+product_description+"</p>" +
			"</article>" +
			"</a>";
		}
		document.getElementsByClassName("items")[0].innerHTML = contenu;
	})
	.catch(function(err){
		console.log("erreur");
	});
