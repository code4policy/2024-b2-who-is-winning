// quiz.js

// Fetch the CSV file
fetch('../CSV_Files/whoiswinning-updated.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data
        const rows = data.split('\n');

        // Loop through each guess and populate options
        for (let i = 1; i <= 5; i++) {
            const guessElement = document.getElementById('guess' + i);
            const selectElement = guessElement.querySelector('.quiz-select');

            // Populate options
            for (let j = 1; j < rows.length; j++) {
                const columns = rows[j].split(',');
                const country = columns[0].trim(); // Assuming the first column contains country names

                const option = document.createElement('option');
                option.value = country;
                option.text = country;

                selectElement.add(option);
            }
        }
    })
    .catch(error => console.error('Error fetching CSV file:', error));

// Function to update the quiz options based on the selected variable
function updateQuizOptions(data) {
  // Get all the quiz select elements
  var quizSelects = document.querySelectorAll('.quiz-select');

  // Clear existing options in all selects
  quizSelects.forEach(function (quizSelect) {
    if (quizSelect) {
      quizSelect.innerHTML = '';
    }
  });

  // Populate the quiz options dynamically based on the selected variable
  var allCountries = getAllCountries(data);
  allCountries.forEach(function (country) {
    quizSelects.forEach(function (quizSelect) {
      if (quizSelect) {
        var option = document.createElement('option');
        option.value = country;
        option.text = country;
        quizSelect.add(option);
      }
    });
  });
}

// Function to get all countries
function getAllCountries(data) {
  // Map data from CSV to an array of country names
  var countryNames = data.map(function (d) {
    return d.country; // Assuming 'country' is the column name in your data
  });
  return countryNames;
}

// Function to get the top 10 countries for a specific variable
function getTop10Countries(data, variable) {
  // Implement logic to retrieve the top 10 countries for the specified variable
  // This could involve sorting the data and extracting the top 10
  // For simplicity, I'll return a placeholder array here
  var top10Countries = data.slice(0, 10); // Placeholder, modify this based on your logic
  return top10Countries;
}

// Function to check the quiz answers and calculate the score
function checkQuiz() {
  // Get the selected options from all quiz selects
  var selectedOptions = [];
  var quizSelects = document.querySelectorAll('.quiz-select');
  quizSelects.forEach(function (quizSelect) {
    selectedOptions.push(quizSelect.value);
  });

  // You need to have the 'data' variable and 'yVariable' defined before using this function
  // For example, assuming you have a variable 'data' containing your data array and 'yVariable' as the selected variable
  var correctAnswers = getTop10Countries(data, yVariable);

  // Calculate the score
  var score = 0;
  selectedOptions.forEach(function (selectedOption) {
    if (correctAnswers.some(country => country === selectedOption)) {
      score++;
    }
  });

  // Display the result and score
  var quizResult = document.getElementById('quiz-result');
  quizResult.innerText = `You scored ${score} out of 5. ${score === 5 ? 'Congratulations!' : 'Try again!'}`;
}
