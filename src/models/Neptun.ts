import { Schema, model } from "mongoose";

const NeptunSchema = new Schema(
  {
    timestamp: { type: Date, required: true },
    metadata: {
      measurementType: { type: String, required: true },
      deviceBaseType: { type: String, required: true },
      deviceId: { type: String, required: true },
      deviceType: { type: String, required: true },
      versionMajor: { type: String, required: true },
      versionMinor: { type: String, required: true },
      versionSub: { type: String, required: true },
    },
    level: { type: Number },
    internal_temperature: { type: Number },
    rssi: { type: Number },
    snr: { type: Number },
    sf: { type: Number },
    radarDistances: [{ type: Number }],
    radarAmplitudes: [{ type: Number }],
    alarm: { type: Number },
    battery_voltage: { type: Number },
    distance_quality: { type: Number },
    detected_peaks: { type: Number },
    detection_success: { type: Boolean },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "seconds",
    },
    collection: "neptun_test",
  }
);

NeptunSchema.index({
  "metadata.deviceId": 1,
  "metadata.measurementType": 1,
  timestamp: -1,
});

const Neptun = model("Neptun", NeptunSchema);

export default Neptun;
