'use client';

import { useState, useEffect } from 'react';
import { Bell, X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number; // in milliseconds, 0 for persistent
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationSystem({ notifications, onDismiss }: NotificationSystemProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setVisibleNotifications(notifications);

    // Auto-dismiss notifications with duration
    notifications.forEach((notification) => {
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => {
          onDismiss(notification.id);
        }, notification.duration);
      }
    });
  }, [notifications, onDismiss]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 bg-opacity-20 border-green-400';
      case 'warning':
        return 'bg-yellow-500 bg-opacity-20 border-yellow-400';
      case 'error':
        return 'bg-red-500 bg-opacity-20 border-red-400';
      default:
        return 'bg-blue-500 bg-opacity-20 border-blue-400';
    }
  };

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`glass-card border ${getBackgroundColor(notification.type)} p-4 rounded-lg shadow-lg animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-300">
                {notification.message}
              </p>
              
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            
            <button
              onClick={() => onDismiss(notification.id)}
              className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      id,
      duration: 5000, // Default 5 seconds
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Convenience methods
  const showSuccess = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'success', title, message, ...options });
  };

  const showError = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'error', title, message, duration: 0, ...options });
  };

  const showWarning = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'warning', title, message, ...options });
  };

  const showInfo = (title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'info', title, message, ...options });
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}
