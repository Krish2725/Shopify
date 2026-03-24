export default function Filters({ 
  category, setCategory, 
  priceRange, setPriceRange, 
  sortOrder, setSortOrder,
  categories // We will pass the list of available categories here
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      
      {/* Category Filter */}
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat.toUpperCase()}</option>
        ))}
      </select>

      {/* Price Range Filter */}
      <select 
        value={priceRange} 
        onChange={(e) => setPriceRange(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="all">All Prices</option>
        <option value="0-50">$0 - $50</option>
        <option value="51-100">$51 - $100</option>
        <option value="101-500">$101 - $500</option>
        <option value="500+">$500+</option>
      </select>

      {/* Sorting */}
      <select 
        value={sortOrder} 
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="default">Sort By: Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>

    </div>
  );
}