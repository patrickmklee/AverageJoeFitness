import React from 'react';
import {Card, CardImg, CardBody, CardHeader } from 'reactstrap';
import {filterNutrients} from '../utils/helpers.js'

const FoodCard = ( {food} ) => {
    console.log(food)
    const nutrientList = filterNutrients(food.foodNutrients)
    console.log(nutrientList);
    return (<div>{food && 
        <Card outline color='secondary' >
            <CardHeader>{food.lowercaseDescription}</CardHeader>
                <CardBody>
                    {nutrientList.map(nutrient => (
                        <div key={nutrientList.nutrientId}>
                        {nutrient.nutrientName}: {nutrient.value}
                        </div>
                    ))}
                
            </CardBody>
          </Card>}
          </div>
    )
};

export default FoodCard;
