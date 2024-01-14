// Default y variable
var yVariable = 'GDP_per_Capita';
var data;

// Function to update the chart based on user input
function updateChart() {
  // Get the selected value from the dropdown list
  var selectElement = document.getElementById('yVariableSelect');
  yVariable = selectElement.value;

  // Change the header text based on the selected variable
  document.getElementById('chart-header').innerText = 'Top 10 Countries - ' + yVariable;

  // Load CSV file and create a horizontal bar chart with the top 10
  d3.csv('whoiswinning.csv').then(function (csvData) {
      data = csvData;
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

  // Sort the country names alphabetically
  countryNames.sort();

  return countryNames;
}

// Function to get the top 10 countries for a specific variable
function getTop10Countries(data, variable) {
  // Implement logic to retrieve the top 10 countries for the specified variable
  // This could involve sorting the data and extracting the top 10
  // For simplicity, I'll return a placeholder array here

  // Map data from CSV to an array of country names
  var countryNames = data.map(function (d) {
    return d.country; // Assuming 'country' is the column name in your CSV file
  });

  // Sort the country names based on the specified variable
  countryNames.sort(function (a, b) {
    return data.find(countryData => countryData.country === b)[variable] -
      data.find(countryData => countryData.country === a)[variable];
  });

  // Take only the top 10
  var top10Countries = countryNames.slice(0, 10);

  return top10Countries;
}

// Function to check the quiz answers and calculate the score
function checkQuiz() {
  // Get the selected options from all quiz selects
  var selectedOptions = [];
  var quizSelects = document.querySelectorAll('.quiz-select');
  quizSelects.forEach(function (quizSelect) {
    selectedOptions.push(quizSelect.value);
  });

  // Get the correct answers based on the selected variable
  var correctAnswers = getTop10Countries(data, yVariable);

  // Calculate the score
  var score = 0;
  selectedOptions.forEach(function (selectedOption) {
    if (correctAnswers.includes(selectedOption)) {
      score++;
    }
  });

  // Display the result and score
  var quizResult = document.getElementById('quiz-result');
  quizResult.innerText = `You scored ${score} out of 5. ${score === 5 ? 'Congratulations!' : 'Try again!'}`;
}

// Initial load of the chart and quiz options
updateChart();