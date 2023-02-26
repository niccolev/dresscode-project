import React, { useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const [category, setCategory] = useState("all");

  let keyword = location.search;

  useEffect(() => {
    // Pass the category to the listProducts action
    dispatch(listProducts(keyword, category));
  }, [dispatch, keyword, category]);

  // Create a new filteredProducts array based on the selected category
  let filteredProducts = products;
  if (category !== "all") {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }

  return (
    <div>
      <h2>Latest Products</h2>
      {/* Add a dropdown to select the category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="Dresses">Dresses</option>
        <option value="Casual">Casual</option>
      </select>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
