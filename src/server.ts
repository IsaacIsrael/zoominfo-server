import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import morgan from 'morgan';
import routes from './routes';

const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan('tiny'));

app.use(routes);


app.use((error: any, request:Request, response: Response, next:NextFunction)=>{
    console.log('Error handling middleware called')
    console.log(`Path: ${request.path}`)
    console.log(`Error: ${error}`)

    return response.status(error.type === 'time-out'? 408: 500).json({ error: error.message })
})

app.listen(port,  ()=>{
    console.log(`Listen on port ${port}`);
});