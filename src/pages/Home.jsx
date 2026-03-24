import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';

import heroBg from '../assets/hero-bg1.png'; 
import electronicsImg from '../assets/electronics.png';
import jeweleryImg from '../assets/jewelery.png';
import mensImg from '../assets/mens.png';
import womensImg from '../assets/womens.png';

export default function Home() {
  const { products, loading } = useProducts();
  const featuredProducts = products ? products.slice(0, 8) : []; 

  // Fixed UI spelling to "Jewellery", but kept API ID as "jewelery"
  const categoryCards = [
    { id: "electronics", name: "Electronics", img: electronicsImg },
    { id: "jewelery", name: "Jewellery", img: jeweleryImg }, 
    { id: "men's clothing", name: "Men's Clothing", img: mensImg },
    { id: "women's clothing", name: "Women's Clothing", img: womensImg }
  ];

  return (
    <div className="w-full">
      
      <section 
        className="relative pt-24 pb-32 overflow-hidden bg-cover bg-center bg-no-repeat min-h-[500px] flex items-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent md:w-2/3"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#003d29] mb-6 leading-[1.15] tracking-tight">
              Your Digital Destination <br /> For Premium Finds.
            </h1>
            <p className="text-lg text-gray-800 mb-8 font-medium leading-relaxed">
              Discover, curate, and explore with ease. Effortlessly manage your cart and build your definitive wishlist. Your streamlined online shopping experience begins here.
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-[#003d29] hover:bg-[#00281b] text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-bold text-gray-950 mb-10 tracking-tight">Shop Our Top Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((cat) => (
              <Link 
                // BULLETPROOF ROUTING: Using URL parameters instead of hidden state
                to={`/products?category=${encodeURIComponent(cat.id)}`} 
                key={cat.id} 
                className="relative rounded-2xl h-56 overflow-hidden group block cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white tracking-wide drop-shadow-md">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Products For You!</h2>
          {loading ? (
             <div className="text-center py-10 animate-pulse text-[#003d29] font-bold text-xl">Loading products...</div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

    </div>
  );
}
// import { Link } from 'react-router-dom';
// import { useProducts } from '../hooks/useProducts';
// import ProductGrid from '../components/ProductGrid';

// // --- IMPORTING YOUR EXACT LOCAL IMAGES ---
// import heroBg from '../assets/hero-bg1.png'; // <-- Your new Hero Background!
// import electronicsImg from '../assets/electronics.png';
// import jeweleryImg from '../assets/jewelery.png';
// import mensImg from '../assets/mens.png';
// import womensImg from '../assets/womens.png';

// export default function Home() {
//   const { products, loading } = useProducts();
//   const featuredProducts = products ? products.slice(0, 8) : []; 

//   const categoryCards = [
//     { name: "Electronics", img: electronicsImg },
//     { name: "Jewelery", img: jeweleryImg },
//     { name: "Men's Clothing", img: mensImg },
//     { name: "Women's Clothing", img: womensImg }
//   ];

//   return (
//     <div className="w-full">
      
//       {/* --- HERO SECTION: Full Background, No Circular Image --- */}
//       <section 
//         className="relative pt-24 pb-32 overflow-hidden bg-cover bg-center bg-no-repeat min-h-[500px] flex items-center"
//         style={{ backgroundImage: `url(${heroBg})` }}
//       >
//         {/* Optional: A subtle gradient overlay on the left to ensure text is always readable against your custom background */}
//         <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent md:w-2/3"></div>
        
//         <div className="container mx-auto px-6 md:px-12 relative z-10">
          
//           {/* Text strictly on the left side */}
//           <div className="max-w-xl text-center md:text-left">
//             <h1 className="text-5xl md:text-6xl font-extrabold text-[#003d29] mb-6 leading-[1.15] tracking-tight">
//               Your Digital Destination <br /> For Premium Finds.
//             </h1>
//             <p className="text-lg text-gray-800 mb-8 font-medium leading-relaxed">
//               Discover, curate, and explore with ease. Effortlessly manage your cart and build your definitive wishlist. Your streamlined online shopping experience begins here.
//             </p>
//             <Link 
//               to="/products" 
//               className="inline-block bg-[#003d29] hover:bg-[#00281b] text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
//             >
//               Shop Collection
//             </Link>
//           </div>

//           {/* Notice: The second <div> with the circular image has been completely removed! */}

//         </div>
//       </section>

//       {/* --- PREMIUM CATEGORIES SECTION --- */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 md:px-12">
//           <h2 className="text-2xl font-bold text-gray-950 mb-10 tracking-tight">Shop Our Top Categories</h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categoryCards.map((cat) => (
//               <Link 
//                 to="/products" 
//                 key={cat.name} 
//                 className="relative rounded-2xl h-56 overflow-hidden group block cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
//               >
//                 <img 
//                   src={cat.img} 
//                   alt={cat.name} 
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
//                 <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white tracking-wide drop-shadow-md">
//                   {cat.name}
//                 </h3>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- FEATURED PRODUCTS SECTION --- */}
//       <section className="py-16 bg-gray-50 border-t border-gray-100">
//         <div className="container mx-auto px-6 md:px-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Products For You!</h2>
//           {loading ? (
//              <div className="text-center py-10 animate-pulse text-[#003d29] font-bold text-xl">Loading products...</div>
//           ) : (
//             <ProductGrid products={featuredProducts} />
//           )}
//         </div>
//       </section>

//     </div>
//   );
// }
