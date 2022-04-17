let current_url = window.location.href;
var url = new URL(current_url);

document.getElementById("orderId").innerHTML = url.searchParams.get("orderId");