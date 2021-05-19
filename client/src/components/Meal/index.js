import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import MealItem from '../MealItem';
import Auth from '../../utils/auth';
import './style.css';
import { useScheduleContext } from '../../utils/GlobalState';
import { TOGGLE_MEAL, ADD_MULTIPLE_TO_MEAL } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
// import { QUERY_CHECKOUT } from '../../utils/queries';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/react-hooks';
import ModalConfirmMeal  from '../ModalConfirmMeal'
import {useLazyQuery, useMutation, useQuery}  from '@apollo/react-hooks';
import {ADD_MEAL} from '../../utils/mutations'
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Meal = () => {

    const [state, dispatch] = useScheduleContext();
    // const [submitMeal, {data}] = useLazyQuery();
    // const [modal, setModal] = useState(false);

    // const toggle = () => setModal(!modal);
  
    useEffect(() => {
        async function getMeal() {
            const meal = await idbPromise('meal', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_MEAL,
                meal: [...meal]
            })
        };

        if(!state.meal.length) {
            getMeal();
        }
    }, [state.meal.length,  dispatch]);



    function toggleMeal() {
        dispatch({type: TOGGLE_MEAL});
    }

    function calculateTotal() {
        let sum = 0;
        state.meal.forEach(meal => {
            sum+= meal.calories
            //  * item.purchaseQuantity;
        })

        return sum.toFixed(2);
    }


    // function submitCheckout() {
    //     const foodIds = [];

    //     state.meal.forEach((item) => {
    //         for (let i=0; i<item.quantity; i++) {
    //           foodIds.push(item.fdcId);
    //         }
    //     })

    //     addToTimeline({
    //         variables: {foods: foodIds}
    //     })
    // }


    // useEffect(() => {
    //     if(data) {

          
    //         // stripePromise.then((res) => {

    //         //     res.redirectToCheckout({ sessionId: data.checkout.session})
    //         // })
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

    // console.log(state);
    // console.log(state.meal);

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
    
    
  
  <h2>Build a meal</h2>
  {state.meal.length ? (
    <div>
      {state.meal.map(food => (
        <MealItem key={food._id} item={food} />
      ))}
      {/* <div className="flex-row space-between">
        <strong>Total: ${calculateTotal()}</strong>
        {
          Auth.loggedIn() ?
            <button onClick={submitCheckout}>
              Checkout
            </button>
            :
            <span>(log in to check out)</span>
        }
      </div> */}
    </div>
  ) : (
    <Link to="/addMeal">
      <span role="img" aria-label="plus-sign">
      ➕ New Meal
      </span>
    </Link>
  )}
</div>
  );
};

export default Meal;