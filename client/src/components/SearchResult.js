import React from 'react';
import { Col, Row, Card, CardText, CardTitle, CardImg, CardBody } from 'reactstrap';

const SearchResult = ( {foods} ) => {
    console.log(foods);
    return (
        <div>{foods &&   
        foods.map( food => (
            <Col sm="4" md={{ size: 2, offset: 2 }} key={food.tag_id}>
            <Card outline color='secondary' >
            <CardTitle>Title: {food.food_name}</CardTitle>
            <CardImg bottom src={food.photo.thumb} alt="gif" />
            <CardBody>
                <CardText>
                {food.serving_unit}<br/> 
                {food.tag_name}<br/> 
                {food.serving_qty}<br/> 
                {food.common_type}<br/> 
                {food.tag_id}<br/>
                </CardText>
            </CardBody>
          </Card>
          </Col>

      ))}
  </div>
    )
};

export default SearchResult;
