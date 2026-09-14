import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { categories } from '../data/products';
import './ProductFilter.css';

export const ProductFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  resultsCount,
  onReset
}) => {
  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || sortBy !== 'featured';

  return (
    <div className="product-filter">
      {/* Top Bar: Search & Sort */}
      <div className="filter-top-bar">
        <div className="filter-search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search products by name or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            <SlidersHorizontal size={16} />
            <span>Sort By:</span>
          </label>
          <select
            id="sort-select"
            className="filter-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="filter-categories-bar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`category-pill ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span>{cat.name}</span>
              <span className="category-pill-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {isFiltered && (
          <button className="filter-reset-btn" onClick={onReset}>
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Results Header */}
      <div className="filter-results-info">
        <p>
          Showing <strong>{resultsCount}</strong> {resultsCount === 1 ? 'product' : 'products'}
          {selectedCategory !== 'All' && <> in <span>"{selectedCategory}"</span></>}
          {searchQuery && <> matching <span>"{searchQuery}"</span></>}
        </p>
      </div>
    </div>
  );
};
