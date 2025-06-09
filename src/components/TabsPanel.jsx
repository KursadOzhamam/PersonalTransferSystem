// 📁 src/components/TabsPanel.jsx
import React, { useState } from 'react';
import './TabsPanel.css';
import ProfileTab from '../views/Tabs/ProfileTab';
import RequestsTab from '../views/Tabs/RequestsTab';
import LeavesTab from '../views/Tabs/LeavesTab';
import FamilyTab from '../views/Tabs/FamilyTab';
import StepBasedRequestModal from './StepBasedRequestModal';
import { Modal } from 'react-bootstrap';
import { FaUser, FaClipboardList, FaCalendarAlt, FaUsers, FaThLarge } from 'react-icons/fa';

function TabsPanel() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { key: 'profile', label: 'Özlük Bilgisi', icon: <FaUser /> },
    { key: 'requests', label: 'Talepler', icon: <FaClipboardList /> },
    { key: 'leaves', label: 'İzinler', icon: <FaCalendarAlt /> },
    { key: 'family', label: 'Aile Bilgisi', icon: <FaUsers /> },
  ];

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="logo"><FaThLarge /></div>
        <ul className="nav-icons">
          {tabs.map((tab) => (
            <li key={tab.key} onClick={() => setActiveTab(tab.key)} className={activeTab === tab.key ? 'active' : ''}>
              {tab.icon}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="user-info">
            <strong>Kürşad Şükrü Özhamam</strong>
            <span>abl88236@adalet.gov.tr</span>
          </div>
          {activeTab === 'requests' && (
            <button className="new-request-btn" onClick={() => setShowModal(true)}>Yeni Talep</button>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'requests' && <RequestsTab />}
          {activeTab === 'leaves' && <LeavesTab />}
          {activeTab === 'family' && <FamilyTab />}
        </div>
      </main>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        backdrop={true}
        contentClassName="p-0 border-0 bg-transparent"
      >
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0 }} />
        <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', zIndex: 1051 }}>
          <StepBasedRequestModal
            onSubmit={(data) => {
              console.log(data);
              setShowModal(false);
            }}
            closeModal={() => setShowModal(false)}
            forceStep={0}
          />
        </div>
      </Modal>
    </div>
  );
}

export default TabsPanel;
