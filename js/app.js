// Variables
const form = document.querySelector('#request-quote');
const html = new HTMLUI();




// Event Listeners
eventListeners();
function eventListeners() {

    // Create the option for the years
    document.addEventListener('DOMContentLoaded', function () {
        html.displayYears();
    });


    // When the form is submitted
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Read the values from the form
        const make = document.querySelector('#make').value;
        const year = document.querySelector('#year').value;
        const level = document.querySelector('input[name="level"]:checked').value;


        if (make === '' || year === '' || level === '') {
            html.displayError('All the fields are mandatory');
        } else {
            // Clear the previous result
            const prevResult = document.querySelector('.result div');
            if(prevResult != null) {
                prevResult.remove();
            }

            // Create new obj from Insurance, then use it's method calculate
            const insuranceCar = new Insurance(make, year, level);
            const price = insuranceCar.calculateQuotation(insuranceCar);

            // Print the result from HTMLUI
            html.showResults(price, insuranceCar);
        }
    });
}



// ---     Objects     ---

// RELATED TO QUOTATION
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
}



// Calculate the price
Insurance.prototype.calculateQuotation = function (insurance) {
    let price;
    const base = 2000;
    const make = insurance.make;
    const year = insurance.year;

    if (make == 1) {
        price = base * 1.15;
    } else if (make == 2) {
        price = base * 1.05;
    } else if (make == 3) {
        price = base * 1.35;
    }

    // Insurance is going to be 3% cheaper for each year
    const difference = this.getYearDifference(year);
    price = price - (price * (difference * 3)) / 100;

    // Check the level of protection
    const level = insurance.level;
    price = this.calculateLevel(price, level);
    return price;
}



// Returns the difference between years
Insurance.prototype.getYearDifference = function (year) {
    return new Date().getFullYear() - year;
}



// Increase the value by 30% - basic level, 50% - complete
Insurance.prototype.calculateLevel = function (price, level) {
    if (level === 'basic') {
        price = price * 1.30;
    } else {
        price = price * 1.50;
    }
    return price;
};





// RELATED TO THE HTML
// Display yhe latest 20 years in the select
function HTMLUI() { };

HTMLUI.prototype.displayYears = function () {
    const max = new Date().getFullYear();
    min = max - 20;

    const selectYears = document.querySelector('#year');

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);
    }
}



// Prints the error
HTMLUI.prototype.displayError = function (message) {
    const div = document.createElement('div');
    div.classList.add('error');
    div.innerHTML = `
    <p>${message}</p>
    `;
    form.insertBefore(div, document.querySelector('.form-group'));

    // Remove the error
    setTimeout(function () {
        document.querySelector('.error').remove();
    }, 3000)
}



// Prints the result into html
HTMLUI.prototype.showResults = function (price, insurance) {
    const result = document.querySelector('.result');
    const div = document.createElement('div');
    let make = insurance.make;

    if (make == '1') {
        make = 'American';
    } else if (make == '2') {
        make = 'Asian';
    } else if (make == '3') {
        make = 'European';
    }

    div.innerHTML = `
    <p class="header">Summary</p>
    <p>Make: ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>Level: ${insurance.level}</p>
    <p class="total">Total:$ ${price}</p>
    `;

    result.appendChild(div);
}