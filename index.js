const express = require("express");
const { default: mongoose } = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const postRouter = require("./routes/postRoutes");

const app = express();


const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// mongoose.connect("mongodb://abhay:root@mongo:27017/?authSource=admin")

const connectWithRety = () => {
    mongoose.connect(MONGO_URL)
    .then(() => console.log("successfully connected to the DB")).catch((err) => {
        console.log(err);
        setTimeout(connectWithRety, 5000);
    })
}

connectWithRety();
app.use(express.json())

app.get("/",(req,res) => {
    res.send("<h2> Hi there Chant and be happy ISKCON Udhampur J&K Jai Prabhupad Jai Gurudev</h2>")
})


app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listining on port ${port}`))