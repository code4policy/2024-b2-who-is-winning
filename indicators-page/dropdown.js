document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('indicator-select');

    d3.csv('../CSV_Files/whoiswinning-updated.csv').then(data => {
        const indicators = data.columns.slice(1); // Skip the first column ('country')
        indicators.forEach(indicator => {
            const option = document.createElement('option');
            option.value = indicator;
            option.textContent = indicator;
            selectElement.appendChild(option);
        });
    });
});
 