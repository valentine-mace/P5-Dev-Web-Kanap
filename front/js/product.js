//on récupère l'id du produit dans l'url
let current_url = window.location.href;
var url = new URL(current_url);
var id = url.searchParams.get("id");
console.log(id);


