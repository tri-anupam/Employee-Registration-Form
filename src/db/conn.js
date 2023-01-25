const mongoose = require("mongoose")

const mongoDB = "mongodb://127.0.0.1/employee-registration";

mongoose.connect(mongoDB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database Connection Successfull");
    }
})