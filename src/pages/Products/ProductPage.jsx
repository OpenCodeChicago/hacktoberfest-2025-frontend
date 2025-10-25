import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductById,
  clearCurrentProduct,
} from '../../store/productSlice';
import {} from 'react-icons/fa';
import ProductDetails from '../../components/ProductDetails';
import { getRecommendedProducts } from '../../api';
import ProductCard from '../../components/Products/ProductCard';
import { isInWishlist } from '../../utils/wishlist';
import { Clock, PackageIcon } from 'lucide-react';
import { renderStars } from '../../components/common/ReviewStars';
import AddToCartButton from '../../components/Products/AddToCartButton';
import { addToWishList, removeFromWishList } from '../../store/wishListSlice';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (s) => s.products || {}
  );

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(id));
    setFetchAttempted(true);

    const fetchRecommendedProducts = async (id) => {
      try {
        const products = await getRecommendedProducts(id);
        setRecommendedProducts(products.data);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchRecommendedProducts(id);
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  // Normalize possible payload wrapper
  const product = currentProduct?.product || currentProduct;

  // Check if it is in wish list
  const wishlistItems = useSelector((state) => state.wishList.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">Loading product…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-6">
        <div className="text-center text-red-600 py-12">
          Error loading product: {error}
        </div>
      </main>
    );
  }

  if (!product) {
    if (fetchAttempted && !loading) {
      return <Navigate to="/not-found" replace />;
    }
  }

  if (product)
    return (
      <main className="max-w-6xl mx-auto p-6">
        <section className="flex flex-row w-full mt-4 max-w-[70vw] gap-8">
          {/* Left side section */}
          <section className="Left-side flex-4 images-section">
            {/* Hero Image section */}
            <div className="hero-image-container relative  flex flex-row items-center justify-between ">
              {/* Previous Image */}
              <button
                type="button"
                aria-label="Previous reviews page"
                className={`cursor-pointer  rounded disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.1] active:scale-100 transition-all duration-150 ease-in-out`}
              >
                <img src="/icons/left-arrow.svg" alt="Previous" />
              </button>
              {/* Hero Image */}
              <div className="relative flex w-[400px] shadow-sm ">
                <img
                  className="object-cover "
                  src="/images/products/nova-whey-vanilla-protein.jpg"
                  alt={product.name}
                />
                <h3 className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium py-1 px-2 ">
                  B1G1 50% OFF
                </h3>
              </div>

              {/*Next Image  */}
              <button
                type="button"
                aria-label="Next reviews page"
                className={`cursor-pointer  rounded disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.1] active:scale-100 transition-all duration-150 ease-in-out`}
              >
                <img
                  className="rotate-180"
                  src="/icons/left-arrow.svg"
                  alt="Next"
                />
              </button>
            </div>
            {/* Addiontal image section */}
            <section className="additional-images-grid grid grid-cols-4 gap-4 px-4 mt-4">
              <img
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
                src="/images/products/nova-whey-vanilla-protein.jpg"
                alt={product.name}
              />
              <img
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
                src="/images/products/nova-whey-vanilla-protein.jpg"
                alt={product.name}
              />
              <img
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
                src="/images/products/nova-whey-vanilla-protein.jpg"
                alt={product.name}
              />
              <img
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
                src="/images/products/nova-whey-vanilla-protein.jpg"
                alt={product.name}
              />
            </section>
          </section>
          {/* Right Side Section */}
          <section className="right-side flex-5 product-detail-section flex-col flex gap-3">
            {/* reviews */}
            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700">{product.longDescription}</p>
            {/* Flavour and size slection */}
            <section className="falvours-size-section flex flex-col gap-4 ">
              {/* flavour selection */}
              <div className="flavours-selection items-center justify-start flex flex-row gap-4 ">
                <h3 className="text-gray-800 font-semibold ">Flavors :</h3>
                <div className="flavours-selection flex flex-row gap-4 ">
                  {product.flavors.map((flavor) => (
                    <div
                      key={flavor}
                      className="flavor-option border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      {flavor}
                    </div>
                  ))}
                </div>
              </div>
              {/* size selection */}
              <div className="sizes-selection items-center justify-start  flex flex-row gap-4 ">
                <h3 className="text-gray-800 font-semibold ">Sizes :</h3>
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    className="size-option border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </section>
            <section className="actions-section flex flex-col gap-4 mt-4">
              <div className="product-count flex flex-row items-center gap-2">
                {/* <button className="cursor-pointer text-gray-600 px-3 py-3 rounded-md hover:bg-gray-50 transition">
                  -
                </button>
                <h3 className=" text-gray-600 px-6 py-3 bg-gray-100 rounded-md ">
                  3
                </h3>
                <button className="cursor-pointer text-gray-600 px-3 py-3 rounded-md hover:bg-gray-50 transition">
                  +
                </button> */}
                {/* <button className="ml-4 w-full cursor-pointer bg-[#023E8A] text-white px-6 py-3 rounded-md hover:bg-gray-700 transition">
                  Add to Cart
                </button> */}
                <AddToCartButton
                  className="rounded-md! w-full "
                  product={product}
                  selectedFlavor={'Vanilla Ice Cream'}
                />
              </div>

              <button
                onClick={() => {
                  isInWishlist
                    ? dispatch(removeFromWishList(product))
                    : dispatch(addToWishList(product));
                }}
                className="border-2 border-[#023E8A] text-[#023E8A]  cursor-pointer font-semibold px-6 py-3 rounded-md hover:bg-blue-50 transition"
              >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </section>
            <section className="shipping-info flex-col gap-2 text-sm text-gray-600 mt-4">
              <h4 className="font-semibold text-xs text-gray-800">
                Secure checkout. Satisfaction guaranteed.
              </h4>
              <div className="shipping-details flex flex-row gap-4 mt-2">
                <div className="font-semibold flex flex-row items-center gap-2 text-gray-800">
                  <PackageIcon className="mr-1" size={19} />
                  Free Shipping over $75.
                </div>
                <div className="font-semibold flex flex-row items-center gap-2 text-gray-800">
                  <Clock className="mr-1" size={19} />
                  Delivery in 1-3 Days on average.
                </div>
              </div>
            </section>
          </section>
        </section>
        {/* Additional Product Information */}
        <article>
          <ProductDetails product={product} />
        </article>
        {/* Recommended Products Section */}
        {recommendedProducts?.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-semibold mb-4">
              Highly Recommended Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {recommendedProducts?.map((recProduct) => (
                <ProductCard
                  key={recProduct.id || recProduct._id}
                  product={recProduct}
                  ref={null}
                  isWishlisted={isInWishlist(recProduct.id || recProduct._id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    );
}
