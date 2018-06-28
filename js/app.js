// Variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();

// Event Listeners
function eventListeners () {
  document.addEventListener('DOMContentLoaded', function () {
    // Create the <option> for the years
    html.displayYears();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Read the values from the FORM
    const make = document.getElementById('make').value;
    const year = document.getElementById('year').value;
    // Read the radio buttons
    let level = document.querySelector('input[name="level"]:checked') ? document.querySelector('input[name="level"]:checked').value : '';

    // Check the fields are selected
    if (make === '' || year === '' || level === '') {
      html.displayError('All the fields are mandatory');
    } else {
      // Clear the previous quote
      const prevResult = document.querySelector('#result div');
      if(prevResult != null) {
        prevResult.remove();
      }
      // Make the quotation
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculateQuotation(insurance);

      // Print the result from HTMLUI();
      html.showResult(price, insurance);
    }
  });
}


// Objects
// Everything related to the quotation and calculations of Insurance
function Insurance (make, year, level) {
  this.make = make;
  this.year = year;
  this.level = level;
}

// Calculate the price for the current quotation
Insurance.prototype.calculateQuotation = function (insurance) {
  let price;
  const base = 2000;

  // Get the make
  const make = insurance.make;
  /*
    1 = American 1.15  15%
    2 = Asian 1.05     5%
    3 = European 1.35  35%
  */
  switch(make) {
    case '1':
        price = base * 1.15;
        break;
    case '2':
        price = base * 1.05;
        break;
    case '3':
        price = base * 1.35;
        break;
  }

  // Get the year
  const year = insurance.year;
  const difference = this.getYearDifference(year);

  // Each year the coast of the insurance is going to be 3% cheaper
  price = price - ((difference * 3) * price) / 100;

  // Check the level of protection
  const level = insurance.level;

  price = this.calculateLevel(price, level);
  return price;
}

// Adds the value based on the level of protection
Insurance.prototype.calculateLevel = function (price, level) {
  /*
    Basic insurance is going to increase the value by 30%
    Complete Insurance is going to increase the value by 50%
  */
  if (level === 'basic') {
    price = price * 1.30;
  } else {
    price = price * 1.50;
  }
  return price.toFixed(2);
  // return Math.floor(price);
};
// Return the difference between years
Insurance.prototype.getYearDifference = function (year) {
  return new Date().getFullYear() - year;
};
// Everything related to the HTML
function HTMLUI () {}

// Display the latest 20 years in the select
HTMLUI.prototype.displayYears = function () {
  const max = new Date().getFullYear();
  const min = max - 20;

  // Generate the list with the latest 20 years
  const selectYears = document.getElementById('year');

  // Print the values
  for(let i = max; i >= min; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYears.appendChild(option);
  }
};

HTMLUI.prototype.displayError = function (message) {
  const div = document.createElement('div');
  div.classList = 'error';

  // insert the message
  div.innerHTML = `
    <p>${message}</p>
  `;

  form.insertBefore(div, document.querySelector('.form-group'));

  // Remove the error
  setTimeout (function () {
    document.querySelector('.error').remove();
  }, 3000);
};

// Print the result into html
HTMLUI.prototype.showResult = function (price, insurance) {
  const result = document.getElementById('result');
  // create the div with the result
  const div = document. createElement('div');
  // Get make from the object and assign a readable name
  let make = insurance.make;
  switch(make) {
    case '1':
        make = 'American';
        break;
    case '2':
        make = 'Asian';
        break;
    case '3':
        make = 'European';
  }
  // Insert the result
  div.innerHTML = `
    <p class="header">Summary</p>
    <p>Made by: ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>Level: ${insurance.level}</p>
    <p class="total">Total: $ ${price}</p>
  `;
  const spinner = document.querySelector('#loading img');
  spinner.style.display = 'block';

  setTimeout(function () {
    spinner.style.display = 'none';
    // Insert div into html
    result.appendChild(div);
  }, 1500);
};

// Init app
eventListeners();
