import fs from "fs";
import path from "path";

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

(async () => {
  const data: any[][] = [];
  const data_level: any[] = [];

  for (let i = 0; i < 24; i++) {
    let hour = "";
    if (i < 10) {
      hour = `0${i}`;
    } else {
      hour = `${i}`;
    }
    const hourlyData: any[] = [];
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
        const time = `2023-03-02T${hour}:${minute}:${second}.000Z`;
        const newNeptunData: any = {
          timestamp: time,
          metadata: {
            deviceBaseType: "neptun",
            deviceId: "neptun_lora_FCA84A0200000104",
            deviceType: "neptun",
            versionMajor: "1",
            versionMinor: "2",
            versionSub: "1",
          },
        };
        hourlyData.push({ ...newNeptunData, level: 1370 });
        data_level.push({ ...newNeptunData, level: 1370 });
        hourlyData.push({ ...newNeptunData, internal_temperature: 1 });
        hourlyData.push({ ...newNeptunData, rssi: -103 });
        hourlyData.push({ ...newNeptunData, snr: 8.8 });
        hourlyData.push({ ...newNeptunData, sf: 10 });
        hourlyData.push({ ...newNeptunData, radarDistances: [0, 0] });
        hourlyData.push({ ...newNeptunData, radarAmplitudes: [0, 0] });
        hourlyData.push({ ...newNeptunData, alarm: 1 });
        hourlyData.push({ ...newNeptunData, battery_voltage: 5.906 });
        hourlyData.push({ ...newNeptunData, distance_quality: 0.0 });
        hourlyData.push({ ...newNeptunData, detected_peaks: 0 });
        hourlyData.push({ ...newNeptunData, detection_success: true });
      }
    }
    data.push(hourlyData);
  }

  fs.writeFileSync(
    path.join(__dirname, "data.json"),
    JSON.stringify(data, null, 2)
  );
  fs.writeFileSync(
    path.join(__dirname, "data_level.json"),
    JSON.stringify(data_level, null, 2)
  );
})();
