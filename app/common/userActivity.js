import { me as appbit } from "appbit";
import { week } from "user-activity";
import { weekGoals } from "user-activity";
import { today } from "user-activity";
import { primaryGoal } from "user-activity";
import { goals } from "user-activity";

export class Activity {
    constructor() {
        if (appbit.permissions.granted("access_activity")) {
            this.primaryGoal = primaryGoal;
            this.todayGoals = {
                steps: () => goals.steps,
                calories: () => goals.calories,
                distance: () => goals.distance,
                elevationGain: () => goals.elevationGain,
                activeZoneMins: () => goals.activeMinutes,
            }
            this.weekGoals = {
                activeZoneMins: () => weekGoals.activeMinutes,
            }
            this.today = {
                steps: () => today.adjusted.steps,
                calories: () => today.adjusted.calories,
                distance: () => today.adjusted.distance,
                elevationGain: () => today.adjusted.elevationGain,
                activeZoneMins: () => today.adjusted.activeMinutes,
            }
            this.week = {
                steps: () => week.adjusted.steps,
                calories: () => week.adjusted.calories,
                distance: () => week.adjusted.distance,
                elevationGain: () => week.adjusted.elevationGain,
                activeZoneMins: () => week.adjusted.activeMinutes,
            }
        }
    }
}