window.onload = function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {
                $("#categorias").append("<a href='#' id=" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</a>");
            });
        }
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/fotos",
        success: function (json) {
            json.map(elemento => {
                if (elemento.activa === "true") {
                    $(".carousel-inner").append("<div class='carousel-item active'><img src=" + elemento.link + " class='d-block w-100' alt='...'></img></div>");
                } else {
                    $(".carousel-inner").append("<div class='carousel-item'><img src=" + elemento.link + " class='d-block w-100' alt='...'></img></div>");
                }
            });
        }
    });
}
function mostrarCategoria() {
    $("#articulos").html('');
    console.log(this.id);//Es undefined
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/articulos?idCat=" + this.id + "",
        success: function (json) {
            json.map(elemento => {
                console.log("HOLA");
                $("#articulos").append("<div href='#' id=art" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</div>");
            });
        }
    });
}