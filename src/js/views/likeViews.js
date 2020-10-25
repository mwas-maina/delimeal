import { elements } from "./base";
import { limitRecipeTitle } from "./SearchViews";
export const ToggleLikeBtn=(isLiked)=>{
    const iconStrings=isLiked? "icon-heart":"icon-heart-outlined";
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconStrings}`);
}
export const likeMenu=(numLikes)=>{
    elements.likeMenu.style.visibility= numLikes === 0 ? "hidden":"visible";

}



export const renderLikes= like =>{
    const markup=`
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
        `
    elements.likeList.insertAdjacentHTML('beforeend',markup);
}

 export const deleteLikes=id=>{
    const el=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
} 
