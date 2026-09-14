import React from 'react';
import { Sparkles, Gem, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './About.css';

export const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Gem size={28} />,
      title: "Master Craftsmanship",
      desc: "Every timepiece, leather satchel, and piece of diamond jewelry is sculpted by master artisans with decades of heritage."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Certified Integrity",
      desc: "We guarantee 100% authenticity on every creation, backed by international certificates of origin and gemstone credentials."
    },
    {
      icon: <Heart size={28} />,
      title: "Ethical Sourcing",
      desc: "From conflict-free laboratory and natural diamonds to vegetable-tanned Italian leathers, sustainability is woven into our DNA."
    },
    {
      icon: <Award size={28} />,
      title: "Concierge Distinction",
      desc: "Our dedicated client advisors provide tailored assistance, complimentary customization, and lifetime care support."
    }
  ];

  return (
    <div className="about-page fade-in">
      {/* About Hero Header */}
      <section className="about-hero">
        <div className="container text-center">
          <span className="section-badge"><Sparkles size={13} /> The LUMORA Story</span>
          <h1 className="about-title">Crafting Modern Luxury <br /><span className="font-serif italic text-gold">With Uncompromising Precision.</span></h1>
          <p className="about-subtitle">
            Founded with a vision to redefine luxury retail in India and beyond, LUMORA merges timeless European craftsmanship with modern aesthetic sensibilities.
          </p>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="section-padding container">
        <div className="about-story-grid">
          <div className="story-image-box">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
              alt="LUMORA Artisan Workshop"
              className="story-img"
            />
          </div>

          <div className="story-text-content">
            <span className="section-badge">Our Heritage</span>
            <h2 className="section-title">Where Artistry Meets Distinction</h2>
            <p className="story-paragraph">
              LUMORA was born out of a passion for authentic elegance. In a world of mass production, we celebrate the slow, meticulous art of luxury creation.
            </p>
            <p className="story-paragraph">
              Whether it is hand-stitching full-grain Florentine calfskin leather, selecting flawless AAA freshwater pearls, or assembling high-complication Swiss mechanical movements, every detail is considered.
            </p>
            <p className="story-paragraph">
              We believe true luxury is not merely about owning fine objects—it is about experiencing unmatched quality, absolute authenticity, and personal connection.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="about-stats-section">
        <div className="container stats-container">
          <div className="stat-card">
            <h2>50,000+</h2>
            <p>Discerning Clients Served</p>
          </div>
          <div className="stat-card">
            <h2>100%</h2>
            <p>Certified Genuine Creations</p>
          </div>
          <div className="stat-card">
            <h2>25+</h2>
            <p>Global Artisan Partners</p>
          </div>
          <div className="stat-card">
            <h2>4.9 / 5.0</h2>
            <p>Customer Satisfaction Rating</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="section-badge">Guiding Principles</span>
          <h2 className="section-title">The Pillars of LUMORA</h2>
          <p className="section-description">
            The foundational standards that guide every design, material selection, and client interaction.
          </p>
        </div>

        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Experience LUMORA?</h2>
          <p className="cta-subtitle">Explore our complete collection of curated timepieces, bags, eyewear, and fragrance today.</p>
          <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => navigate('/shop')}>
            Explore The Shop
          </Button>
        </div>
      </section>
    </div>
  );
};
