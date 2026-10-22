export default function Marquee() {
  const items = [
    'Premium Quality', 'Ethical Fashion', 'Streetwear Culture',
    'Limited Edition', 'Handcrafted Details', 'Modern Aesthetics',
    'Sustainable Fabric', 'Bold Expression',
  ];

  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </section>
  );
}
