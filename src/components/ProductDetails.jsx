import PropTypes from 'prop-types';

// Static icons for quality section (fixed visuals, dynamic labels)
const ICONS = [
  { src: '/images/no-flavors.svg', alt: 'No Artificial Flavors' },
  { src: '/images/non-gmo.svg', alt: 'Non GMO' },
  { src: '/images/gluten-free.svg', alt: 'Gluten Free' },
];

// Static banner image (shared across products)
const PRODUCT_IMAGE = '/images/products_banner.svg';

export default function ProductDetails({ product }) {
  const title =
    product?.detailsTitle ||
    product?.title ||
    product?.name ||
    'CoreX Whey Protein: Quality Assured';

  // Defensive normalization
  const qualities = Array.isArray(product?.quality) ? product.quality : [];

  const usage = product?.usageTips || {
    when: 'Best used post-workout for muscle recovery or anytime during the day to support lean muscle growth.',
    blend:
      'Mix one scoop into 6-10oz of water, milk, or your favorite beverage. Blend with fruits or nut butters for added flavor and nutrition.',
    pairWith:
      'Pair with CoreX Creatine for enhanced endurance, strength, and recovery.',
  };

  return (
    <section className="w-full py-12">
      {/* Section Title */}
      <h2 className="text-center text-[#010409] text-2xl md:text-3xl font-bold font-montserrat mb-10">
        {title}
      </h2>

      {/* Quality Icons with Dynamic Labels */}
      <div className="flex flex-col sm:flex-row justify-center items-center md:gap-48 gap-20 my-16">
        {qualities.map((label, idx) => {
          const icon = ICONS[idx % ICONS.length]; // rotate icons safely
          return (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="flex items-center justify-center">
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-base font-semibold text-[#010409] font-montserrat uppercase">
                {label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Banner & Usage Tips (Full-width, no background) */}
      <div className="w-full grid md:grid-cols-2 gap-10 items-center px-4 md:px-8">
        {/* Left - Product Image */}
        <div className="flex justify-center">
          <img
            src={PRODUCT_IMAGE}
            alt={`${product?.name || 'Product'} banner`}
            className="w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Right - Usage Tips */}
        <div className="text-[#171717]">
          <h3 className="text-xl md:text-2xl font-bold mb-6">
            {product?.name?.toUpperCase() || 'COREX PRODUCT'}: USAGE TIPS
          </h3>
          <ul className="space-y-4 leading-relaxed">
            <li>
              <strong>When:</strong> {usage.when}
            </li>
            <li>
              <strong>Blend:</strong> {usage.blend}
            </li>
            <li>
              <strong>Pair With:</strong> {usage.pairWith}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    detailsTitle: PropTypes.string,
    quality: PropTypes.arrayOf(PropTypes.string),
    usageTips: PropTypes.shape({
      when: PropTypes.string,
      blend: PropTypes.string,
      pairWith: PropTypes.string,
    }),
  }),
};
