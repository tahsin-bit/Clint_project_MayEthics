export default function Hero() {
  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* Background Video */}
      <div className="hero-video-container">
        <video
          className="hero-bg-video"
          src="/images/Video Project.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-bg-gradient" />
      <div className="hero-noise" />

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line">
            <span className="line-inner">Redefine</span>
          </span>
          <span className="line">
            <span className="line-inner">Your <span className="accent">Street</span></span>
          </span>
          <span className="line">
            <span className="line-inner">Identity</span>
          </span>
        </h1>

        <p className="hero-subtitle">
          Ethically crafted premium streetwear. Each piece tells a story 
          of craftsmanship, sustainability, and unapologetic self-expression.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToCollection}>
            Shop Collection
          </button>
          <button className="btn-secondary" onClick={scrollToCollection}>
            Explore Styles
          </button>
        </div>
      </div>
    </section>
  );
}
