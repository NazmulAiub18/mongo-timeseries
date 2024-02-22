import fs from "fs";
import path from "path";
import JSONStream from "JSONStream";
import mongoose from "mongoose";
require("dotenv").config();

import Neptun from "../models/Neptun";
import NeptunLevel from "../models/NeptunLevel";
// import neptunData from "./data.json";
import neptunLevelData from "./data_level.json";

(async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI in .env file");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const totalNeptunData = await Neptun.countDocuments();
    if (totalNeptunData < 1) {
      const transformStream = JSONStream.parse("*");
      const inputStream = fs.createReadStream(
        path.join(__dirname, "data.json")
      );
      inputStream
        .pipe(transformStream)
        // Each "data" event will emit one item in our record-set.
        .on("data", async function handleRecord(data) {
          console.log(
            `Inserting ${data[0].metadata.measurementType} of ${data[0].timestamp}`
          );
          await Neptun.insertMany(data);
        })
        // Once the JSONStream has parsed all the input, let's indicate done.
        .on("end", async function handleEnd() {
          console.log("data.json seed done!");
          console.log(`Seeded ${await Neptun.countDocuments()} neptun data.`);
          await mongoose.disconnect();
        });

      // let total = 0;
      // neptunData.forEach((d: any[]) => (total += d.length));
      // console.log(total);

      // for (let i = 0; i < neptunData.length; i++) {
      //   const hourlyData = neptunData[i];
      //   await Neptun.insertMany(hourlyData);
      //   console.log(
      //     `Seeded ${await Neptun.countDocuments()} out of ${total} neptun data.`
      //   );
      // }
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
    // await mongoose.disconnect();
  }
})();
