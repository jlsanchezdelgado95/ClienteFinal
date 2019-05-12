window.onload = function () {
    function newCarrito() {
        idCarrito = 0;
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/carritos",
            success: function (json) {
                idCarrito = json.length;
            }
        });
        var f = new Date();
        fechaActual = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
        micarrito = new Carrito(fechaActual, idCarrito);
    }

    newCarrito();
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
                $("#categorias").append("<a href='#' class='btn btn-lg btn-block btn-outline-primary mt-4' id=" + elemento.id + ">" + elemento.nombre + "</a>");
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
                    $("#articulos").append("<div href='#' class='bg-light shadow-sm mx-auto m-5 p-4' id=art" + elemento.id + "><p>" + elemento.nombre + "</p><p>" + elemento.descripcion + "</p><p>" + elemento.precio +
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
        $("#cuerpoArt").append("<h3>Codigo</h3>");
        $("#cuerpoArt").append("<h3>" + codArt + "</h3>");
        $("#cuerpoArt").append("<p>Nombre: </p>");
        $("#cuerpoArt").append("<p>" + nomArt + "</p>");
        $("#cuerpoArt").append("<p>Descripcion: </p>");
        $("#cuerpoArt").append("<p>" + desArt + "</p>");
        $("#cuerpoArt").append("<p>Precio: </p>");
        $("#cuerpoArt").append("<p>" + pvpArt + "</p>");
        $("#myModal").modal("show");
    });

    $("#carrito").click(function () {//Funcion para pintar todo el carro
        precioTotal = 0;
        $("#articulos").html('');
        $("#articulos").append("<p>Su carrito tiene fecha de: " + micarrito.fecha + "</p>");
        $("#articulos").append("<p>Su numero de carrito es: " + idCarrito + "</p>");
        $("#articulos").append("<p>Sus articulos son : </p>");
        for (let index = 0; index < micarrito.articulos.length; index++) {
            $("#articulos").append("<h3>Descripcion: " + micarrito.articulos[index].descripcion + "</h3>");
            $("#articulos").append("<p>Precio: " + micarrito.articulos[index].precio + "</p>");
            $("#articulos").append("<p>Unidades Articulo: " + micarrito.articulos[index].unidades + "</p>");
            $("#articulos").append("<p>Precio Total por articulos: " + (micarrito.articulos[index].precio*micarrito.articulos[index].unidades) + "€</p>");
            precioTotal += micarrito.articulos[index].precio*micarrito.articulos[index].unidades;
        }
        $("#articulos").append("<p>Precio TOTAL carrito: " + precioTotal + "</p>");
    });

    $("#compraJSON").click(function () {//funcion para meter en el json
        datos = JSON.stringify(micarrito);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/carritos",
            data: datos,
            contentType: 'application/json',
            success: function (response) {
                $("#compra").modal("show");
            }
        });
    });

    $("#btn-comprar").click(function () {
        codArt = $("#cuerpoArt").find("h3:eq(1)").html();
        nomArt = $("#cuerpoArt").find("p:eq(1)").html();
        desArt = $("#cuerpoArt").find("p:eq(3)").html();
        pvpArt = $("#cuerpoArt").find("p:eq(5)").html();
        //console.log(codArt, nomArt, desArt, pvpArt);
        miarticulo = new Articulo(codArt, desArt, pvpArt);
        micarrito.anyadirArticulo(miarticulo);
        //$("#myModal").modal("hide");//OPCIONAL
    })
/////////////////////////////
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