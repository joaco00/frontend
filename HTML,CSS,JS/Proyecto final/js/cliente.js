var g_id_cliente_eliminar = "";
var g_id_cliente_actualizar = "";


function agregar_cliente(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_cliente = document.getElementById("txt_rut").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var fecha_registro = document.getElementById("txt_fecha_registro").value;

    var raw = JSON.stringify({
        "id_cliente": id_cliente,
        "dv":dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "fecha_registro": fecha_registro
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente", requestOptions)
        .then(response => {
          if(response.status==200){
            location.href="lista_clientes.html";
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function actualizar_cliente(){
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_cliente = document.getElementById("txt_rut").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var fecha_registro = document.getElementById("txt_fecha_registro").value;
   

    var raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente/" + id_cliente, requestOptions)
        .then(response => {
          if(response.status==200){
            location.href="lista_clientes.html";
          }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function obtener_datos_clientes(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/cliente?_size=50", requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarFila)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_clientes tbody').innerHTML +=
    `<tr>
        <td>${element.id_cliente}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>
        <td> <a href='eliminar_cliente.html?id=${element.id_cliente}'> <img src='../img/delete_24x24.png'></a> 
        <a href='actualizar_cliente.html?id=${element.id_cliente}'><img src="../img/edit_24x24.png"> </a> </td>

    </tr>`
  }
  function obtenerIdEliminacion(){
      //Exploramos el contenido recibido en la URL
      const queryString = window.location.search;
      //Analizamos las variables recibidas a través de URL
      const urlParams = new URLSearchParams(queryString);
      //Buscamos el id del cliente
      const p_id_cliente = urlParams.get('id');
      //Asignamos el id de cliente a variable global
      g_id_cliente_eliminar = p_id_cliente;
      //Invocamos función para obtener datos del cliente a eliminar
      consultar_datos_cliente(p_id_cliente);
      

  }
  function obtenerIdActualizacion(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const p_id_cliente = urlParams.get('id');
    g_id_cliente_actualizar= p_id_cliente;
    consultar_datos_cliente_actualizar(p_id_cliente);
    

}
  function consultar_datos_cliente(p_id_cliente){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/cliente/"+p_id_cliente, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completar_datos_cliente)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }
  function consultar_datos_cliente_actualizar(p_id_cliente){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/cliente/"+p_id_cliente, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completar_formulario)
      )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

  }
  function completar_datos_cliente(element, index, arr){
    arr[index] = document.querySelector('#cnt_datos_cliente').innerHTML +=
    `<h2>¿Desea eliminar a este cliente?</h2>
     <div class='alert alert-warning' role='alert'><b>${element.nombres} ${element.apellidos}</b></div>
    `
  }
  function completar_formulario(element, index, arr){
  //Asignamos los datos del cliente a variables locales
   var id_cliente     = element.id_cliente;
   var dv             = element.dv;
   var nombres        = element.nombres;
   var apellidos      = element.apellidos;
   var email          = element.email;
   var celular        = element.celular;
   var fecha_registro = element.fecha_registro;
   //Incorporamos las variables al valor de cada elemento de formulario
   document.getElementById("txt_rut").value = id_cliente;
   document.getElementById("txt_dv").value = dv;
   document.getElementById("txt_nombres").value = nombres;
   document.getElementById("txt_apellidos").value = apellidos;
   document.getElementById("txt_email").value = email;
   document.getElementById("txt_celular").value = celular;
   document.getElementById("txt_fecha_registro").value = fecha_registro;
   

  }
  function eliminar_cliente(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://frontend171.com:3000/api/cliente/"+g_id_cliente_eliminar, requestOptions)
        .then(response => {
            if(response.status == 200){
              location.href="lista_clientes.html";
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

