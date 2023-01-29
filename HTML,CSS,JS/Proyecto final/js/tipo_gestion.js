var g_id_tipo_gestion_eliminar = "";
var g_id_tipo_gestion_actualizar = "";

function agregar_tipo_gestion(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var nombres = document.getElementById("txt_nombre_tipo_gestion").value;

    var raw = JSON.stringify({
        "nombre_tipo_gestion": nombres
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion", requestOptions)
        .then(response => {
          if (response.status == 200) {
            location.href="lista_tipo_gestion.html";
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function actualizar_tipo_gestion(){
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
   

    var raw = JSON.stringify({
        "nombre_tipo_gestion": nombre_tipo_gestion
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion/" + g_id_tipo_gestion_actualizar, requestOptions)
        .then(response => {
          if (response.status == 200) {
            location.href="lista_tipo_gestion.html";
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function obtener_datos_tipo_gestion(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/tipo_gestion?_size=50", requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarFila)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_tipo_gestion tbody').innerHTML +=
    `<tr>
        <td>${element.id_tipo_gestion}</td>
        <td>${element.nombre_tipo_gestion}</td>
        <td>${element.fecha_registro}</td>
        <td> <a href='eliminar_tipo_gestion.html?id=${element.id_tipo_gestion}'> <img src='../img/delete_24x24.png'></a> 
        <a href='actualizar_tipo_gestion.html?id=${element.id_tipo_gestion}'><img src="../img/edit_24x24.png"> </a> </td>

    </tr>`
  }
  function obtenerIdEliminacion(){
      //Exploramos el contenido recibido en la URL
      const queryString = window.location.search;
      //Analizamos las variables recibidas a través de URL
      const urlParams = new URLSearchParams(queryString);
      //Buscamos el id del tipo_gestion
      const p_id_tipo_gestion = urlParams.get('id');
      //Asignamos el id de tipo_gestion a variable global
      g_id_tipo_gestion_eliminar = p_id_tipo_gestion;
      //Invocamos función para obtener datos del tipo_gestion a eliminar
      consultar_datos_tipo_gestion(p_id_tipo_gestion);
      

  }
  function obtenerIdActualizacion(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const p_id_tipo_gestion = urlParams.get('id');
    g_id_tipo_gestion_actualizar= p_id_tipo_gestion;
    consultar_datos_tipo_gestion_actualizar(p_id_tipo_gestion);
    

}
  function consultar_datos_tipo_gestion(p_id_tipo_gestion){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completar_datos_tipo_gestion)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }
  function consultar_datos_tipo_gestion_actualizar(p_id_tipo_gestion){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completar_formulario)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }
  function completar_datos_tipo_gestion(element, index, arr){
    arr[index] = document.querySelector('#cnt_tipo_gestion').innerHTML +=
    `<h2>¿Desea eliminar a este tipo de gestión?</h2>
     <div class='alert alert-warning' role='alert'><b>${element.nombre_tipo_gestion}</b></div>
    `
  }
  function completar_formulario(element, index, arr){
  //Asignamos los datos del tipo_gestion a variables locales
  //  var id_tipo_gestion     = element.id_tipo_gestion;
   var nombre_tipo_gestion        = element.nombre_tipo_gestion;
   //Incorporamos las variables al valor de cada elemento de formulario
  //  document.getElementById("txt_id_tipo_gestion").value = id_tipo_gestion;
   document.getElementById("txt_nombre_tipo_gestion").value = nombre_tipo_gestion;
   

  }
  function eliminar_tipo_gestion(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/tipo_gestion/"+g_id_tipo_gestion_eliminar, requestOptions)
        .then(response => {
            if(response.status == 200){
              location.href="lista_tipo_gestion.html";
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }