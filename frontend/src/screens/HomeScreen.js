import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import logger from 'use-reducer-logger';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  //   const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //   setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      {/* we added div to wrap the products and we added the "products" ans "product" classes for style in index.css */}
      <div className="products">
        {/* הפעולה הבאה הופכת כל איבר במערך במוצרים למפה ואז ממירה כל איבר לפורמט JSX 
        שמציג את התמונה שם ומחיר */}
        {loading ? (
          <div>loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            //we put the key slug to solve the error on the console that require unique key for each product
            <div className="product" key={product.slug}>
              {/* IMPORTANT!!! <Link to="" ></Link> is react router component like <a href=></a> but more faster for single page application */}
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name}></img>
              </Link>
              {/* ניצור את הדיב הזה כדי ליצור קלאס חדש שיתן רווח בין התמונה למלל */}
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
