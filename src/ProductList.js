import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.uniqueId} className="product-card">
          <Link to={`/product/${product.uniqueId}`}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
