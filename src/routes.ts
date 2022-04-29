import express from 'express';
import ProductControllers from './controllers/ProductControllers';


const routes = express.Router();
const productControllers =  new ProductControllers()

routes.get('/products' , productControllers.index);

export default routes;