import React, { useState, useEffect } from 'react';
import '../../pages/PersonnelInfo.css';
import menuIcon from '../../assets/iconpack/menuicon.svg';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [sicil, setSicil] = useState('');

  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem('applications') || '[]');
      setRequests(data);
      setJobTitle(localStorage.getItem('jobTitle') || '');
      setSicil(localStorage.getItem('jobId') || '');
    };

    // İlk yükleme
    loadData();

    // Custom event listener ekle
    const handleTransferUpdate = (event) => {
      const newApplications = event.detail.applications;
      setRequests(newApplications);
      localStorage.setItem('applications', JSON.stringify(newApplications));
      
      // Yeni başvuru bildirimi
      const latestApplication = newApplications[0];
      if (latestApplication) {
        toast.info(`Yeni başvuru alındı! Başvuru sahibi: ${latestApplication.personName}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    window.addEventListener('transferRequestUpdated', handleTransferUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('transferRequestUpdated', handleTransferUpdate);
    };
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...requests];
    const updatedApp = {
      ...updated[index],
      status: newStatus,
      statusDate: new Date().toISOString(),
      notificationShown: false
    };
    updated[index] = updatedApp;
    setRequests(updated);
    localStorage.setItem('applications', JSON.stringify(updated));
    
    // Create a new notification with application details
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
      id: Date.now(),
      message: `Başvurunuz ${newStatus === 'approved' ? 'onaylandı' : 'reddedildi'}`,
      details: {
        type: updatedApp.kararname || updatedApp.talepNedeni || updatedApp.type,
        institution: updatedApp.preferences?.[0]?.institution || updatedApp.institution || '',
        createdAt: updatedApp.createdAt
      },
      date: new Date().toISOString(),
      read: false,
      applicationId: updatedApp.id
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Trigger notification event
    window.dispatchEvent(new Event('applicationStatusChanged'));
    
    toast.success(`Başvuru ${newStatus === 'approved' ? 'onaylandı' : 'reddedildi'}!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success">Onaylandı</span>;
      case 'rejected':
        return <span className="badge bg-danger">Reddedildi</span>;
      default:
        return <span className="badge bg-warning">Beklemede</span>;
    }
  };

  return (
    <div className="personnel-wrapper">
      <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
        <img src={menuIcon} alt="Menü" />
      </button>
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <img src="/logo513.png" alt="Logo" className="logo mt-5" />
        <nav className="sidebar-nav">
          <div className="row gap-4 mb-5">
            <button className="nav-icon active">
              <img src="/src/assets/iconpack/menuicon.svg" alt="menu" />
            </button>
            <button className="nav-icon">
              <img src="/src/assets/iconpack/users-1.svg" alt="users" />
            </button>
          </div>
        </nav>
        <div className="d-flex flex-column align-items-center gap-5 my-5">
          <div className="nav-icon">
            <img src="/src/assets/iconpack/fi_126467.svg" alt="User" />
          </div>
          <div className="bottom-avatar">
            <img src="/avatar.jpg" alt="User" />
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="adminHeader">
          <div>
            <h4>Yönetici Paneli</h4>
            <p>admin@adalet.gov.tr</p>
          </div>
        </header>

        <div className="request-header mt-4">
          <h5>Tüm Başvurular</h5>
        </div>

        <section className="requests">
          {requests.length === 0 ? (
            <div className="text-muted">Başvuru bulunamadı.</div>
          ) : (
            requests.map((app, i) => (
              <div className="request-item py-3 border-bottom" key={i}>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-start gap-3 flex-grow-1">
                    <img
                      src="/src/assets/iconpack/boxtravel-icon.svg"
                      alt="Talep"
                      style={{ width: '32px', height: '32px' }}
                    />
                    <div>
                      <strong>{app.kararname || app.talepNedeni || app.type}</strong>
                      <p className="mb-0 text-muted small">
                        {app.preferences?.[0]?.institution || app.institution || ''}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-secondary small">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString('tr-TR') : ''}
                    </span>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-dark small">{jobTitle} ({sicil})</span>
                    <img
                      src="/avatar.jpg"
                      alt="User"
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    />
                  </div>
                  {(!app.status || app.status === 'pending') && (
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusChange(i, 'approved')}
                      >
                        Onayla
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleStatusChange(i, 'rejected')}
                      >
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
