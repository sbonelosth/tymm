function q(selector) { return document.querySelector(selector); }

function clock() {
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let currentDay = date.getDate();

  var getDaysInMonth = function(month, year) {
    return new Date(year, month + 1, 0).getDate();
  };

  let yearDays = 367 - new Date(currentYear, 0, 367).getDate();
  let monthDays = 32 - new Date(currentYear, currentMonth, 32).getDate();

  // Constant variables
  const daySeconds = 86400;
  const weekSeconds = 7 * daySeconds;
  const hourSeconds = 3600;
  const minSeconds = 60;

  // Calcuting current year's progress and remaining time.
  let prog = ((date.getTime() / 1000) - (new Date(currentYear - 1, 11, 32, 0, 0, 0).getTime() / 1000)).toFixed(0);
  let rem = (((new Date(currentYear, 11, 32, 0, 0, 0).getTime() / 1000) - (new Date(currentYear - 1, 11, 32, 0, 0, 0).getTime() / 1000)).toFixed(0)) - prog;

  let remDays = getDaysInMonth(currentMonth, currentYear) - currentDay;
  let remHours = Math.floor(rem / hourSeconds);
  let remMinutes = Math.floor(rem / minSeconds);

  let fmonths = 12 - (currentMonth + 1);
  let fdays = remDays % 7;
  let fweeks = Math.floor(remDays / 7);
  let fhours = remHours % 24;
  let fminutes = remMinutes % 60;
  let fseconds = rem % 60;
  
  fhours = (fhours < 10 && fweeks <= 0 && fdays <= 0) ? "0" + fhours : fhours;
  fminutes = (fminutes < 10 && fweeks <= 0 && fdays <= 0) ? "0" + fminutes : fminutes;
  fseconds = (fseconds < 10 && fweeks <= 0 && fdays <= 0) ? "0" + fseconds : fseconds;

  // Strings for labels.

  let labels = ["month", "week", "day", "hour", "minute", "second"];
  let pluralize = "s";
  
  // Assigning the DOM to variables.

  let remMonthsDOM = q(".rem-months");
  let remWeeksDOM = q(".rem-weeks");
  let remDaysDOM = q(".rem-days");
  let remHoursDOM = q(".rem-hours");
  let remMinutesDOM = q(".rem-minutes");
  let remSecondsDOM = q(".rem-seconds");

  let remMonthsLBL = q(".rem-months-label");
  let remWeeksLBL = q(".rem-weeks-label");
  let remDaysLBL = q(".rem-days-label");
  let remHoursLBL = q(".rem-hours-label");
  let remMinutesLBL = q(".rem-minutes-label");
  let remSecondsLBL = q(".rem-seconds-label");

  // Setting up conditions for displaying remaining time.

  remWeeksDOM.style.display = (fweeks === 0) ? "none" : "inline";
  remWeeksLBL.style.display = (fweeks === 0) ? "none" : "inline";

  remDaysDOM.style.display = (fdays === 0) ? "none" : "inline";
  remDaysLBL.style.display = (fdays === 0) ? "none" : "inline";

  remMonthsDOM.style.display = (fmonths === 0) ? "none" : "inline";
  remMonthsLBL.style.display = (fmonths === 0) ? "none" : "inline";

  if (fmonths >= 1) {
    remSecondsDOM.style.display = "none";
    remMinutesDOM.style.display = "none";
    remHoursDOM.style.display = "none";

    remMonthsLBL.innerHTML = fmonths > 1 ? labels[0] + pluralize : labels[0];
    remWeeksLBL.innerHTML = fweeks > 1 ? labels[1] + pluralize : labels[1];
    remDaysLBL.innerHTML = fdays > 1 ? labels[2] + pluralize : labels[2];
  }

  else if (fmonths < 1 && fweeks > 0) {
    remSecondsDOM.style.display = "none";
    remMinutesDOM.style.display = "none";

    remWeeksLBL.innerHTML = fweeks > 1 ? labels[1] + pluralize : labels[1];
    remDaysLBL.innerHTML = fdays > 1 ? labels[2] + pluralize : labels[2];
    remHoursLBL.innerHTML = fhours > 1 ? labels[3] + pluralize : labels[3];
  }

  else if (fmonths < 1 && fweeks < 1 && fdays > 0) {
    remSecondsDOM.style.display = "none";

    remDaysLBL.innerHTML = fdays > 1 ? labels[2] + pluralize : labels[2];
    remHoursLBL.innerHTML = fhours > 1 ? labels[3] + pluralize : labels[3];
    remMinutesLBL.innerHTML = fminutes > 1 ? labels[4] + pluralize : labels[4];
  }

  else if (fmonths < 1 && fweeks < 1 && fdays < 1) {
    remHoursDOM.style.transform = "scale(1.5)";
    remMinutesDOM.style.transform = "scale(1.5)";
    remSecondsDOM.style.transform = "scale(1.5)";
    
    q(".countdown").style.flexDirection = "row";
    q(".countdown-container").style.width = "105px";
    q(".countdown-labels").style.display = "none";
    q(".rem-text").style.display = "none";
    
    remHoursLBL.innerHTML = fhours > 1 ? labels[3] + pluralize : labels[3];
    remMinutesLBL.innerHTML = fminutes > 1 ? labels[4] + pluralize : labels[4];
    remSecondsLBL.innerHTML = fseconds > 1 ? labels[5] + pluralize : labels[5];
  }
 

  // Inflating the DOM with remaining time.
  remMonthsDOM.innerHTML = fmonths;
  remWeeksDOM.innerHTML = fweeks;
  remDaysDOM.innerHTML = fdays;
  remHoursDOM.innerHTML = fhours;
  remMinutesDOM.innerHTML = fminutes;
  remSecondsDOM.innerHTML = fseconds;

  // Setting up a progress bar for the loading year.
  let nextYear = q(".year-progress");
  nextYear.innerHTML = "<div class='progress-bar'></div>";

  let yearDisplay = q(".from-to-year");
  yearDisplay.innerHTML = `<span class='dying-year'>${currentYear}</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span class='pending-year'>${parseInt(currentYear + 1)}</span>`;

  let progressCount = q(".progress-count");
  let fprogress = (100 * ((prog / daySeconds) / yearDays)).toFixed(1);
  let fprogressStr = fprogress.toString();
  progressCount.innerHTML = (fprogressStr.charAt(fprogressStr.length - 1) == "0") ? Math.floor(fprogress) + "% COMPLETE" : fprogress + "% COMPLETE";

  let fadingYear = q(".dying-year");
  let pendingYear = q(".pending-year");

  fadingYear.style.opacity = 1.1 - (fprogress / 100).toFixed(1);
  pendingYear.style.opacity = 1.1 - ((100 - fprogress) / 100).toFixed(1);

  fadingYear.style.color = (currentYear === 2021) ? "#BDB220" : "#EBEBEB";

  fadingYear.style.filter = `blur(${((2 * fprogress) / 100).toFixed(1)}px)`;
  pendingYear.style.filter = `blur(${((2 * (100 - fprogress)) / 100).toFixed(1)}px)`;

  let progressBar = q(".progress-bar");
  let fprogressWidth = ((165 * (1 - (rem / daySeconds) / yearDays))).toFixed(0);
  let eventLBL = q(".event-label");
  fprogressWidth = (Math.ceil(fprogressWidth) - fprogressWidth) < 0.5 ? Math.ceil(fprogressWidth) : Math.floor(fprogressWidth);
  progressBar.style.width = `${fprogressWidth}px`;
  let R;
  let G;
  if (fprogress <= 25) {
    R = (((4 * fprogress) / 100) * (255 / 2)).toFixed(0);
    progressBar.style.backgroundColor = `rgba(${R}, 255, 75)`;
    progressCount.style.color = `rgba(${R}, 255, 75)`;
    eventLBL.style.backgroundColor = `rgba(${R}, 255, 75, 0.3)`;
  }

  else if (fprogress > 25 && fprogress <= 50) {
    R = (((2 * fprogress) / 100) * (255)).toFixed(0);
    progressBar.style.backgroundColor = `rgba(${R}, 255, 75)`;
    progressCount.style.color = `rgba(${R}, 255, 75)`;
    eventLBL.style.backgroundColor = `rgba(${R}, 255, 75, 0.3)`;
  }

  else if (fprogress > 50 && fprogress <= 100) {
    G = ((2 * (100 - fprogress) / 100) * (255)).toFixed(0);
    progressBar.style.backgroundColor = `rgba(255, ${G}, 75)`;
    progressCount.style.color = `rgba(255, ${G}, 75)`;
    eventLBL.style.backgroundColor = `rgba(255, ${G}, 75, 0.3)`;
  }

  let daySpan = "<span class='day'>";
  let progressDay = Math.ceil(prog / daySeconds);
  let today = daySpan + ((date.toString().split(' ')[0]).bold() + `, </span>${currentDay} ` + (date.toString().split(' ').splice(1, 1).join(' '))).toUpperCase();
  q(".time-disp").innerHTML = `Day <b>${progressDay}</b> of ${yearDays}`;
  q(".date-disp").innerHTML = today;
  setInterval(clock, 1000);
}

clock();