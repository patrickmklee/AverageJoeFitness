const { Schema, model } = require('mongoose');
const User = require('./User');

const timelineSchema = new Schema(
  {
    username: {
      type: String,
      ref: 'User'
    },
    date: [
      {
        day: {
          type: String,
          required: true,
          unique: true,
        },
        schedule: [
          {
            time: {
              type: String,
              required: true,
              unique: true,
            },
            meal: [
              {
                fdcId: {
                  type: Number,
                  required: true
                },
                itemName: {
                  type: String,
                  required: true
                },
                quantity: {
                  type: Number,
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

timelineSchema.path('date').schema.path('schedule').schema.virtual('mealTotalCalories').get(function(){
  // console.log(this.meal.reduce((total, obj) => obj.calories + total,0));
  return this.meal.reduce((total, obj) => obj.calories + total, 0);
});

timelineSchema.path('date').schema.virtual('totalConsumedCalories').get(function(){
  // console.log(this.meal.reduce((total, obj) => obj.calories + total,0));
  return this.schedule.reduce((total, obj) => obj.mealTotalCalories + total, 0);
});

timelineSchema.path('date').schema.path('schedule').schema.virtual('exerciseTotalCalories').get(async function(){
  // console.log(this.meal.reduce((total, obj) => obj.calories + total,0));
  const userInfo = await User.findOne({ username: this.parent().parent().username }, function(err, docs) {
    return docs
  })
  .select('username weight');
  const met = 5;
  const caloriesBurned =  this.exercise.duration * met * 3.5 * ( userInfo.weight / 2.2046 ) / 200;
  return Math.round(caloriesBurned);
});

timelineSchema.path('date').schema.virtual('totalBurnedCalories').get(async function(){
  const userInfo = await User.findOne({ username: this.parent().username }, function(err, docs) {
    return docs
  })
  .select('username weight');
  // return await this.schedule.reduce((total, obj) => obj.exerciseTotalCalories + total, 0);
  // const totals = this.reduce((total, obj) => {
  //   obj.schedule.forEach()
  // });
  // this.schedule.forEach((val) => {
  //   console.log(val);
  // })
  // this.schedule.reduce()
  return 0;
});

const Timeline = model('Timeline', timelineSchema);

module.exports = Timeline;