import './LogoCarousel.css';

const LogoCarousel = () => {
  const logos = [
    { name: 'Pulse', imgSrc: '/images/brand-logos/pulse.svg' },
    { name: 'Zen Mode', imgSrc: '/images/brand-logos/zen-mode.svg' },
    { name: 'Core Mass', imgSrc: '/images/brand-logos/core-mass.svg' },
    { name: 'Storm', imgSrc: '/images/brand-logos/storm.svg' },
    { name: 'Primal Fuel', imgSrc: '/images/brand-logos/primal-fuel.svg' },
    { name: 'Revive', imgSrc: '/images/brand-logos/revive.svg' },
    { name: 'Vital Edge', imgSrc: '/images/brand-logos/vital-edge.svg' },
  ];

  const duplicatedLogos = [...logos, ...logos];


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
        <div className="carousel-ribbon reflection-ribbon">
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

