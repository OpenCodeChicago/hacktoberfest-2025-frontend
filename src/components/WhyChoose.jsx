function WhyChoose() {
  return (
    <section aria-labelledby="why-choose" className="bg-black">
      <h2
        id="why-choose"
        className="bg-white text-4xl lg:text-heading-xxl font-montserrat font-bold leading-none uppercase text-center -tracking-widest py-16"
      >
        Why <span className="text-white text-outline">Choose</span>
        <span className="capitalize"> Core</span>
        <span className="text-red-500 text-outline">X</span> Products
      </h2>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 max-w-5xl mx-auto text-white text-center py-23 leading-normal">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
            <img
              src="/images/test-tube-icon.svg"
              alt=""
              className="w-16 h-16"
            />
          </div>
          <h3 className="text-xl font-montserrat font-bold mb-1">
            Third-Party Certified
          </h3>
          <p className="text-lg font-sans">Banned Substance Free</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
            <img
              src="/images/chemical-chain-icon.svg"
              alt=""
              className="w-16 h-16"
            />
          </div>
          <h3 className="text-xl font-montserrat font-bold mb-1">
            Made with Clean Ingredients
          </h3>
          <p className="text-lg font-sans">Banned Substance Free</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
            <img src="/images/bicep-icon.svg" alt="" className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-montserrat font-bold mb-1">
            Designed For Bodybuilder
          </h3>
          <p className="text-lg font-sans">150,000* Worldwide Customers</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
