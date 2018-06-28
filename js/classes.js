class Insurance {
  constructor (make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }
  calculateQuotation(insurance) {
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
  calculateLevel(price, level) {
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
  }
  getYearDifference(year) {
    return new Date().getFullYear() - year;
  }
}

class HTMLUI {
  displayYears() {
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
  }
  displayError(message) {
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
  }
  showResult(price, insurance) {
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
  }
}
