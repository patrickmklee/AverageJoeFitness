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
    date: [
      {
        day: "02-13-2021",
        schedule: [
          {
            time: "8:00",
            meal: [
              {
                fdcId: 15,
                itemName: "burger",
                quantity: 1,
                calories: 500
              },
              {
                fdcId: 89,
                itemName: "fries",
                quantity: 1,
                calories: 400
              },
            ],
            exercise: {
              category: "run",
              duration: 50
            }
          }
        ]
      },
      {
        day: "02-15-2021",
        schedule: [
          {
            time: "6:00",
            meal: [
              {
                fdcId: 15,
                itemName: "burger",
                quantity: 1,
                calories: 500
              }
            ],
            exercise: {
              category: "run",
              duration: 25
            }
          },
          {
            time: "9:00",
            meal: [
              {
                fdcId: 7,
                itemName: "sandwich",
                quantity: 1,
                calories: 300
              }
            ],
            exercise: {
              category: "run",
              duration: 30
            }
          }
        ]
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
