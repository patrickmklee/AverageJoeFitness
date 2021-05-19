import gql from 'graphql-tag';


export const QUERY_TIMELINE = gql`
  query timeline {
    timeline {
      _id
      date {
        _id
        day
        schedule {
          _id
          time
          meal {
            _id
            itemName
            calories
          }
          exercise {
            _id
            category
            duration
          }
        }
    }
  }
}
`;
export const QUERY_FOODS = gql`
query timeline {
  timeline {
    date {
      schedule {
        meal {
          _id
          itemName
          calories
        }
      }
    }
  }
}
`
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
  username
  timeline {
    _id
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

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;