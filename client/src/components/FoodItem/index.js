import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import { useMealContext } from "../../utils/GlobalState";
import {ADD_TO_MEAL} from "../../utils/actions"
import {Col, Card, Button, CardBody, CardHeader } from 'reactstrap';
import {idbPromise} from "../../utils/helpers"
import { useMutation } from '@apollo/react-hooks';
import { ADD_MEAL } from '../../utils/mutations';

import {filterNutrients, convertNutrientName} from '../../utils/helpers'

const FoodItem = ( item ) => {
    const [state, dispatch] = useMealContext();
    const {
        _id,
        fdcId,
        foodName,
        foodNutrients,
        displayName
    } = item;
    // const {currentSearchCriteria} = state;
    // const nutritionData = nutrientList.map(food => `${food.fdcId} : ${filterNutrients(food)}`);
    // const addToMeal = () => {
    //       dispatch({
    //         type: ADD_TO_MEAL,
    //         food: {...item}
    //         // product: { ...item, purchaseQuantity: 1 }
    //       });
    //       idbPromise('meal', 'put',  {...item });
    //     // const mealItem = 
    //     }
    // const {searchCriteria} = state;
    // useEffect(() => {
    //     if (searchCriteria) {

    //     }
    // })
    // }
    // console.log(foodNutrients);
    const keyNutrients = filterNutrients(foodNutrients).reduce((acc,{nutrientId,...data})  => (acc[nutrientId]=data,acc),{});
    // console.log(foodNutrients);
    // console.log(keyNutrients);

    const handleClick = (item => {
        console.log(item)
        // alert(item._id);
        dispatch({
            type: ADD_TO_MEAL,
            meal: {...item}
            // product: { ...item, purchaseQuantity: 1 }
          });
          idbPromise('meal', 'put',  {...item });
    })
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
    <Col sm="4">
        <Card outline color='secondary' >
            <CardHeader>{displayName}</CardHeader>
                <CardBody>
                {NutrientList(item)}
                {/* <ul>
                    
                {filterNutrients(foodNutrients).map(nutrient => (
                    <li key={nutrient.nutrientId} value={nutrient.value}>
                    {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                    </li>
                ))}
                </ul> */}

                </CardBody>
                
            <Button onClick={() => {handleClick(item)}}>Add to Meal</Button>
        </Card>
    </Col>
    )
};

export default FoodItem;
