import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen, onNavigateHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onNavigateHome) onNavigateHome();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); if (onNavigateHome) onNavigateHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img
            src="/images/MayEthics_LoGo__2_-removebg-preview.png"
            alt="MayEthics Logo"
            className="brand-logo-img"
          />
          <span className="nav-logo-text">MayEthics</span>
        </a>

        <ul className="nav-links">
          <li>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </a>
          </li>
          <li><a href="#collection" onClick={e => handleNavClick(e, 'collection')}>Collection</a></li>
          <li><a href="#lookbook" onClick={e => handleNavClick(e, 'lookbook')}>Lookbook</a></li>
          <li><a href="#about" onClick={e => handleNavClick(e, 'about')}>About</a></li>
          <li>
            <a href="#cart" className="nav-cta" onClick={e => { e.preventDefault(); onCartOpen(); }}>
              Cart {cartCount > 0 && `(${cartCount})`}
            </a>
          </li>
        </ul>

        <button
          className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            if (onNavigateHome) onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Home
        </a>
        <a href="#collection" onClick={e => handleNavClick(e, 'collection')}>Collection</a>
        <a href="#lookbook" onClick={e => handleNavClick(e, 'lookbook')}>Lookbook</a>
        <a href="#about" onClick={e => handleNavClick(e, 'about')}>About</a>
        <a href="#cart" onClick={e => { e.preventDefault(); setMobileOpen(false); onCartOpen(); }}>
          Cart {cartCount > 0 && `(${cartCount})`}
        </a>
      </div>
    </>
  );
}
