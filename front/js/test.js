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
			"<a href=\"./product.html?id=\""+product_id+"\">" +
			"<article>" +
			"<img src= \""+product_url+"\" alt= \""+product_description+"\">" +
			"<h3 class=\"productName\">"+product_name+"</h3>" +
			"<p class=\"productDescription\">"+product_description+"</p>" +
			"</article>" +
			"</a>";
			//insertion des différents attributs dans la partie html correspondant
			// let listeNoms = document.getElementsByClassName('productName');
			// (listeNoms[0]).innerHTML =  product_name;

			// let listeDescription = document.getElementsByClassName('productDescription');
			// (listeDescription[0]).innerHTML =  product_description;

			// let listeImages = document.querySelector("article");
			// let image = listeImages.getElementsByTagName("img");
			// (image[0]).src = product_url;
			// (image[0]).alt = product_alt;
			// let item_class = document.getElementsByClassName('items');
			// let listLinks = item_class[0].querySelector("a")
			// listLinks.href = "./product.html?id=" + product_id;
			//console.log(listLinks.href);
			//console.log(value[i].price);
		}
		document.getElementsByClassName("items")[0].innerHTML = contenu;
	})
	.catch(function(err){
		console.log("erreur");
	});


//récupérer données par catégorie: ici, seulement nom, description, id et image

//récupérer id,nom, image et description dans html

//insérer données API dans ID html

