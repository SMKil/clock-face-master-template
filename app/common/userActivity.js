import { me as appbit } from "appbit";
import { primaryGoal, goals, weekGoals, today, week } from "user-activity";

export class Activity {
    constructor() {
        if (appbit.permissions.granted("access_activity")) {
            this.primaryGoal = primaryGoal;
            this.todayGoals = {
                steps: () => goals.steps,
                calories: () => goals.calories,
                distance: () => goals.distance,
                elevationGain: () => goals.elevationGain,
                activeZoneMins: () => goals.activeZoneMinutes.total,
            }
            this.weekGoals = {
                activeZoneMins: () => weekGoals.activeZoneMinutes.total,
            }
            this.today = {
                steps: () => today.adjusted.steps,
                calories: () => today.adjusted.calories,
                distance: () => today.adjusted.distance,
                elevationGain: () => today.adjusted.elevationGain,
                activeZoneMins: () => today.adjusted.activeZoneMinutes.total,
            }
            this.week = {
                steps: () => week.adjusted.steps,
                calories: () => week.adjusted.calories,
                distance: () => week.adjusted.distance,
                elevationGain: () => week.adjusted.elevationGain,
                activeZoneMins: () => week.adjusted.activeZoneMinutes.total,
            }
        } else {
            console.log("access_activity permission denied");

            this.primaryGoal = () => null;
            this.todayGoals = {
                steps: () => null,
                calories: () => null,
                distance: () => null,
                elevationGain: () => null,
                activeZoneMins: () => null,
            }
            this.weekGoals = {
                activeZoneMins: () => null,
            }
            this.today = {
                steps: () => null,
                calories: () => null,
                distance: () => null,
                elevationGain: () => null,
                activeZoneMins: () => null,
            }
            this.week = {
                steps: () => null,
                calories: () => null,
                distance: () => null,
                elevationGain: () => null,
                activeZoneMins: () => null,
            }
        }
    }
}