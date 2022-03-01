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
            console.log('ok');
        }
    });
}




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
HTMLUI.prototype.displayError = function(message) {
    const div = document.createElement('div');
    div.classList.add('error');
    div.innerHTML = `
    <p>${message}</p>
    `;
    form.insertBefore(div, document.querySelector('.form-group'));

    // Remove the error
    setTimeout(function() {
        document.querySelector('.error').remove();
    }, 3000)
}