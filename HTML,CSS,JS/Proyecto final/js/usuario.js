var g_id_usuario_eliminar = "";
var g_id_usuario_actualizar = "";

function agregar_usuario(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_usuario = document.getElementById("txt_id_usuario").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;
    var fecha_registro = document.getElementById("txt_fecha_registro").value;

    var raw = JSON.stringify({
        "id_usuario": id_usuario,
        "dv":dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username,
        "password": password,
        "fecha_registro": fecha_registro
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario", requestOptions)
        .then(response => {
          if(response.status == 200){
            location.href="lista_usuarios.html";
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function actualizar_usuario(){
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_usuario = document.getElementById("txt_id_usuario").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;


    var raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario/" + id_usuario, requestOptions)
        .then(response => {
          if (response.status == 200) {
            location.href="lista_usuarios.html";
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function obtener_datos_usuarios(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/usuario?_size=50", requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarFila)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_usuarios tbody').innerHTML +=
    `<tr>
        <td>${element.id_usuario}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${element.fecha_registro}</td>
        <td> <a href='eliminar_usuario.html?id=${element.id_usuario}'> <img src='../img/delete_24x24.png'></a>
         <a href='actualizar_usuario.html?id=${element.id_usuario}'><img src="../img/edit_24x24.png"> </a> </td>

    </tr>`
  }
  function obtenerIdEliminacion(){
      //Exploramos el contenido recibido en la URL
      const queryString = window.location.search;
      //Analizamos las variables recibidas a través de URL
      const urlParams = new URLSearchParams(queryString);
      //Buscamos el id del usuario
      const p_id_usuario = urlParams.get('id');
      //Asignamos el id de usuario a variable global
      g_id_usuario_eliminar = p_id_usuario;
      //Invocamos función para obtener datos del usuario a eliminar
      consultar_datos_usuario(p_id_usuario);
      

  }
  function obtenerIdActualizacion(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const p_id_usuario = urlParams.get('id');
    g_id_usuario_actualizar= p_id_usuario;
    consultar_datos_usuario_actualizar(p_id_usuario);
    

}
  function consultar_datos_usuario(p_id_usuario){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/usuario/"+p_id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completar_datos_usuario)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }
  function consultar_datos_usuario_actualizar(p_id_usuario){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/usuario/"+p_id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completar_formulario)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }
  function completar_datos_usuario(element, index, arr){
    arr[index] = document.querySelector('#cnt_datos_usuario').innerHTML +=
    `<h2>¿Desea eliminar a este usuario?</h2>
     <div class='alert alert-warning' role='alert'><b>${element.nombres} ${element.apellidos}</b></div>
    `
  }
  function completar_formulario(element, index, arr){
  //Asignamos los datos del usuario a variables locales
   var id_usuario     = element.id_usuario;
   var dv             = element.dv;
   var nombres        = element.nombres;
   var apellidos      = element.apellidos;
   var email          = element.email;
   var celular        = element.celular;
   var username       = element.username;
   var fecha_registro = element.fecha_registro;
   //Incorporamos las variables al valor de cada elemento de formulario
   document.getElementById("txt_id_usuario").value = id_usuario;
   document.getElementById("txt_dv").value = dv;
   document.getElementById("txt_nombres").value = nombres;
   document.getElementById("txt_apellidos").value = apellidos;
   document.getElementById("txt_email").value = email;
   document.getElementById("txt_celular").value = celular;
   document.getElementById("txt_username").value = username;
   document.getElementById("txt_fecha_registro").value = fecha_registro;
   

  }
  function eliminar_usuarios(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/usuario/"+g_id_usuario_eliminar, requestOptions)
        .then(response => {
            if(response.status == 200){
              location.href="lista_usuarios.html";
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }