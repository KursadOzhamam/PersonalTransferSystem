{notifications.length > 0 ? (
  <div className="notification-list">
    {notifications.map((notification, index) => (
      <div key={index} className={`notification-item ${notification.read ? '' : 'unread'}`}>
        <div className="notification-message">{notification.message}</div>
        <div className="notification-details">
          <p><strong>Talep Türü:</strong> {notification.details.type}</p>
          <p><strong>Başvuru Tarihi:</strong> {notification.details.applicationDate}</p>
          <p><strong>Değerlendirme:</strong> {notification.details.status}</p>
          {notification.details.reason && (
            <p><strong>Değerlendirme Notu:</strong> {notification.details.reason}</p>
          )}
        </div>
        <span className="notification-date">{notification.date}</span>
      </div>
    ))}
  </div>
) : (
  <div className="no-notifications">Bildirim bulunmamaktadır.</div>
)} 