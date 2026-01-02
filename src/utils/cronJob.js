const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");

const ConnectionRequest = require("../models/connectionRequest");

cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequest = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequest.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      const res = await sendEmail.run();
    }
  } catch (err) {}
});

// ! The "*" represents word "Every" here

// * Example:
// ? Cron Schedule -> 15 8 1 1 1
// ? So this above schedule will run every => “At 08:15 on day-of-month 1 and on Monday in January.”
