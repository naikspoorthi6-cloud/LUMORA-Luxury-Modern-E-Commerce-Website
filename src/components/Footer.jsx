import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer-section">
      {/* Newsletter Bar */}
      <div className="newsletter-banner">
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <h3>Join the LUMORA Circle</h3>
            <p>Subscribe to receive exclusive previews, private sale invitations, and 10% off your first order.</p>
          </div>

          <div className="newsletter-form-wrapper">
            {isSubscribed ? (
              <div className="newsletter-success">
                <CheckCircle2 size={20} />
                <span>Thank you! You have been subscribed to LUMORA updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className={`newsletter-input ${error ? 'error' : ''}`}
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                  />
                  <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe to newsletter">
                    <span>Subscribe</span>
                    <Send size={16} />
                  </button>
                </div>
                {error && <span className="newsletter-error-msg">{error}</span>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main section-padding">
        <div className="container footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-brand">LUMORA</span>
              <span className="logo-dot">.</span>
            </Link>
            <p className="brand-desc">
              Curating exceptional luxury timepieces, fine jewelry, Italian leather goods, handcrafted sunglasses, and haute perfumery for discerning connoisseurs.
            </p>
            <div className="contact-mini-info">
              <p><MapPin size={16} /> MG Road, Brigade Junction, Bengaluru 560001</p>
              <p><Phone size={16} /> +91 800 456 7890 (Toll Free)</p>
              <p><Mail size={16} /> concierge@lumora.luxury</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Collection</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=Watches">Luxury Watches</Link></li>
              <li><Link to="/shop?category=Bags">Italian Leather Bags</Link></li>
              <li><Link to="/shop?category=Eyewear">Titanium Eyewear</Link></li>
              <li><Link to="/shop?category=Jewelry">18K Diamond Jewelry</Link></li>
              <li><Link to="/shop?category=Perfumes">Niche Perfumes</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">Client Concierge</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/about">About LUMORA</Link></li>
              <li><Link to="/contact">Track Order</Link></li>
              <li><Link to="/contact">Returns & Exchanges</Link></li>
              <li><Link to="/contact">Certificates of Authenticity</Link></li>
            </ul>
          </div>

          {/* Peace of Mind */}
          <div className="footer-col">
            <h4 className="footer-col-title">Why Trust Us</h4>
            <div className="trust-features">
              <div className="trust-feature-item">
                <ShieldCheck size={18} className="trust-icon" />
                <div>
                  <strong>Certified Authenticity</strong>
                  <p>100% verified genuine products</p>
                </div>
              </div>
              <div className="trust-feature-item">
                <ShieldCheck size={18} className="trust-icon" />
                <div>
                  <strong>Insured Express Delivery</strong>
                  <p>Free India shipping over ₹5,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-content">
          <p>© {new Date().getFullYear()} LUMORA Luxury India Pvt Ltd. All Rights Reserved.</p>
          <div className="payment-badges">
            <span>UPI</span>
            <span>RuPay</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
