const db = require('../config/connection');
const { Timeline, User } = require('../models');

db.once('open', async () => {
  await Timeline.deleteMany({});

  await Timeline.create({
    username: "bob",
    schedule: [
      {
        time: "8am",
        meal: [
          {
            itemName: "burger",
            calories: 500
          }
        ],
        exercise: [
          {
            category: "run",
            duration: 50
          }
        ]
      },
      {
        time: "10am",
        exercise: [
          {
            category: "run",
            duration: 35
          }
        ]
      }
    ]
  });

  console.log('all done!');
  process.exit(0);
});
