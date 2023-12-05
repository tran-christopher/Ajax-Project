const $searchBarOneInput = document.querySelector('.search-one');
const $searchBarTwoInput = document.querySelector('.search-two');
const $handleSearchOne = document.querySelector('.form-one');
const $handleSearchTwo = document.querySelector('.form-two');

const $searchResultsList = document.querySelector('.unordered-list');

const $homeView = document.querySelector('.home');
const $searchView = document.querySelector('.search');
const $selectView = document.querySelector('.select');

$handleSearchOne.addEventListener('submit', function (event) {
  event.preventDefault();
  const criteria = $searchBarOneInput.value;
  getRecipes(criteria);
  viewSwap('search');
  $searchBarOneInput.value = '';
});

$handleSearchTwo.addEventListener('submit', function (event) {
  event.preventDefault();
  const criteria = $searchBarOneInput.value;
  getRecipes(criteria);
  viewSwap('search');
  $searchBarTwoInput.value = '';
});

function getRecipes(parameter) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.edamam.com/api/recipes/v2?type=public&q=${parameter}&app_id=b093ed76&app_key=9d739d793a989a61b52ed12591b6a75a`,
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const recipeObject = xhr.response;
    console.log(recipeObject);
    for (let i = 0; i < recipeObject.hits.length; i++) {
      const $recipeResult = searchRecipes(recipeObject.hits[i]);
      $searchResultsList.prepend($recipeResult);
    }
  });
  xhr.send();
}

function getOneRecipe(object) {
  xhr.open(
    'GET',
    `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${object.recipe.uri}&app_id=b093ed76&app_key=9d739d793a989a61b52ed12591b6a75a`,
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {});
}

function searchRecipes(object) {
  const $li = document.createElement('li');
  const $a = document.createElement('a');
  $li.appendChild($a);
  $li.setAttribute('class', 'column-full margin-top text-center');
  // placeholder for href
  $a.setAttribute('href', '#');
  // $a.setAttribute('onclick', );
  $a.textContent = object.recipe.label;
  return $li;
}

function renderRecipe(object) {
  const $bigDiv = document.createElement('div');
  const $recipeNameDiv = document.createElement('div');
  const $recipeName = document.createElement('h2');
  const $imageDiv = document.createElement('div');
  const $image = document.createElement('img');

  $bigDiv.classList.add('home-body, height-margin');
  $recipeNameDiv.classList.add('column-half');
  $imageDiv.classList.add('column-half');

  $image.src = object.recipe.images.THUMBNAIL;

  $bigDiv.appendChild($recipeNameDiv);
  $bigDiv.appendChild($imageDiv);
  $recipeNameDiv.appendChild($recipeName);
  $imageDiv.appendChild($image);

  return $bigDiv;
}

function viewSwap(view) {
  if (view === 'home') {
    $homeView.classList.remove('hidden');
    $searchView.classList.add('hidden');
    $selectView.classList.add('hidden');
  } else if (view === 'search') {
    $homeView.classList.add('hidden');
    $searchView.classList.remove('hidden');
    $selectView.classList.add('hidden');
  } else if (view === 'select') {
    $homeView.classList.add('hidden');
    $searchView.classList.add('hidden');
    $selectView.classList.remove('hidden');
  }
}
