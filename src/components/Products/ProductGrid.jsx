import ProductCard from './ProductCard';

export default function ProductGrid({ products, lastProductElementRef }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {products.map((product, index) => {
        // Attach ref to the last product for infinite scroll
        const isLastProduct = index === products.length - 1;
        
        return (
          <ProductCard 
            key={product.id || product._id || `product-${Math.random()}`} 
            product={product}
            ref={isLastProduct && lastProductElementRef ? lastProductElementRef : null}
          />
        );
      })}
    </div>
  );
}