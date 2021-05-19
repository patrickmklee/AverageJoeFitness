import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_MEAL = gql`
mutation addMeal($date: String!, $time: String!, $foodName: String!, $calories: Int!) {
  addMeal(date: $date, time: $time, meal: [{itemName: $foodName, calories: $calories}]) {
     username
      date {
        day
        schedule {
          time
          meal {
            itemName
            calories
          }
          exercise {
            category
            duration
          }
        }
      }
  }
  }
    
`;
// export const ADD_MEAL = gql`
//   mutation addMeal
//   `;
export const ADD_FOOD = gql`
  mutation addFood($itemName:String!) {
    addFood {
      id
      itemName
      calories
    }
  }  
`;
// mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  // addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username,  email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;