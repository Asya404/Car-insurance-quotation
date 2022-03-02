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
            if (prevResult != null) {
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