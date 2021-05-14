import React from 'react';
import {Row,
  Col,
  Container
} from 'reactstrap';

import {filterNutrients} from '../utils/helpers.js'

import FoodCard from '../components/FoodCard.js';

const getDisplayName = (food) => { return `${food.dataType === 'Branded' && food.brandName ? food.brandName : ''} ${food.description}`}


const FoodResultDisplay = ( {searchedFood, foodSelection, setFoodSelection} ) => {
    // const [modal, setModal] = useState(false);
    // const filteredFoods = searchedFood.map(food => filterNutrients(food.foodNutrients));
    console.log(searchedFood);
    return (
        <Container fluid>
        <Row>
        {searchedFood && searchedFood.map( (food)  => ( 
        // <div key={food.fdcId} className='d-flex-inline'>
        <Col sm="4" key={food.fdcId}>
        <FoodCard
        className={`m-0 body inverse color=light`}
        foodName={getDisplayName(food)}
        nutrientList={filterNutrients(food.foodNutrients)}
        fdcId={food.fdcId}
        setFoodSelection={setFoodSelection}
        />
        </Col>
        ))}
    </Row>
    </Container>
    );
};

export default FoodResultDisplay;