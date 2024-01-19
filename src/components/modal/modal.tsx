import { FC, ReactNode, useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean
  onClose: () => void;
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {

    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

  return (
    <div className={`${modalClasses} bg-black bg-opacity-50 p-4`}>
      <div ref={modalRef} className="bg-white p-8 rounded-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
