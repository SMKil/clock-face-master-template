import * as document from "document";
import clock from "clock";
import { battery } from "power";

import { getTime, getDate, validateNull } from "./common/utils.js";
import * as sensors from "./common/sensors.js";
import * as userActivity from "./common/userActivity.js";

// Update the clock very second
clock.granularity = "seconds";

// Get handle to the <text> element
const data = document.getElementById("data");

// Instantiate data sources and sensors
const activity = new userActivity.Activity();
const heartRate = new sensors.HeartRate();
const accelerometer = new sensors.Accel()
const barometer = new sensors.Baro()
const gyro = new sensors.Gyro()


// Update the <text> element every tick
clock.ontick = (evt) => {
    let text = "";

    // Get current time
    let today = evt.date;
    let { hours, mins, secs } = getTime(today);
    text += `Clock: ${hours}:${mins}:${secs}`;

    // Get current date
    let { day, month, year } = getDate(today);
    text += `\nDate: ${day}/${month}${year}`;

    // Get the battery level and charging state
    text += `\nBattery: ${battery.chargeLevel}% (${battery.charging ? "charging" : "discharging"})`;

    // Get the heart rate data
    text += `\nHeart Rate: ${validateNull(heartRate.value)}`;

    // Get the accelerometer data
    text += `\nAbs. accel: ${validateNull(accelerometer.valueAbs)}`;

    // Get the orientation data
    text += `\nOrientation: ${validateNull(gyro.valueOrient)}`;

    // Get the barometer data
    text += `\nBarometer: ${validateNull(barometer.value)}`;

    // Get the user's primary goal
    text += `\nPrimary goal: ${activity.primaryGoal}`;

    // Get todays steps vs. goal
    text += `\nSteps: ${validateNull(activity.today.steps())} / ${validateNull(activity.todayGoals.steps())}`;

    // Get todays calories vs. goal
    text += `\nCalories: ${validateNull(activity.today.calories())} / ${validateNull(activity.todayGoals.calories())}`;

    // Get todays floors vs. goal
    text += `\nFloors: ${validateNull(activity.today.elevationGain())} / ${validateNull(activity.todayGoals.elevationGain())}`;

    // Update the <text> element
    // console.log(text);
    data.text = text
}
