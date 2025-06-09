import React, { useState, useEffect } from 'react';
import './AlertModal.css';

function AlertModal({ onClose }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);

    // Add event listener for notification updates
    const handleStatusChange = () => {
      const updatedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      setNotifications(updatedNotifications);
    };

    window.addEventListener('applicationStatusChanged', handleStatusChange);
    return () => {
      window.removeEventListener('applicationStatusChanged', handleStatusChange);
    };
  }, []);

  const handleClose = () => {
    // Mark notifications as read when closing the modal
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    onClose();
  };

  return (
    <div className="mobile-alert-modal-overlay">
      <div className="mobile-alert-modal-box">
        <button className="mobile-alert-close" onClick={handleClose}>×</button>
        <div className="mobile-alert-center">
          <div className="notification-header">
            <h5>Bildirimler</h5>
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
    </div>
  );
}

export default AlertModal; 