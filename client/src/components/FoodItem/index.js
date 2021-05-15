import React from 'react';
import { useMealContext } from "../../utils/GlobalState";
import {ADD_TO_MEAL} from "../../utils/actions"
import {Col, Card, Button, CardBody, CardHeader } from 'reactstrap';
import {idbPromise} from "../../utils/helpers"
import {filterNutrients} from '../../utils/helpers'

const FoodItem = ( item ) => {
    const [state, dispatch] = useMealContext();
    const {
        fdcId,
        foodName,
        nutrientList,
    } = item;

    // const nutritionData = nutrientList.map(food => `${food.fdcId} : ${filterNutrients(food)}`);
    const addToMeal = () => {
          dispatch({
            type: ADD_TO_MEAL,
            food: {...item}
            // product: { ...item, purchaseQuantity: 1 }
          });
          idbPromise('meal', 'put',  {...item });
        }
      

    // const handleClick = async event => {
    // console.log(event.target);
    // setFoodSelection(fdcId);
    // };

    return (
    <Col sm="4">
        <Card outline color='secondary' >
            <CardHeader>{foodName} {fdcId}</CardHeader>
                <CardBody>
                {filterNutrients(nutrientList).map(nutrient => (
                    <div key={nutrient.nutrientId}>
                    {nutrient.nutrientName}: {nutrient.value}
                    </div>
                ))}
                </CardBody>
            <Button onClick={addToMeal}>Select</Button>
        </Card>
    </Col>
    )
};

export default FoodItem;
