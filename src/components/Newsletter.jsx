import { useState } from 'react';
import { useScrollReveal } from '../hooks';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useScrollReveal(0.15);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="cta-section reveal-section" ref={sectionRef}>
      <div className="cta-container">
        <h2 className="cta-title">
          Join the <span style={{ color: 'var(--sage)' }}>MayEthics</span> Movement
        </h2>
        <p className="cta-desc">
          Be the first to know about new drops, exclusive offers, and 
          behind-the-scenes stories. No spam — just streetwear culture.
        </p>
        {submitted ? (
          <p style={{ color: 'var(--sage)', fontWeight: 600, letterSpacing: '1px' }}>
            ✓ Welcome to the family!
          </p>
        ) : (
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="cta-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="cta-submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
