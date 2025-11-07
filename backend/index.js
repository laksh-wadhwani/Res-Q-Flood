import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_URL)
.then(() => {
    app.listen(process.env.PORT, () => console.log("Server is connected and connected to MongoDB"))
})

.catch(error => {
    console.error("Unable to connect server and/or MongoDB", error)
})


//Default Route
app.get("/", async(request, response) => {
    response.json("Backend is working....")
})