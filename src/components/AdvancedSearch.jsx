function AdvancedSearch({ onSearch }) {
    const [filters, setFilters] = useState({
      type: '',
      minAttack: '',
      minDefense: '',
      ability: '',
      minHeight: '',
      minWeight: ''
    });
   
    return (
      <div className="advanced-search">
        <select 
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="">All Types</option>
          {/* types options */}
        </select>
   
        <input 
          type="number"
          placeholder="Min Attack"
          value={filters.minAttack}
          onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
        />
   
        {/* other filters */}
   
        <button onClick={() => onSearch(filters)}>
          Apply Filters
        </button>
      </div>
    );
   }