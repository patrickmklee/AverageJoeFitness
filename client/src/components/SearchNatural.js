import React from 'react';
import {Card, CardText, CardTitle, CardImg, CardBody, CardHeader, CardColumns, Col } from 'reactstrap';

const SearchNatural = ( {food} ) => {
    console.log(food);

    return (<div>{food && 
        <Card outline color='secondary' >
            <CardHeader>{food.food_name}</CardHeader>
                <CardBody>
                Calories: {food.nf_calories} <tr />
                Total Fat: {food.nf_total_fat} <tr />
                Total Carb: {food.nf_total_carbohydrate}<tr />
                Protein: {food.nf_protein}<tr />
                Sodium {food.nf_sodium}<tr />
                <CardImg top src={food.photo.thumb} alt="gif" />
            </CardBody>
          </Card>}
          </div>
    )
};

export default SearchNatural;
