import { Schema, model } from "mongoose";

const NeptunLevelSchema = new Schema(
  {
    timestamp: { type: Date, required: true },
    metadata: {
      deviceBaseType: { type: String, required: true },
      deviceId: { type: String, required: true },
      deviceType: { type: String, required: true },
      versionMajor: { type: String, required: true },
      versionMinor: { type: String, required: true },
      versionSub: { type: String, required: true },
    },
    level: { type: Number },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "seconds",
    },
    collection: "neptun_test_level",
  }
);

const NeptunLevel = model("NeptunLevel", NeptunLevelSchema);

export default NeptunLevel;
