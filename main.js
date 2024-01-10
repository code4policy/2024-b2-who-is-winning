// Default y variable
var yVariable = 'gdp_per_capita_usd';

// Function to update the chart based on user input
function updateChart() {
  // Get the selected value from the dropdown list
  var selectElement = document.getElementById('yVariableSelect');
  yVariable = selectElement.value;

  // Call the function to reload the chart with the updated variable
  loadChart();
}

// Function to load the chart based on the current yVariable
function loadChart() {
  // Load CSV file and create a horizontal bar chart with the top 10
  d3.csv('whoiswinning.csv')
    .then(function(data) {
      try {
        // Convert "NA" values to zero
        data.forEach(function(d) {
          d[yVariable] = isNaN(parseFloat(d[yVariable])) ? 0 : parseFloat(d[yVariable]);
        });

        // Sort data by the specified variable in descending order
        data.sort(function(a, b) {
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
          .domain(top10Data.map(function(d) { return d.country; }))
          .padding(0.1);

        var x = d3.scaleLinear()
          .range([0, width])
          .domain([0, d3.max(top10Data, function(d) { return d[yVariable]; })]);

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
          .attr('y', function(d) { return y(d.country); })
          .attr('height', y.bandwidth())
          .attr('x', 0)
          .attr('width', function(d) {
            // Log the problematic data
            if (isNaN(d[yVariable])) {
              console.error('Invalid value for ' + yVariable + ':', d[yVariable]);
            }
            // Check if the specified variable is a valid number
            return isNaN(d[yVariable]) ? 0 : x(d[yVariable]);
          })
          .transition()
          .duration(1000)
          .attr('width', function(d) {
            // Log the problematic data
            if (isNaN(d[yVariable])) {
              console.error('Invalid value for ' + yVariable + ':', d[yVariable]);
            }
            // Check if the specified variable is a valid number
            return isNaN(d[yVariable]) ? 0 : x(d[yVariable]);
          });
      } catch (error) {
        console.log(error);
      }
    });
}

// Initial load of the chart
loadChart();

