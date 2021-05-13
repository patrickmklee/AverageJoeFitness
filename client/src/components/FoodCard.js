import React from 'react';
import {Card, CardImg, CardBody, CardHeader } from 'reactstrap';


const FoodCard = ( {food} ) => {
    const nutrientList = food.foodNutrients;
    
    
    const filteredNutrients =  nutrientList.filter( nutrient => nutrient.nutrientName === 'Protein');
    console.log(food);

    return (<div>{food && 
        <Card outline color='secondary' >
            <CardHeader>{food.lowercaseDescription}</CardHeader>
                <CardBody>
                    {filteredNutrients.map(nutrient => (
                        `${nutrient.nutrientName} : ${nutrient.value}`
                    // Calories: {food.nf_calories} <tr />
                    // Total Fat: {food.nf_total_fat} <tr />
                    // Total Carb: {food.nf_total_carbohydrate}<tr />
                    // Protein: {food.nf_protein}<tr />
                    // Sodium {food.nf_sodium}<tr />
                    ))}
                
            </CardBody>
          </Card>}
          </div>
    )
};

export default FoodCard;
