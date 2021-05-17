
import React, { useState } from 'react';
import { useScheduleContext } from '../../utils/GlobalState';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalConfirmMeal = (props) => {
    const {
      buttonLabel,
      className,
      food
    } = props;
    
    const [modal, setModal] = useState(false);
    const [state,dispatch] = useScheduleContext;
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>{food}</ModalHeader>
          <ModalBody>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  export default ModalConfirmMeal;