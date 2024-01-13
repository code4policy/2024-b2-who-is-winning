document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('indicator-select');
    let mapData = {};
    let geojsonData = {};

    // Load the CSV and GeoJSON data
    Promise.all([
        d3.csv('../CSV_Files/whoiswinning-combined.csv'),
        d3.json('countries.geojson')
    ]).then(function(files) {
        let csvData = files[0];
        geojsonData = files[1];

        // Process CSV data to map each country to its indicators
        csvData.forEach(row => {
            mapData[row.country] = row;
        });

        // Populate dropdown
        const indicators = csvData.columns.slice(1);
        indicators.forEach(indicator => {
            const option = document.createElement('option');
            option.value = indicator;
            option.textContent = indicator;
            selectElement.appendChild(option);
        });

        // Draw the initial map
        drawMap(selectElement.value);

        // Event listener for dropdown changes
        selectElement.addEventListener('change', function() {
            // Remove the old map and draw a new one
            d3.select("svg").remove();
            drawMap(this.value);
        });
    });

    function drawMap(selectedIndicator) {
    // Set up SVG and projection
    const width = 960, height = 600;
    const svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "white"); // Set the background color to white

    const projection = d3.geoNaturalEarth1()
        .scale(160)
        .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    // Create a scale for the colors
    const minValue = d3.min(Object.values(mapData), d => +d[selectedIndicator]);
    const maxValue = d3.max(Object.values(mapData), d => +d[selectedIndicator]);
    const colorScale = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range(["white", "darkblue"]); // Change the lower bound of the color scale to white

    // Draw the map
    svg.selectAll("path")
        .data(geojsonData.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", function(d) {
            let value = mapData[d.properties.name] ? mapData[d.properties.name][selectedIndicator] : 0;
            return value ? colorScale(+value) : "white"; // Set fill color to white for countries with no data
        })
        .attr("stroke", "black") // Set the border color to black
        .attr("stroke-width", 0.25); // Set the border width to 0.25 pixels

    // Optional: Add map labels, tooltips, etc.
}
