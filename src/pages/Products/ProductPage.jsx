import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductById,
  clearCurrentProduct,
} from '../../store/productSlice';
import ProductDetails from '../../components/ProductDetails';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (s) => s.products || {}
  );

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductById(id));
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
    </main>
  );
}
