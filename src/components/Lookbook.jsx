import { useScrollReveal } from '../hooks';

export default function Lookbook() {
  const sectionRef = useScrollReveal(0.05);

  const row1Images = [
    '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
    '/images/Minimal_Charcoal_Sweatshirt_Lookbook-removebg-preview.png',
    '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
    '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
    '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
    // Duplicate for seamless loop
    '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
    '/images/Minimal_Charcoal_Sweatshirt_Lookbook-removebg-preview.png',
    '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
    '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
    '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
  ];

  const row2Images = [
    '/images/Dual-View_Charcoal_Streetwear_Outfit-removebg-preview.png',
    '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
    '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
    '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
    '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
    // Duplicate for seamless loop
    '/images/Dual-View_Charcoal_Streetwear_Outfit-removebg-preview.png',
    '/images/Front_and_Back_Streetwear_Lookbook-removebg-preview.png',
    '/images/Sky-Blue_Sweatshirt_Front_and_Back_View-removebg-preview.png',
    '/images/Burgundy_Streetwear_Front_and_Back_Views-removebg-preview.png',
    '/images/Cream_Sweatshirt_Cargo_Lookbook_Views-removebg-preview.png',
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
