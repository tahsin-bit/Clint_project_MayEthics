export default function Footer({ onNavigateHome, onOpenSizeGuide, onOpenContact }) {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (onNavigateHome) onNavigateHome();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <img
              src="/images/WhatsApp_Image_2026-10-23_at_12.22.15_AM-removebg-preview.png"
              alt="MayEthics"
              className="footer-main-logo"
            />
          </div>
          <p>
            Premium streetwear rooted in ethics. We believe fashion should look 
            good, feel good, and do good. Every piece is a statement of style 
            and responsibility.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="#collection" onClick={(e) => handleScrollTo(e, 'collection')}>
                All Products
              </a>
            </li>
            <li>
              <a href="#collection" onClick={(e) => handleScrollTo(e, 'collection')}>
                Crewnecks Collection
              </a>
            </li>
            <li>
              <a href="#lookbook" onClick={(e) => handleScrollTo(e, 'lookbook')}>
                Lookbook Gallery
              </a>
            </li>
            <li>
              <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')}>
                Featured Drops
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#about" onClick={(e) => handleScrollTo(e, 'about')}>
                Our Story & Ethics
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleScrollTo(e, 'about')}>
                Sustainability & Quality
              </a>
            </li>
            <li>
              <a
                href="#size-guide"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenSizeGuide) onOpenSizeGuide();
                }}
              >
                Size Guide
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenContact) onOpenContact();
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact & Support</h4>
          <ul className="footer-contact-list">
            <li>
              <a href="mailto:mayethicsbd.official@gmail.com" className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>mayethicsbd.official@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/8801628242017" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+880 1628-242017 (WhatsApp)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MayEthics. All rights reserved.</p>
        <div className="footer-socials">
          {/* WhatsApp */}
          <a
            href="https://wa.me/8801628242017"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:mayethicsbd.official@gmail.com"
            aria-label="Email"
            title="Email us"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/MayEthics"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="MayEthics on Facebook"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/mayethics_bd?fbclid=IwY2xjawVXDeVleHRuA2FlbQIxMABwZG9mBWJyaWQRMUpzRmVQdjlTMGRzcjlOZXhzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEf8LiASHOkDrZReAv-FR1vuLwqjrj7aTw5J0AbB0pndXp0RLQDGuKaLDUu14A_aem_8pQsxUCLg_aEWED3px3bBA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="MayEthics on Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
