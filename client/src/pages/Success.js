import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Jumbotron from "../components/Jumbotron";
import { ADD_MEAL } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';



function Success() {

    const [addOrder] = useMutation(ADD_MEAL);

    useEffect(() => {
    async function saveOrder() {

        const meal = await idbPromise('meal', 'get');
        const products = meal.map(item => item._id);

        if (products.length) {
            const { data } = await addOrder({ variables: { products } });
            const productData = data.addOrder.products;
          
            productData.forEach((item) => {
              idbPromise('meal', 'delete', item);
            });
          }

    }

    saveOrder();


    }, [addOrder]);

    setTimeout(function(){ alert(""); }, 3000);
    window.location.assign('/')


    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Jumbotron>
      </div>
    );
  };

export default Success;