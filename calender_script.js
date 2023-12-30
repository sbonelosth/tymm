otherDays =
	[
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
		"If we take care of the moments, the years will take care of themselves. ~ M. Edgeworth"
	]


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
	let prevMonthDays = 32 - new Date(year, month - 1, 32).getDate();
	let nextMonthStart = (new Date(year, month + 1)).getDay();

	// Body of the calendar.
	let tbl = document.getElementById("calendar-body");

	// Clearing all previous cells.
	tbl.innerHTML = "";

	// Filling data about month and year in the page via DOM.
	monthYearDOM.innerHTML = `<span class='month'>${months[month].toUpperCase()}</span> ${year}`;
	selectYear.value = year;
	selectMonth.value = month;

	let eventLabel = q(".event-label");
	let quote = otherDays[Math.floor(Math.random() * otherDays.length)];

	// Creating all cells.
	let date = 1;
	for (let i = 0; i < 6; i++) {

		// Creating a table row.
		let row = document.createElement("tr");

		// Creating individual cells & filling them up with data.
		for (let j = 0; j < 7; j++) {
			let cell = document.createElement("td");
			let cellTxt;

			if (i === 0 && j < firstDay) {
				cellTxt = document.createTextNode(prevMonthDays - firstDay + j + 1);
				cell.classList.add("prev-month");
			}
			else if (date > monthDays) {
				if (i < 5) {
					cellTxt  = document.createTextNode(date++ - monthDays);
					cell.classList.add("next-month");
				} else if (nextMonthStart < 2 && nextMonthStart > 0) {
					cellTxt  = document.createTextNode(date++ - monthDays);
					cell.classList.add("next-month");
				}
				else break;
			}
			else {
				function addlabel(eventString) {
                    eventLabel.innerHTML = eventString
                }

                // Selecting events or holidays and adding labels to them
                if (date === today.getDate() && month === today.getMonth()) {
                    switch (today.getMonth()) {
                        // January events
                        case 0:
                            switch (today.getDate()) {
                                case 1:
                                    addlabel("Happy New Year, make it count."); break;
                                case 21:
                                    addlabel("It's Rapsody's birthday today"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // February events
                        case 1:
                            switch (today.getDate()) {
                                case 14:
                                    addlabel("Valentine's day"); break;
                                case 23:
                                    addlabel("The day Little Simz was born"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // March events
                        case 2:
                            switch (today.getDate()) {
                                case 21:
                                    addlabel("Human Rights day"); break;
                                case 31:
                                    addlabel("End of the first quarter"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // April events
                        case 3:
                            switch (today.getDate()) {
                                case 27:
                                    addlabel("Freedom day"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // May events labels
                        case 4:
                            switch (today.getDate()) {
                                case 1:
                                    addlabel("Worker's day!"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // June events
                        case 5:
                            switch (today.getDate()) {
                                case 13:
                                    addlabel("Dani's birthday"); break;
                                case 16:
                                    addlabel("Youth day"); break;
                                case 30:
                                    addlabel("Halfway through the year"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // July, August events
                        case 7:
                            switch (today.getDate()) {
                                case 9:
                                    addlabel("Women's day"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // September events
                        case 8:
                            switch (today.getDate()) {
                                case 30:
                                    addlabel("Into the final quarter"); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // November events
                        case 10:
                            switch (today.getDate()) {
                                case 1:
                                    addlabel("Continue to rest in peace Kirshnik. You're forever in our hearts."); break;
                                case 2:
                                    addlabel(`The Last Rocket by Takeoff, turns ${currentYear - 2018} today.`); break;
                                case 13:
                                    addlabel(`LIYAZONGOMA! turns ${currentYear - 2022} today.`); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        // December events
                        case 11:
                            switch (today.getDate()) {
                                case 16:
                                    addlabel("A Day of Reconciliation!"); break;
                                case 24:
                                    addlabel("Christmas eve"); break;
                                case 25:
                                    addlabel("Merry Christmas"); break;
                                case 26:
                                    addlabel("A Day of Goodwill"); break;
                                case 31:
                                    addlabel("New Year's eve, enjoy responsibly."); break;
                                default:
                                    addlabel(quote)
                            }
                            break;
                        default:
                            addlabel(quote)
                    }
                    cell.classList.add("current-day");
                }
                // Adding class "event" to select and highlight the dates with events or holidays
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
				cellTxt = document.createTextNode(date++);
			}
			cell.appendChild(cellTxt);
			cell.classList.add(".otherdays")
			row.appendChild(cell);
		}
		// Finally, appending each row into calendar body.
		tbl.appendChild(row);
	}
}

// Adding the swiping functionality to the calender
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) { return evt.touches || evt.originalEvent.touches; }

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
};

function handleTouchMove(evt) { 
	if (!xDown || !yDown) return;

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) next();
		else previous();
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