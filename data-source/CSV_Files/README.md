1. Data Source

Trade Balance (% of GDP) and Government Revenue (% of GDP) are derived from IMF's [World Economic Outlook database](https://www.imf.org/en/Publications/WEO/weo-database/2023/October). 

[GDP per Capita (in USD)](https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.KD) and [Military Expenditure (in million USD)](https://data.worldbank.org/indicator/MS.MIL.XPND.CD) are extracted from the World Bank's World Development Indicators database. 

[International Tourist Arrivals](https://worldpopulationreview.com/country-rankings/most-visited-countries) and [Pet Ownership](https://worldpopulationreview.com/country-rankings/pet-ownership-statistics-by-country) are produced by the Worldpopulationreview.com. 

Global Box Office (in USD) is a estimation of [The Numbers](https://www.the-numbers.com/movies/production-countries/#tab=territory), a provider of movie industry data and information. 

Happiness Score is provided by the [World Happiness Report 2023](https://worldhappiness.report/ed/2023/#appendices-and-data).  

Life expectancy at Birth and Mean Years of Schooling are from Human Development Index developed by the [UNDP](https://hdr.undp.org/data-center/documentation-and-downloads). 

[Forest Area (sq. km)](https://ourworldindata.org/forest-area) and [Renewables (% of electricity)](https://ourworldindata.org/renewable-energy) are provided by Our World in Data with different data sources. 

2. Data Clearning & Merging

First, I imported the pandas library for data manipulation and set up variables for the file paths of each CSV file.

Second, I renamed the relevant columns in each dataframe to "country" for uniformity.

Thrid, for datasets with multiple years, I filtered out data for the most recent year.

Fourth, I merged the dataframes into one, using 'country' as a common key, via left joins, and finally saved the final combined dataframe as a new CSV file.

The CSV file named 'whoiswinning-updated' is the final dataset used for the visualization.

A Python script detailing the data manipulations is attached for reference.
