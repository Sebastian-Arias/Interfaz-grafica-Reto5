function traerInformacionMessage(){
    $.ajax({
        url:"http://168.138.129.119:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta)
        }
    });
}

function pintarRespuestaMessage(respuesta){
    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> Mensaje </th>";
    myTable+="<th colspan='2'> Botones </th>";
    myTable+="</tr>";
    for(m=0;m<respuesta.length;m++){
        myTable+="<tr>";
        myTable+="<td>" +respuesta[m].messageText+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionMessage("+respuesta[m].idMessage+")'>Actualizar</button> </td>";
        myTable+="<td> <button onclick='borrarElementoMessage("+respuesta[m].idMessage+")'>Borrar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
}

function guardarInformacionMessage(){
    let myData1={
        messageText:$("#MessageText").val()
    };

    $.ajax({
        url: "http://168.138.129.119:8080/api/Message/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:myData1,
        data: JSON.stringify(myData1),
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#MessageText").val("");
            traerInformacionMessage();
            alert("se ha guardado el dato");
        }
    });
}

function actualizarInformacionMessage(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#MessageText").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.129.119:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#id").val("");
            $("#MessageText").val("");
            traerInformacionMessage();
            alert("Se han actualizado los datos")
        }
    });

}

function borrarElementoMessage(idElemento){
    
    $.ajax({
        url: "http://168.138.129.119:8080/api/Message/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Se ha Eliminado el dato.")
        }
    });
}