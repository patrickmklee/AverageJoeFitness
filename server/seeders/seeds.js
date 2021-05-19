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

  const timeline = await Timeline.create({
    username: user.username,
    date: [
      {
        day: "02-13-2021",
        schedule: [
          {
            time: "8:00pm",
            meal: [
              {
                itemName: "burger",
                calories: 500
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
        day: "02-14-2021",
              schedule: [
                {
                  time: "4:00pm",
                  meal: [
                    {

                      itemName: "burger",
                      calories: 500

                  },
                  {
                    itemName: "salad",
                      calories: 250
                   },
                   {itemName: "chicken",
                   calories: 432
                  }
                ],
                  exercise: {
                      category: "run",
                      duration: 50
                  }
                },
                {
                  time: "8:00pm",
                  meal: [{

                      itemName: "fries",
                      calories: 400

                  },
                  {itemName: "ice cream",
                      calories: 800
                   }
                   
                  ],
                  exercise: {
                    category: "run",
                    duration: 50
                }
              }]
      },
      {
        day: "02-15-2021",
        schedule: {
          time: "6:00am",
          meal: [
            {
              itemName: "burger",
              calories: 500
            }
          ],
          exercise: {
            category: "run",
            duration: 50
          }
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
