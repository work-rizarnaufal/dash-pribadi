import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '@/Components/UI/Toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback(
        ({ type = 'info', message, title, duration = 4000 }) => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            const newToast = { id, type, message, title, duration };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }

            return id;
        },
        [removeToast]
    );

    const toast = {
        success: (message, title) => addToast({ type: 'success', message, title }),
        error: (message, title) => addToast({ type: 'error', message, title }),
        warning: (message, title) => addToast({ type: 'warning', message, title }),
        info: (message, title) => addToast({ type: 'info', message, title }),
        dismiss: removeToast,
    };

    return (
        <ToastContext.Provider value={{ toast, toasts, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

