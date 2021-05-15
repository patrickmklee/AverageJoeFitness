// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Timeline {
    _id: ID
    username: String
    schedule: [Schedule]
  }

  type Schedule {
    time: String
    meal: [Meal]
    exercise: Exercise
  }

  type Meal {
    itemName: String
    calories: Int
  }

  type Exercise {
    category: String
    duration: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    height: Int
    weight: Int
    Age: Int
    optimalCalories: Int
    timeline: Timeline
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    timelines(username: String): [Timeline]
    timeline: Timeline
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTimeline(username: String!): Timeline
    updateMeal(username: String!): Timeline
    deleteMeal(username: String!): Timeline
    updateExercise(username: String!, time: String): Timeline
    deleteExercise(username: String!, time: String): Timeline
  }
`;

module.exports = typeDefs;