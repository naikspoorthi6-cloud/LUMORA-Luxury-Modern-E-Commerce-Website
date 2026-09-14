import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { Button } from '../components/Button';
import { SearchX, Sparkles } from 'lucide-react';
import './Shop.css';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');

  // Update selectedCategory when URL query changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Products logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        const matchesCategory =
          selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();

        // Search Query Filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // default featured
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="shop-page fade-in">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container text-center">
          <span className="section-badge"><Sparkles size={13} /> LUMORA Boutique</span>
          <h1 className="shop-title">The Complete Collection</h1>
          <p className="shop-subtitle">
            Explore curated luxury fashion, Swiss timepieces, fine jewelry, fragrance, and Italian leather.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container section-padding">
        {/* Filter Toolbar Component */}
        <ProductFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'All') {
              setSearchParams({});
            } else {
              setSearchParams({ category: cat });
            }
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resultsCount={filteredProducts.length}
          onReset={handleResetFilters}
        />

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="shop-products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="shop-empty-state">
            <div className="empty-icon-box">
              <SearchX size={48} />
            </div>
            <h3>No Products Found</h3>
            <p>
              We couldn't find any items matching your current search query or filter selection. Try resetting filters or searching with a different term.
            </p>
            <Button variant="accent" onClick={handleResetFilters}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
