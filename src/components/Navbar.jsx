import { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartOpen, onNavigateHome, onOpenContact, onOpenSizeGuide, isDark, onToggleTheme }) {
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
            src="/images/WhatsApp_Image_2026-10-23_at_12.22.15_AM-removebg-preview.png"
            alt="MayEthics"
            className="nav-main-logo"
          />
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
            <a
              href="#size-guide"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
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
                setMobileOpen(false);
                if (onOpenContact) onOpenContact();
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <a href="#cart" className="nav-cta" onClick={e => { e.preventDefault(); onCartOpen(); }}>
              Cart {cartCount > 0 && `(${cartCount})`}
            </a>
          </li>
          <li>
            <button
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                /* Sun icon for Dark Mode -> Switch to Light */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon for Light Mode -> Switch to Dark */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
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
        <a
          href="#size-guide"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            if (onOpenSizeGuide) onOpenSizeGuide();
          }}
        >
          Size Guide
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            if (onOpenContact) onOpenContact();
          }}
        >
          Contact
        </a>
        <a href="#cart" onClick={e => { e.preventDefault(); setMobileOpen(false); onCartOpen(); }}>
          Cart {cartCount > 0 && `(${cartCount})`}
        </a>
        <button
          className="mobile-theme-toggle"
          onClick={() => {
            onToggleTheme();
          }}
          aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
