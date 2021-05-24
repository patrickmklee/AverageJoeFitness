const { Schema, model, ObjectIds } = require('mongoose');
const User = require('./User');

const timelineSchema = new Schema(
  {
    username: {
      type: String,
      ref: 'User'
    },
    date: {
      default: undefined,
      unique: false,
      sparse: true,
      // index: false,
      type: [
        {
          day: {
            type: String,
            default: null,
            // sparse: true,
            index: false
            // required: true,
            // unique: true,
          },
          schedule: [
            {
              time: {
                type: String,
                default: undefined,
                sparse: true
                // required: true,
                // unique: true,
              },
              meal: [
                {
                  fdcId: {
                    type: Number,
                    default: undefined,
                    sparse: true
                    // required: true
                  },
                  itemName: {
                    type: String,
                    default: undefined,
                    sparse: true
                    // required: true
                  },
                  quantity: {
                    type: Number,
                    default: undefined,
                    sparse: true
                    // required: true
                  },
                  calories: {
                    type: Number,
                    default: undefined,
                    sparse: true
                    // required: true
                  }
                }
              ],
              exercise: {
                category: {
                  type: String,
                  default: undefined
                  // required: true
                },
                duration: {
                  type: Number,
                  default: undefined
                  // required: true
                }
              }
            }
          ]
        }
      ]
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    autoIndex: false
  }
);

timelineSchema.path('date').index({ sparse: true });
timelineSchema.path('date').index({ day_1: 1 }, { sparse: true });
timelineSchema.path('date').index({ day: 1 }, { partialFilterExpression: { day: { $ne: null } } });
timelineSchema.index({ date: 1 }, { partialFilterExpression: { date: { $ne: null } } });
timelineSchema.index({ 'date.day': 1 }, { partialFilterExpression: { 'date.day': { $ne: null } } });

timelineSchema.path('date').schema.path('schedule').schema.virtual('mealTotalCalories').get(function(){
  // console.log(this.meal.reduce((total, obj) => obj.calories + total,0));
  return this.meal.reduce((total, obj) => (obj.calories ? obj.calories : 0) + total, 0);
});

timelineSchema.path('date').schema.virtual('totalConsumedCalories').get(function(){
  // console.log(this.meal.reduce((total, obj) => obj.calories + total,0));
  return this.schedule.reduce((total, obj) =>
  {
    (obj.mealTotalCalories ? obj.mealTotalCalories : 0) + total
  }, 0);
});

timelineSchema.path('date').schema.path('schedule').schema.virtual('exerciseTotalCalories').get(async function(){
  // console.log(this.meal.reduce((total, obj) => obj.calories + total,0));
  const userInfo = await User.findOne({ username: this.parent().parent().username }, function(err, docs) {
    return docs
  })
  .select('username weight');
  const met = 5;
  const caloriesBurned = (this.exercise.duration ? this.exercise.duration * met * 3.5 * ( userInfo.weight / 2.2046 ) / 200 : 0);
  return Math.round(caloriesBurned);
});

timelineSchema.path('date').schema.virtual('totalBurnedCalories').get(async function(){
  const userInfo = await User.findOne({ username: this.parent().username }, function(err, docs) {
    return docs
  })
  .select('username weight');

  const totalDuration = this.schedule.reduce((total, obj) => {    
    return total + (obj.exercise.duration ? obj.exercise.duration : 0);
  }, 0);

  const met = 5;
  const caloriesBurned = totalDuration * met * 3.5 * ( userInfo.weight / 2.2046 ) / 200;

  return Math.round(caloriesBurned);
});

const Timeline = model('Timeline', timelineSchema);

module.exports = Timeline;