function calcularPesoideal() {
  //Obtenemos la edad
  var edad = document.getElementById("txt_edad").value;

  if (edad >= 1 && edad <= 10) {
    return(calcularEstadoPeso())
  
  }else{
    alert("Ingresa una edad valida entre 1 y 10");
  
  }


  //Caclculamo el peso ideal
  var peso_ideal = edad * 2 + 8;
  //Desplegamos el resultado
  var contenedor_resultado = document.getElementById("cnt_resultado_texto");
  contenedor_resultado.innerHTML =
    "<b> Peso ideal : </b>" + peso_ideal + " kilos.";
  //Calculamos el estado de peso
  calcularEstadoPeso(peso_ideal);
}
function calcularEstadoPeso(peso_ideal) {
  //Obtenemos peso actual
  var peso_actual = document.getElementById("txt_peso").value;
  if (peso_actual>= 1 && peso_actual<=100){
    return

  }else{
    alert("Error");
  }
  //Efectuamos una comparacion para deteminar el estado de peso
  var estadoPeso = "";
  var imagen = "";

    if(peso_actual == peso_ideal) {
    estadoPeso = "Peso Ideal";
    imagen = "health";

  } else {
    if (peso_actual > peso_ideal) {
      estadoPeso = "Sobrepeso";
      imagen = "fat";
    }
    else {
      estadoPeso = "Bajo peso";
      imagen = "imagen";
    }
}

//Mostramos estado de peso
var contenedor_resultado_texto_estado_peso = document.getElementById("cnt_resultado_texto_estado_peso");
contenedor_resultado_texto_estado_peso.innerHTML = "<b> Estado Peso: </b>" + estadoPeso;

//Mostramos imagen
var contendeor_resultado_img = document.getElementById("cnt_resultado_img");
contendeor_resultado_img.innerHTML = "<img src=img/" + imagen + "_256x256.png />";
}

