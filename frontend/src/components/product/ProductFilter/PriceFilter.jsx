import React from 'react';

const PriceFilter = ({ priceRange, onChange }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange];
    
    if (e.target.name === 'min') {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }
    
    onChange(newRange);
  };

  return (
    <div className="filter-section">
      <h4>Giá</h4>
      <div className="price-slider">
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={priceRange[0]}
          onChange={handleChange}
          name="min"
          className="price-slider-input"
        />
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={priceRange[1]}
          onChange={handleChange}
          name="max"
          className="price-slider-input"
        />
      </div>
      <div className="price-range">
        <span>{priceRange[0].toLocaleString()}đ</span>
        <span>{priceRange[1].toLocaleString()}đ</span>
      </div>
    </div>
  );
};

export default PriceFilter;