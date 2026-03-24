import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Using Search Params now!
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductGrid from '../components/ProductGrid';
import { FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Products() {
  const { products, loading, error } = useProducts();
  
  // BULLETPROOF URL CHECK: Read the category directly from the URL bar
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(urlCategory);
  const [sortOrder, setSortOrder] = useState('default');
  const [priceRange, setPriceRange] = useState('all');

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Sync state if the user clicks back/forward in their browser
  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const categories = useMemo(() => {
    if (!products) return [];
    return ['all', ...new Set(products.map(p => p.category))];
  }, [products]);

  // Handle Tab Clicks (Updates the URL AND the state)
  const handleCategoryClick = (cat) => {
    setCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Format category names properly for the UI (Applying the "Jewellery" fix)
  const formatCategoryName = (catName) => {
    if (catName === 'all') return 'All Products';
    if (catName === 'jewelery') return 'Jewellery'; 
    return catName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const processedProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (debouncedSearch) {
      result = result.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }
    
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    if (priceRange === '0-50') result = result.filter(p => p.price <= 50);
    else if (priceRange === '50-100') result = result.filter(p => p.price > 50 && p.price <= 100);
    else if (priceRange === '100-500') result = result.filter(p => p.price > 100 && p.price <= 500);
    else if (priceRange === '500+') result = result.filter(p => p.price > 500);

    if (sortOrder === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'rating') result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));

    return result;
  }, [products, debouncedSearch, category, sortOrder, priceRange]);

  if (loading) return <div className="text-center py-20 text-xl font-bold text-[#003d29] animate-pulse">Loading collection...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
      
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="relative w-full lg:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <FiSearch className="text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-full focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-[#003d29]/20 outline-none transition-all"
          />
        </div>

        <div className="flex w-full lg:w-auto gap-4">
          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full lg:w-auto bg-gray-50 border border-transparent text-gray-700 py-3.5 px-6 rounded-full focus:bg-white focus:border-gray-300 outline-none cursor-pointer font-medium transition-all"
          >
            <option value="all">Any Price</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 to $100</option>
            <option value="100-500">$100 to $500</option>
            <option value="500+">Over $500</option>
          </select>

          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full lg:w-auto bg-gray-50 border border-transparent text-gray-700 py-3.5 px-6 rounded-full focus:bg-white focus:border-gray-300 outline-none cursor-pointer font-medium transition-all"
          >
            <option value="default">Sort By: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)} 
            className={`whitespace-nowrap px-8 py-3 rounded-full font-bold transition-all duration-300 ${
              category === cat 
                ? 'bg-[#003d29] text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#003d29] hover:text-[#003d29]'
            }`}
          >
            {formatCategoryName(cat)}
          </button>
        ))}
      </div>

      <motion.div layout className="min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={category + sortOrder + debouncedSearch + priceRange}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {processedProducts.length > 0 ? (
              <ProductGrid products={processedProducts} />
            ) : (
              <div className="text-center py-20 text-gray-500 text-lg font-medium">No products match your filters.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
    </div>
  );
}