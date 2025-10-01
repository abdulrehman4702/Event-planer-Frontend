const CATEGORIES = ["Work", "Personal", "Social", "Education", "Other"];

const FilterBar = ({
  filteredCategory,
  onFilterChange,
  onAddClick,
  showForm,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-gray-700">Filter:</label>
        <select
          value={filteredCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onAddClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        {showForm ? "Cancel" : "+ Add Event"}
      </button>
    </div>
  );
};

export default FilterBar;
