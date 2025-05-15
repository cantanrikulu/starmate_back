const Zodiac = require("../models/zodiac.model");

exports.addOrUpdateHoroscope = async (req) => {
  try {
    const { name, daily, weekly, monthly, yearly } = req.body;
    const now = new Date();

    const newDaily = daily ? [{ title: "daily", text: daily, date: now }] : [];
    const newWeekly = weekly
      ? [{ title: "weekly", text: weekly, date: now }]
      : [];
    const newMonthly = monthly
      ? [{ title: "monthly", text: monthly, date: now }]
      : [];
    const newYearly = yearly
      ? [{ title: "yearly", text: yearly, date: now }]
      : [];

    const updatedZodiac = await Zodiac.findOneAndUpdate(
      { name },
      {
        $push: {
          daily: { $each: newDaily },
          weekly: { $each: newWeekly },
          monthly: { $each: newMonthly },
          yearly: { $each: newYearly },
        },
      },
      { new: true, upsert: true }
    );
    return updatedZodiac;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllZodiacs = async () => {
  try {
    const zodiacs = await Zodiac.find();
    return zodiacs;
  } catch (error) {
    throw new Error(error);
  }
};
