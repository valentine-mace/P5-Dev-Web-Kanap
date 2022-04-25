let current_url = window.location.href;
var url = new URL(current_url);

//fonction qui récupère une url et en tire le numéro de commande
function displayOrderNum(url){
  document.getElementById("orderId").innerHTML = url.searchParams.get("orderId");
  localStorage.clear();
}

displayOrderNum(url);