import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cartItems, cartTotal } = useCart();

  // Premium Empty State
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center max-w-2xl">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🛒</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 text-lg">Looks like you haven't added any products to your cart yet. Let's find something you'll love.</p>
        <Link 
          to="/products" 
          className="inline-block bg-[#003d29] text-white px-10 py-4 rounded-full font-bold hover:bg-[#00281b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // Premium Cart Layout
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <h1 className="text-3xl font-extrabold text-gray-950 mb-10 tracking-tight">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
          
          <div className="flex justify-between mb-4 text-gray-600 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-600 font-medium">
            <span>Shipping</span>
            <span className="text-[#003d29] font-bold">Free</span>
          </div>
          
          <hr className="my-6 border-gray-100" />
          
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-3xl font-extrabold text-[#003d29]">${cartTotal.toFixed(2)}</span>
          </div>
          
          <Link 
            to="/checkout" 
            className="w-full block text-center bg-[#003d29] text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-[#00281b] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            Proceed to Checkout
          </Link>
        </div>

      </div>
    </div>
  );
}