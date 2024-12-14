function SortingOptions({ sortBy, setSortBy }) {
    return (
      <div className="sorting-options">
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="id">Number</option>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
          <option value="baseExperience">Base Experience</option>
        </select>
      </div>
    );
  }