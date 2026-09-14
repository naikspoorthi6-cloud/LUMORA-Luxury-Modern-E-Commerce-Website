import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart, formatINR } from '../context/CartContext';
import { Button } from './Button';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleImageError = () => {
    if (imgSrc !== product.fallbackImage) {
      setImgSrc(product.fallbackImage);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        {product.isNew && <span className="badge badge-gold product-card-badge">New</span>}
        {!product.isNew && product.originalPrice && (
          <span className="badge badge-sale product-card-badge">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}

        <Link to={`/product/${product.id}`} className="product-card-image-link">
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            className="product-card-image"
            loading="lazy"
          />
        </Link>

        <div className="product-card-overlay-actions">
          <Link to={`/product/${product.id}`} className="card-action-btn" title="Quick View">
            <Eye size={18} />
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="card-action-btn"
            title="Add to Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-card-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "#F59E0B" : "none"}
                color={i < Math.floor(product.rating) ? "#F59E0B" : "#CBD5E1"}
              />
            ))}
          </div>
          <span className="rating-score">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        <div className="product-card-footer">
          <div className="product-card-price">
            <span className="current-price">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatINR(product.originalPrice)}</span>
            )}
          </div>

          <Button
            variant="accent"
            size="sm"
            icon={ShoppingBag}
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
