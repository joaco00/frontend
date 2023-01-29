import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Registros from './Registros';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';


function Header() {
  return (
    <div className="App-header">
      <h3>Calculadora de Seguros</h3>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}
//Componente para listar registros
function ListarRegistros(){
  const [registros, setRegistro]  = useState([]);
  useEffect(() =>{
    fetch("https://j8p3yczp.directus.app/items/automotriz")
    .then(resp => resp.json())
    .then(data => setRegistro(data.data))
  },[]);
  return(
    <Registros registros={registros}/>
  )


}
function App() {
  //Declaración de variables para el formulario
  const [txt_rut, setRut]  = useState("");
  const [txt_nombres, setNombres]  = useState("");
  const [txt_apellidos, setApellidos]  = useState("");
  const [txt_marca, setMarca]  = useState("");
  const [txt_modelo, setModelo]  = useState("");
  const [txt_anio, setAnio]  = useState("");
  const [txt_email, setEmail]  = useState("");
  const [txt_celular, setCelular]  = useState("");
  //Contenedores de resultado
  const [cnt_mensajeUf, setMensajeUf] = useState("");
  const [cnt_mensajevalor, setmensajeValor] = useState("");
  //Variable para obtener valores de mindicador
  const [valorUf,setValor] = useState([]);
  //Operacion aritmetica
  const valor1 = (2022-txt_anio) * 0.1;
  const valor = valor1 * valorUf;
  

  useEffect(() =>{
    fetch("https://mindicador.cl/api/uf/23-07-2022")
    .then(resp => resp.json())
    .then(data => setValor(data.serie[0].valor) )
  },[]);
  

  // Configuración REQUEST a api directus
  let enviar = async(e) => {
    e.preventDefault();
    try{
      //Intentamos enviar datos a API de directus
      let respuesta = await fetch("https://j8p3yczp.directus.app/items/automotriz",
      {
        method : "POST",
        body : JSON.stringify({
          "Rut": txt_rut,
          "Nombres": txt_nombres,
          "Apellidos": txt_apellidos,
          "Email": txt_email,
          "Celular": txt_celular,
          "Marca": txt_marca,
          "Modelo": txt_modelo,
          "Anio": txt_anio,


        }),
        headers : {
          'Content-type': 'application/json'
        }
      });
      //Manejamos la respuesta desde API REST y condicionamos
      if (respuesta.status == 200 && txt_anio>=2012 && txt_anio<2022){
        setRut("");
        setNombres("");
        setApellidos("");
        setEmail("");
        setCelular("");
        setMarca("");
        setModelo("");
        setAnio("");
        setMensajeUf("Si se puede asegurar")
        setmensajeValor("Valor calculado: $"+ valor.toFixed(2))
      }else{
        setMensajeUf("No se puede asegurar.");
      }
      
    }catch(error) {
      //Bloque de instrucciones en caso de falla
      console.log(error)
    }
  };
 
  return (
    <div className="App-automotriz">
      <h2>Formulario de ingreso</h2>

      <div>
        <h5>Valor UF : $ {valorUf}</h5>
     </div>
      <form onSubmit={enviar}>
      
      <div>
      <TextField type="text" value={txt_rut} size="small" margin="dense" label="Rut" variant="outlined" onChange={(e) => setRut(e.target.value)}></TextField>
      </div>      
      
      <div>
      <TextField type="text" value={txt_nombres} size="small" margin="dense" label="Nombres" variant="outlined" onChange={(e) => setNombres(e.target.value)}></TextField>
      </div>       
      
      <div>
      <TextField type="text" value={txt_apellidos} size="small" margin="dense" label="Apellidos" variant="outlined" onChange={(e) => setApellidos(e.target.value)}></TextField>
      </div>        
      
      <div>  
      <TextField type="text" value={txt_email}size="small" margin="dense" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}></TextField>
      </div>
      
      <div>
      <TextField type="text" value={txt_celular}size="small" margin="dense" label="Celular" variant="outlined" onChange={(e) => setCelular(e.target.value)}></TextField>
      </div>     
      
      <div>
      <TextField type="text" value={txt_marca} size="small" margin="dense" label="Marca" variant="outlined" onChange={(e) => setMarca(e.target.value)}></TextField>
      </div>
     
      <div>
      <TextField type="text" value={txt_modelo} size="small" margin="dense" label="Modelo" variant="outlined" onChange={(e) => setModelo(e.target.value)}></TextField>
      </div>
      
      <div>
      <TextField type="text" value={txt_anio} size="small" margin="dense" label="Año" variant="outlined" onChange={(e) => setAnio(e.target.value)}></TextField>
      </div>
      
      
      <div>
      <Button type='submit' variant="contained" disabled={!txt_apellidos || !txt_nombres||!txt_rut || !txt_anio || !txt_celular || !txt_email || !txt_marca ||!txt_modelo }>Calcular</Button>
      </div>
      </form>
      {/* Despliegue de resultados */}
      <div>{cnt_mensajeUf ? <p>{cnt_mensajeUf }</p> : null}</div>
      <div>{cnt_mensajevalor ? <p>{cnt_mensajevalor}</p>: null}</div>
    </div>
  );
}


function Footer() {
  return (
    <div className="App-footer">
      <h3>Lista de registros</h3>
    </div>
  );
}

export default App;

export {Header, Footer, ListarRegistros};
