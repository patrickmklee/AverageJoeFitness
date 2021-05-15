import gql from 'graphql-tag';


export const QUERY_TIMELINE = gql`
query getTimeline($_id  : [ID]!) {
    timeline( _id : $_id ) {
        schedule {
            time
            meal {
            itemName
            calories
            }
        }
    }
}
`;
export const QUERY_USER = gql`
{
  user {
    username
  }
}
`;