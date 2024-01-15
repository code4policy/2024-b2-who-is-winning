import pandas as pd

# Define file paths
happiness_path = '/Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/happiness-index-2023.csv'
hdi_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/human-development-index-2021.csv'
box_office_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/box-office-by-country.csv'
most_visited_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/most-visited-countries-2024.csv'
pet_ownership_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/pet-ownership-statistics-by-country-2024.csv'
gdp_per_capita_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/wdi-gdp-per-capita.csv'  
gov_revenue_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/weo-gov-revenue.csv'  
forest_area_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/forest-area-km.csv'
renewables_path = 'Users/tangcheng/Desktop/DPI691-Programming-and-Data/whoiswinning/originals/renewable-share-energy.csv'

# Load the data from each file
happiness_data = pd.read_csv(happiness_path)
hdi_data = pd.read_csv(hdi_path)
box_office_data = pd.read_csv(box_office_path)
most_visited_data = pd.read_csv(most_visited_path)
pet_ownership_data = pd.read_csv(pet_ownership_path)
gdp_per_capita_data = pd.read_csv(gdp_per_capita_path)
gov_revenue_data = pd.read_csv(gov_revenue_path)
forest_area_data = pd.read_csv(forest_area_path)
renewables_data = pd.read_csv(renewables_path)

# Rename columns to have a consistent name "country" for joining
happiness_data = happiness_data.rename(columns={"Original Column Name": "country"})
# Repeat for other datasets...

# Select the latest year data for datasets with multiple years
gdp_per_capita_latest_year = gdp_per_capita_data[gdp_per_capita_data['Year'] == gdp_per_capita_data['Year'].max()]
gov_revenue_latest_year = gov_revenue_data[gov_revenue_data['Year'] == gov_revenue_data['Year'].max()]
# Repeat for other datasets with yearly data...

# Perform left joins to combine the data
combined_data = happiness_data.merge(hdi_data, on='country', how='left')
combined_data = combined_data.merge(box_office_data, on='country', how='left')
# Repeat for other datasets...

# Output the final combined data to a CSV file
output_file = '/path/to/whoiswinning-updated.csv'
combined_data.to_csv(output_file, index=False)
