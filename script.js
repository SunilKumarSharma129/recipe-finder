async function searchRecipes() {
  const searchInput = document.getElementById('searchInput').value;
  const appId = '734c3619'; // Replace with your Edamam app ID
  const appKey = '2753780213512de4709a7f0545beb393'; // Replace with your Edamam app key
  const apiUrl = `https://api.edamam.com/search?q=${searchInput}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    displaySearchResults(data.hits);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  results.forEach(hit => {
    const recipe = hit.recipe;

    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = recipe.label;
    recipeElement.appendChild(recipeTitle);

    const image = document.createElement('img');
    image.src = recipe.image;
    image.alt = recipe.label;
    recipeElement.appendChild(image);

    const ingredientsList = document.createElement('ul');
    recipe.ingredientLines.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.textContent = '• '+ingredient;
      ingredientsList.appendChild(listItem);
    });
    recipeElement.appendChild(ingredientsList);

    const recipeLink = document.createElement('a');
    recipeLink.href = recipe.url;
    recipeLink.textContent = 'View Recipe';
    recipeLink.classList.add('recipe-link');
    recipeElement.appendChild(recipeLink);

    resultsContainer.appendChild(recipeElement);
  });
}
