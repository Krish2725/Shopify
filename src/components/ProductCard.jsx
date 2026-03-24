import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (isSaved) {
      toast.info('Removed from wishlist', { autoClose: 1500 });
    } else {
      toast.success('❤️ Added to wishlist!', { autoClose: 1500 });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col relative group">
      
      {/* Floating Wishlist Button */}
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-100"
        aria-label="Toggle Wishlist"
      >
        {isSaved ? '❤️' : '🤍'}
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative h-64 overflow-hidden p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
        <span className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
          {product.category}
        </span>
        
        <Link to={`/products/${product.id}`}>
          <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 hover:text-[#003d29] transition-colors leading-snug">
            {product.title}
          </h2>
        </Link>

        <div className="flex items-center mb-6">
          <span className="text-yellow-400 text-sm">★ {product.rating?.rate}</span>
          <span className="text-gray-400 text-xs ml-2">({product.rating?.count} reviews)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          {/* --- THE NEW PREMIUM BUTTON --- */}
          <button 
            className="bg-[#003d29] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#00281b] transition-colors duration-300 active:scale-95 shadow-md hover:shadow-lg"
            onClick={() => {
              addToCart(product);
              toast.success('🛍️ Added to cart!');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}