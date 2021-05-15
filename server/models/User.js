const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    height: {
      type: Number // in Inches
    },
    weight: {
      type: Number // in Pounds
    },
    age: {
      type: Number
    },
    gender: {
      type: String
    },
    activityLvl: {
      type: Number
    },
    timeline:
      {
        type: Schema.Types.ObjectId,
        ref: 'Timeline'
      }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('optimalCalories').get(function() {
  var calHeight = this.height * 2.54;
  var calWeight = this.weight / 2.2;
  var calBmi = (calWeight / (calHeight * calHeight)) * 10000;
  if ((calBmi < 30) && (this.gender === 'F')) {
    var calories = (((655.0955 + (9.5634 * calWeight)) + (1.8496 * calHeight)) - (4.6756 * this.age)) * 1.2;
  }
  else if ((calBmi < 30) && (this.gender === 'M')) {
    var calories = (((66.473 + (13.7516 * calWeight)) + (5.0033 * calHeight)) - (6.755 * this.age)) * 1.2;
  }
  else if ((calBmi >= 30) && (this.gender === 'F')) {
    var calories = ((655.0955 + (9.5634 * calWeight)) + (1.8496 * calHeight)) - (4.6756 * this.age);
  }
  else {
    var calories = ((66.473 + (13.7516 * calWeight)) + (5.0033 * calHeight)) - (6.755 * this.age);
  }
  console.log(Math.round(calories * (1 + (this.activityLvl * 0.1))));
  console.log(calories);
  console.log(this.activityLvl);
  return Math.round(calories * (1 + (this.activityLvl * 0.1)));
});

const User = model('User', userSchema);

module.exports = User;