import { elements } from "./base";

export const getInput=()=>elements.searchInput.value;
export const clearInput=()=>{
    elements.searchInput.value="";
}
 export const clearSearchResults=()=>{
    elements.resultList.innerHTML="";
}

/* 

      Algorithm for shortening title

1.The limitRecipeTitle () takes in two parameters ie the actual title and an es6 default parameter of 17;
2.It checks whether the title length is greater than the limit if not the () only retuns the original passed title
3.If the title is greater then then a block of some logical codes executes
    a)First we split the title using whitespace using split method
    b)we apply the reduce function which by default takes the accumulated value and the current value.We set the accumulated to 0 by default// at start
    c)If the accumulated value plus the current value length is less than the limit,we push the current word value to an array of newTitle
    d)In case of vice versa,we return the newTitle that has already been pushed to our new array suffixed with ... dots
*/
const limitRecipeTitle=(title,limit=17)=>{
    const newTitle=[];
    if(title.length > limit){
        title.split(" ").reduce((acc,cur)=>{
            if(acc + cur.length <= limit){
                newTitle.push(cur)
            }
            return acc + cur.length;
        },0);
        return `${newTitle.join(" ")}...`;
    }
  return title;
}
const renderRecipe=recipe=>{
    const markUp=`
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
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

