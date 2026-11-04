import { useState } from 'react';

const PAYMENT_INFO = {
  bkash: {
    name: 'bKash',
    number: '01727407748',
    type: 'Personal',
    color: '#E2136E',
    instructions: 'Send Money to our bKash personal number and enter the Transaction ID below.',
  },
  nagad: {
    name: 'Nagad',
    number: '01727407748',
    type: 'Personal',
    color: '#F7941D',
    instructions: 'Send Money to our Nagad personal number and enter the Transaction ID below.',
  },
  rocket: {
    name: 'Rocket',
    number: '01628242017',
    type: 'Personal',
    color: '#8C3494',
    instructions: 'Send Money to our Rocket personal number and enter the Transaction ID below.',
  },
};

export default function CheckoutModal({ open, onClose, items, total, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    notes: '',
    paymentMethod: 'cod', // 'cod' | 'bkash' | 'nagad' | 'rocket'
    transactionId: '',
  });
  const [copied, setCopied] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!open) return null;

  const isDigitalPayment = ['bkash', 'nagad', 'rocket'].includes(formData.paymentMethod);
  const activePayment = isDigitalPayment ? PAYMENT_INFO[formData.paymentMethod] : null;

  const deliveryCharge = formData.city === 'Dhaka' ? 80 : 130;
  const discountAmount = appliedPromo ? Math.round(total * appliedPromo.discountPercent) : 0;
  const discountedSubtotal = Math.max(0, total - discountAmount);
  const grandTotal = discountedSubtotal + (discountedSubtotal >= 3000 ? 0 : deliveryCharge);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toLowerCase();

    if (!cleanCode) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (cleanCode === 'mayethics-01') {
      setAppliedPromo({
        code: 'mayethics-01',
        discountPercent: 0.1, // 10% discount
        label: '10% OFF',
      });
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleCopyNumber = (num) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(num);
    } else {
      const el = document.createElement('textarea');
      el.value = num;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDigitalPayment && !formData.transactionId.trim()) {
      alert('Please enter your payment Transaction ID (TrxID)');
      return;
    }
    setIsSubmitting(true);

    const generatedId = 'ME-' + Math.floor(100000 + Math.random() * 900000);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyCV81LAVGpNedA7Pmkq6NaYOnYtjID1pCUQJbFD0qJQNb3k6sJIbeM5ovehSx0JJTBIw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          orderId: generatedId,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          notes: formData.notes,
          paymentMethod: getPaymentLabel(formData.paymentMethod),
          transactionId: formData.transactionId,
          items: items,
          total: grandTotal,
        }),
      });
    } catch (err) {
      console.error('Failed to post order to Google Sheets:', err);
    }

    setOrderId(generatedId);
    setIsSubmitting(false);
    setOrderComplete(true);
    if (onOrderSuccess) onOrderSuccess(generatedId);
  };

  const handleClose = () => {
    setOrderComplete(false);
    onClose();
  };

  const getPaymentLabel = (method) => {
    switch (method) {
      case 'bkash': return 'bKash';
      case 'nagad': return 'Nagad';
      case 'rocket': return 'Rocket';
      default: return 'Cash on Delivery';
    }
  };

  return (
    <div className="checkout-modal-backdrop" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-modal-close" onClick={handleClose}>✕</button>

        {orderComplete ? (
          <div className="checkout-success-view">
            <div className="checkout-success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-id-badge">Order ID: <span>{orderId}</span></p>
            <p className="order-success-desc">
              Thank you for ordering with <strong>MayEthics</strong>. We have received your order 
              and our support team will contact you shortly on <strong>{formData.phone}</strong> for confirmation.
            </p>

            <div className="order-summary-box">
              <div className="summary-row">
                <span>Items Ordered:</span>
                <span>{items.reduce((s, i) => s + i.qty, 0)} pcs</span>
              </div>

              {/* Ordered Items Details (Color & Size) */}
              <div className="checkout-items-list">
                {items.map((item, idx) => (
                  <div key={idx} className="checkout-item-mini">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="checkout-item-img" />
                    )}
                    <div className="checkout-item-info">
                      <span className="checkout-item-title">{item.name}</span>
                      <div className="checkout-item-badges">
                        <span className="checkout-badge-pill">Color: <strong>{item.color}</strong></span>
                        <span className="checkout-badge-pill">Size: <strong>{item.size}</strong></span>
                        <span className="checkout-badge-pill">Qty: <strong>{item.qty}</strong></span>
                      </div>
                    </div>
                    <span className="checkout-item-price">৳{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="summary-row">
                <span>Payment Mode:</span>
                <span className="summary-val uppercase">{getPaymentLabel(formData.paymentMethod)}</span>
              </div>
              {appliedPromo && (
                <div className="summary-row">
                  <span>Promo Code Applied:</span>
                  <span className="summary-val font-mono uppercase">{appliedPromo.code} (-৳{discountAmount.toLocaleString()})</span>
                </div>
              )}
              {isDigitalPayment && formData.transactionId && (
                <div className="summary-row">
                  <span>Transaction ID:</span>
                  <span className="summary-val font-mono">{formData.transactionId.toUpperCase()}</span>
                </div>
              )}
              <div className="summary-row total-row">
                <span>Total Amount:</span>
                <span className="total-accent">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button className="btn-primary success-done-btn" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="checkout-form-view">
            <div className="checkout-header">
              <h2>Checkout</h2>
              <p>Complete your delivery details to place the order.</p>
            </div>

            {/* Selected Items preview with Color & Size */}
            {items && items.length > 0 && (
              <div className="checkout-order-items-box">
                <div className="checkout-order-items-header">
                  <span>Your Order ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                </div>
                <div className="checkout-items-list">
                  {items.map((item, idx) => (
                    <div key={idx} className="checkout-item-mini">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="checkout-item-img" />
                      )}
                      <div className="checkout-item-info">
                        <span className="checkout-item-title">{item.name}</span>
                        <div className="checkout-item-badges">
                          <span className="checkout-badge-pill">
                            Color: <strong>{item.color}</strong>
                          </span>
                          <span className="checkout-badge-pill">
                            Size: <strong>{item.size}</strong>
                          </span>
                          <span className="checkout-badge-pill">
                            Qty: <strong>{item.qty}</strong>
                          </span>
                        </div>
                      </div>
                      <span className="checkout-item-price">
                        ৳{(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number (11 Digits) *</label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  pattern="[0-9]{11}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Delivery Area *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="Dhaka">Inside Dhaka (৳80)</option>
                    <option value="Outside Dhaka">Outside Dhaka (৳130)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Payment Method *</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => {
                      setFormData({ ...formData, paymentMethod: e.target.value, transactionId: '' });
                      setCopied(false);
                    }}
                  >
                    <option value="cod">Cash on Delivery (COD)</option>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="rocket">Rocket</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Payment Method Box with Copy & TrxID Input */}
              {isDigitalPayment && activePayment && (
                <div className="payment-guide-box">
                  <div className="payment-guide-header">
                    <span className="payment-badge" style={{ backgroundColor: activePayment.color }}>
                      {activePayment.name}
                    </span>
                    <span className="payment-guide-note">{activePayment.instructions}</span>
                  </div>

                  <div className="payment-number-card">
                    <div className="payment-number-info">
                      <span className="payment-number-label">{activePayment.name} {activePayment.type} Number:</span>
                      <strong className="payment-number-val">{activePayment.number}</strong>
                    </div>
                    <button
                      type="button"
                      className={`copy-num-btn ${copied ? 'copied' : ''}`}
                      onClick={() => handleCopyNumber(activePayment.number)}
                    >
                      {copied ? '✓ Copied' : 'Copy Number'}
                    </button>
                  </div>

                  <div className="form-group trx-input-group">
                    <label>Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9J38A1K2PZ"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    />
                    <small className="trx-hint">
                      Send <strong>৳{grandTotal.toLocaleString()}</strong> to the number above and paste the transaction ID here.
                    </small>
                  </div>
                </div>
              )}

              {/* Full Delivery Address */}
              <div className="form-group">
                <label>Full Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House no, Road no, Area, Thana, District"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              {/* Promo Code Section */}
              <div className="promo-section">
                <label>Have a Promo Code?</label>
                {appliedPromo ? (
                  <div className="promo-applied-badge">
                    <div className="promo-applied-info">
                      <span className="promo-applied-tag">✓ {appliedPromo.code.toUpperCase()}</span>
                      <span className="promo-applied-text">({appliedPromo.label} applied)</span>
                    </div>
                    <button
                      type="button"
                      className="promo-remove-btn"
                      onClick={handleRemovePromo}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="promo-input-row">
                    <input
                      type="text"
                      placeholder="e.g. mayethics-01"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError('');
                      }}
                      className="promo-input"
                    />
                    <button
                      type="button"
                      className="promo-apply-btn"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && <p className="promo-error-msg">{promoError}</p>}
              </div>

              {/* Order quick overview */}
              <div className="checkout-cost-breakdown">
                <div className="cost-row">
                  <span>Subtotal:</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                {appliedPromo && (
                  <div className="cost-row discount-row">
                    <span>Promo Discount ({appliedPromo.label}):</span>
                    <span className="discount-val">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="cost-row">
                  <span>Delivery Fee:</span>
                  <span>{discountedSubtotal >= 3000 ? <strong className="free-tag">FREE</strong> : `৳${deliveryCharge}`}</span>
                </div>
                <div className="cost-row grand-total">
                  <span>Total Payable:</span>
                  <span className="payable-num">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" className="place-order-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing Order...' : `Confirm Order — ৳${grandTotal.toLocaleString()}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
