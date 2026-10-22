import { useState } from 'react';
import { useScrollReveal } from '../hooks';

export default function FeaturedProduct({ product, onAddToCart, onBack, initialColor = 0 }) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(2); // default L
  const [quantity, setQuantity] = useState(1);
  const sectionRef = useScrollReveal(0.1);

  const currentColor = product.colors[selectedColor] || product.colors[0];

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: currentColor.name,
      colorHex: currentColor.hex,
      size: product.sizes[selectedSize],
      qty: quantity,
      image: currentColor.modelImage,
    });
  };

  const handleColorChange = (index) => {
    setSelectedColor(index);
  };

  return (
    <section className="featured-section product-detail-page" id="shop" ref={sectionRef}>
      {onBack && (
        <div className="product-page-nav">
          <button className="back-to-collection-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Collection
          </button>
          <div className="product-breadcrumb">
            <span>Home</span> / <span>Collection</span> / <span className="current">{currentColor.name}</span>
          </div>
        </div>
      )}

      <div className="section-header reveal-section visible">
        <p className="section-label">Signature Collection</p>
        <h2 className="section-title">The Heavyweight Crewneck</h2>
        <p className="section-desc">
          Designed from the ground up with 400 GSM brushed fleece. 
          Choose your color, switch between model and garment views, and find your fit.
        </p>
      </div>

      <div className="product-showcase">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-main-image">
            {product.badge && (
              <span className="product-image-badge">{product.badge}</span>
            )}

            <img
              src={currentColor.modelImage}
              alt={`${product.name} — ${currentColor.name}`}
              key={currentColor.name}
              className="product-display-img"
            />
          </div>

          {/* Quick thumbnails for each color */}
          <div className="product-thumbs">
            {product.colors.map((color, i) => (
              <div
                key={color.name}
                className={`product-thumb ${selectedColor === i ? 'active' : ''}`}
                onClick={() => handleColorChange(i)}
                title={color.name}
              >
                <img src={color.modelImage} alt={color.name} />
                <span className="thumb-color-dot" style={{ background: color.hex }} />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            <span className="currency">৳</span>{product.price.toLocaleString()}
          </div>
          <p className="product-description">{product.description}</p>

          {/* Color selector */}
          <div className="selector-group">
            <div className="selector-label">
              Color — <span>{currentColor.name}</span>
            </div>
            <div className="color-options">
              {product.colors.map((color, i) => (
                <button
                  key={color.name}
                  className={`color-swatch ${selectedColor === i ? 'active' : ''}`}
                  style={{ background: color.hex }}
                  onClick={() => handleColorChange(i)}
                  aria-label={`Select ${color.name}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="selector-group">
            <div className="selector-label">
              Size — <span>{product.sizes[selectedSize]}</span>
            </div>
            <div className="size-options">
              {product.sizes.map((size, i) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === i ? 'active' : ''}`}
                  onClick={() => setSelectedSize(i)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="selector-group">
            <div className="selector-label">Quantity</div>
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <div className="quantity-display">{quantity}</div>
              <button
                className="quantity-btn"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Add to Cart — ৳{(product.price * quantity).toLocaleString()}
          </button>

          {/* Meta */}
          <div className="product-meta">
            <div className="product-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Free Delivery
            </div>
            <div className="product-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 014-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 01-4 4H3" />
              </svg>
              Easy Returns
            </div>
            <div className="product-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Premium Quality
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
