import React, { useState } from 'react';
import { useCart, formatINR } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { Button } from './Button';
import './CheckoutModal.css';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, subtotal, shippingFee, tax, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod' // Cash on Delivery or Card demo
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Valid 6-digit PIN code required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const randomOrderId = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      setIsSuccess(true);
      clearCart();
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="checkout-modal fade-in">
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="checkout-success-state">
            <div className="success-icon-badge">
              <CheckCircle2 size={56} />
            </div>
            <h2>Order Confirmed!</h2>
            <p className="order-id">Order ID: <strong>{orderId}</strong></p>
            <p className="success-desc">
              Thank you for shopping with <strong>LUMORA</strong>. We have received your order details and will dispatch your package within 24 hours.
            </p>

            <div className="delivery-summary-card">
              <div className="summary-row">
                <span>Deliver To:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="summary-row">
                <span>Address:</span>
                <strong>{formData.address}, {formData.city} - {formData.pincode}</strong>
              </div>
              <div className="summary-row">
                <span>Total Paid:</span>
                <strong className="text-gold">{formatINR(total)}</strong>
              </div>
              <div className="summary-row">
                <span>Payment Mode:</span>
                <strong>{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</strong>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth onClick={handleClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="checkout-form-container">
            <div className="modal-header">
              <h2>Express Checkout</h2>
              <p>Complete your order details below</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  placeholder="House/Flat No., Street, Area"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    className={`form-input ${errors.pincode ? 'error' : ''}`}
                    placeholder="6-digit PIN"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Options</label>
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <span>Pay on Delivery (Cash / UPI)</span>
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span>Credit / Debit Card (Demo)</span>
                  </label>
                </div>
              </div>

              <div className="checkout-summary-mini">
                <div className="mini-row">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="mini-row">
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}</span>
                </div>
                <div className="mini-row">
                  <span>GST Tax (5%):</span>
                  <span>{formatINR(tax)}</span>
                </div>
                <div className="mini-row total-row">
                  <span>Grand Total:</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <div className="trust-pills">
                <span><ShieldCheck size={14} /> 256-Bit SSL Secured</span>
                <span><Truck size={14} /> Doorstep Express Delivery</span>
              </div>

              <Button type="submit" variant="accent" size="lg" fullWidth>
                Place Order ({formatINR(total)})
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
