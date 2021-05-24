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
  Table,
  Row,
  Col,
  Container
} from 'reactstrap';

const keySchedule =  ({date})  => {
  return date.reduce((acc,curr)  => (acc[curr]='',acc),{}) 
}

const Timeline = () => {
    const [state, dispatch] = useScheduleContext();

    // const { user } = state;
    const { loading, error, data  } = useQuery(QUERY_TIMELINE);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    // const timeline = data?.timeline || [];
    const loggedIn = Auth.loggedIn();
    

    // const { loading, data } = useQuery(QUERY_ME);
    // const { loading, data } = useQuery(QUERY_TIMELINE);
    // const { data: userData } = useQuery(QUERY_ME_BASIC);
    const timeline = data?.timeline || [];
  
    // const loggedIn = Auth.loggedIn();
    useEffect(() => {
      if(data) {
          // console.log(data);
        dispatch({
            type: UPDATE_TIMELINE,
            timeline: {data}
          });
        //   data.timeline.
        //   forEach(({schedule}) => {
            idbPromise('timeline', 'put', data.timeline);
        //   });
      }
      //  else if (!loading) {
      //   idbPromise('timeline', 'get').then((timeline) => {
      //     dispatch({
      //       type: UPDATE_TIMELINE,
      //       timeline: timeline
      //    });
      //   });
      // }
    }, [timeline, loading]);
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
  
  
//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;



  function TableHeadingItem(props) {
    // Correct! There is no need to specify the key here:
    return <th>{props.value}</th>
  }
  function TableHeading(props) {
    // console.log('in TAble head');  
    // console.log(props);
    // const {_id, date} = props.timeline;
    const {_id,...timeline} = props.timeline;
    // console.log(_id)
    // console.log(timeline)

    // console.log(date);
    return (
      <tr>
      {timeline.date.map(date => (
        <TableHeadingItem key={date._id} value={date.day} />
      ))}
      </tr>
    
    )
  }
  
  function DayList(props) {
    // console.log('in DayList');  
    // console.log(props);
    // console.log(props);
    // const {_id, date} = props.timeline;
    const {_id,...timeline} = props.timeline;
    // console.log(_id)
    // console.log(timeline)
      return (
        // <Row> {timeline.date} </Row>
        <tbody >
          {timeline.date.map( (date) => (
        // <table>
          <ScheduleItem key={date._id} schedule={date} />
          ))}
        </tbody>
  )}

// console.log('===================================')
//   console.log("Finished Loading");
//   console.log(data);
//   console.log(loggedIn);
  console.log(data);
  console.log(timeline.date);
  return(
    <div>
      { timeline.date ?
        (
          timeline.date.length !== 0 ?
          (
            (~(state.searchCriteria||null)&&data&&loggedIn) ? (
            <table className="table px-3">
              <thead className="display-4">
                <TableHeading timeline={data.timeline}/>
              </thead>
              <DayList timeline={data.timeline} />
            </table>
            ) : (
              null 
            )
          ):
          (
            <>
              You do not have any saved entries. Add a meal or exercise.
            </>
          )
        ):
        (
          <>
            Loading your tracker...
          </>
        )
      }
    </div>
  )
};
  
  
    export default Timeline;