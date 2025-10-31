// src/components/CoreProductCard.jsx (Alternative Version)

const CoreProductCard = ({ product }) => {
  const productData = {
    badge: product.badge || '40% OFF',
    rating: product.rating || 4.5,
    reviewsCount: product.reviewsCount || 303,
    price: product.price || 44.99,
    name: product.name || 'COREX - INTRA-WORKOUT',
    flavors: product.flavors || ['Wild Berry Punch', 'Chocolate'],
    availableFlavors: product.availableFlavors || 2,
    image: product.image || '/images/product-default-image.jpg',
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      if (starValue <= Math.floor(rating)) {
        return (
          <span key={index} className="text-yellow-400 md:text-lg">
            ★
          </span>
        );
      } else if (starValue === Math.ceil(rating) && rating % 1 !== 0) {
        return (
          <span key={index} className="text-yellow-400 md:text-lg">
            ★
          </span>
        );
      } else {
        return (
          <span key={index} className="text-gray-300 md:text-lg">
            ★
          </span>
        );
      }
    });
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-full max-w-[350px] mx-auto group">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={productData.image}
          alt={productData.name}
          className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/images/placeholder-product.jpg';
          }}
        />

        {/* Badge */}
        <div className="absolute top-0 right-3">
          <span
            className="bg-[#0157B8] text-white text-xs px-3 py-1.5 shadow-lg"
            style={{}}
          >
            {productData.badge}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 md:p-6">
        {/* Rating Row */}
        <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
          <div className="flex items-center justify-between gap-0.5">
            {renderStars(productData.rating)}
            <span className="text-xs sm:text-sm md:text-base text-[#171717] font-medium whitespace-nowrap font-poppins">
              {productData.reviewsCount} reviews
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xs sm:text-sm md:text-base font-medium text-[#171717] font-poppins">
              ${productData.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-base sm:text-lg md:text-xl font-medium text-[#171717] uppercase tracking-tight font-inter mb-4 md:mb-5 leading-tight">
          {productData.name}
        </h3>

        {/* Flavor Section */}
        <div className="mb-5 md:mb-6">
          <p className="text-sm md:text-base text-[#0056B8] mb-3 md:mb-4 font-poppins font-normal">
            Available in flavors: {productData.availableFlavors}
          </p>
          <div className="flex flex-col gap-1.5">
            {productData.flavors.map((flavor, index) => (
              <div
                key={index}
                className="text-xs md:text-sm px-2.5 py-1.5 rounded-md border border-[#DDDDDD] bg-[#EFEFEF] text-[#171717] font-normal font-poppins"
              >
                {flavor}
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-[#023E8A] text-white font-inter py-2 px-4 rounded-lg font-normal active:scale-95 transition-all duration-200 tracking-wide text-sm md:text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-gray-900 focus:ring-offset-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CoreProductCard;
