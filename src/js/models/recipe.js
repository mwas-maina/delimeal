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
            this.url=res.data.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;
            this.title=res.data.recipe.title; 
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

    parseIngredients(){
        const unitLong=['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound']; 
        const unit=[...unitShort,'kg','g'];
        const newIngridients=this.ingredients.map(el=>{
            //1. Make uniform units
            let ingridient=el.toLowerCase();
            unitLong.forEach((unit,index)=>{
                ingridient=ingridient.replace(unit,unitShort[index]);
            })

            //remove parathenses
            ingridient=ingridient.replace(/ *\([^)]*\) */g, " ");


            //parse ingredients count,unit  and ingridients
            const arrIng=ingridient.split(' ');
            const unitIndex=arrIng.findIndex(el2=> unit.includes(el2));
           
            let objIng;
            if(unitIndex > -1){
                //There is a unit
                //ex [4 ,1/2] arrCount is 4 1/2
                //ex [4] arrcount is 4
                const arrCount=arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length === 1){
                    count=arrIng[0].replace("-","+");
                }
                else{
                    count=eval(arrIng.slice(0,unitIndex).join('+'));
                 
                }
                objIng={
                    count,
                    unit:arrIng[unitIndex],
                    ingridient:arrIng.slice(unitIndex + 1).join(" ") 
                }

            }
            else if(parseInt(arrIng[0],10)){
                objIng={
                    count:parseInt(arrIng[0],10),
                    unit:'',
                    ingredient:arrIng.slice(1).join(' ')
                }

            }
            else if(unitIndex === -1){
                objIng={
                    count:1,
                    unit: "",
                    ingridient
                }
            }
            return objIng;
        });
        this.ingredients=newIngridients;
    }
}