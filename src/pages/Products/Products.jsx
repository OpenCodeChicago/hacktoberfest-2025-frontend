import ProductList from '../../components/Products/ProductList';
import allProductsBanner from '/images/all-products-banner.jpg';

export default function Products() {
  return (
    <ProductList
      title="All Products"
      seo={{
        title: 'All Products | CoreX Nutrition',
        description:
          'Browse our complete collection of premium sports nutrition supplements and fitness products. Find the perfect supplements to support your fitness goals.',
        keywords:
          'sports nutrition, supplements, protein powder, pre-workout, fitness products, CoreX Nutrition',
      }}
      bannerImage={allProductsBanner}
      bannerAlt="All products banner"
    />
  );
}
