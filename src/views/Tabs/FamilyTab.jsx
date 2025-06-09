import React from 'react';
import { Table } from 'react-bootstrap';

function FamilyTab() {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Ad</th>
          <th>Yakınlık</th>
          <th>Doğum Tarihi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Zeynep Özhamam</td>
          <td>Eşi</td>
          <td>02/04/1993</td>
        </tr>
        <tr>
          <td>Aybüke Ebrar Özhamam</td>
          <td>Çocuk</td>
          <td>03/12/2020</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default FamilyTab;
