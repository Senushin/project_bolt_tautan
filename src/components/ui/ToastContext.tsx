import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast: addToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              pointer-events-auto
              flex items-center gap-3 px-4 py-3 rounded-xl
              bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10
              shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
              animate-fade-in
              ${toast.type === 'success' ? 'border-green-500/30' : ''}
              ${toast.type === 'error' ? 'border-red-500/30' : ''}
            `}
                    >
                        {toast.type === 'success' && <CheckCircle size={18} className="text-green-500 shrink-0" />}
                        {toast.type === 'error' && <AlertCircle size={18} className="text-red-500 shrink-0" />}
                        {toast.type === 'info' && <Info size={18} className="text-blue-500 shrink-0" />}

                        <p className="text-sm font-medium text-white">{toast.message}</p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-auto text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
