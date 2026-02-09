import React from 'react';

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className="color-selector">
      {colors.map((color) => (
        <button
          key={color.name}
          className={`color-option ${selectedColor.name === color.name ? 'selected' : ''}`}
          onClick={() => onSelectColor(color)}
          style={{ backgroundColor: color.code }}
          title={color.name}
        >
          {selectedColor.name === color.name && '✓'}
        </button>
      ))}
    </div>
  );
};

export default ColorSelector;