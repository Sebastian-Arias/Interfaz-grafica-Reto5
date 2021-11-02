function traerInformacionReservation(){
    $.ajax({
        url:"http://168.138.129.119:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(items){
    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> F-Inicial </th>";
    myTable+="<th> F-Final </th>";
    myTable+="<th colspan='2'> Botones </th>";
    myTable+="</tr>";
    for(f=0;f<items.length;f++){
        myTable+="<tr>";
        myTable+="<td>" +items[f].startDate+"</td>";
        myTable+="<td>" +items[f].devolutionDate+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionReservation("+items[f].idReservation+")'>Actualizar</button> </td>";
        myTable+="<td> <button onclick='borrarInformacionReservation("+items[f].idReservation+")'>Borrar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservation").html(myTable);
}

function guardarInformacionReservation(){
    let myData={
        startDate:$("#StartDate").val(),
        devolutionDate:$("#DevolutionDate").val()
    };

    $.ajax({
        url: "http://168.138.129.119:8080/api/Reservation/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:myData,
        data: JSON.stringify(myData),
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoReservation").empty();
            $("#StartDate").val("");
            $("#DevolutionDate").val("");
            traerInformacionReservation();
            alert("se ha guardado el dato");
        }
    });
}

function actualizarInformacionReservation(idElemento){
    let myData1={
        idReservation:idElemento, //
        startDate:$("#StartDate").val(),
        devolutionDate:$("#DevolutionDate").val()
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://168.138.129.119:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoReservation").empty();
            $("#StartDate").val("");
            $("#DevolutionDate").val("");
            traerInformacionReservation();
            alert("se ha guardado el dato");
        }
    });

}

function borrarInformacionReservation(idElemento){
    
    $.ajax({
        url: "http://168.138.129.119:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            traerInformacionReservation();
            alert("se ha guardado el dato");
        }
        
    });
}

//RESERVACIONES//

//1

function estadoReportes(){
    console.log("test");
    $.ajax({
        url:"http://168.138.129.119:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta2){
            console.log(respuesta2);
            pintarRespuestaReportes(respuesta2);
        }
    });
}

function pintarRespuestaReportes(respuesta2){

    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
       myTable+="<th>Completadas</th>";
        myTable+="<td>"+respuesta2.completed+"</td>";
        myTable+="<th>Canceladas</th>";
        myTable+="<td>"+respuesta2.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

//2

function traerReporteDate() {

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url: "http://168.138.129.119:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
}
function pintarRespuestaDate(respuesta) {

    let myTable = "<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> Fecha de Inicio </th>";
    myTable+="<th> Fecha Final </th>";
    myTable+="<th> Estado </th>";
    myTable += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoDate").html(myTable);
}

//3

function traerReporteClientes() {
    $.ajax({
        url: "http://168.138.129.119:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta) {

    let myTable = "<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> Total </th>";
    myTable+="<th> Nombre </th>";
    myTable+="<th> E-mail </th>";
    myTable+="<th> Edad </th>";
    myTable += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].total + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].client.email + "</td>";
        myTable += "<td>" + respuesta[i].client.age + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClientes").html(myTable);
}
