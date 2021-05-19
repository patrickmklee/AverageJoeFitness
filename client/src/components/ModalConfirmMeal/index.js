
import React, { useState } from 'react';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalConfirmMeal = (props) => {
    const {
      buttonLabel,
      className,
      displayName,
      foodNutrients
    } = props;
    
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="secondary" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <h5>{displayName}</h5>
            <p>{foodNutrients}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Add to Meal</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  export default ModalConfirmMeal;