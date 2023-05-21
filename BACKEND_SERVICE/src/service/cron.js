const Event = require("../models/event");

var cron = require('node-cron');

cron.schedule('* * * * *', async () => {
    const eventRecords = await Event.find();
    for (let i = 0; i < eventRecords.length; i++) {

        const eventRecord = eventRecords[i];

        const dt1 = eventRecord.startTime;
        const dt2 = new Date();

        const t1 = dt1.getTime();
        const t2 = dt2.getTime();

        const diffInMinutes = Math.round(((t1 - t2) / 60000));
        if (diffInMinutes == 30) {
            console.log("Email is sent");
        }
    }
}
);
