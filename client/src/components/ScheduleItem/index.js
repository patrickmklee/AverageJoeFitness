import React from 'react';
import {Col, Card, Button, CardBody, CardHeader, CardText, List, CardTitle, CardGroup, CardDeck, CardFooter } from 'reactstrap';


const ScheduleItem = ({schedule}) => {
    const {day,_id, ...rest} = {...schedule};
    // console.log("In ScheduleItem")
    // console.log(rest);
    const [...scheduleItem] = rest.schedule;
    // console.log(schedule.schedule);

    // const {
    //     exercise
    // }
    return (
        <td>
        {scheduleItem.map( day => (
        <Card key={day._id} className="mt-2">
        <CardHeader tag='h3'>{day.time} </CardHeader>
        <CardBody>
        <CardTitle tag='h6'>{day.time}</CardTitle>
        {day.meal ? (
        <table className="table size-3">
                <thead>
                <th>Food</th>
                <th>Calories</th>
                
                </thead>
                <tbody>
                {day.meal.map(food => (
                <tr>
                <td>{food.itemName}</td>
                <td>{food.calories}</td>
                </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td>Total:</td>
                    <td>{day.mealTotalCalories}</td>
                </tr>
                </tfoot>
                </table>
            ) : null }
                    {day.exercise ? (
                    <div className="row">
                        
                    <table className="table">
                    <thead>
                    <th>Category</th>
                    {/* <th>Duration</th> */}
                    <th>Calories</th>
                    </thead>
                    <tbody>
                    <tr>
                    <td>{day.exercise.category}</td>
                    {/* <td>{day.exercise.duration}</td> */}
                    <td>{day.exerciseTotalCalories}</td>
                
                    </tr>
                    </tbody>
                </table>
                </div>
            ) : ( null )
             }
            <tr>
            <th>Daily Calories</th>
            <td right>{rest.totalConsumedCalories}</td>
            </tr>
            <tr>
            <th>Calories Burned</th>
            <td right>{rest.totalBurnedCalories}</td>
            </tr>
          
        </CardBody>
        </Card>
        ))}    
    </td>
    )
};
    

export default ScheduleItem;