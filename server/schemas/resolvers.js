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

    timeline: async (parent, { _id }) => {
      return Timeline.findOne({ _id });
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

    addTimeline: async (parent, args, context) => {
      if (context.user) {
        const timeline = await Timeline.create({ ...args, username: context.user.username });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { timeline: timeline._id } },
          { new: true }
        );
    
        return timeline;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;