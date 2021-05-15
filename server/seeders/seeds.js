const db = require('../config/connection');
const { Timeline, User } = require('../models');

db.once('open', async () => {
  await Timeline.deleteMany({});
  await User.deleteMany({});

  const user = await User.create({
    username: "bob",
    email: "bob@mail.com",
    password: "password",
    height: "30",
    weight: "120",
    age: "27",
    gender: "M",
    activityLvl: 3
  });

  timeline = await Timeline.create({
    username: user.username,
    schedule: [
      {
        time: "8am",
        meal: [
          {
            itemName: "burger",
            calories: 500
          }
        ],
        exercise:
          {
            category: "run",
            duration: 50
          }
      },
      {
        time: "10am",
        exercise:
          {
            category: "run",
            duration: 35
          }
      }
    ]
  });

  await User.findByIdAndUpdate(
    { _id: user._id },
    { timeline: timeline._id },
    { new: true }
  );

  console.log('all done!');
  process.exit(0);
});
