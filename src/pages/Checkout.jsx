import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../hooks/useCart';
import { v4 as uuidv4 } from 'uuid';
import { FiCheckCircle } from 'react-icons/fi'; // The success icon

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  address: yup.string().required('Required'),
  city: yup.string().required('Required'),
  zipCode: yup.string().required('Required'),
});

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // NEW STATE: Controls the visibility of the success modal
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const taxAmount = cartTotal * 0.10; // 10% tax to match video
  const finalTotal = cartTotal + taxAmount;

  const onSubmit = (data) => {
    const newOrderId = uuidv4().substring(0, 10).toUpperCase(); 
    setOrderId(newOrderId);
    // Trigger the modal instead of navigating away!
    setIsSuccess(true); 
  };

  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="bg-[#003d29] text-white px-8 py-3 rounded-full hover:bg-[#00281b] transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Delivery Form */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Delivery Information</h2>
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="block text-gray-600 text-sm font-semibold mb-2">First/Last Name*</label>
                 <input {...register('fullName')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003d29] outline-none" placeholder="Type here..." />
               </div>
               <div>
                 <label className="block text-gray-600 text-sm font-semibold mb-2">Email*</label>
                 <input {...register('email')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003d29] outline-none" placeholder="Type here..." />
               </div>
            </div>
            <div>
               <label className="block text-gray-600 text-sm font-semibold mb-2">Address*</label>
               <input {...register('address')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003d29] outline-none" placeholder="Type here..." />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="block text-gray-600 text-sm font-semibold mb-2">City*</label>
                 <input {...register('city')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003d29] outline-none" placeholder="Type here..." />
               </div>
               <div>
                 <label className="block text-gray-600 text-sm font-semibold mb-2">Zip Code*</label>
                 <input {...register('zipCode')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003d29] outline-none" placeholder="Type here..." />
               </div>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Sub Total</span>
              <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax(10%)</span>
              <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Cost</span>
              <span className="font-semibold text-gray-900">$0.00</span>
            </div>
          </div>
          
          <hr className="my-6 border-gray-200" />
          
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg text-gray-600 font-bold">Total</span>
            <span className="text-2xl font-bold text-[#003d29]">${finalTotal.toFixed(2)}</span>
          </div>

          <button 
            type="submit" 
            form="checkout-form"
            className="w-full bg-[#003d29] text-white font-bold py-4 rounded-full hover:bg-[#00281b] transition-colors shadow-lg"
          >
            Pay ${finalTotal.toFixed(2)}
          </button>
        </div>
      </div>

      {/* --- THE SUCCESS MODAL OVERLAY (From the video!) --- */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-4 border border-white/50 animate-fade-in-up">
            
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <FiCheckCircle className="text-green-500 text-6xl" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Your order has been accepted</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">Transaction ID: {orderId}</p>
            
            <button 
              onClick={handleContinueShopping}
              className="w-full bg-[#003d29] text-white font-bold py-3 px-6 rounded-full hover:bg-[#00281b] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}


