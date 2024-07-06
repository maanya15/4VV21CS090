import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import '../styles/AllProductsPage.css';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts().then(data => {
      const productsWithIds = data.map(product => ({
        ...product,
        uniqueId: `${product.company}-${product.category}-${product.id}`,
        image: `https://picsum.photos/200?random=${Math.random() * 1000}` // Random image
      }));
      setProducts(productsWithIds);
      setFilteredProducts(productsWithIds);
    });
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
    if (filters.company) filtered = filtered.filter(p => p.company === filters.company);
    if (filters.rating) filtered = filtered.filter(p => p.rating >= filters.rating);
    if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice);
    if (filters.availability !== undefined) filtered = filtered.filter(p => p.availability === (filters.availability === 'true'));

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <div className="all-products-page">
      <Filters categories={[]} companies={[]} onFilterChange={handleFilterChange} />
      <ProductList products={paginatedProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllProductsPage;
