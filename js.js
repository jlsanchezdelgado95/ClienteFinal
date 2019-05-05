window.onload = function () {
    //micarrito=new carrito()
    function Carrito(fecha, numero) {
        this.fecha = fecha;
        this.numero = numero;
        this.articulos = [];
    }

    Carrito.prototype.anyadirArticulo = function(articuloNuevo) {
        let yaExiste = false;
      //Compruebo si existe el nuevo articulo, en el array de articulos
      // Y si existe, añade unidades, si no, se hace un push al array articulos
        this.articulos.forEach(articulo => {
          if (articulo.codigo === articuloNuevo.codigo) {
            articulo.unidades++;
            yaExiste = true;
          }
        });
        // no añadir al array si ya estaba en el carrito y se ha sumado una unidad arriba
        if (!yaExiste) {
          this.articulos.push(articuloNuevo);
        }
      }
      
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        success: function (json) {
            $("#categorias").html('');
            json.map(elemento => {
                console.log(elemento.id);
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

    $("#categorias").on("click", "a", function () {
        $("#articulos").html('');
        idCat = ($(this).attr("id"));
        console.log(idCat);
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?idCat=" + idCat + "",
            success: function (json) {
                json.map(elemento => {
                    console.log(elemento.id);
                    $("#articulos").append("<div href='#' id=art" + elemento.id + "><p>" + elemento.nombre + "</p><p>" + elemento.descripcion + "</p><p>" + elemento.precio +
                        "</p><button class='btn btn-info'>Añadir al Carrito</button></div>");
                });
            }
        });
    })

    $("#articulos").on("click", "button", function () {
        cod = $(this).parent().attr("id")
        console.log(cod)
        nombre = $(this).parent().find("p:nth-child(1)").html()
        descripcion = $(this).parent().find("p:nth-child(2)").html()
        precio = $(this).parent().find("p:nth-child(3)").html()
        console.log(precio);
        $("#cuerpo").html("");
        $("#cuerpo").append("<h3>" + cod + "</h3>");
        $("#cuerpo").append("<p>" + nombre + "</p>");
        $("#cuerpo").append("<p>" + descripcion + "</p>");
        $("#cuerpo").append("<p>" + precio + "</p>");
        $("#myModal").modal("show");

    });

    $("#btn-comprar").click(function () {//COMPROBAR CON EL NTH-CHILD
        console.log("Comprando...")
        codArt = $("#cuerpo").find("h3:eq(0)").html();
        nomArt = $("#cuerpo").find("p:eq(0)").html();
        desArt = $("#cuerpo").find("p:eq(1)").html();
        pvpArt = $("#cuerpo").find("p:eq(2)").html();
        console.log(codArt);
        console.log(nomArt);
        console.log(desArt);
        console.log(pvpArt);

        //miarticulo=new Articulo(codArt,nomArt,desArt,pvpArt)

        //micarrito.anyadir(miarticulo)

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
        url: "http://localhost:3000/articulos?id=" + idProd + "",
        success: function (json) {
            json.map(elemento => {
                console.log("HOLA");
                $("#articulos").append("<div href='#' id=art" + elemento.id + " onclick=mostrarCategoria()>" + elemento.nombre + "</div>");
            });
        }
    });
}