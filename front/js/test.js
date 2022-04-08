//récupération de toutes les données
fetch("http://localhost:3000/api/products")
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function(value){
		for (var i = 0; i < value.length; i++){
			console.log(value[i].price);
		}
	})
	.catch(function(err){
		console.log("erreur");
	});

	let listeEl = document.getElementsByClassName("items");
	console.log(listeEl);

//récupérer données par catégorie: ici, seulement nom, description, id et image

//récupérer id,nom, image et description dans html

//insérer données API dans ID html

