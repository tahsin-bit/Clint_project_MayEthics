import { useScrollReveal } from '../hooks';

export default function Features() {
  const sectionRef = useScrollReveal(0.1);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      ),
      title: 'Ethically Made',
      desc: 'Every piece is crafted with care, ensuring fair wages and sustainable practices throughout our supply chain.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Premium Fabrics',
      desc: '400GSM heavyweight cotton blend. Brushed interior for unmatched comfort. Built to last through every season.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
      title: 'Bangladesh-Wide Shipping',
      desc: 'Fast & reliable doorstep delivery across all 64 districts in Bangladesh. Free delivery on orders above ৳3000.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 014-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 01-4 4H3" />
        </svg>
      ),
      title: '7-Day Returns',
      desc: 'Not the perfect fit? Return within 7 days for a full refund or exchange. No questions asked, hassle-free.',
    },
  ];

  return (
    <section className="features-section reveal-section" id="about" ref={sectionRef}>
      <div className="section-header" style={{ marginBottom: 60 }}>
        <p className="section-label">Why MayEthics</p>
        <h2 className="section-title">Built Different</h2>
      </div>
      <div className="features-grid">
        {features.map((feature, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
