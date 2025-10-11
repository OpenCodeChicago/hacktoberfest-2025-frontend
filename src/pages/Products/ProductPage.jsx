import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductById,
  clearCurrentProduct,
} from '../../store/productSlice';
import ProductDetails from '../../components/ProductDetails';
import { getRecommendedProducts } from '../../api';
import ProductCard from '../../components/Products/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (s) => s.products || {}
  );

  const [recommendedProducts, setRecommendedProducts] = useState([])



  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(id));

    const fetchRecommendedProducts = async (id) => {
      try {
        const products = await getRecommendedProducts(id)
        setRecommendedProducts(products.data)
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    }

    fetchRecommendedProducts(id)
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  // Normalize possible payload wrapper
  const product = currentProduct?.product || currentProduct;

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
    return (
      <main className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">Product not found.</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <article>
        <ProductDetails product={product} />
      </article>
      {recommendedProducts?.length > 0 && (
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">Highly Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recommendedProducts?.map((recProduct) => (
              <ProductCard
                key={recProduct.id}
                product={recProduct}
                ref={null}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
