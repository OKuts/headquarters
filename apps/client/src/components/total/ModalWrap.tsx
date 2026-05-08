import {type ReactNode, useEffect} from 'react'

interface ModalProps {
    onClose: () => void;
    title: string;
    children: ReactNode;
}


export const ModalWrap = ({children, onClose, title}: ModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    return <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}>
        <div
            className="relative w-full max-w-lg bg-white shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800">
                    {title || 'Повідомлення'}
                </h3>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    ✕
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
}