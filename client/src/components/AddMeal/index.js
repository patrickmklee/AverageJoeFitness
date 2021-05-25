import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_MEAL } from '../../utils/mutations';
import { useScheduleContext } from "../../utils/GlobalState";
import {FdcSearchFood} from '../../utils/API.js';
import { UPDATE_FOODS_RESULTS } from '../../utils/actions';
import { idbPromise, filterNutrients } from '../../utils/helpers';

import { Container, Card, CardBody, Form, FormGroup, Label, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, CardHeader, CardTitle } from 'reactstrap';

const getDisplayName = function(food) { return `${food.dataType === 'Branded' && food.brandName ? food.brandName : ''} ${food.lowercaseDescription}`}

const AddMeal = (props) => {

  const [state, dispatch] = useScheduleContext();
  const { foods } = state;

  const [date, setDate] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  
  const [mealModal, setMealModal] = useState(false);

  const [addModal, setAddModal] = useState(false);

  const [currentFood, setCurrentFood] = useState({});

  const [mealResponse, setMealResponse] = useState([]);
  
  const toggle = () => setMealModal(!mealModal);

  const toggleAdd = () => setAddModal(!addModal);

  const [addMeal, { error }] = useMutation(ADD_MEAL)

  useEffect(() => {
    async function fetchFoodData() {
      if (mealResponse.data) {
        props.mealAdded(mealResponse)
      }
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

      } else {
        const foods = await idbPromise('foods', 'get');
        dispatch({
          type: UPDATE_FOODS_RESULTS,
          foods: {
            foods
          },
        });
      }
    }

    fetchFoodData();


  }, [currentSearch, dispatch, mealResponse]);

  async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      let mealData = await addMeal({
        variables: {
          date: document.getElementById("date-input").value, 
          time: document.getElementById("time-input").value,
          fdcId: currentFood.fdcId,
          foodName: currentFood.description,
          calories: Math.floor(currentFood.foodNutrients.filter(function(nutrient) {
            return nutrient.nutrientId == 1008;
          })[0].value)
        }
      })
      setMealResponse(mealData);
      
    } catch (e) {
      console.error(e);
    }

    toggle();
  };

  const handleSearchSubmit =  (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!searchInput ||  (currentSearch===searchInput )){
      return false;
    } 
    setCurrentSearch(searchInput);
  };

  function ListItem(props) {
    return <li>{props.value}</li>;
  }
  
  function NutrientList(props) {
    const nutrients = props.foodNutrients;

    return (
      <ul>
      
      {filterNutrients(nutrients).map( nutrient =>
      <ListItem key={nutrient.nutrientId} value={`${nutrient.nutrientName}: ${nutrient.value} ${nutrient.unitName}`} />
      )}
      </ul>
    )
  };

  return (
    <>
      <Button color="primary" onClick={toggle} className="my-2">Add Your Meal</Button>
      <Modal isOpen={mealModal} toggle={toggle} className="exercise-modal">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <h5>Meal</h5>
          <Form className="w-100" onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="date-input" size="lg">
                Date
              </Label>
              <Input
                type="date"
                name="dateInput"
                value={date}
                onChange={e => setDate(e.target.value)}
                id="date-input"
              />
              <Label for="date-input" size="lg">
                Time
              </Label>
              <Input
                type="time"
                name="timeInput"
                id="time-input"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="activity-input" size="lg">
                Search for food
              </Label>
              <Col sm={3}>
                <Button color="danger" onClick={toggleAdd}>
                  Add Item
                </Button>
              </Col>
              <Col sm={9}>
                <Input
                  type="text"
                  name="exerciseInput"
                  id="activity-input"
                  value={currentFood.description}
                  disabled
                />
              </Col>
            </FormGroup>
            <Button color="danger" type="submit" className="mt-3" onClick={ () => { props.mealAdded(mealResponse); } }>
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={addModal} toggle={toggleAdd} className="exercise-modal">
        <ModalHeader toggle={toggleAdd}></ModalHeader>
        <ModalBody>
          <h5>Add Meal Item</h5>
          <Form  className="w-100" onSubmit={handleSearchSubmit}>
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
            <Button color="danger" type="submit" className="mt-3">
              Search
            </Button>
          </Form>
          <div>
            {state.foods.length ? (
            <div className="flex-row">
            
              {state.foods.map( (food,index) => ( 

                <Col xs='12' md='12' className="mt-3">
                  <Card className="w-100" color='light'>
                    <CardHeader>{food.foodCategory}</CardHeader>

                    <CardBody>
                      <CardTitle tag='h5'>{getDisplayName(food)}</CardTitle>
                      {NutrientList(food)}
                      <Button onClick={() => {setCurrentFood(food); toggleAdd();} }>Add to Meal</Button>

                    </CardBody>
                  </Card>
                </Col>

                ))}

              </div> ) : (
                null
              )
            }
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddMeal;