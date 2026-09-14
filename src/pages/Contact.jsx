import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@domain.com)';
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number (starting 6-9)';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = `Message must be at least 10 characters (currently ${formData.message.trim().length})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }
  };

  const faqs = [
    {
      q: "How can I verify the authenticity of my LUMORA purchase?",
      a: "Every product shipped by LUMORA includes a physical Certificate of Authenticity containing a unique QR code and serial number registered in our master database."
    },
    {
      q: "What are your delivery timelines across India?",
      a: "Express insured air delivery takes 2 to 4 business days. Same-day concierge delivery is available in major metro cities including Bengaluru, Mumbai, and Delhi NCR."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a complimentary 30-day return policy. Simply initiate a return from our portal or contact support, and our courier will arrange a insured doorstep pickup."
    },
    {
      q: "Which payment methods do you accept?",
      a: "We accept all major Credit/Debit Cards, UPI, NetBanking, RuPay, and Cash on Delivery (COD) up to ₹50,000 per order."
    }
  ];

  return (
    <div className="contact-page fade-in">
      {/* Header Banner */}
      <div className="contact-header-banner">
        <div className="container text-center">
          <span className="section-badge"><Sparkles size={13} /> VIP Client Assistance</span>
          <h1 className="contact-title">Contact Our Concierge</h1>
          <p className="contact-subtitle">
            Have questions regarding our luxury products, custom sizing, or existing orders? Our dedicated advisors are here to assist you.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="contact-grid">
          {/* Left Column: Contact Form */}
          <div className="contact-form-card">
            <h2 className="form-card-title">Send Us a Message</h2>
            <p className="form-card-desc">
              Fill out the form below. All fields are verified for immediate assistance.
            </p>

            {isSubmitted ? (
              <div className="contact-success-box fade-in">
                <div className="success-icon-circle">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out to <strong>LUMORA Concierge</strong>. A personal style advisor will respond to your inquiry within 2 business hours.
                </p>
                <Button variant="accent" onClick={() => setIsSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="e.g. Vikramaditya Roy"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {errors.fullName && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email & Phone Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="e.g. vikram@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <span className="error-message">
                        <AlertCircle size={14} /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <span className="error-message">
                        <AlertCircle size={14} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="e.g. Inquiry regarding Watch Customization"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  {errors.subject && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Please write your detailed query here (minimum 10 characters)..."
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                <Button type="submit" variant="accent" size="lg" icon={Send} fullWidth>
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details */}
          <div className="contact-info-column">
            <h2 className="info-column-title">Direct Contact Information</h2>
            <p className="info-column-desc">
              Reach out to our boutique headquarters or visit our flagships in person.
            </p>

            <div className="contact-cards-stack">
              <div className="contact-info-card">
                <div className="info-card-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Boutique Headquarters</h4>
                  <p>LUMORA House, MG Road, Brigade Junction, Bengaluru, Karnataka 560001, India</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-card-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Toll-Free Phone Support</h4>
                  <p>+91 800 456 7890 (Mon-Sat, 9:00 AM - 8:00 PM IST)</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-card-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Client Concierge Email</h4>
                  <p>concierge@lumora.luxury (2-hour response window)</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-card-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <h4>Private Viewing Hours</h4>
                  <p>Monday – Sunday: 10:00 AM – 9:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="faq-section">
          <div className="section-header">
            <span className="section-badge">Client Assistance</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  <ChevronDown className="faq-arrow" size={20} />
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
