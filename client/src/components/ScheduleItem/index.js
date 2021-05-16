import React from 'react';
import {Col, Card, Button, CardBody, CardHeader, CardText, List, CardTitle, CardGroup, CardDeck } from 'reactstrap';


const ScheduleItem = ( {schedule} ) => {
    console.log("In ScheduleItem")
    console.log(schedule);
    // console.log(schedule.schedule);

    // const {
    //     exercise
    // }
    return (
        <Col sm="3" className="m-0">
            <h4>{schedule.time}</h4>
            <Card>
            <CardBody>
            <CardText>
            {schedule.meal.map( (food, index) => (
            <div key={index}>
                <h5>{food.itemName}</h5>
                <List type="unstyled">
                    <li>Calories: {food.calories}</li>
                </List>
                    
                </div>))};
            </CardText>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
            <CardText> 
            <h5>{schedule.exercise.category}</h5>  
            <p>{schedule.exercise.duration}</p>
            </CardText>
                    
            </CardBody>
        </Card>
        </Col>
                )            };

export default ScheduleItem;