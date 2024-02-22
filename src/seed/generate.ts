import fs from "fs";
import path from "path";
import JSONStream from "JSONStream";

/*
{
  "timestamp" : ISODate("2023-03-02T17:56:53.418Z"),
  "metadata" : {
      "deviceBaseType" : "neptun",
      "deviceId" : "neptun_lora_FCA84A0200000104",
      "deviceType" : "neptun",
      "versionMajor" : "1",
      "versionMinor" : "2",
      "versionSub" : "1"
  },
  "level" : 0,
  "_id" : ObjectId("6400e3654fbae289f10607b3")
}
*/

const GetNewNeptunData = (timeStr, measurementType, value, includeInMeta) => {
  if (includeInMeta) {
    return {
      timestamp: timeStr,
      metadata: {
        measurementType,
        deviceBaseType: "neptun",
        deviceId: "neptun_lora_FCA84A0200000104",
        deviceType: "neptun",
        versionMajor: "1",
        versionMinor: "2",
        versionSub: "1",
      },
      [measurementType]: value,
    };
  }

  return {
    timestamp: timeStr,
    metadata: {
      deviceBaseType: "neptun",
      deviceId: "neptun_lora_FCA84A0200000104",
      deviceType: "neptun",
      versionMajor: "1",
      versionMinor: "2",
      versionSub: "1",
    },
    [measurementType]: value,
  };
};

(async () => {
  const data: any[][] = [];
  const data_level: any[] = [];

  for (let d = 1; d < 4; d++) {
    const levels: any[] = [];
    const internal_temperatures: any[] = [];
    const rssis: any[] = [];
    const snrs: any[] = [];
    const sfs: any[] = [];
    const radarDistances: any[] = [];
    const radarAmplitudes: any[] = [];
    const alarms: any[] = [];
    const battery_voltages: any[] = [];
    const distance_qualities: any[] = [];
    const detected_peaks: any[] = [];
    const detection_success: any[] = [];

    for (let i = 0; i < 24; i++) {
      let hour = "";
      if (i < 10) {
        hour = `0${i}`;
      } else {
        hour = `${i}`;
      }
      for (let j = 0; j < 60; j++) {
        let minute = "";
        if (j < 10) {
          minute = `0${j}`;
        } else {
          minute = `${j}`;
        }
        for (let k = 0; k < 60; k++) {
          let second = "";
          if (k < 10) {
            second = `0${k}`;
          } else {
            second = `${k}`;
          }
          const time = `2024-02-0${d}T${hour}:${minute}:${second}.000Z`;
          levels.push(GetNewNeptunData(time, "level", 1370, true));
          data_level.push(GetNewNeptunData(time, "level", 1370, false));
          internal_temperatures.push(
            GetNewNeptunData(time, "internal_temperature", 1, true)
          );
          rssis.push(GetNewNeptunData(time, "rssi", -103, true));
          snrs.push(GetNewNeptunData(time, "snr", 8.8, true));
          sfs.push(GetNewNeptunData(time, "sf", 10, true));
          radarDistances.push(
            GetNewNeptunData(time, "radarDistances", [0, 0], true)
          );
          radarAmplitudes.push(
            GetNewNeptunData(time, "radarAmplitudes", [0, 0], true)
          );
          alarms.push(GetNewNeptunData(time, "alarm", 1, true));
          battery_voltages.push(
            GetNewNeptunData(time, "battery_voltage", 5.906, true)
          );
          distance_qualities.push(
            GetNewNeptunData(time, "distance_quality", 0.0, true)
          );
          detected_peaks.push(
            GetNewNeptunData(time, "detected_peaks", 0, true)
          );
          detection_success.push(
            GetNewNeptunData(time, "detection_success", true, true)
          );
        }
      }
    }
    data.push(
      levels,
      internal_temperatures,
      rssis,
      snrs,
      sfs,
      radarDistances,
      radarAmplitudes,
      alarms,
      battery_voltages,
      distance_qualities,
      detected_peaks,
      detection_success
    );
  }

  const transformStream = JSONStream.stringify();
  const outputStream = fs.createWriteStream(path.join(__dirname, "data.json"));
  transformStream.pipe(outputStream);
  data.forEach(transformStream.write);
  transformStream.end();

  outputStream.on("finish", function handleFinish() {
    console.log("Done Writting to data.json");
  });
  // fs.writeFileSync(
  //   path.join(__dirname, "data.json"),
  //   JSON.stringify(data, null, 2)
  // );
  fs.writeFileSync(
    path.join(__dirname, "data_level.json"),
    JSON.stringify(data_level, null, 2)
  );
  console.log("Done Writting to data_level.json");
})();
