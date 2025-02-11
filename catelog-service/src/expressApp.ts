import express from 'express';
import catelogRouter from "./api/catelog.routes"

const PORT = 5000


const app = express();


app.use(express.json())

app.use("/",catelogRouter)

export default app