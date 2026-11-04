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
    advanceMethod: 'bkash', // 'bkash' | 'nagad' | 'rocket' (used for advance fee outside dhaka)
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

  const isOutsideDhaka = formData.city === 'Outside Dhaka';
  const isFullDigitalPayment = ['bkash', 'nagad', 'rocket'].includes(formData.paymentMethod);
  const isCodWithAdvance = isOutsideDhaka && formData.paymentMethod === 'cod';

  // Transaction ID is STRICTLY required if:
  // 1. Outside Dhaka (either COD advance fee OR full digital payment)
  // 2. Inside Dhaka with digital payment (bKash / Nagad / Rocket)
  const isTrxIdRequired = isOutsideDhaka || isFullDigitalPayment;

  // Which payment number/instructions to show
  const activeMethodKey = isFullDigitalPayment ? formData.paymentMethod : (isCodWithAdvance ? formData.advanceMethod : null);
  const activePayment = activeMethodKey ? PAYMENT_INFO[activeMethodKey] : null;

  const deliveryCharge = formData.city === 'Dhaka' ? 80 : 130;
  const discountAmount = appliedPromo ? Math.round(total * appliedPromo.discountPercent) : 0;
  const discountedSubtotal = Math.max(0, total - discountAmount);
  const grandTotal = discountedSubtotal + (discountedSubtotal >= 3000 ? 0 : deliveryCharge);

  // If outside Dhaka & COD, customer pays 130 BDT in advance, remaining on delivery
  const advanceRequiredAmount = isCodWithAdvance ? 130 : 0;
  const dueOnDelivery = isCodWithAdvance ? Math.max(0, grandTotal - 130) : 0;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toLowerCase();

    if (!cleanCode) {
      setPromoError('Please enter a promo code');
      return;
    }

    // Promo codes: mayethics20, mayethics30, mayethics40 -> all give 20% DISCOUNT
    const valid20PercentCodes = ['mayethics20', 'mayethics30', 'mayethics40'];

    if (valid20PercentCodes.includes(cleanCode)) {
      setAppliedPromo({
        code: cleanCode,
        discountPercent: 0.20, // 20% discount
        label: '20% OFF',
      });
      setPromoError('');
    } else if (cleanCode === 'mayethics-01') {
      setAppliedPromo({
        code: 'mayethics-01',
        discountPercent: 0.10, // 10% discount
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

    // Check mandatory Transaction ID
    if (isTrxIdRequired && !formData.transactionId.trim()) {
      if (isCodWithAdvance) {
        alert('ঢাকার বাইরে ডেলিভারি চার্জ ১৩০ টাকা অগ্রিম পরিশোধের Transaction ID (TrxID) দেওয়া বাধ্যতামূলক। TrxID না দিলে অর্ডার কনফার্ম করা যাবে না।');
      } else {
        alert(`পেমেন্ট নিশ্চিত করতে আপনার ${getPaymentLabel(formData.paymentMethod)} Transaction ID (TrxID) দিন। TrxID না দিলে অর্ডার সম্পন্ন হবে না।`);
      }
      return;
    }

    setIsSubmitting(true);

    const generatedId = 'ME-' + Math.floor(100000 + Math.random() * 900000);

    const paymentLabel = isCodWithAdvance
      ? `COD (Advance Paid ৳130 via ${PAYMENT_INFO[formData.advanceMethod]?.name}, Due on Delivery: ৳${dueOnDelivery})`
      : getPaymentLabel(formData.paymentMethod);

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
          paymentMethod: paymentLabel,
          transactionId: formData.transactionId || 'N/A',
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
                <span className="summary-val uppercase">
                  {isCodWithAdvance ? `COD (Advance ৳130 Paid via ${PAYMENT_INFO[formData.advanceMethod]?.name})` : getPaymentLabel(formData.paymentMethod)}
                </span>
              </div>
              {appliedPromo && (
                <div className="summary-row">
                  <span>Promo Code Applied:</span>
                  <span className="summary-val font-mono uppercase">{appliedPromo.code} (-৳{discountAmount.toLocaleString()})</span>
                </div>
              )}
              {(isFullDigitalPayment || isCodWithAdvance) && formData.transactionId && (
                <div className="summary-row">
                  <span>Transaction ID:</span>
                  <span className="summary-val font-mono">{formData.transactionId.toUpperCase()}</span>
                </div>
              )}
              {isCodWithAdvance && (
                <div className="summary-row">
                  <span>Remaining Due on Delivery:</span>
                  <span className="summary-val font-bold">৳{dueOnDelivery.toLocaleString()}</span>
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
                    <option value="Dhaka">Inside Dhaka (৳80 Delivery)</option>
                    <option value="Outside Dhaka">Outside Dhaka (৳130 Delivery)</option>
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
                    <option value="bkash">bKash (Full Payment)</option>
                    <option value="nagad">Nagad (Full Payment)</option>
                    <option value="rocket">Rocket (Full Payment)</option>
                  </select>
                </div>
              </div>

              {/* OUTSIDE DHAKA COD NOTICE & ADVANCE PAYMENT BOX */}
              {isCodWithAdvance && (
                <div className="advance-notice-box">
                  <div className="advance-notice-header">
                    <span className="advance-notice-badge">Policy</span>
                    <h4>Outside Dhaka Advance Delivery Fee</h4>
                  </div>
                  <p className="advance-notice-desc">
                    To prevent unverified shipments, delivery charge of <strong>৳130</strong> is required in advance. The remaining <strong>৳{dueOnDelivery.toLocaleString()}</strong> will be paid via Cash on Delivery upon arrival.
                  </p>

                  <div className="advance-select-row">
                    <label>Select Advance Payment Channel:</label>
                    <div className="advance-method-selector">
                      {['bkash', 'nagad', 'rocket'].map((method) => {
                        const isSelected = formData.advanceMethod === method;
                        return (
                          <div
                            key={method}
                            className={`advance-channel-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, advanceMethod: method, transactionId: '' })}
                          >
                            <div className="channel-radio">
                              <span className={`channel-radio-circle ${isSelected ? 'checked' : ''}`} />
                            </div>
                            <div className="channel-info">
                              <span className="channel-name">{PAYMENT_INFO[method].name}</span>
                              <span className="channel-sub">{PAYMENT_INFO[method].type}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Payment Method Box with Copy & TrxID Input (For Full Digital Payment OR Outside Dhaka COD Advance) */}
              {(isFullDigitalPayment || isCodWithAdvance) && activePayment && (
                <div className="payment-guide-box">
                  <div className="payment-guide-header">
                    <span className="payment-badge" style={{ backgroundColor: activePayment.color }}>
                      {activePayment.name}
                    </span>
                    <span className="payment-guide-note">
                      {isCodWithAdvance 
                        ? `Send advance delivery fee of ৳130 to our personal ${activePayment.name} number:`
                        : activePayment.instructions}
                    </span>
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
                    <label>
                      {isCodWithAdvance ? 'Advance Payment Transaction ID (TrxID) *' : 'Transaction ID (TrxID) *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9J38A1K2PZ"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    />
                    <small className="trx-hint">
                      {isCodWithAdvance ? (
                        <>
                          Send <strong>৳130</strong> advance to the number above and enter TrxID. Remaining <strong>৳{dueOnDelivery.toLocaleString()}</strong> is payable upon delivery.
                        </>
                      ) : (
                        <>
                          Send <strong>৳{grandTotal.toLocaleString()}</strong> to the number above and paste the transaction ID here.
                        </>
                      )}
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
                      placeholder="Enter promo code"
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
                {isCodWithAdvance && (
                  <div className="cost-row advance-breakdown-row">
                    <span>Advance Delivery Charge:</span>
                    <span className="advance-num">৳130 (Paid via {PAYMENT_INFO[formData.advanceMethod]?.name})</span>
                  </div>
                )}
                {isCodWithAdvance && (
                  <div className="cost-row due-breakdown-row">
                    <span>Cash on Delivery Due:</span>
                    <span className="due-num">৳{dueOnDelivery.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="place-order-btn" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Processing Order...'
                  : isCodWithAdvance
                  ? `Confirm Order (Pay ৳130 Now, ৳${dueOnDelivery.toLocaleString()} on Delivery)`
                  : `Confirm Order — ৳${grandTotal.toLocaleString()}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
