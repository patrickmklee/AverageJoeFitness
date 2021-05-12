import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardHeader,
  Button
} from 'reactstrap';
import { fetchNatural } from '../utils/API';
// import SearchResult from '../components/SearchResult'
import SearchNatural from '../components/SearchNatural'
const SearchPage = () => {
  useEffect(() => {
    handleSearch('eggs, bacon and waffles');
  }, []);
  const [searchedFood, setSearchResult] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async query => {
    try {
      const response = await fetchNatural(query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const foods = await response.json();
      console.log(foods);
      setSearchResult(foods['foods']);//.common[0].photo.thumb);
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
          <Col sm="12" md={{ size: 4, offset: 3 }}>
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
              <Row className="d-flex">
                {searchedFood && searchedFood.map( food => (
                <Col key={food.tags.tag_id} sm="6" md={{ size: 2 }}  >
                <SearchNatural
                  food={food}
              />
              </Col>))}
              </Row>
              
          

          

      </div>
    )}

  export default SearchPage;