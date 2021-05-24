import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_EXERCISE } from '../../utils/mutations';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const AddExercise = () => {

  const [date, setDate] = useState('');
  
  const [exerciseModal, setExerciseModal] = useState(false);
  
  const toggle = () => setExerciseModal(!exerciseModal);

  const [addExercise, { error }] = useMutation(ADD_EXERCISE)

  async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await addExercise({
        variables: {
          date: document.getElementById("date-input").value, 
          time: document.getElementById("time-input").value,
          category: document.getElementById("activity-input").value,
          duration: Math.floor(document.getElementById("duration-input").value)
        }
      });
    } catch (e) {
      console.error(e);
    }

    toggle();
  };

  return (
    <>
      <Button color="secondary" onClick={toggle} className="my-2 ms-2">Add Your Exercise</Button>
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
            <Button color="primary" type="submit" className="mt-3">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle} className="mt-3 ms-2">
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddExercise;