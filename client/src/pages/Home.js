import React, { useState,useEffect } from 'react';
import { useMealContext } from "../utils/GlobalState";
import { useLazyQuery } from '@apollo/react-hooks';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_TIMELINE } from '../utils/queries';
import {
  Button
} from 'reactstrap';
const getScheduleMeals = schedule => {
  schedule.map( ({time})  =>  { return `${time} : ${time.meals[0].itemName}` }
  )}
const queryTimeline = () => {
  return QUERY_TIMELINE
}
const TimelinePage = () => {

const [state, dispatch] = useMealContext();
// const {loading, error, data, } = useQuery(QUERY_TIMELINE);
const [getTimeline, { data }] = useLazyQuery(QUERY_TIMELINE);


//     if(data) {
//       dispatch({
//            type: UPDATE_FOODS_RESULTS,
//           products: data.products
//         });
//         data.products.forEach((product) => {
//           idbPromise('products', 'put', product);
//         });
//     } else if (!loading) {
//       idbPromise('products', 'get').then((products) => {
//         dispatch({
//           type: UPDATE_PRODUCTS,
//          products: products
//        });
//       });
//     }
//   }, [data, loading, dispatch]);
  // function doGet() {
  // const initData = ({"_id": "609fc3d3a10e30335cb5ed24")}
  
  
  // };
  console.log(data);
    return(
      <div>     
        <Button onClick={getTimeline({"_id": "609fc3d3a10e30335cb5ed24"})}>
          Get Timeline
          </Button>
      </div>
    )
    }

  
    export default TimelinePage;