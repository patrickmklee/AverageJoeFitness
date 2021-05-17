const { AuthenticationError } = require('apollo-server-express');
const { User, Timeline } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('timeline');
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    timelines: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Timeline.find(params).sort({ createdAt: -1 });
    },

    timeline: async (parent, args, context) => {
      if (context.user) {
        return await Timeline.findOne({ username: context.user.username })
      }

      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('timeline');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('timeline');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      const timeline = await Timeline.create({ ...args, username: user.username });
  
      await User.findByIdAndUpdate(
        { _id: user._id },
        { timeline: timeline._id },
        { new: true }
      );
  
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },

    addMeal: async (parent, args, context) => {
      if (context.user) {
        userDate = await Timeline.findOne({
          username: context.user.username,
          date: {
            $elemMatch: {
              day: args.date
            }
          }
        })

        // console.log(userDate);
        if(userDate === null) {
          // console.log("DATE DOES NOT EXIST")
          mealData = await Timeline.findOneAndUpdate(
            { username: context.user.username },
            { $addToSet: { date: { day: args.date, schedule: [{time: args.time, meal: args.meal}]} }},
            {
              new: true,
              // multi: true,
              // arrayFilters: [{ "i.day": args.date}, {"j.time": args.time,}]
            }
          );
          return mealData;
        }
        
        // console.log("DATE EXISTS");

        userTime = await Timeline.findOne({
          username: context.user.username,
          date: {
            $elemMatch: {
              day: args.date,
              schedule: {
                $elemMatch: {
                  time: args.time
                }
              }
            }
          }
        })

        if(userTime === null) {
          // console.log("TIME DOES NOT EXIST");
          mealData = await Timeline.findOneAndUpdate(
            { username: context.user.username },
            { $addToSet: { "date.$[i].schedule": [{time: args.time, meal: args.meal}] }},
            {
              new: true,
              multi: true,
              arrayFilters: [{ "i.day": args.date}]
            }
          );
          return mealData;
        }

        // console.log("TIME EXISTS")
        mealData = await Timeline.findOneAndUpdate(
          { username: context.user.username },
          { $set: { "date.$[i].schedule.$[j].meal": args.meal }},
          {
            new: true,
            multi: true,
            arrayFilters: [{ "i.day": args.date}, {"j.time": args.time}]
          }
        );

        return mealData;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    addExercise: async (parent, args, context) => {
      if (context.user) {
        userDate = await Timeline.findOne({
          username: context.user.username,
          date: {
            $elemMatch: {
              day: args.date
            }
          }
        })

        // console.log(userDate);
        if(userDate === null) {
          console.log("DATE DOES NOT EXIST")
          exerciseData = await Timeline.findOneAndUpdate(
            { username: context.user.username },
            { $addToSet: { date: { day: args.date, schedule: [{time: args.time, exercise: args.exercise}]} }},
            {
              new: true,
              // multi: true,
              // arrayFilters: [{ "i.day": args.date}, {"j.time": args.time,}]
            }
          );
          return exerciseData;
        }
        
        // console.log("DATE EXISTS");

        userTime = await Timeline.findOne({
          username: context.user.username,
          date: {
            $elemMatch: {
              day: args.date,
              schedule: {
                $elemMatch: {
                  time: args.time
                }
              }
            }
          }
        })

        if(userTime === null) {
          // console.log("TIME DOES NOT EXIST");
          exerciseData = await Timeline.findOneAndUpdate(
            { username: context.user.username },
            { $addToSet: { "date.$[i].schedule": [{time: args.time, exercise: args.exercise}] }},
            {
              new: true,
              multi: true,
              arrayFilters: [{ "i.day": args.date}]
            }
          );
          return exerciseData;
        }

        // console.log("TIME EXISTS")
        exerciseData = await Timeline.findOneAndUpdate(
          { username: context.user.username },
          { $set: { "date.$[i].schedule.$[j].exercise": args.exercise }},
          {
            new: true,
            multi: true,
            arrayFilters: [{ "i.day": args.date}, {"j.time": args.time}]
          }
        );

        return exerciseData;
      }
    
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;