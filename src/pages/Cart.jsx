import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Tag, Sparkles, Check } from 'lucide-react';
import { useCart, formatINR } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/Button';
import { CheckoutModal } from '../components/CheckoutModal';
import './Cart.css';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    subtotal,
    shippingFee,
    tax,
    total,
    FREE_SHIPPING_THRESHOLD,
    clearCart
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'LUMORA10') {
      const discountAmount = Math.round(subtotal * 0.10);
      setDiscount(discountAmount);
      setCouponMsg({ text: '10% Privilege Discount Applied!', isError: false });
    } else {
      setCouponMsg({ text: 'Invalid coupon code. Try "LUMORA10"', isError: true });
    }
  };

  const finalTotal = Math.max(0, total - discount);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart-wrapper fade-in">
        <div className="container section-padding text-center">
          <div className="empty-cart-card">
            <div className="empty-cart-icon-box">
              <ShoppingBag size={54} />
            </div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>
              Your luxury bag is currently empty. Explore our curated collections of timepieces, leather satchels, eyewear, and fragrance.
            </p>
            <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => navigate('/shop')}>
              Explore Shop Collection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page fade-in">
      {/* Header Banner */}
      <div className="cart-header-banner">
        <div className="container text-center">
          <span className="section-badge"><Sparkles size={13} /> Secure Checkout</span>
          <h1 className="cart-title">Your Shopping Bag</h1>
          <p className="cart-subtitle">Review your selected luxury items before placing your order.</p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Free Shipping Progress Indicator */}
        <div className="free-shipping-bar-card">
          <div className="shipping-bar-text">
            {remainingForFreeShipping === 0 ? (
              <span><Check size={16} className="text-success" /> You qualify for <strong>FREE Insured Express Shipping!</strong></span>
            ) : (
              <span>Add <strong>{formatINR(remainingForFreeShipping)}</strong> more to qualify for <strong>FREE Express Delivery</strong></span>
            )}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${freeShippingProgress}%` }}></div>
          </div>
        </div>

        <div className="cart-layout-grid">
          {/* Items List */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Bag Items ({cartCount})</h2>
              <button className="clear-cart-btn" onClick={clearCart}>
                <Trash2 size={16} />
                <span>Clear All Items</span>
              </button>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="continue-shopping-bar">
              <Link to="/shop" className="continue-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="cart-summary-section">
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="row-val">{formatINR(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Insured Express Shipping</span>
                  <span className="row-val">
                    {shippingFee === 0 ? <strong className="text-success">FREE</strong> : formatINR(shippingFee)}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Estimated GST (5%)</span>
                  <span className="row-val">{formatINR(tax)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Privilege Discount (10%)</span>
                    <span className="row-val text-success">-{formatINR(discount)}</span>
                  </div>
                )}
              </div>

              {/* Coupon Input Form */}
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <label className="coupon-label"><Tag size={14} /> Have a Promo Code?</label>
                <div className="coupon-input-group">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Enter LUMORA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>
                {couponMsg.text && (
                  <span className={`coupon-msg ${couponMsg.isError ? 'error' : 'success'}`}>
                    {couponMsg.text}
                  </span>
                )}
              </form>

              {/* Total Calculation */}
              <div className="grand-total-row">
                <div>
                  <span className="total-label">Grand Total</span>
                  <span className="total-tax-note">(Inclusive of all taxes)</span>
                </div>
                <span className="grand-total-val">{formatINR(finalTotal)}</span>
              </div>

              <Button
                variant="accent"
                size="lg"
                fullWidth
                onClick={() => setIsCheckoutModalOpen(true)}
              >
                Proceed to Checkout ({formatINR(finalTotal)})
              </Button>

              <div className="summary-trust-footer">
                <p><ShieldCheck size={16} /> 256-Bit SSL Encrypted Checkout</p>
                <p>Doorstep Insured Express Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Trigger */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
};
