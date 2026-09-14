import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Headphones, Star } from 'lucide-react';
import { products, categories, testimonials, brandFeatures } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { Button } from '../components/Button';
import { formatINR } from '../context/CartContext';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'Truck': return <Truck size={28} />;
      case 'ShieldCheck': return <ShieldCheck size={28} />;
      case 'RefreshCw': return <RefreshCw size={28} />;
      case 'Headphones': return <Headphones size={28} />;
      default: return <Sparkles size={28} />;
    }
  };

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Autumn / Winter Luxury Collection 2026</span>
            </div>
            <h1 className="hero-title">
              Timeless Elegance <br />
              <span className="hero-title-accent font-serif">Redefined for You.</span>
            </h1>
            <p className="hero-description">
              Explore LUMORA's curated collection of Swiss timepieces, fine 18K jewelry, Italian calfskin leather, and artisanal fragrance.
            </p>
            <div className="hero-cta-group">
              <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => navigate('/shop')}>
                Explore Shop
              </Button>

              <Button variant="outline" size="lg" onClick={() => navigate('/about')}>
                Our Heritage
              </Button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <strong>50K+</strong>
                <span>Happy Clients</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong>4.9 ★</strong>
                <span>Average Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong>100%</strong>
                <span>Authentic Luxury</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
                alt="LUMORA Luxury Collection Showcase"
                className="hero-main-img"
              />
              <div className="hero-floating-badge">
                <div className="floating-badge-icon">
                  <Star size={18} fill="#F59E0B" color="#F59E0B" />
                </div>
                <div>
                  <strong>Featured Choice</strong>
                  <p>Aethelgard Automatic — {formatINR(18999)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="section-padding categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Curated Collections</span>
            <h2 className="section-title">Shop By Category</h2>
            <p className="section-description">
              Discover masterfully crafted creations across our flagship luxury categories.
            </p>
          </div>

          <div className="categories-grid">
            {categories.filter(c => c.name !== 'All').map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="category-card"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-card-bg"
                  loading="lazy"
                />
                <div className="category-card-overlay">
                  <span className="category-count">{category.count} Products</span>
                  <h3 className="category-name">{category.name}</h3>
                  <span className="category-cta">
                    Browse Category <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding featured-products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Handpicked Classics</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description">
              Our most sought-after luxury pieces, crafted with meticulous attention to detail.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="view-all-wrapper">
            <Button variant="outline" size="lg" icon={ArrowRight} onClick={() => navigate('/shop')}>
              View Full Collection ({products.length} Items)
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose LUMORA Section */}
      <section className="section-padding features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The LUMORA Difference</span>
            <h2 className="section-title">Why Choose LUMORA?</h2>
            <p className="section-description">
              We provide a seamless luxury shopping experience built on trust, authenticity, and concierge support.
            </p>
          </div>

          <div className="features-grid">
            {brandFeatures.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon-wrapper">
                  {getFeatureIcon(feature.icon)}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card">
            <div className="promo-content">
              <span className="badge badge-gold">Limited Exclusive Offer</span>
              <h2 className="promo-title">Privilege Club Privilege Sale</h2>
              <p className="promo-desc">
                Enjoy up to 25% off on selected Swiss watches and Italian calfskin leather items. Free express insured shipping on all orders over ₹5,000.
              </p>
              <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => navigate('/shop')}>
                Shop Festive Privilege Sale
              </Button>
            </div>
            <div className="promo-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                alt="Promotional Italian Leather Satchel"
                className="promo-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Client Stories</span>
            <h2 className="section-title">What Our Collectors Say</h2>
            <p className="section-description">
              Read authentic feedback from valued customers who trust LUMORA.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
