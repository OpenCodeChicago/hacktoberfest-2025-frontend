import ReviewsSection from '../../components/ReviewsSection';
import BestOfCoreX from '../../components/BestOfCoreX/BestOfCoreX';
import FeaturedProductImage from '../../components/NewProductsBanner/NewProductsBanner';
import {
  CollectionSection,
  HeroSection,
  LogoCarousel,
  SEO,
  WhyChoose,
  SupplementForGoalsSection,
} from '../../components';

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-2 bg-blue-600 text-white z-50"
      >
        Skip to main content
      </a>

      <SEO
        title="Hacktoberfest 2025 | CoreX Nutrition"
        description="Join CoreX Nutrition's Hacktoberfest 2025! Explore contributions, projects, and participate in the event."
        keywords="Hacktoberfest 2025, CoreX Nutrition, Open Source, Contributions"
      />

      <main
        id="main-content"
        className="min-h-screen bg-[#F7FAFF] -mt-16 pt-16 flex flex-col gap-[96px]"
      >
        <HeroSection />
        <WhyChoose />
        <SupplementForGoalsSection />
        <LogoCarousel />
        <BestOfCoreX />
        <FeaturedProductImage
          imageUrl="/images/promo-banner.jpg"
          imageMobileUrl="/images/promo-banner-mobile.jpg"
          productId="690b8692a60e83c734939790"
          alt="Featured Product - CoreX Premium Isolate"
        />
        <CollectionSection />
        <ReviewsSection />
      </main>
    </>
  );
}
