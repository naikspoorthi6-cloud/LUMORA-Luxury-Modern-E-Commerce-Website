import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Truck, ShieldCheck, RefreshCw, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart, formatINR } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize(product.sizeOptions ? product.sizeOptions[0] : '');
      setSelectedColor(product.colorOptions ? product.colorOptions[0] : '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h2>Product Not Found</h2>
        <p className="mb-4">The item you are looking for does not exist or has been removed.</p>
        <Button variant="accent" onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleImageError = () => {
    if (mainImage !== product.fallbackImage) {
      setMainImage(product.fallbackImage);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-page fade-in">
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <div className="container breadcrumb-content">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span className="current">{product.name}</span>
        </div>
      </div>

      {/* Main Details Section */}
      <section className="container section-padding">
        <div className="product-details-grid">
          {/* Gallery Column */}
          <div className="details-gallery">
            <div className="main-image-box">
              {product.isNew && <span className="badge badge-gold details-badge">New Arrival</span>}
              <img
                src={mainImage}
                alt={product.name}
                onError={handleImageError}
                className="details-main-img"
              />
            </div>

            {/* Thumbnail previews */}
            <div className="thumbnail-list">
              <button
                className={`thumb-btn ${mainImage === product.image ? 'active' : ''}`}
                onClick={() => setMainImage(product.image)}
              >
                <img src={product.image} alt={product.name} />
              </button>
              {product.fallbackImage && (
                <button
                  className={`thumb-btn ${mainImage === product.fallbackImage ? 'active' : ''}`}
                  onClick={() => setMainImage(product.fallbackImage)}
                >
                  <img src={product.fallbackImage} alt={`${product.name} alternate`} />
                </button>
              )}
            </div>
          </div>

          {/* Specs / Purchase Column */}
          <div className="details-info">
            <span className="details-category">{product.category}</span>
            <h1 className="details-title">{product.name}</h1>

            <div className="details-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "#F59E0B" : "none"}
                    color={i < Math.floor(product.rating) ? "#F59E0B" : "#CBD5E1"}
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating} / 5.0</span>
              <span className="reviews-count">({product.reviewsCount} customer reviews)</span>
              <span className="stock-badge">
                <Check size={14} /> {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
              </span>
            </div>

            <div className="details-price-row">
              <span className="details-current-price">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="details-original-price">{formatINR(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span className="details-discount-badge">
                  Save {formatINR(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            <p className="details-short-desc">{product.description}</p>

            {/* Options */}
            {product.sizeOptions && (
              <div className="option-group">
                <label className="option-label">Select Size / Variant:</label>
                <div className="size-buttons">
                  {product.sizeOptions.map((sz) => (
                    <button
                      key={sz}
                      className={`size-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colorOptions && (
              <div className="option-group">
                <label className="option-label">Select Color Edition:</label>
                <div className="size-buttons">
                  {product.colorOptions.map((clr) => (
                    <button
                      key={clr}
                      className={`size-btn ${selectedColor === clr ? 'active' : ''}`}
                      onClick={() => setSelectedColor(clr)}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart CTA */}
            <div className="purchase-actions-row">
              <div className="details-quantity-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="stepper-val">{quantity}</span>
                <button
                  className="stepper-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                variant="accent"
                size="lg"
                icon={ShoppingBag}
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={handleBuyNow}
                fullWidth
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="details-trust-box">
              <div className="trust-item">
                <Truck size={20} className="trust-icon" />
                <div>
                  <strong>Free Insured Express Delivery</strong>
                  <p>Orders over ₹5,000 qualify for complimentary courier delivery.</p>
                </div>
              </div>
              <div className="trust-item">
                <ShieldCheck size={20} className="trust-icon" />
                <div>
                  <strong>100% Genuine Guarantee</strong>
                  <p>Includes official LUMORA certificate of authenticity.</p>
                </div>
              </div>
              <div className="trust-item">
                <RefreshCw size={20} className="trust-icon" />
                <div>
                  <strong>30 Days Easy Exchange</strong>
                  <p>Hassle-free return policy with doorstep pickup.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Tabs */}
        <div className="details-tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Key Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Delivery & Returns
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'features' && (
              <ul className="spec-list">
                {product.details.map((spec, idx) => (
                  <li key={idx}>
                    <Check size={16} className="spec-check" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'shipping' && (
              <div className="shipping-info-text">
                <p>
                  All LUMORA luxury items are packed in custom tamper-proof silk boxes and shipped via premier air express couriers (Bluedart / DHL Express).
                </p>
                <p>
                  <strong>Standard Dispatch:</strong> Ships within 24 business hours from our Bengaluru fulfillment center. Delivery takes 2-4 business days nationwide.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="section-header">
              <span className="section-badge">You May Also Like</span>
              <h2 className="section-title">Related Products</h2>
            </div>

            <div className="products-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
