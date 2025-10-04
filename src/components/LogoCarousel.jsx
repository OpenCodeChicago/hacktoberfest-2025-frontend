import './LogoCarousel.css';

const LogoCarousel = () => {
  const logos = [
    { name: 'Pulse', imgSrc: '/images/brand-logos/pulse.png' },
    { name: 'Zen Mode', imgSrc: '/images/brand-logos/zen-mode.png' },
    { name: 'Core Mass', imgSrc: '/images/brand-logos/core-mass.png' },
    { name: 'Storm', imgSrc: '/images/brand-logos/storm.png' },
    { name: 'Primal Fuel', imgSrc: '/images/brand-logos/primal-fuel.png' },
    { name: 'Revive', imgSrc: '/images/brand-logos/revive.png' },
    { name: 'Vital Edge', imgSrc: '/images/brand-logos/vital-edge.png' },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="carousel-section">
  <div className="carousel-container">
    <div className="carousel-ribbon-wrapper">
      {/* Main Ribbon */}
      <div className="carousel-ribbon main-ribbon">
        <div className="carousel-track">
          {duplicatedLogos.map((logo, index) => (
            <div className="carousel-item" key={`main-logo-${index}`}>
              <img src={logo.imgSrc} alt={logo.name} className="logo-image" />
            </div>
          ))}
        </div>
      </div>
      {/* Reflection Ribbon */}
      <div className="carousel-ribbon reflection-ribbon">
        <div className="carousel-track">
          {duplicatedLogos.map((logo, index) => (
            <div className="carousel-item" key={`reflected-logo-${index}`}>
              <img src={logo.imgSrc} alt={logo.name} className="logo-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default LogoCarousel;
