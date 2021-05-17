import gql from 'graphql-tag';


export const QUERY_TIMELINE = gql`
  query me {
    timeline {
      _id
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
`;


export const QUERY_ME = gql`
query me {
  _id
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;