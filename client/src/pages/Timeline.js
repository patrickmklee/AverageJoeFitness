import React, { useState,useEffect } from 'react';
import { useMealContext } from "../utils/GlobalState";
import { useLazyQuery } from '@apollo/react-hooks';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_TIMELINE } from '../utils/queries';
import ScheduleItem from '../components/ScheduleItem';
import {
  Row,
  Container
} from 'reactstrap';

const Timeline = () => {

// const [state, dispatch] = useMealContext();
const {loading, error, data } = useQuery(QUERY_TIMELINE);
// const [getTimeline, { data }] = useLazyQuery(QUERY_TIMELINE);


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
  
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // };
  // console.log(data);
  // const schedule = data.schedule;
  // const { schedule } = data;
        // time={data.schedule.time}
        // meal={data.schedule.meal}
        // exercise={data.schedule.exercise}
  // console.log(data.timeline);//schedule.exercise);
  console.log("Finished Loading");
  console.log(data.timeline.schedule);
    return(
      <Container fluid>
        <Row>
        {data.timeline.schedule.map( (item,index) => (
        <ScheduleItem
        key={index}
        schedule={item}
        />
        )
        )};
</Row>
      </Container>
    )
    }

  
    export default Timeline;