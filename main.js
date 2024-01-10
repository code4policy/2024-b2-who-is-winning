// main.js

// Load CSV file and create a horizontal bar chart with the top 10
d3.csv('GDPpercapita.csv')
  .then(function(data) {
    // Sort data by GDPpercapita in descending order
    data.sort(function(a, b) {
      return b.GDPpercapita - a.GDPpercapita;
    });

    // Take only the top 10
    var top10Data = data.slice(0, 10);

    console.log('Sorted Data:', top10Data); // Log top 10 data

    // Create a horizontal bar chart
    var margin = { top: 20, right: 20, bottom: 30, left: 120 }, // Increase left margin to accommodate labels
      width = 900 - margin.left - margin.right, // Adjusted width
      height = 400 - margin.top - margin.bottom;

    var svg = d3.select('#chart-container').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var y = d3.scaleBand()
      .range([0, height])
      .domain(top10Data.map(function(d) { return d.CountryName; }))
      .padding(0.1);

   var x = d3.scaleLinear()
  .range([0, width])
  .domain([0, d3.max(top10Data, function(d) { return d.GDPpercapita; }) * 3]); // Extend the domain by 10%


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
  .attr('y', function(d) { return y(d.CountryName); })
  .attr('height', y.bandwidth())
  .attr('x', 0)
  .attr('width', 0)  // Start with a width of 0 (added the missing '.')
  .transition()     // Apply the transition
  .duration(1000)    // Set the duration of the fade effect (in milliseconds)
  .attr('width', function(d) { return x(d.GDPpercapita); });
  })
  .catch(function(error) {
    console.log(error);
  });
