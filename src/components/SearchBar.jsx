export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full md:w-96 mb-6 md:mb-0">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
    </div>
  );
}