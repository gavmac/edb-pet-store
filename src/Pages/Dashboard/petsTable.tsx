import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';

const PetsTable = (props) => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Pets
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Pet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pets.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default PetsTable