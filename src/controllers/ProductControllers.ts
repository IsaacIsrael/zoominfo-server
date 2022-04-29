import {Request, Response, NextFunction} from 'express';
import _isEmpty from 'lodash/isEmpty';
import { products } from '../database/connection';

interface QueryIndexAction {
    page: number;
    query: string;
}

class ProductControllers{
    async index(request:Request<{}, {}, {}, QueryIndexAction>, response:Response, next:NextFunction){
        try{
            const limit = 10;
            const  page = Math.max(0, request.query.page || 1);
            const  query = (request.query.query || '').toLocaleLowerCase();
           
            const filteredProducts = _isEmpty(query)?  products :products.filter((products)=> products.title.toLocaleLowerCase().includes(query));
            
            const firstIndex = (page-1) * limit;
            const lastIndex = page * limit;
            const paginatedProduct = filteredProducts.slice(firstIndex, lastIndex)
        
            return response.json({
                products: paginatedProduct,
                limit,
                page,
                ...(lastIndex < filteredProducts.length && { nextPage: page +1 }),
                ...(query !== '' && { query })
            });

        }catch(error){
            next(error);
        }
    }
}

export default ProductControllers;