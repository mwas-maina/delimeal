import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id=id;
    }
    async getRecipe(){
        try {
            const res=await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
            this.img=res.data.recipe.image_url;
            this.author=res.data.recipe.publisher;
            this.url=res.dara.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;
            console.log(res);
        } catch (error) {
            console.log(error) 
        }
    }
    calcTime(){
        //assuming that we need 15mins for each 3 ingridients
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*15;

    }
    calcServings(){
        this.servings=4;
    }
}