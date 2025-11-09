import ProductList from '../../components/Products/ProductList';
import allProductsBanner from '/images/all-products-banner.jpg';
import allProductsBannerWebP from '/images/all-products-banner.webp';
import allProductsBannerMobile from '/images/all-products-banner-mobile.jpg';
import allProductsBannerMobileWebP from '/images/all-products-banner-mobile.webp';

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
      bannerImageWebP={allProductsBannerWebP}
      bannerImageMobile={allProductsBannerMobile}
      bannerImageMobileWebP={allProductsBannerMobileWebP}
      bannerAlt="All products banner"
    />
  );
}
