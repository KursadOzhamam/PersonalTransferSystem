import React, { useState, useEffect } from 'react';
import './PersonnelInfo.css';
import TransferModal from '../components/TransferModal';
import menuIcon from '../assets/iconpack/menuicon.svg';
import searchIcon from '../assets/iconpack/search.svg';
import MobileSearchModal from '../components/MobileSearchModal';
import MessageModal from '../components/MessageModal';
import AlertModal from '../components/AlertModal';
import MessageDropdown from '../components/MessageDropdown';
import AlertDropdown from '../components/AlertDropdown';
import notificationIcon from '../assets/iconpack/Notification-1.svg';
import { toast } from 'react-toastify';

function PersonnelInfo() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('izin');
  const [izinTipi, setIzinTipi] = useState('yillik');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Personel bilgileri (ileride API'den de gelebilir)
  const [personName, setPersonName] = useState('Kürşad Şükrü Özhamam');
  const [gorevYeri, setGorevYeri] = useState('Kahramankazan Adliyesi');
  const [puan, setPuan] = useState('78/100');
  const [gorevSuresi, setGorevSuresi] = useState('456gün');
  const [jobTitle, setJobTitle] = useState('Zabıt Katibi');
  const [sicil, setSicil] = useState(localStorage.getItem('sicil') || '123456'); // Girişte kullanılan sicil numarası

  // Başvuruları localStorage'dan çek
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem('applications') || '[]');
      setApplications(data);
      setPersonName(localStorage.getItem('personName') || 'Kürşad Şükrü Özhamam');
      setJobTitle(localStorage.getItem('jobTitle') || '');
      setSicil(localStorage.getItem('sicil') || '');
    };

    loadData();

    // Load existing notifications
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
    setUnreadCount(savedNotifications.filter(n => !n.read).length);

    // Custom event listener for application status changes
    const handleStatusChange = () => {
      // Reload notifications
      const updatedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    };

    window.addEventListener('applicationStatusChanged', handleStatusChange);
    return () => {
      window.removeEventListener('applicationStatusChanged', handleStatusChange);
    };
  }, []);

  useEffect(() => {
    if (showMessageModal || showSearchModal || showAlertModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showMessageModal, showSearchModal, showAlertModal]);

  const markNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success">Onaylandı</span>;
      case 'rejected':
        return <span className="badge bg-danger">Reddedildi</span>;
      default:
        return <span className="badge bg-warning">Değerlendirmede</span>;
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
    // Mark notifications as read when opening the modal
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const handleCloseNotifications = () => {
    setShowNotificationModal(false);
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
              <img src="src/assets/iconpack/menuicon.svg" alt="menu" />
            </button>
            <button className="nav-icon">
              <img src="src/assets/iconpack/money-check-1.svg" alt="" />
            </button>
            <button className="nav-icon">
              <img src="src/assets/iconpack/chart-simple-1.svg" alt="" />
            </button>
            <button className="nav-icon">
              <img src="src/assets/iconpack/apartment-1.svg" alt="" />
            </button>
            <button className="nav-icon">
              <img src="src/assets/iconpack/users-1.svg" alt="" />
            </button>
            <button className="nav-icon">
              <img src="src/assets/iconpack/calendar-lines-1.svg" alt="" />
            </button>
          </div>
          <div className="row gap-4 mt-5 mb-5">
            <button className="nav-icon">
              <img src="src/assets/iconpack/fi_3524636.svg" alt="" />
            </button>
            <button className="nav-icon">
              <img src="src/assets/iconpack/question-1.svg" alt="" />
            </button>
          </div>
        </nav>
        <div className="d-flex flex-column align-items-center gap-5 my-5">
          <div className="nav-icon">
            <img src="src/assets/iconpack/fi_126467.svg" alt="User" />
          </div>
          <div className="bottom-avatar">
            <img src="/avatar.jpg" alt="User" />
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="header">
          <div>
            <h4>Kürşad Şükrü Özhamam</h4>
            <p>abl88236@adalet.gov.tr</p>
          </div>
          <div className="d-flex align-items-center gap-4">
            <div className="search-container">
              <input type="text" placeholder="Ara..." />
              <img src="src/assets/iconpack/Search-icon.svg" alt="" />
            </div>
            <div>
              <img 
                src="src/assets/iconpack/messages-badge-1.svg" 
                alt="" 
                onClick={() => setShowMessageDropdown(true)} 
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className="notification-container">
              <div className="notification-icon" onClick={handleNotificationClick}>
                <img src={notificationIcon} alt="Bildirimler" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="info-cards">
          <div className="info-card">
            <div className="d-flex align-items-center justify-content-between my-3">
              <img src="src/assets/iconpack/house-building-1.svg" alt="" />
              <p className="card-title">Kahramankazan Adliyesi</p>
            </div>
            <div className="d-flex align-items-center justify-content-between my-3">
              <h2>456gün</h2>
              <span id="job-title">{jobTitle} ({sicil})</span>
            </div>
          </div>

          <div className="info-card">
            <div className="d-flex align-items-center justify-content-between gap-3 my-3">
              <div>
                <img src="src/assets/iconpack/chart-simple-horizontal-1.svg" alt="" />
              </div>
              <div>
                <p className="card-title">Puan Bilgileri</p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3 my-3">
              <div className="d-flex">
                <h2>78/</h2> <h2>100</h2>
              </div>
              <div className="d-flex">
                <span>İsteğe bağlı tayin talep hakkı bulunmamaktadır. </span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="d-flex align-items-center justify-content-between gap-3 my-3">
              <div>
                <img src="src/assets/iconpack/time-quarter-past-svgrepo-com-1.svg" alt="" />
              </div>
              <div>
                <p className="card-title">Memuriyet Süresi</p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3 my-3">
              <div>
                <h2>10yıl/10Ay</h2>
              </div>
              <div className="d-flex">
                <span className="text-end">Kurumda toplam çalışma süresi</span>
              </div>
            </div>
          </div>
        </section>

        <button className="new-request-btn my-5" onClick={() => setShowModal(true)}>
          Yeni Talep
        </button>

        <div className="personnel-request-header  bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Önceki Talepler</h5>
          <button className="personnel-see-all-btn btn btn-link p-0">Tümünü gör</button>
        </div>

        

        {/* Talepler Listesi */}
        <section className="personnel-requests">
          {applications.length === 0 ? (
            <div className="text-muted p-3">Henüz başvuru yapılmamış.</div>
          ) : (
            applications.map((app, i) => (
              <div className="personnel-request-item d-flex align-items-center justify-content-between px-3 py-3 border-bottom" key={i}>
                
                {/* Talep Türü */}
                <div className="personnel-request-type d-flex align-items-start gap-3 flex-grow-1">
                  <img
                    src="src/assets/iconpack/boxtravel-icon.svg"
                    alt="Talep"
                    className="personnel-request-icon"
                  />
                  <div>
                    <strong>{app.kararname || app.talepNedeni || app.type}</strong>
                    <p className="mb-0 text-muted small">
                      {app.preferences?.[0]?.institution || app.institution || ''}
                    </p>
                  </div>
                </div>

                {/* Başvuru Tarihi */}
                <div className="personnel-request-date">
                  <span className="text-secondary small">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString('tr-TR') : ''}
                  </span>
                </div>

                {/* Onay Durumu */}
                <div className="personnel-request-status d-flex align-items-center gap-2">
                  {getStatusBadge(app.status)}
                  <img
                    src="/avatar.jpg"
                    alt="User"
                    className="personnel-request-avatar rounded-circle"
                  />
                </div>

              </div>
            ))
          )}
        </section>

      </main>

      {showModal && (
        <TransferModal
          showModal={showModal}
          setShowModal={setShowModal}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          izinTipi={izinTipi}
          setIzinTipi={setIzinTipi}
          personName={personName}
          gorevYeri={gorevYeri}
          puan={puan}
          gorevSuresi={gorevSuresi}
        />
      )}

      {/* Mobil mesaj ve arama butonları */}
      <div className="mobile-floating-btns">
      {/* Mobil Search Button */}
        <button
          className="mobile-search-btn"
          onClick={() => setShowSearchModal(true)}
          aria-label="Arama"
        >
          <img src="src/assets/iconpack/Search-icon.svg" alt="Ara" />
        </button>
        {/* Mobil Message Button */}
        <button
          className="mobile-message-btn"
          onClick={() => setShowMessageModal(true)}
          aria-label="Mesaj"
        >
          <img src="src/assets/iconpack/messages-badge-1.svg" alt="Ara" />
        </button>
        {/* Mobil Alert Button */}
        <button
          className="mobile-alert-btn"
          onClick={() => setShowAlertModal(true)}
          aria-label="Bildirim"
        >
          <img src="src/assets/iconpack/Notification-1.svg" alt="Bildirim" />
        </button>
      </div>
      {showSearchModal && (
        <MobileSearchModal onClose={() => setShowSearchModal(false)} />
      )}
      {showMessageModal && (
        <MessageModal onClose={() => setShowMessageModal(false)} />
      )}
      {showAlertModal && (
        <AlertModal onClose={() => setShowAlertModal(false)} />
      )}
      {showMessageDropdown && (
        <MessageDropdown onClose={() => setShowMessageDropdown(false)} />
      )}
      {showAlertDropdown && (
        <AlertDropdown onClose={() => setShowAlertDropdown(false)} />
      )}
      {showNotificationModal && (
        <div className="notification-modal">
          <div className="notification-modal-content">
            <div className="notification-header">
              <h5>Bildirimler</h5>
              <button onClick={handleCloseNotifications}>×</button>
            </div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <p className="text-muted">Yeni bir bildiriminiz bulunmamaktadır.</p>
              ) : (
                notifications.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                    <p className="notification-message">{notification.message}</p>
                    {notification.details && (
                      <div className="notification-details">
                        <p className="mb-1">
                          <strong>Başvuru Türü:</strong> {notification.details.type}
                        </p>
                        {notification.details.institution && (
                          <p className="mb-1">
                            <strong>Kurum:</strong> {notification.details.institution}
                          </p>
                        )}
                        {notification.details.createdAt && (
                          <p className="mb-1">
                            <strong>Başvuru Tarihi:</strong> {new Date(notification.details.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        )}
                      </div>
                    )}
                    <small className="notification-date">
                      {new Date(notification.date).toLocaleString('tr-TR')}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonnelInfo;
