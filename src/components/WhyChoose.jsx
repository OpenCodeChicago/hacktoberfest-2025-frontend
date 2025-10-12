function WhyChoose() {
  // Why us section data
  const WhyUs = [
    {
      img: "/images/test-tube-icon.svg",
      alt: "Test Tube Icon",
      title: "Third-Party Certified",
      description: "Banned Substance Free"
    },
    {
      img: "/images/chemical-chain-icon.svg",
      alt: "Chemical Chain Icon",
      title: "Made with Clean Ingredients",
      description: "Banned Substance Free"
    },
    {
      img: "/images/bicep-icon.svg",
      alt: "Bicep Icon",
      title: "Designed For Bodybuilder",
      description: "150,000* Worldwide Customers"
    },
  ];

  return (
    <section aria-labelledby="why-choose" className="bg-black">
      <h2
        id="why-choose"
        className="bg-white text-4xl lg:text-heading-xxl uppercase py-16 section-title"
      >
        <span className="text-[#000]">Why </span><span>Choose</span>
        <span className="capitalize text-[#000]"> Core</span>
        <span className="text-red-500">X</span><span className="text-[#000]"> Products</span>
      </h2>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 max-w-5xl mx-auto text-white text-center py-23 leading-normal">
        {WhyUs.map((item, index) => (
          <div className="flex flex-col items-center space-y-2" key={index}>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <img
                src={item.img}
                alt={item.alt}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-xl font-montserrat font-bold mb-1">{item.title}</h3>
            <p className="text-lg font-sans">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;
