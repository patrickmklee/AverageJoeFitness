import React, { useState,useEffect } from 'react';
import { useMealContext } from "../utils/GlobalState";


import { useMutation } from '@apollo/react-hooks';
import { ADD_FOOD } from '../utils/mutations';
import { useQuery } from '@apollo/react-hooks';

import {FdcSearchFood} from '../utils/API.js';
// import FoodResultDisplay from '../components/FoodResultDisplay.js'
import FoodItem from '../components/FoodItem';
import {filterNutrients} from '../utils/helpers';
import TimelinePage from './Home.js';
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
import { UPDATE_SEARCH_CRITERIA, UPDATE_FOODS_RESULTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

const getDisplayName = (food) => { return `${food.dataType === 'Branded' && food.brandName ? food.brandName : ''} ${food.description}`}

const SearchPage = () => {
  const [state, dispatch] = useMealContext();
  // const { searchCriteria } = state;

  const [searchedFood, setSearchResult] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [foodSelection, setFoodSelection] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  
  const [addFood, { error }] = useMutation(ADD_FOOD);
  // const { loading, data } = useQuery(QUERY_PRODUCTS);

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


    
    // useEffect(() => {
    //   dispatch({
    //     type: UPDATE_FOODS_RESULTS,
    //     foods: searchedFood
    //   })
    //   }, [currentSearch]
    //   );
    const handleSearch = async query => {
      try {
      const response = await FdcSearchFood(process.env.REACT_APP_USDA_API_KEY, query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      setCurrentSearch(query);
      setSearchResult(data.foods);
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
    handleSearch(searchInput);
  };
    return (
      <div>
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card body inverse color="primary">
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
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
                    SUBMIT
                  </Button>
                </Form>
                </CardBody>
              </Card>
              </Col>
              </Row>
          </Container>
        <Container fluid>
        {searchedFood.length ? (
        <Row>
          {searchedFood.map( (food)  => ( 
        // <div key={food.fdcId} className='d-flex-inline'>
        // <Col sm="4" key={food.fdcId}>
        <FoodItem
        key={food.fdcId}
        className={`mt-2 body`}
        foodName={getDisplayName(food)}
        nutrientList={food.foodNutrients}
        fdcId={food.fdcId}
        // setFoodSelection={setFoodSelection}
        />
        // </Col>
        ))}
        </Row>
        ) : (
        <p>You haven't added any products yet!</p>
    )}
        </Container>
    </div>
    )}

  export default SearchPage;