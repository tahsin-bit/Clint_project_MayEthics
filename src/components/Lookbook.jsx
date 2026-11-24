import { useScrollReveal } from '../hooks';

export default function Lookbook() {
  const sectionRef = useScrollReveal(0.05);

  const images = [
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM2.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM3.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM5.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM11.jpeg',
  ];

  // Repeat for smooth infinite marquee animation
  const row1Images = [...images, ...images];
  const row2Images = [
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM2.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM5.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM11.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM3.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM2.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM5.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM11.jpeg',
    '/images/WhatsApp Image 2026-11-24 at 8.03.51 PM3.jpeg',
  ];

  return (
    <section className="lookbook-section reveal-section" id="lookbook" ref={sectionRef}>
      <div className="section-header" style={{ padding: `0 var(--container-padding)`, marginBottom: 60 }}>
        <p className="section-label">Lookbook</p>
        <h2 className="section-title">Street Style Gallery</h2>
      </div>

      <div className="lookbook-row">
        {row1Images.map((img, i) => (
          <div className="lookbook-image" key={`r1-${i}`}>
            <img src={img} alt={`Lookbook ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="lookbook-row">
        {row2Images.map((img, i) => (
          <div className="lookbook-image" key={`r2-${i}`}>
            <img src={img} alt={`Lookbook ${i + 6}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
