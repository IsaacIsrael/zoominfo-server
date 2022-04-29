import database from "./database.json";
import { Product } from "../types/Product";

 const {  products: productsDataBase } = database;

 
 export const products =  productsDataBase as Product[]