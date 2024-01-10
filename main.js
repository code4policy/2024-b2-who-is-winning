// Default y variable
var yVariable = 'gdp_per_capita_usd';
var data;  // Declare data at a higher scope

// Function to update the chart based on user input
function updateChart() {
  // Get the selected value from the dropdown list
  var selectElement = document.getElementById('yVariableSelect');
  yVariable = selectElement.value;

  // Change the header text based on the selected variable
  document.getElementById('chart-header').innerText = 'Top 10 Countries - ' + yVariable;

  // Load CSV file and create a horizontal bar chart with the top 10
  d3.csv('whoiswinning.csv')
    .then(function (csvData) {
      data = csvData;  // Assign the loaded data to the higher-scoped variable

      try {
        // Convert "NA" values to zero
        data.forEach(function (d) {
          d[yVariable] = isNaN(parseFloat(d[yVariable])) ? 0 : parseFloat(d[yVariable]);
        });

        // Sort data by the specified variable in descending order
        data.sort(function (a, b) {
          return b[yVariable] - a[yVariable];
        });

        // Take only the top 10
        var top10Data = data.slice(0, 10);

        console.log('Sorted Data:', top10Data); // Log top 10 data

        // Create a horizontal bar chart
        var margin = { top: 20, right: 20, bottom: 30, left: 120 }, // Increase left margin to accommodate labels
          width = 900 - margin.left - margin.right, // Adjusted width
          height = 400 - margin.top - margin.bottom;

        var svg = d3.select('#chart-container').html('') // Clear existing content
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var y = d3.scaleBand()
          .range([0, height])
          .domain(top10Data.map(function (d) { return d.country; }))
          .padding(0.1);

        var x = d3.scaleLinear()
          .range([0, width])
          .domain([0, d3.max(top10Data, function (d) { return d[yVariable]; })]);

        // Append X and Y axes
        svg.append('g')
          .call(d3.axisLeft(y));

        svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x));

        // Create horizontal bars
        svg.selectAll('.bar')
          .data(top10Data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('y', function (d) { return y(d.country); })
          .attr('height', y.bandwidth())
          .attr('x', 0)
          .attr('width', function (d) {
            // Log the problematic data
            if (isNaN(d[yVariable])) {
              console.error('Invalid value for ' + yVariable + ':', d[yVariable]);
            }
            // Check if the specified variable is a valid number
            return isNaN(d[yVariable]) ? 0 : x(d[yVariable]);
          })
          .transition()
          .duration(1000)
          .attr('width', function (d) {
            // Log the problematic data
            if (isNaN(d[yVariable])) {
              console.error('Invalid value for ' + yVariable + ':', d[yVariable]);
            }
            // Check if the specified variable is a valid number
            return isNaN(d[yVariable]) ? 0 : x(d[yVariable]);
          });

        // Update the quiz options based on the selected variable
        updateQuizOptions();
      } catch (error) {
        console.log(error);
      }
    });
}

// Function to update the quiz options based on the selected variable
function updateQuizOptions() {
  // Get the select element for the quiz
  var quizSelect = document.getElementById('quiz-select');

  // Clear existing options
  quizSelect.innerHTML = '';

  // Populate the quiz options dynamically based on the selected variable
  var allCountries = getAllCountries();
  allCountries.forEach(function (country) {
    var option = document.createElement('option');
    option.value = country;
    option.text = country;
    quizSelect.add(option);
  });
}

// Function to get all countries
function getAllCountries() {
  // Map data from CSV to an array of country names
  var countryNames = data.map(function (d) {
    return d.country; // Assuming 'country' is the column name in your CSV file
  });

  // Sort the country names alphabetically
  countryNames.sort();

  return countryNames;
}

// Function to check the quiz answers
function checkQuiz() {
  var selectedOptions = Array.from(document.getElementById('quiz-select').selectedOptions).map(option => option.value);

  // Get the correct answers based on the selected variable
  var correctAnswers = getTop10Countries();

  // Check if the selected options match the correct answers
  var isCorrect = selectedOptions.every(option => correctAnswers.includes(option));

  // Display the result
  var quizResult = document.getElementById('quiz-result');
  quizResult.innerText = isCorrect ? 'Correct! You selected one of the top 10 countries.' : 'Incorrect. Try again!';
}

// Function to get the top 10 countries for a specific variable
function getTop10Countries() {
  // Implement logic to retrieve the top 10 countries for the specified variable
  // This could involve sorting the data and extracting the top 10
  // For simplicity, I'll return a placeholder array here

  // Map data from CSV to an array of country names
  var countryNames = data.map(function (d) {
    return d.country; // Assuming 'country' is the column name in your CSV file
  });

  // Sort the country names based on the specified variable
  countryNames.sort(function (a, b) {
    return data.find(countryData => countryData.country === b)[yVariable] -
      data.find(countryData => countryData.country === a)[yVariable];
  });

  // Take only the top 10
  var top10Countries = countryNames.slice(0, 10);

  return top10Countries;
}

// Initial load of the chart
updateChart();

