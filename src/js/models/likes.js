export default class Likes{
    constructor(){
        this.likes=[];
    }
    addLike(id,title,author,img){
        const like={
            id,
            title,
            author,
            img
        }
        this.likes.push(like);
        //persist data
        this.persistData();
        return like;
    }
    deleteLike(id){
        const index= this.likes.findIndex(el=>el.id===id);
        this.likes.splice(index,1);   
    }
    isLiked(id){
        return this.likes.findIndex(el=>el.id===id) !==-1;
    }
    getNumOfLikes(){
        return this.likes.length;
    }
    persistData(){
        //store the likes in  the localStorage
        localStorage.setItem('likes',JSON.stringify(this.likes));

    }
    getStorage(){
        const storage=JSON.parse(localStorage.getItem('likes'));
        //restore from the loacal storage
        if(storage) this.likes=storage;

        
    }
  
  
}
