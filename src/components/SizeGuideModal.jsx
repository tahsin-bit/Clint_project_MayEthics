export default function SizeGuideModal({ open, onClose }) {
  if (!open) return null;

  const sizeChart = [
    { size: 'S', chest: '38" - 40"', length: '27"', shoulder: '20"', sleeve: '23.5"' },
    { size: 'M', chest: '40" - 42"', length: '28"', shoulder: '21"', sleeve: '24.0"' },
    { size: 'L', chest: '42" - 44"', length: '29"', shoulder: '22"', sleeve: '24.5"' },
    { size: 'XL', chest: '44" - 46"', length: '30"', shoulder: '23"', sleeve: '25.0"' },
    { size: 'XXL', chest: '46" - 48"', length: '31"', shoulder: '24"', sleeve: '25.5"' },
  ];

  return (
    <div className="checkout-modal-backdrop" onClick={onClose}>
      <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="size-guide-header">
          <span className="size-guide-tag">Specification & Sizing</span>
          <h2>Size Chart</h2>
          <p>
            MayEthics heavyweight sweatshirts are cut in an intentional relaxed streetwear silhouette with dropped shoulders. Measurements are in inches.
          </p>
        </div>

        <div className="size-guide-table-wrap">
          <table className="size-guide-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (Round)</th>
                <th>Body Length</th>
                <th>Shoulder</th>
                <th>Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size}>
                  <td className="size-col-cell"><strong>{row.size}</strong></td>
                  <td>{row.chest}</td>
                  <td>{row.length}</td>
                  <td>{row.shoulder}</td>
                  <td>{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="size-guide-tips">
          <div className="tip-card">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              Measurement Advice
            </h4>
            <p>Measure around the fullest part of your chest with a soft measuring tape held parallel to the ground.</p>
          </div>
          <div className="tip-card">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
              </svg>
              Silhouette & Fit
            </h4>
            <p>Select your true standard size for our intended relaxed oversized drape. Size down if you prefer a standard tailored fit.</p>
          </div>
        </div>

        <div className="size-guide-actions">
          <button className="btn-primary size-guide-done-btn" onClick={onClose}>
            Close Size Guide
          </button>
        </div>
      </div>
    </div>
  );
}

