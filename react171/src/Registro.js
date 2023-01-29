import React from "react";
import { TableRow,TableCell } from "@mui/material";
//Componente para rendereizar una fila 
function Registro({registro : {Rut,Nombres,Apellidos,Email,Celular,Marca,Modelo,Anio}}){
    return(
        <TableRow>
            <TableCell>{Rut}</TableCell>
            <TableCell>{Nombres}</TableCell>
            <TableCell>{Apellidos}</TableCell>
            <TableCell>{Email}</TableCell>
            <TableCell>{Celular}</TableCell>
            <TableCell>{Marca}</TableCell>
            <TableCell>{Modelo}</TableCell>
            <TableCell>{Anio}</TableCell>
         </TableRow>
    );

}

export default Registro;