import { assertLeafType } from 'graphql';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Calendar from 'react-calendar';
import { ADD_MEAL } from '../../utils/mutations';

import { Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  InputGroup,
  Input,
  Row,
  Col,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SearchPage from '../../pages/SearchPage';

const AddMeal = () => {

  const [date, setDate] = useState('');

  const [calendar, setCalendar] = useState(new Date());
  
  const [mealModal, setMealModal] = useState(false);

  const [addModal, setAddModal] = useState(false);
  
  const toggle = () => setMealModal(!mealModal);

  const toggleAdd = () => setAddModal(!addModal);

  const [addMeal, { error }] = useMutation(ADD_MEAL)

  async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // console.log(document.getElementById("date-input").value);
    // console.log(document.getElementById("time-input").value);
    // console.log(document.getElementById("activity-input").value);
    // console.log(document.getElementById("duration-input").value);

    // try {
    //   await addExercise({
    //     variables: {
    //       date: document.getElementById("date-input").value, 
    //       time: document.getElementById("time-input").value,
    //       category: document.getElementById("activity-input").value,
    //       duration: Math.floor(document.getElementById("duration-input").value)
    //     }
    //   });

    //   // clear form value
    //   // setBody('');
    //   // setCharacterCount(0);
    // } catch (e) {
    //   console.error(e);
    // }

    toggle();
  };

  // function getDate(value, event) {
  //   // console.log(event);
  //   if(event.target.getAttribute("aria-label")) {
  //     var newDate = event.target.getAttribute("aria-label");
  //   }
  //   else {
  //     var newDate = event.target.firstChild.ariaLabel;
  //   }

  //   setDate(newDate);

  //   toggleCal();
  //   if (!mealModal){
  //     toggle();
  //   }
  // }

  return (
    <div>
      <Button color="secondary" onClick={toggle}>Record Your Meal</Button>
      <Modal isOpen={mealModal} toggle={toggle} className="exercise-modal">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <h5>Exercise</h5>
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
                  disabled
                />
              </Col>
            </FormGroup>
            <Button color="danger" type="submit">
              Submit
            </Button>
          </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>

      <Modal isOpen={addModal} toggle={toggleAdd} className="exercise-modal">
        <ModalHeader toggle={toggleAdd}></ModalHeader>
        {/* <SearchPage /> */}
        <ModalBody>
        <SearchPage />
</ModalBody>
          {/* <h5>Select Date</h5>
          <Form className="w-100" onSubmit={handleFormSubmit}>
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
                />
              </Col>
            </FormGroup>
            <Button color="danger" type="submit">
              Submit
            </Button>
          </Form>
        </ModalBody> */}

        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default AddMeal;