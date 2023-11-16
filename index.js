// Replace 'YOUR_EDAMAM_APP_ID' and 'YOUR_EDAMAM_API_KEY' with your actual credentials
const appId = 'ffb6409a';
const appKey = 'e55dc120ebd73a7807fd32235545cacc';

async function fetchRecipeInfo(query) {
  const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error fetching recipe information:', error);
    return [];
  }
}

function generateMealPlan() {
  const numberOfMeals = document.getElementById('numberOfMeals').value;
  const dietPreference = document.getElementById('dietPreference').value;
  const healthSpecification = document.getElementById('healthSpecification').value;
  const calories = document.getElementById('calories').value;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const gender = document.getElementById('gender').value;
  const activityLevel = document.getElementById('activityLevel').value;

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const mealNames = ['Breakfast', 'Lunch', 'Dinner'];

  const mealPlanTable = document.getElementById('mealPlanTable');
  mealPlanTable.innerHTML = ''; // Clear previous content

  // Create table header
  const headerRow = mealPlanTable.insertRow();
  headerRow.insertCell(); // Empty cell for corner
  for (const day of weekdays) {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = day;
  }

  // Generate meal plan
  for (let i = 0; i < numberOfMeals; i++) {
    const row = mealPlanTable.insertRow();
    const mealCell = row.insertCell();
    mealCell.textContent = mealNames[i];

    for (const day of weekdays) {
      const cell = row.insertCell();
      const query = `${dietPreference} ${healthSpecification} recipe`; // Adjust the query based on your needs

      // Fetch recipe information
      fetchRecipeInfo(query)
        .then((recipes) => {
          if (recipes.length > 0) {
            const recipe = recipes[0].recipe;
            // Display recipe information in the cell
            cell.innerHTML = `
              <img src="${recipe.image}" alt="${recipe.label}" width="100">
              <p>${recipe.label}</p>
              <ul>${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            `;
          } else {
            cell.textContent = 'No recipe found';
          }
        });
    }
  }
}
