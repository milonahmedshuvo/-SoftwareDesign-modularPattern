import { FilterQuery, Query } from "mongoose";

class QueryBuilder <T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>


    constructor(modelQuery: Query<T[], T>, query:Record<string, unknown>){
          
        this.modelQuery= modelQuery;
        this.query = query      
    }


    
    // methods 1
    search(searchableFields:string[]){
        let searchTerm = this?.query?.searchTerm
        if(searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((filed) => ({
                    [filed] : { $regex: searchTerm, $options: 'i' }
                }) as FilterQuery<T> )
            })
        }

        return this 
    }



    // methods 2
    filter() {
        let queryObj = { ...this.query } //copy query 

        const excludeFileds = ['searchTerm', 'sort', 'limit', 'page', 'fields']
        excludeFileds.forEach((el)=> delete queryObj[el] ) //delete element

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        return this
    }


    // methods 3
    sort(){
        const sort = this?.query?.sort || '-createdAt'
        this.modelQuery = this.modelQuery.sort(sort as string)

        return this
    }


    // methods 4
    paginate () {
        const limit = Number(this?.query?.limit) || 10
        const page = Number(this?.query?.page) || 1
        const skip = (page - 1 ) * limit

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this 
    }



    // methods 5 
    fields(){
      const fields= (this.query.fields as string)?.split(',').join(" ") || '-__v'
      this.modelQuery = this.modelQuery.select(fields)

      return this
    }





}




export default QueryBuilder;