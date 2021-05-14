import React from 'react';
import {Card, Button, CardBody, CardHeader } from 'reactstrap';

const FoodCard = ( {fdcId, nutrientList, foodName, setFoodSelection} ) => {

    const handleClick = async event => {
    console.log(event.target);
    setFoodSelection(fdcId);
    };

    return (<div>
        <Card outline color='secondary' >
            <CardHeader>{foodName}</CardHeader>
                <CardBody>
                    {nutrientList.map(nutrient => (
                        <div key={nutrientList.nutrientId}>
                        {nutrient.nutrientName}: {nutrient.value}
                        </div>
                    ))}
                <Button onClick={setFoodSelection}>Select</Button>
                </CardBody>
          </Card>
          </div>
    )
};

export default FoodCard;
