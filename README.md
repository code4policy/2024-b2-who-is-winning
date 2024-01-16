Our team's project (website) is called *Who's winning?*
The website consists of three main pages (and a secret bonus page): (1) The primary 'Homepage' where the user can select indicators (out of a list of 13 hard and soft power indicators) of their choice and see results based on it; (2) An 'Our Team' page; (3) A 'Data Sources' page giving details of all the indicators and their data sources (which is where the original data is stored). A copy of the final data consumed by the visualizations is in here as whoiswinning.csv, separate from the CSV Files folder for clarity.

The file-system is organized such that all the files for a particular page are within the same directory/sub-directory of that page's index.html.

Each page has its own separate CSS file and the javascript files used to code the relevant functionalities on that page. Where there are multiple files of the same type (e.g. main.js versus map.js), it is because we wanted to keep track of which codes were for which section for simplicity.

For example: For the Homepage, the main HTML file (index.html) is in the main directory. The directory also consists of styles.css used to style all elements page. The main.js has the D3 js code for the quiz and barchart functions, whereas map.js is for the choropleth map and navigation.js is for the navigation bar. The map.js uses the countries.geojson file to populate the map. Data on all the indicators is stores in whoiswinning.csv
The sub-directory for Our Team page is named as 'our-team' and for Data Sources page it is 'data-source'

We have purposefully not included axis titles as we feel they are evident from the dynamic headers.
