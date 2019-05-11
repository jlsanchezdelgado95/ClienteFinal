window.onload = function () {
    idCarrito = 0;
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/carritos",
        success: function (json) {
            idCarrito = json.length;
        }
    });

    micarrito = new Carrito("11/05/2019", idCarrito);
    $("#bienvenida").modal("show");

        //OBJETO ARTICULO
        function Articulo(codigo, descripcion, precio) {
            this.codigo = codigo;
            this.descripcion = descripcion;
            this.precio = precio;
            this.unidades = 1;
            //al crearse, minimo es uno
        }
        //FIN DE OBJETO ARTICULO
    ////// OBJETO CARRITO
    function Carrito(fecha, id) {
        this.fecha = fecha;
        this.id = id;
        this.articulos = [];
    }

    Carrito.prototype.anyadirArticulo = function (articuloNuevo) {
        let yaExiste = false;
        this.articulos.forEach(articulo => {
            if (articulo.codigo === articuloNuevo.codigo) {
                articulo.unidades++;
                yaExiste = true;
            }
        });
        // Si no esta en el array de articulos, añadir
        if (!yaExiste) {
            this.articulos.push(articuloNuevo);
        }
    }
    // FIN DE OBJETO CARRITO
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {
                $("#categorias").append("<a href='#' id=" + elemento.id + ">" + elemento.nombre + "</a>");
                if (elemento.activa == "true") {
                    pintarArt(elemento.id);
                }
            });
        }
    });

    function pintarArt(id) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?idCat=" + id + "",
            success: function (json) {
                json.map(elemento => {
                    $("#articulos").append("<div href='#' id=art" + elemento.id + "><p>" + elemento.nombre + "</p><p>" + elemento.descripcion + "</p><p>" + elemento.precio +
                        "</p><button class='btn btn-info'>Añadir al Carrito</button></div>");
                });
            }
        });
    }

    $("#categorias").on("click", "a", function () {
        $("#articulos").html('');
        idCat = ($(this).attr("id"));
        pintarArt(idCat);
    })

    $("#articulos").on("click", "button", function () {
        codArt = $(this).parent().attr("id");
        nomArt = $(this).parent().find("p:eq(0)").html();
        desArt = $(this).parent().find("p:eq(1)").html();
        pvpArt = $(this).parent().find("p:eq(2)").html();
        $("#cuerpoArt").html("");
        $("#cuerpoArt").append("<h3>" + codArt + "</h3>");
        $("#cuerpoArt").append("<p>" + nomArt + "</p>");
        $("#cuerpoArt").append("<p>" + desArt + "</p>");
        $("#cuerpoArt").append("<p>" + pvpArt + "</p>");
        $("#myModal").modal("show");
    });

    $("#carrito").click(function () {//Funcion para pintar todo el carro
        $("#articulos").html('');
        $("#articulos").append("<p>Su carrito tiene fecha de: " + micarrito.fecha + "</p>");
        $("#articulos").append("<p>Su numero de carrito es: " + idCarrito + "</p>");
        $("#articulos").append("<p>Sus articulos son : </p>");
        for (let index = 0; index < micarrito.articulos.length; index++) {
            $("#articulos").append("<p>Codigo Articulo: " + micarrito.articulos[index].codigo + "</p>");
            $("#articulos").append("<p>Descripcion Articulo: " + micarrito.articulos[index].descripcion + "</p>");
            $("#articulos").append("<p>Precio Articulo: " + micarrito.articulos[index].precio + "</p>");
            $("#articulos").append("<p>Unidades Articulo: " + micarrito.articulos[index].unidades + "</p>");
        }
        $("#articulos").append("<div id=compraJSON class='btn btn-info'>Comprar</div>");
    });

    $("#compraJSON").click(function () {//funcion para meter en el json
        console.log("HOLA");
        datos = JSON.stringify(micarrito);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/carritos",
            data: datos,
            contentType: 'application/json',
            success: function (response) {
                console.log("FUNCIONA");
            }
        });
    });

    $("#btn-comprar").click(function () {
        codArt = $("#cuerpoArt").find("h3:eq(0)").html();
        nomArt = $("#cuerpoArt").find("p:eq(0)").html();
        desArt = $("#cuerpoArt").find("p:eq(1)").html();
        pvpArt = $("#cuerpoArt").find("p:eq(2)").html();

        miarticulo = new Articulo(codArt, nomArt, desArt, pvpArt)
        micarrito.anyadirArticulo(miarticulo);
        //$("#myModal").modal("hide");//OPCIONAL
    })

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

    /*function mostrarProducto(idProd) {
        $("#articulos").html('');
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?id=" + idProd + "",
            success: function (json) {
                json.map(elemento => {
                    console.log("HOLA");
                    $("#articulos").append("<div href='#' id=art" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</div>");
                });
            }
        });
    }*/
}