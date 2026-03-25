import './LogoCarousel.css';

const logos = [
  { name: 'Pulse', imgSrc: '/icons/brand-logos/pulse.svg' },
  { name: 'Zen Mode', imgSrc: '/icons/brand-logos/zen-mode.svg' },
  { name: 'Core Mass', imgSrc: '/icons/brand-logos/core-mass.svg' },
  { name: 'Storm', imgSrc: '/icons/brand-logos/storm.svg' },
  { name: 'Primal Fuel', imgSrc: '/icons/brand-logos/primal-fuel.svg' },
  { name: 'Revive', imgSrc: '/icons/brand-logos/revive.svg' },
  { name: 'Vital Edge', imgSrc: '/icons/brand-logos/vital-edge.svg' },
];

const duplicatedLogos = [...logos, ...logos];

const LogoCarousel = () => {
  return (
    <section className="carousel-section">
      <div className="carousel-ribbon-wrapper">
        {/* Top Ribbon (moves right to left) */}
        <div className="carousel-ribbon main-ribbon">
          <div className="carousel-track track-forward">
            {duplicatedLogos.map((logo, index) => (
              <div className="carousel-item" key={`forward-logo-${index}`}>
                <img src={logo.imgSrc} alt={logo.name} className="logo-image" />
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Ribbon (moves left to right) */}
        <div className="carousel-ribbon reflection-ribbon" aria-hidden="true">
          <div className="carousel-track track-reverse">
            {duplicatedLogos.map((logo, index) => (
              <div className="carousel-item" key={`reverse-logo-${index}`}>
                <img src={logo.imgSrc} alt={logo.name} className="logo-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
