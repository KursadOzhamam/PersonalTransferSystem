import React from 'react';
import { Card } from 'react-bootstrap';
import './ProfileTab.css'; 

function ProfileTab() {
  const details = [
    { label: 'Görev Yeri', value: 'Kahramankazan Adliyesi' },
    { label: 'Görevi', value: 'Zabıt Katibi' },
    { label: 'Statü', value: 'Kadrolu Personel' },
    { label: 'SGK Sicil No', value: '987654321' },
    { label: 'Memuriyet Notu', value: '100' },
    { label: 'İzin Durumu', value: '12 / 20 Gün' },
  ];

  return (
    <Card className=" border-1 p-2">
      {/* <h5 className="fw-bold mb-4 text-primary">Personel Özlük Bilgileri</h5> */}
      {details.map((item, idx) => (
        <div key={idx} className="profile-item d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold ">{item.label}:</span>
          <span className="profile-value fw-light">{item.value}</span>
        </div>
      ))}
    </Card>
  );
}

export default ProfileTab;
