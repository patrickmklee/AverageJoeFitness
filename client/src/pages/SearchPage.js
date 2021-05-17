import React, { useState,useEffect } from 'react';
import { useScheduleContext } from "../utils/GlobalState";


import { useMutation } from '@apollo/react-hooks';
import { ADD_FOOD } from '../utils/mutations';
import { useQuery } from '@apollo/react-hooks';
import Auth from '../utils/auth';

import {FdcSearchFood} from '../utils/API.js';
// import FoodResultDisplay from '../components/FoodResultDisplay.js'
import FoodItem from '../components/FoodItem';
import {filterNutrients} from '../utils/helpers';
// import ModalConfirmSelection from '../components/ModalConfirmSelection';
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button
} from 'reactstrap';
import { UPDATE_SEARCH_CRITERIA, UPDATE_FOODS_RESULTS, UPDATE_TIMELINE } from '../utils/actions';
import { QUERY_ME_BASIC, QUERY_ME, QUERY_TIMELINE } from '../utils/queries';

import { idbPromise } from '../utils/helpers';

const getDisplayName = (food) => { return `${food.dataType === 'Branded' && food.brandName ? food.brandName : ''} ${food.description}`}

const SearchPage = () => {
  const [state, dispatch] = useScheduleContext();
  const { meal } = state;

  const [searchedFood, setSearchResult] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [foodSelection, setFoodSelection] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  
  // const [addFood, { error }] = useMutation(ADD_FOOD);
  const { loading, data } = useQuery(QUERY_TIMELINE);

  // useEffect(() => {
  //   if(data) {
  //     dispatch({
  //          type: UPDATE_PRODUCTS,
  //         products: data.products
  //       });
  //       data.products.forEach((product) => {
  //         idbPromise('products', 'put', product);
  //       });
  //   } else if (!loading) {
  //     idbPromise('products', 'get').then((products) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //        products: products
  //      });
  //     });
  //   }
  // }, [data, loading, dispatch]);
  // // useEffect(() => {
  // //   document.title = `${foodSelection} fdcid`;
  // // }, [foodSelection]);
  // // const {searchCriteria} = state;
  // useEffect(() => {
  //   if(data) {
  //     dispatch({
  //          type: UPDATE_FOODS_RESULTS,
  //         products: data.products
  //       });
  //       data.products.forEach((product) => {
  //         idbPromise('products', 'put', product);
  //       });
  //   } else if (!loading) {
  //     idbPromise('products', 'get').then((products) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //        products: products
  //      });
  //     });
  //   }
  // }, [data, loading, dispatch]);


    // const foods = searchedFood?.foods||[];
    useEffect(() => {
      console.log(state);
      if (searchedFood) {
        console.log(searchedFood);
        
        dispatch({
        type: UPDATE_FOODS_RESULTS,
        foods: searchedFood.foods,
        searchCriteria: searchedFood.foodSearchCritera
        })
        searchedFood.foods.forEach((food) => {
                idbPromise('foods', 'put', food);
        });
      
      // } else  {
      //   idbPromise('foods', 'get').then((foods) => {
      //     dispatch({
      //         type: UPDATE_FOODS_RESULTS,
      //         foods: foods,
      //         // searchCriteria: searchedFood.foodSearchCritera
      //     });
      //   });
      }}
      , [searchedFood, dispatch]);
      
    const handleSearch = async query => {
      try {
      const response = await FdcSearchFood(process.env.REACT_APP_USDA_API_KEY, query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      setSearchResult(data);
      // setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    } 
    setCurrentSearch(searchInput);

    handleSearch(searchInput);
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
        {searchedFood ? (
        <Row className="flex-row">
          {searchedFood.foods.map( (food,index)  => ( 
        // <div key={food.fdcId} className='d-flex-inline'>
        // <Col sm="4" key={food.fdcId}>
        <FoodItem
          key={index}
          _id={food.fdcId}
          className={`mt-2`}
          
          fdcId={food.fdcId}
          foodName={food.foodName}
          displayName={getDisplayName(food)}
          foodNutrients={food.foodNutrients}
        />
        
        // </Col>
        ))}
        </Row> ) : (
      <p>You haven't added any products yet!</p>
    )}
    </Container>
        


</div>
    )}

  export default SearchPage;