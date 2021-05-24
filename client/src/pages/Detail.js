import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Meal from "../components/Meal";
import { useScheduleContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_MEAL,
  UPDATE_MEAL_QUANTITY,
  ADD_TO_MEAL,
  UPDATE_FOODS_RESULTS,
} from "../utils/actions";
import { QUERY_FOODS, QUERY_ME } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'
// import {FdcGetFood} from '../utils/'
function Detail() {
  const [state, dispatch] = useScheduleContext();
  const { id } = useParams();

  const [currentFood, setCurrentFood] = useState({});

  const { loading, data } = useQuery(QUERY_FOODS);

  const { foods, meal } = state;

  useEffect(() => {
    // already in global store
    if (foods.length) {
      setCurrentFood(foods.find(food => food.fdcId === id));
    } 
    // retrieved from server
    // else if (data) {
    //   dispatch({
    //     type: UPDATE_FOODS_RESULTS,
    //     foods: data.foods
    //   });

    //   data.foods.forEach((food) => {
    //     idbPromise('foods', 'put', food);
    //   });
    // }
    // get cache from idb
    // else if (!loading) {
    else {
      idbPromise('foods', 'get').then((indexedFoods) => {
        dispatch({
          type: UPDATE_FOODS_RESULTS,
          foods: indexedFoods
        });
      });
    }
  }, [foods, data, loading, dispatch, id]);

  const addToMeal = () => {
    const itemInMeal = meal.find((mealItem) => mealItem._id === id)
    if (itemInMeal) {
      dispatch({
        type: UPDATE_MEAL_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInMeal.purchaseQuantity) + 1
      });
      idbPromise('meal', 'put', {
        ...itemInMeal,
        purchaseQuantity: parseInt(itemInMeal.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_MEAL,
        food: { ...currentFood, purchaseQuantity: 1 }
      });
      idbPromise('meal', 'put', { ...currentFood, purchaseQuantity: 1 });

    }
  }

  const removeFromMeal = () => {
    dispatch({
      type: REMOVE_FROM_MEAL,
      _id: currentFood._id
    });

    idbPromise('meal', 'delete', { ...currentFood });
  };

  return (
    <>
      {currentFood && meal ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Foods
          </Link>

          <h2>{currentFood.lowercasedescription}</h2>

          <p>
            {currentFood.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentFood.calories}
            {" "}
            <button onClick={addToMeal}>
              Add to Meal
            </button>
            <button 
              disabled={!meal.find(p => p._id === currentFood._id)} 
              onClick={removeFromMeal}
            >
              Remove from Meal
            </button>
          </p>
{/* 
          <img
            src={`/images/${currentFood.image}`}
            alt={currentFood.name}
          /> */}
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Meal />
    </>
  );
};

export default Detail;
