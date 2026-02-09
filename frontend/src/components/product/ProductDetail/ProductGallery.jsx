import React, { useState } from 'react';
import './ProductDetail.css';

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="product-gallery">
      <div className="main-image">
        <img src={images[selectedImage]} alt="Main product" />
      </div>
      <div className="thumbnail-list">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;