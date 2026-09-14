import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, formatINR } from '../context/CartContext';
import './CartItem.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedSize, selectedColor } = item;
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleImageError = () => {
    if (imgSrc !== product.fallbackImage) {
      setImgSrc(product.fallbackImage);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="cart-item-image"
        />
      </div>

      <div className="cart-item-details">
        <span className="cart-item-category">{product.category}</span>
        <h4 className="cart-item-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h4>
        <div className="cart-item-meta">
          {selectedSize && <span>Size: <strong>{selectedSize}</strong></span>}
          {selectedColor && <span>Color: <strong>{selectedColor}</strong></span>}
        </div>
        <div className="cart-item-unit-price">
          {formatINR(product.price)} each
        </div>
      </div>

      <div className="cart-item-actions">
        {/* Quantity Stepper */}
        <div className="cart-quantity-stepper">
          <button
            className="stepper-btn"
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="stepper-value">{quantity}</span>
          <button
            className="stepper-btn"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Item Total Price */}
        <div className="cart-item-total-price">
          {formatINR(product.price * quantity)}
        </div>

        {/* Remove Button */}
        <button
          className="cart-item-remove-btn"
          onClick={() => removeFromCart(product.id)}
          title="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
