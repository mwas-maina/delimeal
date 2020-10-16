import Search from "./models/Search";
import * as searchView from './views/SearchViews';
import { elements } from "./views/base";


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
         await state.search.getResults();
        
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








