export const elements={
    searchInput:document.querySelector('.search__field'),
    resultList:document.querySelector('.results__list'),
    searchForm:document.querySelector('.search'),
    searchResults:document.querySelector('.results'),
    seachResPages:document.querySelector('.results__pages')
    
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
