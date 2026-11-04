import { useState } from 'react';

export default function ContactPage({ onBackToHome }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwR8Z7X9FhrxISXTfbo0xX0sp9UxdED561GORDJHGyjrD6nlNXt4x_ZQuMbhkmFeIJZvQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
        }),
      });
    } catch (err) {
      console.error('Failed to post contact message to Google Sheets:', err);
    }

    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    alert('Thank you! Your message has been sent to MayEthics Official Support.');
  };

  return (
    <div className="contact-page-container">
      {/* Top back button */}
      <div className="contact-page-nav">
        <button className="btn-back-home" onClick={onBackToHome}>
          ← Back to Store
        </button>
      </div>

      <div className="contact-hero">
        <span className="contact-hero-tag">Get In Touch</span>
        <h1 className="contact-hero-title">Contact MayEthics</h1>
        <p className="contact-hero-desc">
          Have queries about your order, custom sizing, delivery status, or collaboration? 
          We are here to help you 24/7.
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Cards */}
        <div className="contact-cards-col">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <h3>Official Email</h3>
              <p>For inquiries, support & order issues</p>
              <a href="mailto:mayethicsbd.official@gmail.com" className="contact-link">
                mayethicsbd.official@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <h3>WhatsApp & Hotline</h3>
              <p>Direct chat for fastest reply</p>
              <a href="https://wa.me/8801628242017" target="_blank" rel="noopener noreferrer" className="contact-link">
                +880 1628-242017
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h3>Operating Hours</h3>
              <p>Everyday: 10:00 AM – 11:00 PM</p>
              <span className="badge-available">Online Support Active</span>
            </div>
          </div>

          {/* Social Links Card in Contact Page */}
          <div className="contact-info-card contact-social-card">
            <div>
              <h3>Connect on Social Media</h3>
              <p>Follow our latest drops, lookbooks & announcements</p>
              <div className="contact-social-buttons">
                <a
                  href="https://www.facebook.com/MayEthics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn facebook"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/mayethics_bd?fbclid=IwY2xjawVXDeVleHRuA2FlbQIxMABwZG9mBWJyaWQRMUpzRmVQdjlTMGRzcjlOZXhzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEf8LiASHOkDrZReAv-FR1vuLwqjrj7aTw5J0AbB0pndXp0RLQDGuKaLDUu14A_aem_8pQsxUCLg_aEWED3px3bBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form-inner">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Order enquiry / Size help / Exchange"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="place-order-btn" disabled={submitted}>
                {submitted ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

