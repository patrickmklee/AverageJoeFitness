import React, { useEffect } from 'react';
import MealItem from '../MealItem';
import Auth from '../../utils/auth';
import './style.css';
import { useScheduleContext } from '../../utils/GlobalState';
import { TOGGLE_MEAL, ADD_MULTIPLE_TO_MEAL } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
// import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';


// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Meal = () => {

    const [state, dispatch] = useScheduleContext();
    const [getCheckout, {data}] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getMeal() {
            const meal = await idbPromise('meal', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_MEAL,
                products: [...meal]
            })
        };

        if(!state.meal.length) {
            getMeal();
        }
    }, [state.meal.length, dispatch]);



    function toggleMeal() {
        dispatch({type: TOGGLE_MEAL});
    }

    function calculateTotal() {
        let sum = 0;
        state.meal.forEach(item => {
            sum+= item.price * item.purchaseQuantity;
        })

        return sum.toFixed(2);
    }


    function submitCheckout() {
        const productIds = [];

        state.meal.forEach((item) => {
            for (let i=0; i<item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        })

        getCheckout({
            variables: {products: productIds}
        })
    }


    // useEffect(() => {
    //     if(data) {
    //         stripePromise.then((res) => {
    //             res.redirectToCheckout({ sessionId: data.checkout.session})
    //         })
    //     }
    // }, [data])
    

    if(!state.mealOpen) {
        return (
            <div className="meal-closed" onClick={toggleMeal}>
              <span
                role="img"
                aria-label="trash">🛒</span>
            </div>
          );
    }

    console.log(state);


  return (
    // <div className="meal">
    //   <div className="close" onClick={toggleMeal}>[close]</div>
    //   <h2>Shopping Meal</h2>
    //   <div>
    //       <MealItem item={{name:'Camera', image:'camera.jpg', price:5, purchaseQuantity:3}} />
    //       <MealItem item={{name:'Soap', image:'soap.jpg', price:6, purchaseQuantity:4}} />

    //       <div className="flex-row space-between">
    //         <strong>Total: $0</strong>
    //         {
    //           Auth.loggedIn() ?
    //             <button>
    //               Checkout
    //             </button>
    //             :
    //             <span>(log in to check out)</span>
    //         }
    //       </div>
    //     </div>
    // </div>
    <div className="meal">
  <div className="close" onClick={toggleMeal}>[close]</div>
  <h2>Shopping Meal</h2>
  {state.meal.length ? (
    <div>
      {state.meal.map(item => (
        <MealItem key={item._id} item={item} />
      ))}
      <div className="flex-row space-between">
        <strong>Total: ${calculateTotal()}</strong>
        {
          Auth.loggedIn() ?
            <button onClick={submitCheckout}>
              Checkout
            </button>
            :
            <span>(log in to check out)</span>
        }
      </div>
    </div>
  ) : (
    <h3>
      <span role="img" aria-label="shocked">
        😱
      </span>
      You haven't added anything to your meal yet!
    </h3>
  )}
</div>
  );
};

export default Meal;