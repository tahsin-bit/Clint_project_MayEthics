import { useScrollReveal } from '../hooks';

export default function Collection({ items, onSelectProduct, onOpenSizeGuide }) {
  const sectionRef = useScrollReveal(0.1);

  return (
    <section className="collection-section reveal-section" id="collection" ref={sectionRef}>
      <div className="section-header">
        <p className="section-label">The Collection</p>
        <h2 className="section-title">Explore All Colorways</h2>
        <p className="section-desc">
          Five distinctive colors. One iconic silhouette. 
          Tap any card to view detailed specifications and place an order.
        </p>

        {onOpenSizeGuide && (
          <div className="collection-actions-bar">
            <button
              className="collection-size-guide-btn"
              onClick={onOpenSizeGuide}
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              <span>Size Guide & Chart</span>
            </button>
          </div>
        )}
      </div>

      <div className="collection-grid">
        {items.map((item, index) => (
          <div
            className="collection-card"
            key={item.id}
            onClick={() => onSelectProduct && onSelectProduct(item, index)}
          >
            <div className="collection-card-image">
              <img src={item.modelImage} alt={item.name} className="card-img-default" />
              {item.dualImage && (
                <img src={item.dualImage} alt={`${item.name} full outfit`} className="card-img-hover" />
              )}
              <div className="collection-color-indicator">
                <span className="dot" style={{ background: item.hex }} />
                <span>{item.colorName}</span>
              </div>
            </div>
            <div className="collection-card-info">
              <h3 className="collection-card-name">{item.name}</h3>
              <p className="collection-card-price">৳{item.price.toLocaleString()}</p>
            </div>
            <div className="collection-card-overlay">
              <button onClick={(e) => {
                e.stopPropagation();
                if (onSelectProduct) onSelectProduct(item, index);
              }}>
                View Product Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
