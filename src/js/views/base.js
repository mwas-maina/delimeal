export const elements={
    searchInput:document.querySelector('.search__field'),
    resultList:document.querySelector('.results__list'),
    searchForm:document.querySelector('.search'),
    searchResults:document.querySelector('.results'),
    seachResPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shopping:document.querySelector('.shopping__list') ,
    likeMenu:document.querySelector('.likes__field'),
    likeList:document.querySelector('.likes__list')
    
}

const elementStrings={
    loader:'loader'
}

export const renderLoader=parent=>{
    const loader=`
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}
export const clearLoader=()=>{
    const loader=document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}
