// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Timeline {
    _id: ID
    username: String
    date: [Date]
  }

  type Date {
    _id: ID
    day: String
    schedule: [Schedule]
  }

  type Schedule {
    _id: ID
    time: String
    meal: [Meal]
    exercise: Exercise
  }

  input MealInput {
    itemName: String
    calories: Int
  }

  type Meal {
    _id: ID
    itemName: String
    calories: Int
  }

  input ExerciseInput {
    category: String
    duration: Int
  }

  type Exercise {
    _id: ID
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
    addMeal(date: String!, time: String!, meal: [MealInput]): Timeline
    deleteMeal(date: String!, time: String!): Timeline
    addExercise(date: String!, time: String!, exercise: ExerciseInput): Timeline
    deleteExercise(date: String!, time: String!): Timeline
  }
`;

module.exports = typeDefs;