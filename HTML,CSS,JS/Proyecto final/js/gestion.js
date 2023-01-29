var g_id_gestion_eliminar = "";
var g_id_gestion_actualizar = "";


function agregarGestion() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
 
  var tipo_gestion = document.getElementById('sel_tipo_gestion').value;
  var resultado = document.getElementById('sel_resultado').value;
  var cliente = document.getElementById('sel_cliente').value;
  var usuario = document.getElementById('sel_usuario').value;
  var comentarios = document.getElementById('txt_comentario').value;

  var raw = JSON.stringify({

    "id_tipo_gestion" : tipo_gestion,
    "id_resultado" : resultado,
    "id_cliente" : cliente,
    "id_usuario" : usuario,
    "comentarios" : comentarios
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://frontend171.com:3000/api/gestion", requestOptions)
    .then(response => {
      if (response.status == 200) {
        location.href="lista_gestion.html";
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


}
function actualizar_gestion() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var tipo_gestion = document.getElementById('sel_tipo_gestion').value;
  var resultado = document.getElementById('sel_resultado').value;
  var cliente = document.getElementById('sel_cliente').value;
  var usuario = document.getElementById('sel_usuario').value;
  var comentarios = document.getElementById('txt_comentario').value;
  
  var raw = JSON.stringify({
    "id_tipo_gestion" : tipo_gestion,
    "id_resultado" : resultado,
    "id_cliente" : cliente,
    "id_usuario" : usuario,
    "comentarios" : comentarios
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + g_id_gestion_actualizar, requestOptions)
    .then(response => {
      if (response.status == 200) {
        location.href="lista_gestion.html";
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function obtener_datos_gestion() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFila)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila(element, index, arr) {
  arr[index] = document.querySelector('#tbl_gestion tbody').innerHTML +=
    `<tr>
        <td>${element.id_gestion}</td>
        <td>${element.id_usuario}</td>
        <td>${element.id_cliente}</td>
        <td>${element.id_tipo_gestion}</td>
        <td>${element.id_resultado}</td>
        <td>${element.comentarios}</td>
        <td>${element.fecha_registro}</td>
        <td> <a href='eliminar_gestion.html?id=${element.id_gestion}'> <img src='../img/delete_24x24.png'></a> 
        <a href='actualizar_gestion.html?id=${element.id_gestion}'><img src="../img/edit_24x24.png"> </a> </td>

    </tr>`
}
function obtener_datos_tipo_gestion() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/tipo_gestion", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarSelectTipoGestion)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarSelectTipoGestion(element, index, arr) {
  arr[index] = document.querySelector('#sel_tipo_gestion').innerHTML +=
    `<option value='${element.id_tipo_gestion}'> ${element.nombre_tipo_gestion} </option>`
}


function obtener_datos_resultado() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/resultado", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarSelectResultado)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarSelectResultado(element, index, arr) {
  arr[index] = document.querySelector('#sel_resultado').innerHTML +=
    `<option value='${element.id_resultado}'> ${element.nombre_resultado} </option>`
}


function obtener_datos_cliente() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarSelectCliente)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarSelectCliente(element, index, arr) {
  arr[index] = document.querySelector('#sel_cliente').innerHTML +=
    `<option value='${element.id_cliente}'> ${element.nombres} ${element.apellidos} </option>`
}

function obtener_datos_usuario() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/usuario", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarSelectUsuario)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarSelectUsuario(element, index, arr) {
  arr[index] = document.querySelector('#sel_usuario').innerHTML +=
    `<option value='${element.id_usuario}'> ${element.nombres} ${element.apellidos} - ${element.username} </option>`
}



function obtenerIdEliminacion() {
  //Exploramos el contenido recibido en la URL
  const queryString = window.location.search;
  //Analizamos las variables recibidas a través de URL
  const urlParams = new URLSearchParams(queryString);
  //Buscamos el id del cliente
  const p_id_gestion = urlParams.get('id');
  //Asignamos el id de cliente a variable global
  g_id_gestion_eliminar = p_id_gestion;
  //Invocamos función para obtener datos del cliente a eliminar
  consultar_datos_gestion(p_id_gestion);


}
function obtenerIdActualizacion() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const p_id_gestion = urlParams.get('id');
  g_id_gestion_actualizar = p_id_gestion;
  consultar_datos_gestion_actualizar(p_id_gestion);


}
function consultar_datos_gestion(p_id_gestion) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + p_id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completar_datos_gestion)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function consultar_datos_gestion_actualizar(p_id_gestion) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + p_id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completar_formulario)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function completar_datos_gestion(element, index, arr) {
  arr[index] = document.querySelector('#cnt_datos_gestion').innerHTML +=
    `<h2>¿Desea eliminar esta gestion?</h2>
     <div class='alert alert-warning' role='alert'><b>${element.comentarios} </b></div>
    `
}
function completar_formulario(element, index, arr) {
  //Asignamos los datos del cliente a variables locales
  var tipo_gestion = element.tipo_gestion;
  var resultado = element.resultado;
  var cliente = element.cliente;
  var usuario = element.usuario;
  var comentarios = element.comentarios;
  //Incorporamos las variables al valor de cada elemento de formulario
  document.getElementById("sel_tipo_gestion").value = tipo_gestion;
  document.getElementById("sel_resultado").value = resultado;
  document.getElementById("sel_cliente").value = cliente;
  document.getElementById("sel_usuario").value = usuario;
  document.getElementById("txt_comentario").value = comentarios;


}




function eliminar_gestion() {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + g_id_gestion_eliminar, requestOptions)
    .then(response => {
      if (response.status == 200) {
        location.href="lista_gestion.html";
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function obtener_datos_select(){
  obtener_datos_tipo_gestion()
  obtener_datos_resultado()
  obtener_datos_cliente()
  obtener_datos_usuario()
}

