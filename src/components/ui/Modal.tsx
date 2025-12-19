import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type ModalType = 'default' | 'success' | 'error' | 'warning' | 'update';

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    type?: ModalType;
    showClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    type = 'default',
    showClose = true
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getBorderColor = () => {
        switch (type) {
            case 'success': return 'border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]';
            case 'error': return 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]';
            case 'warning': return 'border-orange-500/30 shadow-[0_0_30px_rgba(238,93,67,0.1)]';
            case 'update': return 'border-brand-purple/30 shadow-[0_0_30px_rgba(167,113,254,0.1)]';
            default: return 'border-white/10';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Content */}
            <div className={`
        relative w-full max-w-md bg-[#0A0A0A] rounded-[32px] 
        border ${getBorderColor()}
        animate-zoom-in overflow-hidden
      `}>
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 blur-xl" />

                {/* Close Button */}
                {showClose && onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors z-10"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="p-8 text-center relative z-0">
                    {title && (
                        <h3 className="text-xl font-bold text-white mb-6">
                            {title}
                        </h3>
                    )}
                    <div className="text-zinc-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
