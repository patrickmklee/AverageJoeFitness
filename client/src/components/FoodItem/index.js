import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Auth from '../../utils/auth';
import {Link} from 'react-router-dom'
import { useScheduleContext } from "../../utils/GlobalState";
import {ADD_TO_MEAL} from "../../utils/actions"
import {Col, Card, Button, CardBody, CardHeader, CardTitle } from 'reactstrap';
import {idbPromise} from "../../utils/helpers"
import { useMutation } from '@apollo/react-hooks';
import { ADD_MEAL } from '../../utils/mutations';

import {filterNutrients, convertNutrientName} from '../../utils/helpers'
import ModalConfirmMeal from '../ModalConfirmMeal';


const FoodItem = ( item ) => {
    const [state, dispatch] = useScheduleContext();
    // const {...food} = item;

    // const [addMeal]= useMutation(ADD_MEAL);
    const {
        displayName,
        setModal,
        ...food
    } = item;
    
    

    // useEffect( () => {
    //   async function saveMeal() {
    //       const meal = await idbPromise('meal', 'get');
    //       const items = meal.map(item => item._id);
    //       if (items.length) {
    //           const { data } = await addMeal({variables: { items } });
    //               //   date: datedItem.date,
    //               //     time: datedItem.time,
    //               //     foodName: datedItem.description
    //               // calories: datedItem[1008] 
    //               // }
    //           const productData = data.addMeal.items;
          
    //           productData.forEach((item) => {
    //             idbPromise('meal', 'delete', item);
    //           });
    //         }
  
    //         setTimeout(() => {
    //           window.location.assign('/');
    //         }, 3000);
          
    //       }
    //       saveMeal();
    //   }, [addMeal]);

    const addToMeal = item => {
        // addToMeal(item)
        // const keyNutrients = filterNutrients(item.reduce((acc,{nutrientId,...data})  => (acc[nutrientId]=data,acc),{});
        const datedItem = {...item};
        
        datedItem.date = dayjs().format('DD-MM-YYYY');
        
        datedItem.time = dayjs().format('HH:mm') ;//MM-YYYY'); 
        console.log(datedItem)
        // addFood({
        //     variables: { date: datedItem.date,
        //         time: datedItem.time,
        //         foodName: datedItem.description
        //         // calories: datedItem[1008] 
        //     }
        // })}
        // dispatch({
        //     type: ADD_TO_MEAL,
        //     meal: {...datedItem, quantity: 1}
        // // product: { ...item, purchaseQuantity: 1 }
        //   });
        //   idbPromise('meal', 'put',  {...datedItem, quantity:1 })
        }
        // // const mealItem = 
        // }
    // const {searchCriteria} = state;

    // }
    // console.log(foodNutrients);
    //
    // console.log(foodNutrients);
    //console.log(keyNutrients);

    // const handleClick = food => {
        
    //     // alert(item._id);
    //     const datedItem = {...food};
    //     datedItem.date = dayjs().format();
    //     console.log(datedItem)
    //     dispatch({
    //         type: ADD_TO_MEAL,
    //         meal: {...datedItem, quantity : 1}
    //         // product: { ...item, purchaseQuantity: 1 }
    //       });
    //       idbPromise('meal', 'put',  {...datedItem, quantity : 1 });
    // }
    function ListItem(props) {
        // Correct! There is no need to specify the key here:
        return <li>{props.value}</li>;
      }
      
    function NutrientList(props) {
        const nutrients = props.foodNutrients;
        // const nutrient = convertNutrientName(nutrientRaw);
        // const keyNutrients = nutrients.reduce( (acc,curr) => (acc[curr]='',acc),{});

        return (
            <ul>
            
            {filterNutrients(nutrients).map( nutrient =>
            <ListItem key={nutrient.nutrientId} value={`${nutrient.nutrientName}: ${nutrient.value} ${nutrient.unitName}`} />
            )}
            </ul>
            // </ListItem>
        )
    };
    return (
    <Col xs='12' md='12'>
        
        <Card className="w-100" color='light' >
            
            <CardHeader>{food.foodCategories}</CardHeader>
            {/* <Link to={`/foods/${food._id}`}> */}
                <CardBody>

                <CardTitle tag='h5'>{displayName}</CardTitle>
                {NutrientList(food)}
                {/* <ul>
                    
                {filterNutrients(foodNutrients).map(nutrient => (
                    <li key={nutrient.nutrientId} value={nutrient.value}>
                    {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                    </li>
                ))}
                </ul> */}
            <ModalConfirmMeal
                buttonLabel="Add to Meal"
                className="food-modal" 
                displayName={displayName} />
                
                </CardBody>
                {/* </Link>  */}
                
          {/* /> */}
        </Card>
        
        
        </Col>
    )
};

export default FoodItem;
