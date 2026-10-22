import { useEffect } from 'react';

export default function Cart({ open, onClose, items, onRemove, onUpdateQty, onCheckout, total }) {
  // Lock body scroll when cart is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`cart-sidebar ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({items.reduce((s, i) => s + i.qty, 0)})</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-variant">
                      {item.color} / Size {item.size}
                    </span>
                    <span className="cart-item-price">
                      ৳{(item.price * item.qty).toLocaleString()}
                    </span>

                    {/* Quantity Modifier */}
                    <div className="cart-item-qty-control">
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQty && onUpdateQty(index, -1)}
                        title="Decrease"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-qty-num">{item.qty}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQty && onUpdateQty(index, 1)}
                        title="Increase"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(index)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-amount">৳{total.toLocaleString()}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  if (onCheckout) onCheckout();
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
