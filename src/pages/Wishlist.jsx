import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import ProductGrid from '../components/ProductGrid';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8">Save items you love so you don't lose track of them.</p>
        <Link 
          to="/products" 
          className="bg-red-50 text-red-600 font-semibold px-8 py-3 rounded-md border border-red-200 hover:bg-red-100 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-500 mt-2">{wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>
      
      {/* Reusing our awesome Grid component! */}
      <ProductGrid products={wishlist} />
    </div>
  );
}