let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthYearDOM = q("#month-year");

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
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          // January, February event labels.
          if (today.getDate() === 1 && today.getMonth() === 0) {
            q(".event-label").innerHTML = "Happy New Year, Make It Count!";
          }
          else if (today.getDate() === 21 && today.getMonth() === 0) {
            q(".event-label").innerHTML = "Happy Birthday, Rapsody!";
          }
          // February event labels.
          else if (today.getDate() === 14 && today.getMonth() === 1) {
            q(".event-label").innerHTML = "Happy Valentine's Day!";
          }
          else if (today.getDate() === 23 && today.getMonth() === 1) {
            q(".event-label").innerHTML = "Happy Birthday, Little Simz!";
          }
          // March event labels.
          else if (today.getDate() === 21 && today.getMonth() === 2) {
            q(".event-label").innerHTML = "Happy Human Rights Day!";
          }
          else if (today.getDate() === 22 && today.getMonth() === 2 && today.getFullYear() === 2021) {
            q(".event-label").innerHTML = "Human Rights Day observed!";
          }
          else if (today.getDate() === 31 && today.getMonth() === 2) {
            q(".event-label").innerHTML = "Wrapping up the first quarter of the year!";
          }
          // April event labels.
          else if (today.getDate() === 7 && today.getMonth() === 3) {
            q(".event-label").innerHTML = "Good Friday!";
          }
          else if (today.getDate() === 8 && today.getMonth() === 3) {
            q(".event-label").innerHTML = "Holy Saturday!";
          }
          else if (today.getDate() === 9 && today.getMonth() === 3) {
            q(".event-label").innerHTML = "Easter Sunday!";
          }
          else if (today.getDate() === 10 && today.getMonth() === 3) {
            q(".event-label").innerHTML = "Happy Family Day, Make It Count!";
          }
          else if (today.getDate() === 27 && today.getMonth() === 2) {
            q(".event-label").innerHTML = "Happy Freedom Day!";
          }
          // May event labels.
          else if (today.getDate() === 1 && today.getMonth() === 4) {
            q(".event-label").innerHTML = "Worker's Day!";
          }
          else if (today.getDate() === 7 && today.getMonth() === 4) {
            q(".event-label").innerHTML = "Happy Twins Birthday, Inezile! Stay amazing.";
          }
          else if (today.getDate() === 14 && today.getMonth() === 4) {
            q(".event-label").innerHTML = "Happy Mother's Day!";
          }
          // June event labels.
          else if (today.getDate() === 16 && today.getMonth() === 5) {
            q(".event-label").innerHTML = "Happy Youth Day!";
          }
          else if (today.getDate() === 18 && today.getMonth() === 5) {
            q(".event-label").innerHTML = "Happy Father's Day!";
          }
          else if (today.getDate() === 30 && today.getMonth() === 5) {
            q(".event-label").innerHTML = "Halfway through the year!";
          }
          // July, August event labels.
          else if (today.getDate() === 9 && today.getMonth() === 7) {
            q(".event-label").innerHTML = "Happy Women's Day!";
          }
          // September, October, November events
          else if (today.getDate() === 30 && today.getMonth() === 8) {
            q(".event-label").innerHTML = "Into the final quarter of the year!";
          }
          else if (today.getDate() === 13 && today.getMonth() === 10) {
            q(".event-label").innerHTML = `LIYAZONGOMA! turns ${currentYear - 2022} today.`;
          }
          else if (today.getDate() === 1 && today.getMonth() === 10) {
            q(".event-label").innerHTML = "Continue to rest in peace Kirshnik. You're forever in our hearts!";
          }
          else if (today.getDate() === 2 && today.getMonth() === 10) {
            q(".event-label").innerHTML = `The Last Rocket by Takeoff, turns ${currentYear - 2018} today.`;
          }
          // December event labels.
          else if (today.getDate() === 16 && today.getMonth() === 11) {
            q(".event-label").innerHTML = "A Day of Reconciliation!";
          }
          else if (today.getDate() === 24 && today.getMonth() === 11) {
            q(".event-label").innerHTML = "Happy Christmas Eve!";
          }
          else if (today.getDate() === 25 && today.getMonth() === 11) {
            q(".event-label").innerHTML = "Merry Christmas!";
          }
          else if (today.getDate() === 26 && today.getMonth() === 11) {
            q(".event-label").innerHTML = "A Day of Goodwill!";
          }
          else if (today.getDate() === 31 && today.getMonth() === 11) {
            q(".event-label").innerHTML = "Happy New Year's Eve!";
          }
          else {
            q(".event-label").innerHTML = "Just another day!"
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
        else if ((date === 7 || date === 8 || date === 9 || date === 10) && month === 3 && year === 2023) {
          cell.classList.add("event");
        }
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
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            next();
        } else {
            previous();
        }                       
    } else {
        if ( yDiff > 0 ) {
            // down swipe
        } else { 
            // up swipe
        }                                                                 
    }
    // reset values
    xDown = null;
    yDown = null;                                             
};