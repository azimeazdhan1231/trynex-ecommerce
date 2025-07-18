import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface NotificationProps {
  notification: Notification;
  onClose: (id: string) => void;
}

function NotificationItem({ notification, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, notification.duration || 3000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[notification.type];

  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg mb-4 transform transition-all duration-300 animate-slide-in`}>
      <div className="flex items-center justify-between">
        <span>{notification.message}</span>
        <button
          onClick={() => onClose(notification.id)}
          className="ml-4 text-white hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Expose global notification function
  useEffect(() => {
    (window as any).showNotification = addNotification;
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
}
