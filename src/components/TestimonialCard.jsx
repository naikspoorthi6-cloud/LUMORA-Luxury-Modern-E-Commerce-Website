import React from 'react';
import { Star, Quote } from 'lucide-react';
import './TestimonialCard.css';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <Quote className="quote-icon" size={32} />
      <div className="testimonial-stars">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>
      <p className="testimonial-quote">"{testimonial.quote}"</p>
      <div className="testimonial-user">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="testimonial-avatar"
          loading="lazy"
        />
        <div className="testimonial-info">
          <h4 className="testimonial-name">{testimonial.name}</h4>
          <span className="testimonial-role">{testimonial.role}</span>
          <span className="testimonial-product">Purchased: {testimonial.product}</span>
        </div>
      </div>
    </div>
  );
};
