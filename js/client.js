function traerInformacionClient(){
    $.ajax({
        url:"http://168.138.129.119:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    });
}

function pintarRespuestaClient(items){
    let myTable="<table style='width: 40%'>";
    myTable+="<tr>";
    myTable+="<th> Email </th>";
    myTable+="<th> Contraseña </th>";
    myTable+="<th> Nombre </th>";
    myTable+="<th> Edad </th>";
    myTable+="<th colspan='2'> Botones </th>";
    myTable+="</tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>" +items[i].email+"</td>";
        myTable+="<td>" +items[i].password+"</td>";
        myTable+="<td>" +items[i].name+"</td>";
        myTable+="<td>" +items[i].age+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionClient("+items[i].idClient+")'>Actualizar</button> </td>";
        myTable+="<td> <button onclick='borrarElementoClient("+items[i].idClient+")'>Borrar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
}

function guardarInformacionClient(){
    let myData={
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),  
        age:$("#Clage").val()
    };

    $.ajax({
        url: "http://168.138.129.119:8080/api/Client/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data:myData,
        data: JSON.stringify(myData),
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoClient").empty();
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            traerInformacionClient();
            alert("se ha guardado el dato");
        }
    });
}

function actualizarInformacionClient(idElemento1){
    let myData={
        idClient:idElemento1,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),  
        age:$("#Clage").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.129.119:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            $("#resultadoClient").empty();
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            traerInformacionClient();
            alert("se ha guardado el dato");
        }
    });

}

function borrarElementoClient(idElemento){
    
    $.ajax({
        url: "http://168.138.129.119:8080/api/Client/"+idElemento,
        type:"DELETE",
        contentType:"application/JSON",
        datatype:"JSON",

        success:function(respuesta){
            traerInformacionClient();
            alert("se ha guardado el dato");
        }

    });
}