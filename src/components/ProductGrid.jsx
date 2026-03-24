import ProductCard from './ProductCard';

 function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <div className="text-center py-10 text-gray-500">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default ProductGrid;