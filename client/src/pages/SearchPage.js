import React, { useState } from 'react';
import {
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
import {FdcSearchFood} from '../utils/API.js';
import FoodCard from '../components/FoodCard.js';


const SearchPage = () => {
  const [searchedFood, setSearchResult] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async query => {
    try {
      const response = await FdcSearchFood(process.env.REACT_APP_USDA_API_KEY, query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      setSearchResult(data.foods);
      setSearchInput('');
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
              <Row>
                {searchedFood && searchedFood.map( food => ( 
                <Col key={food.fdcId} sm="4" md={{ size: 2, offset: 0}}>
                <FoodCard
                  food={food}
                />
                </Col>))}
                
              </Row>
              
          

          

      </div>
    )}

  export default SearchPage;