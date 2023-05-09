import { me as appbit } from "appbit";
import { sqrt, square } from "scientific";

import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";


// Define a class to encapsulate the Heart Rate sensor
export class HeartRate {
    constructor(freq = 1) {	// freq is the frequency of the sensor reading in Hz
        if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
            // Create a new instance of the HeartRateSensor object
            this._hrm = new HeartRateSensor({ frequency: freq });

            // Declare a property to store current heart rate and on/off-state
            this._heartRate = null;
            this._isBodyPresent = false;
            this._isDisplayOn = true;
            this._isHeartRateOn = false;

            // Add an event listener for the reading heart rate event
            this._hrm.addEventListener("reading", () => {
                this._heartRate = this._hrm.heartRate;
            });

            // Use BodyPrecence to control sensor state
            if (BodyPresenceSensor) {
                this._body = new BodyPresenceSensor();

                // Add an event listener for the reading event
                this._body.addEventListener("reading", () => {
                    this._isBodyPresent = this._body.present
                    this._controlSensorState();
                });

                // Begin monitoring body presence
                this._body.start();
            } else {
                // If BodyPresence is not available, assume the user is wearing the device
                this._isBodyPresent = true;
                console.log("Using Heart Rate sensor without BodyPresenceSensor");
            }

            // Use Display to control sensor state
            display.addEventListener("change", () => {
                this._isDisplayOn = display.on
                this._controlSensorState();
            });
        }
    }

    // Define a function to control the sensor state based on display and body presence states
    _controlSensorState() {
        if (this._isBodyPresent && this._isDisplayOn) {
            this._hrm.start();
            this._isHeartRateOn = true;
        } else {
            this._hrm.stop();
            this._isHeartRateOn = false;
            this._heartRate = null;
        }
    }

    // Define a getter property heartRate
    get value() {
        return this._heartRate;
    }
}

// Define a class to encapsulate the Accelerometer sensor
export class Accel {
    constructor(freq = 1) {	// freq is the frequency of the sensor reading in Hz
        if (Accelerometer) {
            // Create a new instance of the Accelerometer object
            this._accel = new Accelerometer({ frequency: freq });

            // Declare a property to store current acceleration and several on/off-state
            this._accelData = {x: null, y: null, z: null};
            this._isBodyPresent = false;
            this._isDisplayOn = true;
            this._isAccelOn = false;

            // Add an event listener for the acceleration event
            this._accel.addEventListener("reading", () => {
                this._accelData = this._accel.readings;
            });

            // Use BodyPrecence to control sensor state
            if (BodyPresenceSensor) {
                this._body = new BodyPresenceSensor();

                // Add an event listener for the reading event
                this._body.addEventListener("reading", () => {
                    this._isBodyPresent = this._body.present
                    this._controlSensorState();
                });

                // Begin monitoring body presence
                this._body.start();
            } else {
                // If BodyPresence is not available, assume the user is wearing the device
                this._isBodyPresent = true;
                console.log("Using Accelerometer sensor without BodyPresenceSensor");
            }

            // Use Display to control sensor state
            display.addEventListener("change", () => {
                this._isDisplayOn = display.on
                this._controlSensorState();
            });
        }
    }

    // Define a function to control the sensor state based on display and body presence states
    _controlSensorState() {
        if (this._isBodyPresent && this._isDisplayOn) {
            this._accel.start();
            this._isAccelOn = true;
        } else {
            this._accel.stop();
            this._isAccelOn = false;
            this._accelData = {x: null, y: null, z: null};
        }
    }

    // Define a getter property accelData
    get data() {
        return this._accelData;
    }

    // Define a getter property for absolute acceleration
    get value() {
        if (this._accelData.x === null || this._accelData.y === null || this._accelData.z === null) {
            return null;
        }
        return sqrt(square(this._accelData.x) + square(this._accelData.y) + square(this._accelData.z));
    }
}

// Define a class to encapsulate the Barometer sensor
export class Baro {
    constructor(freq = 1) {	// freq is the frequency of the sensor reading in Hz
        if (Barometer) {
            // Create a new instance of the Barometer object
            this._baro = new Barometer({ frequency: freq });

            // Declare a property to store current barometer and several on/off-states
            this._pressure = {pressure: null};
            this._isBodyPresent = false;
            this._isDisplayOn = true;
            this._isBaroOn = false;

            // Add an event listener for the barometer event
            this._baro.addEventListener("reading", () => {
                this._pressure = this._baro.pressure;
            });

            // Use BodyPrecence to control sensor state
            if (BodyPresenceSensor) {
                this._body = new BodyPresenceSensor();

                // Add an event listener for the reading event
                this._body.addEventListener("reading", () => {
                    this._isBodyPresent = this._body.present
                    this._controlSensorState();
                });

                // Begin monitoring body presence
                this._body.start();
            } else {
                // If BodyPresence is not available, assume the user is wearing the device
                this._isBodyPresent = true;
                console.log("Using Barometer sensor without BodyPresenceSensor");
            }

            // Use Display to control sensor state
            display.addEventListener("change", () => {
                this._isDisplayOn = display.on
                this._controlSensorState();
            });
        }
    }

    // Define a function to control the sensor state based on display and body presence states
    _controlSensorState() {
        if (this._isBodyPresent && this._isDisplayOn) {
            this._baro.start();
            this._isBaroOn = true;
        } else {
            this._baro.stop();
            this._isBaroOn = false;
            this._pressure = {pressure: null};
        }
    }

    // Define a getter property baroData
    get value() {
        return this._pressure;
    }
}