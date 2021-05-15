import {React, useEffect} from 'react';

import { useMealContext } from "../utils/GlobalState";

import {idbPromise} from "../utils/helpers"
import {filterNutrients} from '../utils/helpers.js'
import {UPDATE_FOODS_RESULTS, UPDATE_SEARCH_CRITERIA} from "../utils/actions"
import {Row,
  Col,
  Container
} from 'reactstrap';
import FoodCard from '../components/FoodCard.js';

const getDisplayName = (food) => { return `${food.dataType === 'Branded' && food.brandName ? food.brandName : ''} ${food.description}`}
// const getDataTypes = (food) => 

const FoodResultDisplay = ( {foodSelection, setFoodSelection} ) => {
    // const [modal, setModal] = useState(false);
    const [state, dispatch] = useMealContext();
    const nutritionData = state.foods.map(food => `${food.fdcId} : ${filterNutrients(food)}`);

    useEffect(() => {
      dispatch({
        type: UPDATE_FOODS_RESULTS,
        foods: nutritionData
      })},[]);
        // const {} = state;
  
    // const { loading, data } = useQuery(QUERY_PRODUCTS);
    // const filteredFoods = searchedFood.map(food => filterNutrients(food.foodNutrients));
    // console.log(foods);
    return (
        <Container fluid>
        <Row>
        {state.foods.map( (food)  => ( 
        // <div key={food.fdcId} className='d-flex-inline'>
        // <Col sm="4" key={food.fdcId}>
        <FoodCard
        key={food.fdcId}
        className={`mt-2 body`}
        foodName={getDisplayName(food)}
        nutrientList={nutritionData[food.fdcId]}
        fdcId={food.fdcId}
        setFoodSelection={setFoodSelection}
        />
        // </Col>
        ))}
    </Row>
    </Container>
    );
};

export default FoodResultDisplay;