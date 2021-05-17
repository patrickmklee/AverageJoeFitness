import gql from 'graphql-tag';


export const QUERY_TIMELINE = gql`
  query timeline {
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

export const QUERY_ME_BASIC = gql`
query me {
  _id
  username
  email

}
`;

export const QUERY_ME = gql`
query me {
  _id
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;