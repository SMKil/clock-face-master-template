export function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export function getTime(date) {
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

export function getDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return {
        "day": day,
        "month": month,
        "year": year,
    }
}

export function validateNull(val) {
    if (val === null) {
        return "--";
    } else {
        return val;
    }
}
