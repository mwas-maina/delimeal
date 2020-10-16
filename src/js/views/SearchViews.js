import { elements } from "./base";

export const getInput=()=>elements.searchInput.value;
export const clearInput=()=>{
    elements.searchInput.value="";
}
 export const clearSearchResults=()=>{
    elements.resultList.innerHTML="";
} 

const renderRecipe=recipe=>{
    const markUp=`
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `
        elements.resultList.insertAdjacentHTML('beforeend',markUp);
}

export const renderResults=recipes=>{
    recipes.forEach(renderRecipe);
}

