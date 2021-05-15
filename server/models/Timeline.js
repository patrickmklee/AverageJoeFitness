const { Schema, model } = require('mongoose');

const timelineSchema = new Schema(
  {
    username: {
      type: String,
      ref: 'User'
    },
    schedule: [
      {
        time: {
          type: String,
          required: true
        },
        meal: [
          {
            itemName: {
              type: String,
              required: true
            },
            calories: {
              type: Number,
              required: true
            }
          }
        ],
        exercise: {
          category: {
            type: String,
            required: true
          },
          duration: {
            type: Number,
            required: true
          }
        }
      }
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

const Timeline = model('Timeline', timelineSchema);

module.exports = Timeline;