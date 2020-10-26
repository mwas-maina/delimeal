import Search from "./models/Search";
import * as searchView from './views/SearchViews';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from "./views/base";

import swal from "sweetalert";
import Recipe from "./models/recipe";
import List from "./models/list";
import { renderItem, deleteItems, clearList } from "./views/listView";
import Likes from "./models/likes";
import { ToggleLikeBtn, likeMenu, renderLikes, deleteLikes } from "./views/likeViews";
const state={};
window.state=state;
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

        if(state.search) searchView.highlightSelected(id);

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
           // clearList();
            recipeView.renderRecipe(state.recipe,state.likes. isLiked(id));
           

        } catch (error) {
            swal('error found',error.message);
            console.log(error);
            
        }
    }

}
['hashchange','load'].forEach(e=>window.addEventListener(e,controlRecipe));


/* List controller to add items */
const controlList=()=>{
    //create a list if it doesnt exist
    if(!state.list) state.list=new List();
    //add the list
    state.recipe.ingredients.forEach(el=>{
        const item=state.list.addItem(el.count,el.unit,el.ingridient);
       
        renderItem(item); 
     })
   
}

//handle delete and update
elements.shopping.addEventListener('click',e=>{

    const id=e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete , .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id);
        //delete from Ui
        deleteItems(id);
    }
    else if(e.target.matches('.shopping__value')){
        const value= parseFloat(e.target.value,10);
        if(value > 0){
            state.list.updateCount(id,value);
        }  
        return 0;
    }
})

/* Like CONTROLLER */

//testing purposes
 state.likes=new Likes();
 
const controlLike=()=>{
    if(!state.likes) state.likes=new Likes();
    const currentId=state.recipe.id;

    //User HAS not liked the recipe
    if(!state.likes.isLiked(currentId)){
        //add the liked recipe to state
        state.likes.addLike(currentId,state.recipe.title,state.recipe.author,state.recipe.img);
        ToggleLikeBtn(true);
    }
    else{
        //remove liked item from state
        state.likes.deleteLike(currentId);
        ToggleLikeBtn(false);
        //toggle the button
        deleteLikes(currentId);
    }
    likeMenu(state.likes.getNumOfLikes());
}
elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease , .btn-decrease *')){
        //do something
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase , .btn-increase *')){
        //do something
        state.recipe.updateServings('inc');
       recipeView.updateServings(state.recipe)

    }
    else if(e.target.matches('.recipe__btn--add , .recipe__btn--add *')){
        //1. call our control list function
        controlList();
    }
    else if(e.target.matches('.recipe__love ,.recipe__love *')){
        //call like controller mtd
        controlLike();
    }
})










