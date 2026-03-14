import {
  heroJoin,
  heroCorex,
  heroUnlock,
  heroSales,
  heroCorexMob640,
  heroCorex1080,
  heroCorex1920,
  heroSalesMob640,
  heroSales1080,
  heroSales1920,
  heroUnlockMob640,
  heroUnlock1080,
  heroUnlock1920,
  heroJoinMob640,
  heroJoin1080,
  heroJoin1920,
} from '../../assets';

const heroSlides = [
  {
    id: 'corex',
    mobile: heroCorexMob640,
    srcSet: `${heroCorex1080} 1080w, ${heroCorex1920} 1920w`,
    fallback: heroCorex,
    buttonLabel: 'Shop Now',
    to: '/products',
    alt: 'CoreX Nutrition - Science-backed supplements for peak performance',
  },
  {
    id: 'sales',
    mobile: heroSalesMob640,
    srcSet: `${heroSales1080} 1080w, ${heroSales1920} 1920w`,
    fallback: heroSales,
    buttonLabel: 'Shop Now',
    to: '/products',
    alt: 'Special offer - CoreX supplements on 40% off sale now',
  },
  {
    id: 'unlock',
    mobile: heroUnlockMob640,
    srcSet: `${heroUnlock1080} 1080w, ${heroUnlock1920} 1920w`,
    fallback: heroUnlock,
    buttonLabel: 'Shop Now',
    to: '/products',
    alt: 'Unlock your potential with CoreX performance supplements',
  },
  {
    id: 'join',
    mobile: heroJoinMob640,
    srcSet: `${heroJoin1080} 1080w, ${heroJoin1920} 1920w`,
    fallback: heroJoin,
    buttonLabel: 'Join Us',
    to: '/about-corex',
    alt: 'Join the CoreX community - Premium supplements for serious athletes',
  },
];

export default heroSlides;
