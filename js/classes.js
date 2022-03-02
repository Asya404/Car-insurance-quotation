class Insurance {

    constructor(make, year, level) {
        this.make = make;
        this.year = year;
        this.level = level;
    }



    // Calculate the price
    calculateQuotation(insurance) {
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
    getYearDifference(year) {
        return new Date().getFullYear() - year;
    }



    // Increase the value by 30% - basic level, 50% - complete
    calculateLevel(price, level) {
        if (level === 'basic') {
            price = price * 1.30;
        } else {
            price = price * 1.50;
        }
        return price;
    };
}




// RELATED TO THE HTML
// Display the latest 20 years in the select
class HTMLUI {

    displayYears() {
        const max = new Date().getFullYear();
        let min = max - 20;

        const selectYears = document.querySelector('#year');

        for (let i = max; i >= min; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYears.appendChild(option);
        }
    }



    // Prints the error
    displayError(message) {
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
    showResults(price, insurance) {
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

        const spinner = document.querySelector('#loading img');
        spinner.style.display = 'block';

        setTimeout(function () {
            spinner.style.display = 'none';
            result.appendChild(div);
        }, 2000)
    }
};