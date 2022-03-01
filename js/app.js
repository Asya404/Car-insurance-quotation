// Variables



// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // create the option for the years
    const html = new HTMLUI();
    html.displayYears();
});


// Dissplay years
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