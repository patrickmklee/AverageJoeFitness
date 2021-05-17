import React, { useState,useEffect } from 'react';
import { useScheduleContext } from "../utils/GlobalState";
import { useLazyQuery } from '@apollo/react-hooks';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/react-hooks';
import {UPDATE_TIMELINE} from '../utils/actions'
import { QUERY_TIMELINE, QUERY_ME_BASIC } from '../utils/queries';
import ScheduleItem from '../components/ScheduleItem';
import { idbPromise } from '../utils/helpers';

import {
  Row,
  Container
} from 'reactstrap';

const Timeline = () => {
    const [state, dispatch] = useScheduleContext();

    // const { user } = state;
    const { loading,error, data  } = useQuery(QUERY_TIMELINE);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    // const timeline = data?.timeline || [];
    const loggedIn = Auth.loggedIn();
    

    // const { loading, data } = useQuery(QUERY_ME);
    // const { loading, data } = useQuery(QUERY_TIMELINE);
    // const { data: userData } = useQuery(QUERY_ME_BASIC);
    // const timeline = data?.timeline || [];
  
    // const loggedIn = Auth.loggedIn();
    useEffect(() => {
      if(data) {
          console.log(data);
        dispatch({
             type: UPDATE_TIMELINE,
            timeline: data.timeline
          });
        //   data.timeline.
        //   forEach(({schedule}) => {
            idbPromise('timeline', 'put', data.timeline);
        //   });
      } else if (!loading) {
        idbPromise('timeline', 'get').then((timeline) => {
          dispatch({
            type: UPDATE_TIMELINE,
            timeline: timeline
         });
        });
      }
    }, [data, loading, dispatch]);
// const [state, dispatch] = useMealContext();
// const {loading, error, data } = useQuery(QUERY_TIMELINE);
// const [getTimeline, { data }] = useLazyQuery(QUERY_TIMELINE);
// useEffect(() => {
//     if(data) {
//       dispatch({
//            type: UPDATE_PRODUCTS,
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
  console.log(data);
    return(
      <Container fluid>
        {/* {loggedIn && userData ? ( <Row> */}
        {data.timeline.schedule.map( (item,index) => (
        <ScheduleItem
        key={index}
        schedule={item}
        />
        )
        )};
{/* </Row>) : null} */}
      </Container>
    )
    }

  
    export default Timeline;