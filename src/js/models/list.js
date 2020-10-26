import uniqid from 'uniqid';
export default class List{
    constructor(){
        this.items=[];
    }

    addItem(count,unit,ingridient){
        const item={
            id:uniqid(),
            count,
            unit,
            ingridient
        }
        this.items.push(item);
        return item;
    }
    deleteItem(id){
        //loops the array and finds the elememt with the id equal the id passed and returns its index //eg it s index 5
        const index=this.items.findIndex(el=>el.id===id);
        //splice mutates the original array
        this.items.splice(index,1);
    }
    updateCount(id,newCount){
        if(newCount > 0){

            this.items.find(el=>el.id===id).count=newCount;
        }

    }
}