import { useEffect, useState } from 'react';

export default function Loader({ loading, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div className={`loader-overlay ${!loading ? 'hidden' : ''}`}>
      <img
        src="/images/MayEthics_LoGo__2_-removebg-preview.png"
        alt="MayEthics"
        className="loader-logo"
      />
      <div className="loader-bar-track">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
