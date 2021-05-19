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
    <div>
        {schedule.map( time => (
        <Card key={time._id}>
        <CardHeader>{time.time}</CardHeader>
        <CardBody>
        {time.meal ? (
                <table className="table">
                    <th>Food</th>
                    <th>Calories</th>
                    {time.meal.map(food => (
                    <tr>
                    
                    <td>{food.itemName}</td>
                    <td>{food.calories}</td>
                {/* <CardText tag="h5">{food.itemName} : {food.calories}</CardText> */}
                </tr>
                    ))}
                </table>
            ) : null }
        <CardText>{time.exercise.category} </CardText>
        <CardText>{time.exercise.duration} </CardText>
        </CardBody>
        </Card>
        )
        )}
       {/* {time.map( ({meal}) => (
//              <CardBody>
            
//                 <div key={meal._id}>

//                 {meal.map(food=> 
//                 <h5>{food.itemName}</h5>
//                 <List type="unstyled">
//                     <li>Calories: {food.calories}</li>
//                 </List>
//             )
//                 </div>
//             ))};
//             </CardBody>
//             </Card>
//             <Card>
//             <CardBody>
//             <CardText> 
//             <h5>{schedule.exercise.category}</h5>  
//             <p>{schedule.exercise.duration}</p>
//             </CardText>
                    
//             </CardBody>
//         </Card> */}
    </div>)
};
                

export default ScheduleItem;