import gql from 'graphql-tag';


export const ADD_FOOD = gql`
  mutation addFood($itemName: String!) {
    addFood(itemName: $itemName){
      _id
      fdcId
      itemName
      calories  
    }
  }
`;