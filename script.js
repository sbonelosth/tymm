function q(selector) { return document.querySelector(selector); }
// Global DOM elements
const progDayText = q(".time-disp");
const todayText = q(".date-disp");
const progressText = q(".progress-count");
const eventLabel = q(".event-label");
const yearsDispDOM = q(".from-to-year");

// An object to setup the current day's date
class Today {
  constructor(progDayText, currentDate) {
    this.progDayText = progDayText;
    this.currentDate = currentDate;
  }

  getToday(date, progressDay, yearDays) {
    let today = `<span>${(date.toString().split(' ')[0]).bold()}, </span>${date.getDate()} ${(date.toString().split(' ').splice(1, 1).join(' '))}`;
    this.progDayText.innerHTML = `DAY <b>${progressDay}</b> of ${yearDays}`;
    this.currentDate.innerHTML = today.toUpperCase();
  }
}

function getCurrentDate(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return { year, month, day };
}

// Creating progress and remaining values
function getTimeValues(){
  let currentDate = getCurrentDate();
  let startDate = new Date(currentDate.year, 0, 1);
  let endDate = new Date(currentDate.year, 11, 31);
  let diffStart = Date.now() - startDate.getTime();
  let diffEnd = endDate.getTime() - Date.now();
  let progress = Math.floor(diffStart / 1000);
  let remaining = Math.floor(diffEnd / 1000);
  return { progress, remaining };
}

// Setting up the displayed values
function convertSeconds(seconds){
  let date = new Date();
  let remainingDays = getDaysInMonth(date.getMonth(), date.getFullYear()) - date.getDate();
  let months = 11 - date.getMonth();
  let weeks = Math.floor(remainingDays / 7);
  let days = remainingDays % 7;
  seconds = seconds + 86400;
  let hours = Math.floor(seconds / 3600) % 24;
  let minutes = Math.floor(seconds / 60) % 60;
  seconds = seconds % 60;
  return { months, weeks, days, hours, minutes, seconds };
}

// Inflating the DOM with values and labels
function inflateDOM(remaining){
  let valuesDOM = document.querySelectorAll(".value");
  let labelsDOM = document.querySelectorAll(".label");
  let timeValues = convertSeconds(remaining);
  let timeArray = [
    { value: timeValues.months, label: (timeValues.months === 1) ? "month" : "months" },
    { value: timeValues.weeks, label: (timeValues.weeks === 1) ? "week" : "weeks" },
    { value: timeValues.days, label: (timeValues.days === 1) ? "day" : "days" },
    { value: timeValues.hours, label:(timeValues.hours === 1) ? "hour" : "hours" },
    { value: timeValues.minutes, label: (timeValues.minutes === 1) ? "minute" : "minutes" },
    { value: timeValues.seconds, label: (timeValues.seconds === 1) ? "second" : "seconds" }
  ];

  for (let i = 0; i < 3; i++) {
    const index = timeArray.findIndex( (item) => item.value);
    valuesDOM[i].textContent = timeArray[index].value;
    labelsDOM[i].textContent = timeArray[index].label;
    timeArray.splice(index, 1);
  }
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function progressTextDOM(progressNum){
  let progressStr = progressNum.toString();
  let isWhole = progressStr.charAt(progressStr.length - 1) === "0"
  return (isWhole) ? Math.floor(progressNum) + "% COMPLETE" : progressNum + "% COMPLETE";
}

function yearsDisplay(currentYear, progressNum){
  yearsDispDOM.innerHTML = `<span class='dying-year'>${currentYear}</span><span class='pending-year'>${currentYear + 1}</span>`;

  let fadingYear = q(".dying-year");
  let pendingYear = q(".pending-year");

  fadingYear.style.opacity = 1.1 - (progressNum / 100).toFixed(1);
  pendingYear.style.opacity = 0.1 + (progressNum / 100).toFixed(1);
  fadingYear.style.filter = `blur(${(progressNum / 50).toFixed(1)}px)`;
  pendingYear.style.filter = `blur(${(2 - progressNum / 50).toFixed(1)}px)`;

  let nextYear = q(".year-progress");
  nextYear.innerHTML = "<div class='progress-bar'></div>";

  let progressBar = q(".progress-bar");
  let progressWidth = 165 * (progressNum / 100);
  
  progressBar.style.width = `${progressWidth}px`;
  customRGB(progressBar, progressNum);
}

function customizeCountdown(){
  let { progress, remaining } = getTimeValues();
  let currentDate = getCurrentDate();
  let currentYear = currentDate.year;
  let yearInMillis = new Date(currentYear, 11, 31).getTime() - new Date(currentYear, 0, 0).getTime();
  let yearDays = Math.floor(yearInMillis/(1000 * 86400));
  let progressNum = ((100 * progress / 86400) / yearDays).toFixed(1);
  progressText.innerHTML = progressTextDOM(progressNum);

  let progressDay = Math.ceil(progress / 86400);
  
  let today = new Today(progDayText, todayText);
  today.getToday(new Date(), progressDay, yearDays);

  yearsDisplay(currentYear, progressNum);
}

function customRGB(progressBar, progressNum){
  let R;
  let G;
  if (progressNum <= 25) {
    R = Math.floor(2.0416 * progressNum);
    progressBar.style.backgroundColor = `rgb(${R}, 255, 75)`;
    eventLabel.style.backgroundColor = `rgba(${R}, 255, 75, 0.3)`;
  }

  else if (progressNum > 25 && progressNum <= 50) {
    R = Math.floor(5.1 * progressNum);
    progressBar.style.backgroundColor = `rgb(${R}, 255, 75)`;
    eventLabel.style.backgroundColor = `rgba(${R}, 255, 75, 0.3)`;
  }

  else {
    G = Math.floor((2 - progressNum / 50) * 255);
    progressBar.style.backgroundColor = `rgb(255, ${G}, 75)`;
    eventLabel.style.backgroundColor = `rgba(255, ${G}, 75, 0.3)`;
  }
}

function setCountdown() {
  let { progress, remaining } = getTimeValues();
  let interval = setInterval(() => {
    progress++;
    remaining--;
    inflateDOM(remaining);
    customizeCountdown();
    if (remaining === 0) {
      clearInterval(interval);
      alert("HAPPY NEW YEAR!");
    }
  }, 1000);
}

setCountdown();