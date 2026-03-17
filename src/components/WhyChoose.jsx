const features = [
  {
    id: 1,
    icon: '/images/test-tube-icon.svg',
    title: 'Third-Party Certified',
    description: 'Banned Substance Free',
  },
  {
    id: 2,
    icon: '/images/chemical-chain-icon.svg',
    title: 'Made with Clean Ingredients',
    description: 'No Artificial Additives',
  },
  {
    id: 3,
    icon: '/images/bicep-icon.svg',
    title: 'Designed For Bodybuilder',
    description: '150,000* Worldwide Customers',
  },
];

function WhyChoose() {
  return (
    <section aria-labelledby="why-choose" className="flex flex-col gap-[64px]">
      <h2
        id="why-choose"
        className="bg-[#F7FAFF] text-[32px] lg:text-[48px] uppercase section-title px-5 md:px-0"
      >
        <span className="text-[#000]">Why </span>
        <span className="stroke-title">Choose</span>
        <span className="capitalize text-[#000]"> Core</span>
        <span className="text-red-500">X</span>
        <span className="text-[#000]"> Products</span>
      </h2>
      <div className="bg-[#0d1b2a]">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 max-w-5xl mx-auto text-white text-center py-23 leading-normal">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-20 h-20 bg-[#F7FAFF] rounded-full flex items-center justify-center mb-4 select-none">
                <img src={feature.icon} alt="" className="w-16 h-16" />
              </div>
              <h3 className="text-[18px] font-montserrat font-bold mb-1 selection:bg-sky-500">
                {feature.title}
              </h3>
              <p className="text-[14px] font-sans selection:bg-sky-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
