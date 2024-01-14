// Default y variable
var yVariable = 'GDP_per_Capita';
var data;

// Store selected quiz values
var selectedQuizValues = [];

// Function to update the chart based on user input
function updateChart() {
  // Get the selected value from the dropdown list
  var selectElement = document.getElementById('yVariableSelect');
  yVariable = selectElement.value;

  // Customize the header text based on the selected variable
  var chartHeader = document.getElementById('chart-header');
  var chartSubheader = document.getElementById('chart-subheader');

  if (yVariable === 'trade_balance') {
    chartHeader.innerText = 'Top 10 Countries by Trade Balance';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'government_revenue') {
    chartHeader.innerText = 'Top 10 Countries by Government Revenue as a % of GDP';
    chartSubheader.innerText = 'According to data from xxx';
    } else if (yVariable === 'GDP_per_Capita') {
    chartHeader.innerText = 'Top 10 Countries by GDP per capita (USD)';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'military_expenditure') {
    chartHeader.innerText = 'Top 10 Countries by Military Expenditure';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'tourist_arrivals') {
    chartHeader.innerText = 'Top 10 Countries by Tourist Arrivals';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'dog_ownership') {
    chartHeader.innerText = 'Top 10 Countries by Dog Ownership';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'cat_ownership') {
    chartHeader.innerText = 'Top 10 Countries by Cat Ownership';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'movie_production') {
    chartHeader.innerText = 'Top 10 Countries by Number of Movies';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'box_office_numbers') {
    chartHeader.innerText = 'Top 10 Countries by Box Office Numbers';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'air_quality') {
    chartHeader.innerText = 'Top 10 Countries by Air Quality';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'happiness') {
    chartHeader.innerText = 'Top 10 Happiest Countries';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'life_expectancy') {
    chartHeader.innerText = 'Top 10 Countries by Life Expectancy';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'mean_years_of_schooling') {
    chartHeader.innerText = 'Top 10 Countries by Mean Years of Schooling';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'income_per_capita') {
    chartHeader.innerText = 'Top 10 Countries by Income per Capita';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'gender_inequality') {
    chartHeader.innerText = 'Top 10 Countries by Gender Inequality';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'forest_area') {
    chartHeader.innerText = 'Top 10 Countries by Forest Area ';
    chartSubheader.innerText = 'According to data from xxx';
  } else if (yVariable === 'renewables') {
    chartHeader.innerText = 'Top 10 Countries by Renewables (as a % of total electricity)';
    chartSubheader.innerText = 'According to data from xxx';
  } else {
    // Add more conditions as needed
    // Default case
    chartHeader.innerText = 'Top 10 Countries - ' + yVariable;
  }


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
      var margin = { top: 20, right: 20, bottom: 30, left: 150 }, // Increase left margin to accommodate labels
        width = 900 - margin.left - margin.right, // Adjusted width
        height = 400 - margin.top - margin.bottom;

      var svg = d3.select('#chart-container').html('') // Clear existing content
        .append('svg')
        .attr('class', 'chart-svg') // Add a class to the SVG element  
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
        .call(d3.axisLeft(y))
        .classed('y-axis', true); // Add a class to the Y-axis group

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .classed('x-axis', true); // Add a class to the X-axis group;

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

  // Store selected values before clearing options
  var selectedQuizValues = [];
  quizSelects.forEach(function (quizSelect) {
    selectedQuizValues.push(quizSelect.value);
  });

  // Clear existing options in all selects
  quizSelects.forEach(function (quizSelect) {
    if (quizSelect) {
      // Store the selected index to retain the selection
      var selectedIndex = quizSelect.selectedIndex;

      // Update options dynamically based on the selected variable
      var allCountries = getAllCountries(data);

      // Remove existing options
      quizSelect.innerHTML = '';

      // Add a default option
      var defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.text = 'Select here';
      quizSelect.add(defaultOption);

      // Populate the quiz options dynamically based on the selected variable
      allCountries.forEach(function (country) {
        var option = document.createElement('option');
        option.value = country;
        option.text = country;
        quizSelect.add(option);
      });

      // Set back the selected values
      quizSelect.selectedIndex = selectedIndex;
    }
  });

  // Set the selected values again after options are populated
  quizSelects.forEach(function (quizSelect, index) {
    quizSelect.value = selectedQuizValues[index];
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
  resetQuizUI();
  // Get the selected options from all quiz selects
  var selectedOptions = [];
  var quizSelects = document.querySelectorAll('.quiz-select');
  quizSelects.forEach(function (quizSelect) {
    selectedOptions.push(quizSelect.value);
  });

  // Function to reset previous ticks and crosses
function resetQuizUI() {
  var tickCrossElements = document.querySelectorAll('.guess-container span');
  tickCrossElements.forEach(function (element) {
    element.remove();
  });
}

  // Get the correct answers based on the selected variable
  var correctAnswers = getTop10Countries(data, yVariable);

  // Update the UI with ticks or crosses based on correctness
  quizSelects.forEach(function (quizSelect, index) {
    var option = quizSelect.options[quizSelect.selectedIndex];
    var isCorrect = correctAnswers.includes(option.value);
    var icon = isCorrect ? '✔' : '❌';

    // Add the tick or cross icon to the guess container
    var guessContainer = document.querySelector('.guess-container');
    guessContainer.children[index].innerHTML += ` <span class="${isCorrect ? 'correct' : 'incorrect'}">${icon}</span>`;
  });

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

function toggleChartHeader() {
  var chartHeaderContainer = document.getElementById('chart-header-container');
  if (chartHeaderContainer.style.display === 'none') {
    chartHeaderContainer.style.display = 'block';
  } else {
    chartHeaderContainer.style.display = 'none';
  }
}


// Function to show results and scroll to the chart
function skipToResults() {
  var chartContainer = document.getElementById("chart-container-wrapper");
  var mapContainer = document.getElementById("map-container");
  var additionalParagraphs = document.querySelectorAll("#quiz-result ~ p");

  // Toggle visibility by changing the display property
  if (chartContainer.style.display === "none" || chartContainer.style.display === "") {
    chartContainer.style.display = "block";
    mapContainer.style.display = "block";

    // Show additional paragraphs
    additionalParagraphs.forEach(function (paragraph) {
      paragraph.style.display = "block";
    });


    // Scroll to the chart
    chartContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    chartContainer.style.display = "none";

    // Hide additional paragraphs
    additionalParagraphs.forEach(function (paragraph) {
      paragraph.style.display = "none";
    });
  }
}

// Initial load of the chart and quiz options
updateChart();

document.addEventListener('DOMContentLoaded', function() {
  const selectElement = document.getElementById('indicator-select');

  if (selectElement) {
    d3.csv('whoiswinning.csv').then(data => {
      const indicators = data.columns.slice(1); // Skip the first column ('country')
      indicators.forEach(indicator => {
        const option = document.createElement('option');
        option.value = indicator;
        option.textContent = indicator;
        selectElement.appendChild(option);
      });
    });
  }
});

// Function to refresh the page
function refreshPage() {
  location.reload();
}
