
import express, {Request,Response,NextFunction} from 'express';
const router = express.Router();

// endpointes to be placed here !!!!

router.post('/product',async (req:Request,res:Response,next:NextFunction)=>{
    res.json({message: 'Hello from catelog API'})
})

export default router