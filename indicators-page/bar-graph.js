// Default y variable
var yVariable = 'gdp_per_capita_usd';
var data;

// Function to update the chart based on user input
function updateChart() {
  // Get the selected option from the dropdown
  var selectedOption = document.getElementById('indicator-select').value;

  // Update yVariable based on the selected option
  yVariable = selectedOption || 'gdp_per_capita_usd';

  // Update chart header
  document.getElementById('chart-header').innerText = 'Top 10 Countries - ' + yVariable;

  // Load CSV file and create a horizontal bar chart with the top 10
  d3.csv('../CSV_Files/whoiswinning-updated.csv').then(function (csvData) {
    data = csvData;
    try {
      // Convert "NA" values to zero
      data.forEach(function (d) {
        // ... (rest of the code)
      });

      // Update the quiz options based on the selected variable
      updateQuizOptions(data);
    } catch (error) {
      console.log(error);
    }
  });
}

// Function to update the quiz options based on the selected variable
function updateQuizOptions(data) {
  // Get all the quiz select elements
  var quizSelects = document.querySelectorAll('.quiz-select');

  // Clear existing options in all selects
  quizSelects.forEach(function (quizSelect) {
    if (quizSelect) {
      quizSelect.innerHTML = '';
    }
  });

  // Populate the quiz options dynamically based on the selected variable
  var allCountries = getAllCountries(data);
  allCountries.forEach(function (country) {
    quizSelects.forEach(function (quizSelect) {
      if (quizSelect) {
        var option = document.createElement('option');
        option.value = country;
        option.text = country;
        quizSelect.add(option);
      }
    });
  });
}

// Function to get all countries
function getAllCountries(data) {
  // Map data from CSV to an array of country names
  var countryNames = data.map(function (d) {
    return d.country; // Assuming 'country' is the column name in your CSV file
  });

  return countryNames;
}
