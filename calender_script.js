let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthYearDOM = q("#month-year");

const otherdays = [
  "The trouble is, you think you think you have time. ~ J. Kornfield",
  "Time is extremely valuable. ~ Kanye West",
  "There's never enough time to do all the nothing you want. ~ B. Watterson",
  "Oh yes, the past can hurt. But you can either run from it or learn from it. ~ Rafiki (The Lion King)",
  "Today is a good day to try. ~ Quasimodo (The Hunchback of Notre Dame)",
  "You may not own this day, but you can use it. ~ H. Mackey",
  "Time is money. ~ B. Franklin",
  "Time is a storm in which we are all lost. ~ W. C. Williams",
  "Suspect each moment, for it is a thief, tiptoeing away with more than it brings. ~ J. Updike",
  "Men talk of killing time, while time quietly kills them. ~ D. Boucicault",
  "Regret for wasted time is more wasted time. ~ M. Cooley",
  "Time spent with cats is never wasted. ~ Colette",
  "The way we spend our time defines who we are. ~ J. Estrin",
  "It's not that we have little time, but more that we waste a good deal of it. ~ Seneca",
  "Either you run the day, or the day runs you. ~ J. Rohn",
  "If we take care of the moments, the years will take care of themelves. ~ M. Edgeworth"
];

// Calling the calendar function
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

  let firstDay = (new Date(year, month)).getDay();
  let monthDays = 32 - new Date(year, month, 32).getDate();

  // Body of the calendar.
  let tbl = document.getElementById("calendar-body");

  // Clearing all previous cells.
  tbl.innerHTML = "";

  // Filling data about month and year in the page via DOM.

  monthYearDOM.innerHTML = "<span class='month'>" + months[month].toUpperCase() + "</span>" + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // Creating all cells.
  let date = 1;
  for (let i = 0; i < 6; i++) {

    // Creating a table row.
    let row = document.createElement("tr");

    // Creating individual cells & filling them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellTxt = document.createTextNode("");
        cell.appendChild(cellTxt);
        row.appendChild(cell);
      }
      else if (date > monthDays) {
        break;
      }
      else {
        let cell = document.createElement("td");
        let cellTxt = document.createTextNode(date);

        // Color today's date and label events.
        if (date === today.getDate() && month === today.getMonth()) {
          // January, February event labels.
          if (today.getMonth() === 0) {
            if (today.getDate() === 1) q(".event-label").innerHTML = "Happy New Year, make it count.";
            else if (today.getDate() === 21) q(".event-label").innerHTML = "It's Rapsody's birthday today";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          // February event labels.
          else if (today.getMonth() === 1) {
            if (today.getDate() === 14) q(".event-label").innerHTML = "Valentine's day";
            else if (today.getDate() === 23) q(".event-label").innerHTML = "The day Little Simz was born";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          // March event labels.
          else if (today.getMonth() === 2) {
            if (today.getDate() === 21) q(".event-label").innerHTML = "Human Rights day";
            else if (today.getDate() === 31) q(".event-label").innerHTML = "End of the first quarter";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }

          }
          // April event labels.
          else if (today.getMonth() === 3) {
            if (today.getDate() === 27) q(".event-label").innerHTML = "Freedom day";
          }
          // May event labels.
          else if (today.getMonth() === 4) {
            if (today.getDate() === 1) q(".event-label").innerHTML = "Worker's day!";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          // June event labels.
          else if (today.getMonth() === 5) {
            if (today.getDate() === 13) q(".event-label").innerHTML = "Dani's birthday";
            else if (today.getDate() === 16) q(".event-label").innerHTML = "Youth day";
            else if (today.getDate() === 30) q(".event-label").innerHTML = "Halfway through the year";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          // July, August event labels.
          else if (today.getMonth() === 7) {
            if (today.getDate === 9) q(".event-label").innerHTML = "Women's day";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          // September events
          else if (today.getMonth() === 8) {
            if (today.getDate() === 30) q(".event-label").innerHTML = "Into the final quarter";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          // November events
          else if (today.getMonth() === 10) {
            if (today.getDate() === 1) q(".event-label").innerHTML = "Continue to rest in peace Kirshnik. You're forever in our hearts.";
            else if (today.getDate() === 2) q(".event-label").innerHTML = `The Last Rocket by Takeoff, turns ${currentYear - 2018} today.`;
            else if (today.getDate() === 13) q(".event-label").innerHTML = `LIYAZONGOMA! turns ${currentYear - 2022} today.`;
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }

          // December event labels.
          else if (today.getMonth() === 11) {
            if (today.getDate() === 16) q(".event-label").innerHTML = "A Day of Reconciliation!";
            else if (today.getDate() === 24) q(".event-label").innerHTML = "Christmas eve";
            else if (today.getDate() === 25) q(".event-label").innerHTML = "Merry Christmas";
            else if (today.getDate() === 26) q(".event-label").innerHTML = "A Day of Goodwill";
            else if (today.getDate() === 31) q(".event-label").innerHTML = "New Year's eve, enjoy responsibly.";
            else {
              let rand = Math.floor(Math.random()*otherdays.length);
              q(".event-label").innerHTML = otherdays[rand];
            }
          }
          
          cell.classList.add("today-bg");
        }
        // January events.
        else if (date === 1 && month === 0) {
          cell.classList.add("event");
        }
        // February, March events
        else if (date === 21 && month === 2) {
          cell.classList.add("event");
        }
        // April events
        else if (date === 27 && month === 3) {
          cell.classList.add("event");
        }
        // May, June events.
        else if ((date === 1 && month === 4) || (date === 16 && month === 5)) {
          cell.classList.add('event');
        }

        // July, August, September events.
        else if ((date === 9 && month === 7) || (date === 24 && month === 8)) {
          cell.classList.add("event");
        }
        // December events
        else if ((date === 16 || date === 25 || date === 26) && month === 11) {
          cell.classList.add("event");
        }
        cell.appendChild(cellTxt);
        row.appendChild(cell);
        date++;
      }
    }
    // Finally, appending each row into calendar body.
    tbl.appendChild(row);

  }
}

//window.addEventListener('touchmove', swipe);

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      next();
    } else {
      previous();
    }
  } else {
    if (yDiff > 0) {
      // Swiping down
    } else {
      // Swiping up
    }
  }
  // Resetting the co-ordinates
  xDown = null;
  yDown = null;
};