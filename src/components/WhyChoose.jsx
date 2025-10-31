function WhyChoose() {
  return (
    <section aria-labelledby="why-choose" className="flex flex-col gap-[64px]">
      <h2
        id="why-choose"
        className="bg-[#F7FAFF] text-[32px] lg:text-[48px] uppercase section-title"
      >
        <span className="text-[#000]">Why </span>
        <span className="stroke-title">Choose</span>
        <span className="capitalize text-[#000]"> Core</span>
        <span className="text-red-500">X</span>
        <span className="text-[#000]"> Products</span>
      </h2>
      <div className="bg-[#0d1b2a]">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 max-w-5xl mx-auto text-white text-center py-23 leading-normal ">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-[#F7FAFF] rounded-full flex items-center justify-center mb-4">
              <img
                src="/images/test-tube-icon.svg"
                alt=""
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-[18px] font-montserrat font-bold mb-1">
              Third-Party Certified
            </h3>
            <p className="text-[14px] font-sans">Banned Substance Free</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-[#F7FAFF] rounded-full flex items-center justify-center mb-4">
              <img
                src="/images/chemical-chain-icon.svg"
                alt=""
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-[18px] font-montserrat font-bold mb-1">
              Made with Clean Ingredients
            </h3>
            <p className="text-[14px] font-sans">Banned Substance Free</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-[#F7FAFF] rounded-full flex items-center justify-center mb-4">
              <img src="/images/bicep-icon.svg" alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-[18px] font-montserrat font-bold mb-1">
              Designed For Bodybuilder
            </h3>
            <p className="text-[14px] font-sans">
              150,000* Worldwide Customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
