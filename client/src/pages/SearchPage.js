import React, { useState,useEffect } from 'react';
import { useScheduleContext } from "../utils/GlobalState";
import { nanoid } from 'nanoid'

import { useMutation } from '@apollo/react-hooks';

import { useQuery } from '@apollo/react-hooks';
import Auth from '../utils/auth';

import {FdcSearchFood} from '../utils/API.js';
// import FoodResultDisplay from '../components/FoodResultDisplay.js'
import FoodItem from '../components/FoodItem';

// import ModalConfirmSelection from '../components/ModalConfirmSelection';
import { UPDATE_SEARCH_CRITERIA, UPDATE_FOODS_RESULTS, UPDATE_TIMELINE } from '../utils/actions';
import { QUERY_ME_BASIC, QUERY_ME, QUERY_TIMELINE } from '../utils/queries';
import { ADD_MEAL } from '../utils/mutations';

import { filterCalories, filterNutrients, idbPromise } from '../utils/helpers';

import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  InputGroup,
  Input,
  Row,
  Col,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
const getDisplayName = (food) => {
  return `${food.dataType === 'Branded' && food.brandName ? food.brandName : ''} ${food.lowercaseDescription}`
}



const SearchPage = () => {
  const [state, dispatch] = useScheduleContext();
  const { foods } = state;

  const [searchedFood, setSearchResult] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [foodSelection, setFoodSelection] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  
  // const [addFood, { error }] = useMutation(ADD_FOOD);
  const { loading, data } = useQuery(QUERY_TIMELINE);
  const [modal, setModal] = useState(false);

    // const foods = searchedFood?.foods||[];
    useEffect( () => {
      async function fetchFoodData() {
      // console.log('searchPage useEffect')
      // console.log(state);
      if (currentSearch !== '') {
        try {
        const response = await FdcSearchFood(process.env.REACT_APP_USDA_API_KEY, currentSearch);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        const data = await response.json();
        dispatch({
          type: UPDATE_FOODS_RESULTS,
          foods: data.foods,
          })
          data.foods.forEach((food) => {
            idbPromise('foods', 'put', food);
          });

         } catch (err) {
            console.error(err);
   
      
          }

    
      } else  {
        const foods = await idbPromise('foods', 'get');
        // .then((foods) => {
          dispatch({
              type: UPDATE_FOODS_RESULTS,
              foods: {foods},
          });
      //   })
      }
    }
    
    fetchFoodData();
      
      
    }, [currentSearch, dispatch]);

  // console.log(filterNutrients(state.foods));
  const handleFormSubmit =  (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!searchInput ||  (currentSearch===searchInput )){
      return false;
    } 
    setCurrentSearch(searchInput);
  };
  

    return (
      <div>
        <Container>
          <Row className="row">
          <Col sm="12" md={{ size:6, offset: 3 }}>
            <Card spacing-three color="primary">
              <CardBody>
                <Form  className="w-100" onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="Search" size="lg">
                    Search for a Food
                    </Label>
                    <Input
                      type="text"
                      name="searchInput"
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                    />
                  </FormGroup>
                  <Button color="danger" type="submit">
                    Search
                  </Button>
                </Form>
                </CardBody>
              </Card>
              </Col>
              </Row>
      </Container>
      <Container fluid>
        {state.foods.length ? (
        <Row className="flex-row">
          {state.foods.map( (food)  => ( 
            <FoodItem
              calories={filterCalories(food.foodNutrients)}
              key={food.fdcId}
              fdcId={food.fdcId}
              dataType={food.dataType}
              displayName={getDisplayName(food)}
              foodCategories={food.foodCategory}  
              foodNutrients={food.foodNutrients}
            /> 
          
          ))}
        

          
        </Row> ) : (
      null
    )}

    </Container>
        


</div>
    )}

  export default SearchPage;