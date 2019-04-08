window.onload = function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {//Mejor hacerlo con $categorias.on(click,clase,function...)
                console.log(elemento.id);
                idCat=elemento.id;
                $("#categorias").append("<a href='#' id=" + elemento.id + ">" + elemento.nombre + "</a>");
            });
        }
    });

    $("#categorias").on("click","a",function(){
        $("#articulos").html('');
        idCat=($(this).attr("id"));
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?idCat=" + idCat+ "",
            success: function (json) {
                json.map(elemento => {
                    console.log("HOLA");
                    $("#articulos").append("<div href='#' id=art" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</div>");
                });
            }
        });
    })
    
    
    
    
    
    //Original JL con onclick
   /* 
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {//Mejor hacerlo con $categorias.on(click,clase,function...)
                console.log(elemento.id);
                idCat=elemento.id;
                $("#categorias").append("<a href='#' id=" + elemento.id + " onclick=mostrarCategoria('"+idCat+"')>" + elemento.nombre + "</a>");
            });
        }
    });
    */
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
function mostrarCategoria(idCat) {
    $("#articulos").html('');
    console.log(idCat);
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/articulos?idCat=" + idCat+ "",
        success: function (json) {
            json.map(elemento => {
                console.log("HOLA");
                $("#articulos").append("<div href='#' id=art" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</div>");
            });
        }
    });
}