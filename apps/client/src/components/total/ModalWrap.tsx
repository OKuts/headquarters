import {type MouseEvent, type ReactNode, useEffect} from 'react'
import {createPortal} from 'react-dom' // 1. Імпортуємо Портал

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

export const ModalWrap = ({children, onClose}: ModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}