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

import {filterNutrients, filterCalories, convertNutrientName} from '../../utils/helpers'
import ModalConfirmMeal from '../ModalConfirmMeal';
import { isCompositeType } from 'graphql';

const FoodItem = ( item ) => {
    const [state, dispatch] = useScheduleContext();
    // const {...food} = item;

    // const [addMeal]= useMutation(ADD_MEAL);
    const {
        fdcId,
        displayName,
        ...food
    } = item;
    
    console.log(state.meal);
    // const displayName = getDisplayName(item);
    // useEffect( () => {
    //   addMeal = async function()  {
    //       const meal = await idbPromise('meal', 'get');
    //       const items = meal.map(item => item._id);
    //       if (items.length) {
    //           const { data } = await addMeal({variables: { items } });
    //       }
    //     }
    // })
                  //   date: datedItem.date,
                  //     time: datedItem.time,
                  //     foodName: datedItem.description
                  // calories: datedItem[1008] 
                  // }
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

    const addToMeal = (food) => {
        // addToMeal(item)
        console.log(food)
        const {...datedItem} = food;
        // const keyNutrients = datedItem.reduce((acc,{nutrientId,...data})  => (acc[nutrientId]=data,acc),{})
        let calories = filterCalories(food.foodNutrients);
        
        console.log(calories);
        datedItem.date = dayjs().format('DD-MM-YYYY');
        
        datedItem.time = dayjs().format('HH:mm') ;//MM-YYYY'); 
        console.log(datedItem);

        dispatch({
            type: ADD_TO_MEAL,
            meal: {...datedItem, quantity: 1}
        
          });
          idbPromise('meal', 'put',  {...datedItem, quantity:1 })
    
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
        return <li>{props.value}</li>;
      }
      
    function NutrientList(props) {
        console.log(props);
        const nutrients = props.foodNutrients;
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
            <CardBody id={fdcId}>

            <CardTitle tag='h5'>{displayName}</CardTitle>
            {NutrientList(food)}

                
                </CardBody>
                {/* </Link>  */}
                
          {/* /> */}
          <Button onClick={addToMeal(food) }> </Button>
        </Card>
        
        
        </Col>
    )
};

export default FoodItem;
