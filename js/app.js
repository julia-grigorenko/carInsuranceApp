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
      console.log('good');
    }
  });
}


// Objects
function HTMLUI () {}

// Display the latest 20 years in the select
HTMLUI.prototype.displayYears = function () {
  const max = new Date().getFullYear();
  const min = max - 20;
  console.log(max);

  // Generate the list with the latest 20 years
  const selectYears = document.getElementById('year');

  // Print the values
  for(let i = max; i >= min; i--) {
    const option = document.createElement('option');
    option.value = 1;
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

// Init app
eventListeners();
