import { useState } from 'react';

export default function CheckoutModal({ open, onClose, items, total, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    notes: '',
    paymentMethod: 'cod', // 'cod' | 'bkash'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!open) return null;

  const deliveryCharge = formData.city === 'Dhaka' ? 80 : 130;
  const grandTotal = total + (total >= 3000 ? 0 : deliveryCharge);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = 'ME-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      if (onOrderSuccess) onOrderSuccess(generatedId);
    }, 1200);
  };

  const handleClose = () => {
    setOrderComplete(false);
    onClose();
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
              <div className="summary-row">
                <span>Payment Mode:</span>
                <span className="summary-val uppercase">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'bKash / Nagad'}</span>
              </div>
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
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="bkash">bKash / Nagad Mobile Pay</option>
                  </select>
                </div>
              </div>

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

              {/* Order quick overview */}
              <div className="checkout-cost-breakdown">
                <div className="cost-row">
                  <span>Subtotal:</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="cost-row">
                  <span>Delivery Fee:</span>
                  <span>{total >= 3000 ? <strong className="free-tag">FREE</strong> : `৳${deliveryCharge}`}</span>
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
