import ProductCard from './ProductCard';
import { isInWishlist } from '../../utils/wishlist';

export default function ProductGrid({ products, lastProductElementRef }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => {
        // Attach ref to the last product for infinite scroll
        const isLastProduct = index === products.length - 1;

        return (
          <ProductCard
            key={product.id || product._id || index}
            product={product}
            ref={
              isLastProduct && lastProductElementRef
                ? lastProductElementRef
                : null
            }
            isWishlisted={isInWishlist(product.id || product._id)}
          />
        );
      })}
    </div>
  );
}
