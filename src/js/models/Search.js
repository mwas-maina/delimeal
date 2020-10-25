import axios from "axios";
import swal from "sweetalert";
export default class Search{
    constructor(query){
        this.query=query;
    }
    async getResults(){
        //const proxy='https://cors-anywhere.herokuapp.com';
        try {
            const res= await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.results=res.data.recipes;
            //console.log(results);
        } catch (error) {
            swal(`There was a server error in fetching the data,${error.message}`);
            
        }
        
    }
}

