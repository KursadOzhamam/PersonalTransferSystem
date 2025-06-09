import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import './LeavesTab.css';

function LeavesTab() {
  const leaves = [
    { date: '15.03.2025', type: 'Yıllık İzin', duration: '5 Gün' },
    { date: '10.01.2025', type: 'Sağlık İzni', duration: '3 Gün' },
  ];

  return (
    <>
      <Card className="p-3 mb-3 w-100 shadow-sm border-1">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Toplam İzin:</strong> 20 Gün<br />
            <strong>Kalan:</strong> <span className="text-success">12 Gün</span>
          </div>
          <Button variant="success" className="rounded-2">Yeni İzin Talebi</Button>
        </div>
      </Card>

      <Card className="shadow-sm border-1">
  <div className="leaves-table-wrapper">
    <Table hover responsive className="mb-0 leaves-table">
      <thead>
        <tr>
          <th>TARİH</th>
          <th>İZİN TÜRÜ</th>
          <th>SÜRE</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((leave, idx) => (
          <tr key={idx} className="leaves-row">
            <td>{leave.date}</td>
            <td>{leave.type}</td>
            <td>{leave.duration}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</Card>

    </>
  );
}

export default LeavesTab;
