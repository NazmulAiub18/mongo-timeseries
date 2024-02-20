import mongoose from "mongoose";
require("dotenv").config();

import Neptun from "../models/Neptun";
import NeptunLevel from "../models/NeptunLevel";
import neptunData from "./data.json";
import neptunLevelData from "./data_level.json";

(async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI in .env file");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const totalNeptunData = await Neptun.countDocuments();
    if (totalNeptunData < 1 && neptunData.length > 0) {
      let total = 0;
      neptunData.forEach((d: any[]) => (total += d.length));
      for (let i = 0; i < neptunData.length; i++) {
        const hourlyData = neptunData[i];
        await Neptun.insertMany(hourlyData);
        console.log(
          `Seeded ${await Neptun.countDocuments()} out of ${total} neptun data.`
        );
      }
    }
    const totalNeptunLevelData = await NeptunLevel.countDocuments();
    if (totalNeptunLevelData < 1 && neptunLevelData.length > 0) {
      await NeptunLevel.insertMany(neptunLevelData);
      console.log(
        `Seeded ${await NeptunLevel.countDocuments()} out of ${
          neptunLevelData.length
        } neptun level data.`
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
})();
