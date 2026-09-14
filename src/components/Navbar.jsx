import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Banner */}
      <div className="navbar-top-bar">
        <div className="container top-bar-content">
          <span><Sparkles size={13} /> Complimentary Express Shipping Across India on Orders Over ₹5,000</span>
          <span className="top-bar-support">24/7 Concierge Support</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="navbar-main">
        <div className="container navbar-container">
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-brand">LUMORA</span>
            <span className="logo-dot">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="navbar-actions">
            <button
              className="icon-btn"
              onClick={() => navigate('/shop')}
              title="Search products"
              aria-label="Search products"
            >
              <Search size={20} />
            </button>

            <Link to="/cart" className="icon-btn cart-btn" aria-label="Shopping Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="navbar-logo">
            <span className="logo-brand">LUMORA</span>
            <span className="logo-dot">.</span>
          </Link>
          <button
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-drawer-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/cart" className="mobile-nav-link mobile-cart-link">
            <span>Shopping Cart</span>
            <span className="mobile-cart-badge">{cartCount} items</span>
          </NavLink>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </header>
  );
};
