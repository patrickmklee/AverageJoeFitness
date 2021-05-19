import { assertLeafType } from 'graphql';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Calendar from 'react-calendar';
import { ADD_EXERCISE } from '../../utils/mutations';

import { Container,
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
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalConfirmMeal = () => {

  const [date, setDate] = useState('');

  const [calendar, setCalendar] = useState(new Date());
  
  const [exerciseModal, setExerciseModal] = useState(false);

  const [calModal, setCalModal] = useState(false);
  
  const toggle = () => setExerciseModal(!exerciseModal);

  const toggleCal = () => setCalModal(!calModal);

  const [addExercise, { error }] = useMutation(ADD_EXERCISE)

  async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // console.log(document.getElementById("date-input").value);
    // console.log(document.getElementById("time-input").value);
    // console.log(document.getElementById("activity-input").value);
    // console.log(document.getElementById("duration-input").value);

    try {
      await addExercise({
        variables: {
          date: document.getElementById("date-input").value, 
          time: document.getElementById("time-input").value,
          category: document.getElementById("activity-input").value,
          duration: Math.floor(document.getElementById("duration-input").value)
        }
      });

      // clear form value
      // setBody('');
      // setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }

    toggle();
  };

  function getDate(value, event) {
    // console.log(event);
    if(event.target.getAttribute("aria-label")) {
      var newDate = event.target.getAttribute("aria-label");
    }
    else {
      var newDate = event.target.firstChild.ariaLabel;
    }

    setDate(newDate);

    toggleCal();
    toggle();
  }

  return (
    <div>
      <Button color="secondary" onClick={toggleCal}>Add Exercise</Button>
      <Modal isOpen={exerciseModal} toggle={toggle} className="exercise-modal">
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <h5>Exercise</h5>
          <Form className="w-100" onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="date-input" size="lg">
                Date
              </Label>
              <Input
                type="text"
                name="dateInput"
                value={date}
                onChange={e => setDate(e.target.value)}
                onClick={toggleCal}
                id="date-input"
              />
              <Label for="date-input" size="lg">
                Time
              </Label>
              <Input
                type="text"
                name="timeInput"
                id="time-input"
              />
              <Label for="activity-input" size="lg">
                Activity
              </Label>
              <Input
                type="text"
                name="exerciseInput"
                id="activity-input"
              />
              <Label for="duration-input" size="lg">
                Duration (In Minutes)
              </Label>
              <Input
                type="text"
                name="durationInput"
                id="duration-input"
              />
            </FormGroup>
            <Button color="danger" type="submit">
              Submit
            </Button>
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>

      <Modal isOpen={calModal} toggle={toggleCal} className="exercise-modal">
        <ModalHeader toggle={toggleCal}></ModalHeader>
        <ModalBody>
          <h5>Select Date</h5>
          <Calendar
            onChange={setCalendar}
            onClickDay={getDate}
            value={calendar}
          />
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default ModalConfirmMeal;