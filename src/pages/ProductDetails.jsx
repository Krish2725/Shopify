import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { toast } from 'react-toastify';

// --- PRD FIX: IMPORTING SWIPER TO MEET REQUIREMENT ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[60vh] text-xl font-bold text-[#003d29] animate-pulse">Loading product...</div>;
  if (error || !product) return <div className="text-center py-20 text-red-500">Oops! We couldn't find that product.</div>;

  const isSaved = isInWishlist(product.id);

  // PRD FIX: Mock Gallery to demonstrate Swiper functionality
  const mockGalleryImages = [product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
      <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-[#003d29] mb-8 flex items-center transition-colors font-semibold">
        ← Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        
        {/* --- PRD FIX: SWIPER IMAGE GALLERY --- */}
        <div className="flex justify-center items-center bg-[#f8f5f0] p-6 rounded-3xl w-full max-w-lg mx-auto overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            className="w-full h-96 rounded-2xl"
          >
            {mockGalleryImages.map((img, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center bg-transparent p-4">
                <img 
                  src={img} 
                  alt={`${product.title} - view ${index + 1}`} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105 cursor-crosshair"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-4 leading-tight">{product.title}</h1>
          <div className="flex items-center mb-6">
            <span className="text-yellow-400 text-xl">★ {product.rating?.rate}</span>
            <span className="text-gray-500 text-sm ml-2 font-medium">({product.rating?.count} verified reviews)</span>
          </div>
          <div className="text-4xl font-extrabold text-gray-950 mb-6">${product.price.toFixed(2)}</div>
          <p className="text-gray-600 leading-relaxed mb-10">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={() => { addToCart(product); toast.success('🛍️ Added to cart!'); }}
              className="flex-1 bg-[#003d29] text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-[#00281b] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex justify-center items-center"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => { toggleWishlist(product); isSaved ? toast.info('Removed from wishlist') : toast.success('❤️ Saved for later!'); }}
              className={`flex-1 sm:flex-none border-2 py-4 px-10 rounded-full font-bold text-lg transition-all duration-300 flex justify-center items-center gap-2 active:scale-95 ${
                isSaved ? 'bg-red-50 text-red-600 border-red-200 hover:bg-white' : 'bg-white border-gray-200 text-gray-800 hover:border-[#003d29] hover:text-[#003d29]'
              }`}
            >
              {isSaved ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


