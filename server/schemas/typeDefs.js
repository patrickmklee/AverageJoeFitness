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
    totalConsumedCalories: Int
    totalBurnedCalories: Int
  }

  type Schedule {
    _id: ID
    time: String
    meal: [Meal]
    mealTotalCalories: Int
    exercise: Exercise
    exerciseTotalCalories: Int
  }

  input MealInput {
    fdcId: Int
    itemName: String
    quantity: Int
    calories: Int
  }

  type Meal {
    _id: ID
    fdcId: Int
    itemName: String
    quantity: Int
    calories: Int
  }

  input ExerciseInput {
    category: String
    duration: Int
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
    age: Int
    gender: String
    optimalCalories: Int
    timeline: Timeline
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    timeline: Timeline
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String! age: Int!, gender: String!, height: Int!, weight: Int!): Auth
    updateUser(height: Int, weight: Int, age: Int, gender: String): User
    updatePassword(password: String!): Auth
    deleteUser: Auth
    addMeal(date: String!, time: String!, meal: [MealInput]): Timeline
    deleteMeal(date: String!, time: String!): Timeline
    addExercise(date: String!, time: String!, exercise: ExerciseInput): Timeline
    deleteExercise(date: String!, time: String!): Timeline
  }
`;

module.exports = typeDefs;