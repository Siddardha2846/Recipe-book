let recipes = JSON.parse(localStorage.getItem("recipes")) || [
    {
      name: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      steps: "1. Boil pasta. 2. Fry pancetta. 3. Mix with egg mixture. 4. Combine with pasta.",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
    },
    {
      name: "Chicken Alfredo",
      description: "Creamy Alfredo sauce with tender chicken and pasta.",
      steps: "1. Cook chicken. 2. Prepare Alfredo sauce. 3. Combine pasta and sauce.",
      image: "https://via.placeholder.com/150",
      rating: 4.2,
    },
  ];
  
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  
  const favoriteCount = document.getElementById("favoriteCount");
  
  // Save to localStorage functions
  function saveRecipesToLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
  
  function saveSavedRecipesToLocalStorage() {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }
  
  function viewRecipes() {
    document.getElementById("mainText").style.display = "none";
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.style.display = "flex";
    loadRecipes();
  }
  
  // 🔍 SEARCH FUNCTION
  function searchRecipes() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    loadRecipes(searchQuery);
  }
  
  function loadRecipes(searchQuery = "") {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = "";
  
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery) ||
      recipe.description.toLowerCase().includes(searchQuery)
    );
  
    filteredRecipes.forEach((recipe, index) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      recipeCard.innerHTML = `
        <button class="delete-btn" onclick="deleteRecipe(${index})">❌</button>
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" />
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="rating">Rating: ${recipe.rating}</div>
        <button onclick="openRecipeModal(${index})">View Details</button>
        <button onclick="toggleFavorite(${index})">${isFavorite(recipe) ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}</button>
      `;
      recipeContainer.appendChild(recipeCard);
    });
  }
  
  function toggleFavorite(index) {
    const recipe = recipes[index];
    if (isFavorite(recipe)) {
      savedRecipes = savedRecipes.filter((r) => r !== recipe);
    } else {
      savedRecipes.push(recipe);
    }
    saveSavedRecipesToLocalStorage();
    updateFavoriteCount();
    loadRecipes();
  }
  
  function isFavorite(recipe) {
    return savedRecipes.includes(recipe);
  }
  
  function updateFavoriteCount() {
    favoriteCount.textContent = savedRecipes.length;
  }

  
  
  function viewSavedRecipes() {
    document.getElementById("mainText").style.display = "none";
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.style.display = "flex";
    recipeContainer.innerHTML = "";
  
    savedRecipes.forEach((recipe, index) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      recipeCard.innerHTML = `
        <button class="delete-btn" onclick="deleteRecipe(${index})">❌</button>
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" />
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="rating">Rating: ${recipe.rating}</div>
        <button onclick="openRecipeModal(${index})">View Details</button>
        <button onclick="toggleFavorite(${index})">💔 Remove from Favorites</button>
      `;
      recipeContainer.appendChild(recipeCard);
    });
  }
  
  function openRecipeModal(index) {
    const recipe = recipes[index];
    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
      <h2>${recipe.name}</h2>
      <p>${recipe.description}</p>
      <h3>Steps:</h3>
      <p>${recipe.steps}</p>
      <h3>Rating:</h3>
      <input type="number" id="recipeRating" value="${recipe.rating}" min="0" max="5" step="0.1" onchange="updateRating(${index})" />
    `;
    document.getElementById("recipeModal").style.display = "flex";
  }
  
  function updateRating(index) {
    const newRating = parseFloat(document.getElementById("recipeRating").value);
    if (!isNaN(newRating) && newRating >= 0 && newRating <= 5) {
      recipes[index].rating = newRating;
      saveRecipesToLocalStorage();
      loadRecipes();
    }
  }
  
  function outsideModalClick(event) {
    if (event.target === document.getElementById("recipeModal")) {
      closeRecipeModal();
    }
  }
  
  function closeRecipeModal() {
    document.getElementById("recipeModal").style.display = "none";
  }
  
  function openAddRecipeModal() {
    document.getElementById("addRecipeModal").style.display = "flex";
  }
  
  function closeAddRecipeModal() {
    document.getElementById("addRecipeModal").style.display = "none";
  }
  
  function addRecipe(event) {
    event.preventDefault();
  
    const recipeName = document.getElementById("recipeName").value;
    const recipeDescription = document.getElementById("recipeDescription").value;
    const recipeSteps = document.getElementById("recipeSteps").value;
    const recipeImage = document.getElementById("recipeImage").files[0];
    const reader = new FileReader();
  
    reader.onloadend = function () {
      const newRecipe = {
        name: recipeName,
        description: recipeDescription,
        steps: recipeSteps,
        image: reader.result,
        rating: 0,
      };
      recipes.push(newRecipe);
      saveRecipesToLocalStorage();
      closeAddRecipeModal();
      viewRecipes();
    };
  
    if (recipeImage) {
      reader.readAsDataURL(recipeImage);
    }
  }
  
  function removeSavedRecipe(index) {
    savedRecipes.splice(index, 1);
    saveSavedRecipesToLocalStorage();
    viewSavedRecipes();
  }
  
  function deleteRecipe(index) {
    if (confirm("Are you sure you want to permanently delete this recipe?")) {
      recipes.splice(index, 1); // Remove recipe from the array
      saveRecipesToLocalStorage(); // Update localStorage
      loadRecipes(); // Reload the recipes
    }
  }
  
  function goHome() {
    document.getElementById("mainText").style.display = "block";
    document.getElementById("recipeContainer").style.display = "none";
  }
  
  // Initialize view
  goHome();
    // Initialize view
    goHome();
    function handleLogin() {
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
    
      // Basic hardcoded check (replace with real auth later)
      if (user === "admin" && pass === "admin123") {
        localStorage.setItem("loggedIn", "true");
        document.getElementById("loginModal").style.display = "none";
      } else {
        alert("Invalid credentials. Try admin / admin123");
      }
    }
    
    window.onload = function () {
      if (localStorage.getItem("loggedIn") !== "true") {
        document.getElementById("loginModal").style.display = "flex";
      } else {
        goHome(); // Already in your script
      }
    };