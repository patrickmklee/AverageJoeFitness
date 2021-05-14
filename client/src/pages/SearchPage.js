import React, { useState,useEffect } from 'react';
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
import { useMutation } from '@apollo/react-hooks';
import { ADD_FOOD } from '../utils/mutations';

import {FdcSearchFood} from '../utils/API.js';
import FoodResultDisplay from '../components/FoodResultDisplay.js'

const SearchPage = () => {
  const [searchedFood, setSearchResult] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [foodSelection, setFoodSelection] = useState('');
  const [addFood, { error }] = useMutation(ADD_FOOD);
  useEffect(() => {
    document.title = `${foodSelection} fdcid`;
  }, [foodSelection]);
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

              <FoodResultDisplay 
                setFoodSelection={setFoodSelection}
                foodSelection={foodSelection}
                searchedFood={searchedFood}
                />
</div>
    )}

  export default SearchPage;