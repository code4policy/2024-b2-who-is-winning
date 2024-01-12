// Load the GDP data from the CSV file
d3.csv("whoiswinning.csv").then(function(gdpData) {
    var gdpMap = {};
    gdpData.forEach(function(d) {
        gdpMap[d.country] = +d.gdp_per_capita_usd;
    });

    d3.json("countries.geojson").then(function(geoData) {
        geoData.features.forEach(function(feature) {
            var country = feature.properties.ADMIN;
            var gdp = gdpMap[country];
            feature.properties.gdpPerCapita = (gdp !== undefined) ? gdp : null;
        });

        var colorScale = d3.scaleSequential(d3.interpolateBlues)
                           .domain([0, d3.max(Object.values(gdpMap))]);

        var svg = d3.select("#map").append("svg")
                    .attr("width", 760)
                    .attr("height", 400);

        var projection = d3.geoNaturalEarth1()
                           .scale(135)
                           .translate([380, 200]);
        var path = d3.geoPath().projection(projection);

        function updateCountryInfo(country, gdpPerCapita) {
            var infoText = country;
            if (gdpPerCapita > 0) {
                infoText += "<br>GDP/capita: $" + gdpPerCapita.toFixed(1);
            }
            d3.select("#countryInfo").html(infoText);
        }

        svg.selectAll("path")
           .data(geoData.features)
           .enter().append("path")
           .attr("d", path)
           .attr("fill", function(d) {
               // Color countries not present in the CSV file with red
               return d.properties.gdpPerCapita !== null ? colorScale(d.properties.gdpPerCapita) : 'red';
           })
           .attr("stroke", "black")
           .attr("stroke-width", 0.25)
           .on("mouseover", function(d) {
               updateCountryInfo(d.properties.ADMIN, d.properties.gdpPerCapita);
           })
           .on("mouseout", function(d) {
               updateCountryInfo("", 0);
           });
    });
});
