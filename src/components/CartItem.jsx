import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'; 

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-b border-gray-100 last:border-0 gap-6 group">
      
      {/* Product Image & Title */}
      <div className="flex items-center gap-6 w-full sm:w-1/2">
        <div className="w-24 h-24 bg-[#f8f5f0] rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
          <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
        </div>
        <div>
          <Link to={`/products/${item.id}`} className="font-bold text-gray-900 line-clamp-2 hover:text-[#003d29] transition-colors leading-snug">
            {item.title}
          </Link>
          <p className="text-gray-500 text-sm mt-1 font-medium">${item.price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50/50">
        <button 
          onClick={() => updateQuantity(item.id, -1)} 
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium"
        >
          -
        </button>
        <span className="px-4 py-2 text-center w-12 font-semibold text-gray-900">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, 1)} 
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium"
        >
          +
        </button>
      </div>

      {/* Total Price & Remove Button */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
        <p className="font-extrabold text-xl text-gray-900 w-24 text-right">${itemTotal}</p>
        <button 
          onClick={() => removeFromCart(item.id)} 
          className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-1 font-medium text-sm"
        >
          <FiTrash2 className="text-lg" /> <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
      
    </div>
  );
}