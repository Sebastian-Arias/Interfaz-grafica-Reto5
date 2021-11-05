function traerInformacionOrtopedic(){
    $.ajax({
        url:"http://168.138.129.119:8080/api/Ortopedic/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaOrtopedic(respuesta);
        }
    });
}

function pintarRespuestaOrtopedic(items){
    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> Nombre </th>";
    myTable+="<th> Marca </th>";
    myTable+="<th> Año </th>";
    myTable+="<th> Descripcion </th>";
    myTable+="<th colspan='2'> Botones </th>";
    myTable+="</tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].name+"</td>";
        myTable+="<td>" +items[i].brand+"</td>";
        myTable+="<td>" +items[i].year+"</td>";
        myTable+="<td>" +items[i].description+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionOrtopedic("+items[i].id+")'>Actualizar</button> </td>";
        myTable+="<td> <button onclick='borrarElementoOrtopedic("+items[i].id+")'>Borrar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoOrtopedic").html(myTable);
}

function guardarInformacionOrtopedic(){
    let myData={
        name:$("#Oname").val(),
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),
        description:$("#Odescription").val()
    };

    $.ajax({
        url: "http://168.138.129.119:8080/api/Ortopedic/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:myData,
        data: JSON.stringify(myData),
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoOrtopedic").empty();
            $("#Oname").val("");
            $("#Obrand").val("");
            $("#Oyear").val("");
            $("#Odescription").val("");
            traerInformacionOrtopedic();
            alert("se ha guardado el dato");
        }
    });
}

function actualizarInformacionOrtopedic(idElemento){
    let myData1={
        id:idElemento,
        name:$("#Oname").val(),
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),
        description:$("#Odescription").val()

    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://168.138.129.119:8080/api/Ortopedic/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoOrtopedic").empty();
            $("#Oname").val("");
            $("#Obrand").val("");
            $("#Oyear").val("");
            $("#Odescription").val("");
            traerInformacionOrtopedic();
            alert("Se han actualizado los datos")
        }
    });

}

function borrarElementoOrtopedic(idElemento){
    
    $.ajax({
        url: "http://168.138.129.119:8080/api/Ortopedic/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            traerInformacionOrtopedic();
            alert("Se ha Eliminado el dato.");
        }

    });
}