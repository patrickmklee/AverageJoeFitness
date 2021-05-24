const db = require('../config/connection');
const {
  Timeline,
  User
} = require('../models');

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

  const timeline = await Timeline.create({
    username: user.username,
    date: [{
        day: "2021-02-13",
        schedule: [{
          time: "8:00",
          meal: [{
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
        }]
      },
      {
        day: "2021-02-14",
        schedule: [{
            time: "4:00",
            meal: [{
                fdcId: 3,
                itemName: "burger",
                quantity: 1,
                calories: 500
              },
              {
                fdcId: 19,
                itemName: "salad",
                quantity: 1,
                calories: 250
              },
              {
                fdcId: 21,
                itemName: "chicken",
                quantity: 1,
                calories: 432
              }
            ],
            exercise: {
              category: "run",
              duration: 50
            }
          },
          {
            time: "8:00",
            meal: [{
                fdcId: 7,
                itemName: "fries",
                quantity: 2,
                calories: 400
              },
              {
                fdcId: 9,
                itemName: "ice cream",
                quantity: 2,
                calories: 800
              }

            ],
            exercise: {
              category: "run",
              duration: 50
            }
          }
        ]
      },
      {
        day: "2021-02-15",
        schedule: [{
            time: "6:00",
            meal: [{
              fdcId: 15,
              itemName: "burger",
              quantity: 1,
              calories: 500
            }],
            exercise: {
              category: "run",
              duration: 25
            }
          },
          {
            time: "9:00",
            meal: [{
              fdcId: 7,
              itemName: "sandwich",
              quantity: 1,
              calories: 300
            }],
            exercise: {
              category: "run",
              duration: 30
            }
          }
        ]
      }
    ]
  });

  await User.findByIdAndUpdate({
    _id: user._id
  }, {
    timeline: timeline._id
  }, {
    new: true
  });

  console.log('all done!');
  process.exit(0);
});
