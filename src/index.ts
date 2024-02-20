import mongoose from "mongoose";
require("dotenv").config();

import Neptun from "./models/Neptun";
import NeptunLevel from "./models/NeptunLevel";

(async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI in .env file");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const query = [
      {
        $match: {
          "metadata.deviceId": "neptun_lora_FCA84A0200000104",
          timestamp: {
            $gte: new Date("2023-03-01T00:00:00.000Z"),
            $lte: new Date("2023-03-03T00:00:00.000Z"),
          },
          level: { $exists: true },
        },
      },
    ];
    console.time("neptun");
    const data = await Neptun.aggregate(query);
    console.timeEnd("neptun");
    console.time("neptun_level");
    const data_level = await NeptunLevel.aggregate(query);
    console.timeEnd("neptun_level");
    console.log(`neptun: ${data.length}`);
    console.log(`neptun_level: ${data_level.length}`);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
})();
