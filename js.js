window.onload = function () {
    let categorias = document.getElementById("categorias");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/categorias",
        //data: "data",
        //dataType: "dataType",
        success: function (json) {
            for (let index = 0; index < json.length; index++) {
                $("#categorias").append("<a href='#'>" + json[index]["nombre"] + "</a>");
                //console.log(json[index]["id"]);
                //console.log(json[index]);
                //console.log(json[index]["nombre"]);
                //console.log(json.nombre[index]);
            }
            //console.log(json);
            //console.log(json.nombre);
        }
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/fotos",
        //data: "data",
        //dataType: "dataType",
        success: function (json) {
            for (let index = 0; index < json.length; index++) {
                console.log(json[index]["activa"]);
                if (json[index]["activa"] === "true") {
                    $(".carousel-inner").append("<div class='carousel-item active'><img src=" + json[index]["link"] + " class='d-block w-100' alt='...'></img></div>");
                    console.log("HOLA");
                } else {
                    $(".carousel-inner").append("<div class='carousel-item'><img src=" + json[index]["link"] + " class='d-block w-100' alt='...'></img></div>");
                }
            }
        }
    });
    /*$.get({
        url: "tienda.json",
        data: "data",
        dataType: "JSON",
        success: function (json) {
            $(json.tittle).appendTo("categorias");
        }
    });*/
}