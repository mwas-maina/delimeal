import Search from "./models/Search";
import * as searchView from './views/SearchViews';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from "./views/base";

import swal from "sweetalert";
import Recipe from "./models/recipe";
const state={};
const  controllSearch= async ()=>{
    //1.get the query entered from the view
    const query=searchView.getInput();
    //console.log(query);
    if(query){
        //2. add the new search object to the state
        state.search=new Search(query);
        //3. Prepare Ui for results
        searchView.clearInput();
        //4. Search for Recipes
        searchView.clearSearchResults();
        renderLoader(elements.searchResults);
         await state.search.getResults();
         clearLoader();
        //Render results on UI
        searchView.clearSearchResults();
        searchView.renderResults(state.search.results);
        /* console.log(state.search.results); */
    }

}
 elements.searchForm.addEventListener('submit',event=>{
    event.preventDefault();
    controllSearch();
})
elements.seachResPages.addEventListener('click',e=>{
   const btn=e.target.closest('.btn-inline');
   if(btn){
    const gotoPage=parseInt(btn.dataset.goto);
    searchView.clearSearchResults();
    searchView.renderResults(state.search.results,gotoPage);
    //console.log(gotoPage);
   }
})

/* RECIPE CONTROLLER */
const controlRecipe=async ()=>{

    //Get id from url once you click on individual recipe
    const id=window.location.hash.replace('#','');
    if(id){
        //prepare the UI for Changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //create new recipe object
        state.recipe=new Recipe(id);
        try {
            //get the recipe and parse ingridients
            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredients);
            //parse ing
            state.recipe.parseIngredients();
            //calc servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();
            //render recipe
            //console.log(state.recipe.ingredients);
            recipeView.clearRecipe();
            recipeView.renderRecipe(state.recipe);
           

        } catch (error) {
            swal('error found',error.message);
            
        }
    }

}
['hashchange','load'].forEach(e=>window.addEventListener(e,controlRecipe));








