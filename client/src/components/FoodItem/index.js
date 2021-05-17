import React from 'react';
import dayjs from 'dayjs';
import Auth from '../../utils/auth';

import { useScheduleContext } from "../../utils/GlobalState";
import {ADD_TO_MEAL} from "../../utils/actions"
import {Col, Card, Button, CardBody, CardHeader, CardDeck, CardText, CardTitle } from 'reactstrap';
import {idbPromise} from "../../utils/helpers"
import { useMutation } from '@apollo/react-hooks';
import { ADD_MEAL } from '../../utils/mutations';

import {filterNutrients, convertNutrientName} from '../../utils/helpers'


const FoodItem = ( item ) => {
    const [state, dispatch] = useScheduleContext();
    const {
        _id,
        fdcId,
        foodCategories,
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

    const handleClick = item => {
        
        // alert(item._id);
        const datedItem = {...item};
        datedItem.date = dayjs().format();
        console.log(datedItem)
        dispatch({
            type: ADD_TO_MEAL,
            meal: {...datedItem}
            // product: { ...item, purchaseQuantity: 1 }
          });
          idbPromise('meal', 'put',  {...datedItem });
    }
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
    <Col xs='12' md='3'>
        <Card className="w-100" color='light' >
            <CardHeader>{foodCategories}</CardHeader>
                <CardBody>
                <CardTitle tag='h5'>{displayName}</CardTitle>
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
