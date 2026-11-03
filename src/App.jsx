import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeaturedProduct from './components/FeaturedProduct';
import Collection from './components/Collection';
import Features from './components/Features';
import Lookbook from './components/Lookbook';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Loader from './components/Loader';
import CursorFollower from './components/CursorFollower';
import Toast from './components/Toast';
import CheckoutModal from './components/CheckoutModal';
import SizeGuideModal from './components/SizeGuideModal';
import ContactPage from './components/ContactPage';

const PRODUCTS = [
  {
    id: 1,
    name: 'MayEthics Heavyweight Crewneck',
    price: 2950,
    description: 'Engineered with 400 GSM premium combed cotton. Featuring signature embossed ME chest insignia, relaxed dropped shoulders, and heavy ribbing.',
    flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
    colors: [
      {
        name: 'Charcoal Grey',
        hex: '#4A4A4A',
        modelImage: '/images/Dual-View_Charcoal_Streetwear_Outfit-removebg-preview.png',
        flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
        dualModelImage: '/images/Dual-View_Charcoal_Streetwear_Outfit-removebg-preview.png',
      },
      {
        name: 'Obsidian Black',
        hex: '#111111',
        modelImage: '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
        flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
        dualModelImage: '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
      },
      {
        name: 'Oatmeal Cream',
        hex: '#F5EDE3',
        modelImage: '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
        flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
        dualModelImage: '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
      },
      {
        name: 'Burgundy Maroon',
        hex: '#5C2028',
        modelImage: '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
        flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
        dualModelImage: '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
      },
      {
        name: 'Sky Blue',
        hex: '#7BA3D4',
        modelImage: '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
        flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
        dualModelImage: '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Limited Drop',
  },
];

const COLLECTION = [
  {
    id: 101,
    name: 'Charcoal Minimal Cut',
    colorName: 'Charcoal Grey',
    price: 2950,
    flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
    modelImage: '/images/Dual-View_Charcoal_Streetwear_Outfit-removebg-preview.png',
    dualImage: '/images/Minimal_Charcoal_Sweatshirt_Lookbook-removebg-preview.png',
    hex: '#4A4A4A',
  },
  {
    id: 102,
    name: 'Obsidian Street Silhouette',
    colorName: 'Obsidian Black',
    price: 2950,
    flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
    modelImage: '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
    dualImage: '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
    hex: '#111111',
  },
  {
    id: 103,
    name: 'Oatmeal Cargo Essential',
    colorName: 'Cream',
    price: 2950,
    flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
    modelImage: '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
    dualImage: '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
    hex: '#F5EDE3',
  },
  {
    id: 104,
    name: 'Burgundy Dual Heavyweight',
    colorName: 'Maroon',
    price: 2950,
    flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
    modelImage: '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
    dualImage: '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
    hex: '#5C2028',
  },
  {
    id: 105,
    name: 'Sky Blue Contrast Edition',
    colorName: 'Sky Blue',
    price: 2950,
    flatImage: '/images/MayEthics_LoGo-removebg-preview.png',
    modelImage: '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
    dualImage: '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
    hex: '#7BA3D4',
  },
];

function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'product' | 'contact'
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
    } catch {
      // ignore localStorage errors
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const exists = prev.find(
        c => c.id === item.id && c.color === item.color && c.size === item.size
      );
      if (exists) {
        return prev.map(c =>
          c.id === item.id && c.color === item.color && c.size === item.size
            ? { ...c, qty: c.qty + item.qty }
            : c
        );
      }
      return [...prev, item];
    });
    showToast(`${item.name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateCartQty = useCallback((index, delta) => {
    setCart(prev =>
      prev
        .map((item, i) => {
          if (i === index) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const handleOpenCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const handleOrderSuccess = useCallback((orderId) => {
    setCart([]);
    showToast(`Order ${orderId} placed successfully!`);
  }, [showToast]);

  // When card in "Explore All Colorways" is clicked
  const handleSelectProduct = useCallback((item, index) => {
    setSelectedColorIndex(index);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback(() => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenContact = useCallback(() => {
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Loader loading={loading} onComplete={() => setLoading(false)} />
      <CursorFollower />
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigateHome={handleBackToHome}
        onOpenContact={handleOpenContact}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      
      <main>
        {activePage === 'contact' ? (
          <ContactPage onBackToHome={handleBackToHome} />
        ) : activePage === 'product' ? (
          <div className="product-page-wrapper">
            <FeaturedProduct
              product={PRODUCTS[0]}
              onAddToCart={addToCart}
              onBack={handleBackToHome}
              initialColor={selectedColorIndex}
            />
          </div>
        ) : (
          <>
            <Hero />
            <Marquee />
            <Collection items={COLLECTION} onSelectProduct={handleSelectProduct} />
            <Features />
            <Lookbook />
          </>
        )}
      </main>

      <Footer
        onNavigateHome={handleBackToHome}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenContact={handleOpenContact}
      />
      {/* Floating Sticky Cart Button (only shows when cart has items) */}
      {cartCount > 0 && (
        <button
          className="floating-cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="View Cart"
          title="View Cart"
        >
          <span className="floating-cart-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="floating-cart-badge">{cartCount}</span>
          </span>
          <span className="floating-cart-text">View Cart</span>
          {cartTotal > 0 && (
            <span className="floating-cart-amount">৳{cartTotal.toLocaleString()}</span>
          )}
        </button>
      )}

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQty}
        onCheckout={handleOpenCheckout}
        total={cartTotal}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        total={cartTotal}
        onOrderSuccess={handleOrderSuccess}
      />
      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
      <Toast show={toast.show} message={toast.message} />
    </>
  );
}

export default App;
