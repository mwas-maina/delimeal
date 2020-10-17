import Search from "./models/Search";
import * as searchView from './views/SearchViews';
import { elements, renderLoader, clearLoader } from "./views/base";
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

const recip=new Recipe(47746);
recip.getRecipe();
recip.calcServings();
console.log(recip.servings);








