var g_id_resultado_eliminar = "";
var g_id_resultado_actualizar = "";

function agregar_resultado() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

  var raw = JSON.stringify({
    "nombre_resultado": nombre_resultado
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado", requestOptions)
    .then(response => {
      if (response.status == 200) {
        location.href="lista_resultados.html";
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function actualizar_resultado() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

  var raw = JSON.stringify({
    "nombre_resultado": nombre_resultado
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado/" + g_id_resultado_actualizar, requestOptions)
    .then(response => {
      if (response.status == 200) {
      }
      location.href="lista_resultados.html";
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function obtener_datos_resultados() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado?_size=50", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFila)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila(element, index, arr) {
  arr[index] = document.querySelector('#tbl_resultados tbody').innerHTML +=
    `<tr>
        <td>${element.id_resultado}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.fecha_registro}</td>
        <td> 
        <a href='eliminar_resultado.html?id=${element.id_resultado}'> <img src='../img/delete_24x24.png'></a> 
        <a href='actualizar_resultado.html?id=${element.id_resultado}'><img src="../img/edit_24x24.png"> </a> </td>

    </tr>`
}
function obtenerIdEliminacion() {
  //Exploramos el contenido recibido en la URL
  const queryString = window.location.search;
  //Analizamos las variables recibidas a través de URL
  const urlParams = new URLSearchParams(queryString);
  //Buscamos el id del resultado
  const p_id_resultado = urlParams.get('id');
  //Asignamos el id de resultado a variable global
  g_id_resultado_eliminar = p_id_resultado;
  //Invocamos función para obtener datos del resultado a eliminar
  consultar_datos_resultado(p_id_resultado);


}
function obtenerIdActualizacion() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const p_id_resultado = urlParams.get('id');
  g_id_resultado_actualizar = p_id_resultado;
  consultar_datos_resultado_actualizar(p_id_resultado);


}
function consultar_datos_resultado(p_id_resultado) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado/" + p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completar_datos_resultado)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function consultar_datos_resultado_actualizar(p_id_resultado) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado/" + p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completar_formulario)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function completar_datos_resultado(element, index, arr) {
  arr[index] = document.querySelector('#cnt_datos_resultado').innerHTML +=
    `<h2>¿Desea eliminar a este resultado?</h2>
     <div class='alert alert-warning' role='alert'><b>${element.nombre_resultado}</b></div>
    `
}
function completar_formulario(element, index, arr) {
  //Asignamos los datos del resultado a variables locales
  var nombre_resultado = element.nombre_resultado;
  var fecha_registro = element.fecha_registro;
  //Incorporamos las variables al valor de cada elemento de formulario
  document.getElementById("txt_nombre_resultado").value = nombre_resultado;
  document.getElementById("txt_fecha_registro").value = fecha_registro;


}
function eliminar_resultado() {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado/" + g_id_resultado_eliminar, requestOptions)
    .then(response => {
      if (response.status == 200) {
        location.href="lista_resultados.html";
      }
})
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}