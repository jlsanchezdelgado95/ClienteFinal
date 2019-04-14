window.onload = function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {//Mejor hacerlo con $categorias.on(click,clase,function...)
                console.log(elemento.id);
                //idCat=elemento.id; No hace nada relevante(ESTOY PINTANDO CATEGORIAS)
                $("#categorias").append("<a href='#' id=" + elemento.id + ">" + elemento.nombre + "</a>");
                if (elemento.activa == "true") {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/articulos?idCat=" + elemento.id + "",
                        success: function (json) {
                            json.map(elemento => {
                                console.log(elemento.id);
                                $("#articulos").append("<div href='#' id=art" + elemento.id + ">" + elemento.nombre + "<br>" + elemento.descripcion + "<br>" + elemento.precio + 
                                "<button class='btn btn-info'>Añadir al Carrito</button></div>");
                            });
                        }
                    });
                }
            });
        }
    });

    $("#categorias").on("click","a",function(){//FUNCION PARA PINTAR PRODUCTOS DE UNA CATEGORIA
        $("#articulos").html('');
        idCat=($(this).attr("id"));
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?idCat=" + idCat + "",
            success: function (json) {
                json.map(elemento => {
                    console.log(elemento.id);
                    $("#articulos").append("<div href='#' id=art" + elemento.id + ">" + elemento.nombre + "<br>" + elemento.descripcion + "<br>" + elemento.precio + 
                    "<button class='btn btn-info'>Añadir al Carrito</button></div>");
                });
            }
        });
    })

    $("#articulos").on("click","button",function(){
        idArt = $("div:nth-child(2)");
        console.log(idArt);
        $.ajax({
            type: "method",
            url: "http://localhost:3000/articulos?id=" + idArt + "",
            success: function (elemento) {
                
            }
        });
        $("#myModal").modal("show");

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
    $.ajax({//CARRUSEL FOTOS
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
function mostrarProducto(idProd) {
    $("#articulos").html('');
    console.log(idProd);
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/articulos?id=" + idProd+ "",
        success: function (json) {
            json.map(elemento => {
                console.log("HOLA");
                $("#articulos").append("<div href='#' id=art" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</div>");
            });
        }
    });
}