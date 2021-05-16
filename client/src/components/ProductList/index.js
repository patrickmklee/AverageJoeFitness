import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';


function ProductList() {
  // const { loading, data } = useQuery(QUERY_PRODUCTS);



  // function filterProducts() {
  //   if (!currentCategory) {
  //     return products;
  //   }

  //   return products.filter(product => product.category._id === currentCategory);
  // }

  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;
  
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];
  
  useEffect(() => {
    //if there is data to be stored
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
      // but let's also take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product)
      });

      // add else if to check if `loading` is undefined in `useQuery()` Hook
  
    } else if (!loading) {
      //since we are offline, get all if the data from the products store

      idbPromise('products', 'get').then((products) => {
        //use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        })
      })
    }
  }, [data, loading, dispatch]);

  
  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
  
    return state.products.filter(product => product.category._id === currentCategory);
  }


  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
