import clock from "clock";
import * as document from "document";
import { me as appbit } from "appbit";
import { today } from "user-activity";

import * as sensors from "./sensors.js";

function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime(date) {
    let hours = date.getHours();
    let mins = zeroPad(date.getMinutes());
    let secs = zeroPad(date.getSeconds());
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return {
        "hours": hours,
        "mins": mins,
        "secs": secs,
    }
}

function getDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return {
        "day": day,
        "month": month,
        "year": year,
    }
}

function validateNull(val) {
    if (val === null) {
        return "--";
    } else {
        return val;
    }
}

function getSteps() {
    if (appbit.permissions.granted("access_activity")) {
        return validateNull(today.adjusted.steps);
    } else {
        return "--";
    }
}

function getCals() {
    if (appbit.permissions.granted("access_activity")) {
        return validateNull(today.adjusted.calories);
    } else {
        return "--";
    }
}

function getFloors() {
    if (appbit.permissions.granted("access_activity")) {
        return validateNull(today.adjusted.elevationGain);
    } else {
        return "--";
    }
}

// Update the clock very second
clock.granularity = "seconds";

// Get handle to the <text> element
const data = document.getElementById("data");

// Create a new instance of the HeartRate class
const heartRate = new sensors.HeartRate();
const accelerometer = new sensors.Accel()
const barometer = new sensors.Baro()

// Update the <text> element every tick
clock.ontick = (evt) => {
    let text = "";

    // Get current time
    let today = evt.date;
    let { hours, mins, secs } = getTime(today);
    text += `Clock: ${hours}:${mins}:${secs}\n`;

    // Get current date
    let { day, month, year } = getDate(today);
    text += `Date: ${day}-${month}-${year}\n`;

    // Get the heart rate data
    text += `Heart Rate: ${validateNull(heartRate.data)}`;

    // Get the accelerometer data
    let { x, y, z } = accelerometer.data;
    text += `\nAccel: ${validateNull(x)}, ${validateNull(y)}, ${validateNull(z)}`;

    // Get the barometer data
    let { pressure } = barometer.data;
    text += `\nBarometer: ${validateNull(pressure)}`;


    // Get steps
    let steps = getSteps();
    text += `\nSteps: ${steps}`;

    // Get calories
    let calories = getCals();
    text += `\nCalories: ${calories}`;

    // Get floors
    let floors = getFloors();
    text += `\nFloors: ${floors}`;

    // Update the <text> element
    // console.log(text);
    data.text = text
}
