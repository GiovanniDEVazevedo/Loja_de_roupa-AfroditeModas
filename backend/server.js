import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import db from './src/database/connection.js';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("back end funcionou")
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log( `Server rodando na porta ${PORT}`))


