const express = require("express")

const app = express();
const port = process.env.PORT || 3000;

//connect database
require("./db/conn")

const pageRouter = require("./routes/pages");

app.use(pageRouter)

app.listen(port,()=>{
    console.log(`Connection successfull at port ${port}`);
})