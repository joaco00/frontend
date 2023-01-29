import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Registro from './Registro';

//Componente para rendereizar tabla de registros
function Registros({registros}){
    return(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>RUT</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Celular</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Año</TableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {registros.map(registro=> <Registro key={registros.id} registro={registro} />)}

                    </TableBody>
            </Table>
        </TableContainer>
    )
}
export default Registros;