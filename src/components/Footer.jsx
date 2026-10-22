export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <img
              src="/images/MayEthics_LoGo__2_-removebg-preview.png"
              alt="MayEthics"
              className="brand-logo-img"
            />
            <span>MayEthics</span>
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
            <li><a href="#shop">All Products</a></li>
            <li><a href="#collection">Crewnecks</a></li>
            <li><a href="#shop">New Arrivals</a></li>
            <li><a href="#shop">Best Sellers</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">Our Story</a></li>
            <li><a href="#about">Sustainability</a></li>
            <li><a href="#about">Size Guide</a></li>
            <li><a href="#about">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#about">FAQs</a></li>
            <li><a href="#about">Shipping Info</a></li>
            <li><a href="#about">Returns</a></li>
            <li><a href="#about">Track Order</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MayEthics. All rights reserved.</p>
        <div className="footer-socials">
          {/* Instagram */}
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* Facebook */}
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          {/* Twitter / X */}
          <a href="#" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
