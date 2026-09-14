import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import './Toast.css';

export const Toast = () => {
  const { toast, hideToast } = useCart();

  if (!toast.show) return null;

  return (
    <div className={`toast toast-${toast.type} fade-in`}>
      <div className="toast-icon">
        {toast.type === 'success' && <CheckCircle2 size={20} />}
        {toast.type === 'info' && <Info size={20} />}
        {toast.type === 'warning' && <AlertTriangle size={20} />}
      </div>
      <p className="toast-message">{toast.message}</p>
      <button className="toast-close" onClick={hideToast} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};
