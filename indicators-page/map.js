// Define a function to get the data value for a country
function getData(countryName, csvData, selectedOption) {
    const countryData = csvData.find(row => row.country === countryName);
    return countryData ? parseFloat(countryData[selectedOption]) : null;
}

// Define a function to set the color for a country
function getColor(d, csvData, selectedOption, colorScale) {
    const dataValue = getData(d.properties.ADMIN, csvData, selectedOption);
    if (dataValue === null) {
        return 'black'; // Color for countries with no data
    }
    return colorScale(dataValue); // Use a color scale for data values
}

// Load the GeoJSON data
d3.json('countries.geojson').then(function(geojsonData) {

    // Load the CSV data
    d3.csv('../CSV_Files/whoiswinning-updated.csv').then(function(csvData) {

        // Define your color scale here
        // Replace 'initial_option' with the key of the initial data column you want to display
        const initialOption = 'GDP per Capita (in USD)';
        const minValue = d3.min(csvData, d => parseFloat(d[initialOption]));
        const maxValue = d3.max(csvData, d => parseFloat(d[initialOption]));
        const colorScale = d3.scaleLinear().domain([minValue, maxValue]).range(["lightblue", "darkblue"]);

        // Create the SVG element for the map
        const svg = d3.select("body").append("svg")
            .attr("width", 960)
            .attr("height", 600);

        // Define a projection and path generator
        const projection = d3.geoNaturalEarth1()
            .scale(153)
            .translate([480, 300]);
        const path = d3.geoPath().projection(projection);

        // Draw the map
        svg.selectAll("path")
            .data(geojsonData.features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", d => getColor(d, csvData, initialOption, colorScale))
            .attr("stroke", "white");

        // Listen to changes in the dropdown
        d3.select('select').on('change', function() {
            const selectedOption = d3.select(this).property('value');

            // Update the map colors based on the selected option
            svg.selectAll("path")
                .transition()  // Optional: smooth transition for color change
                .duration(500) // Transition duration in milliseconds
                .attr("fill", d => getColor(d, csvData, selectedOption, colorScale));
        });

    });

});
