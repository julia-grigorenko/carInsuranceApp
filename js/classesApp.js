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

// Init app
eventListeners();
