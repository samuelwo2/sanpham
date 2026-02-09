import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="size-selector">
      {sizes.map((size) => (
        <button
          key={size}
          className={`size-option ${selectedSize === size ? 'selected' : ''}`}
          onClick={() => onSelectSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;