const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

employeeSchema.pre("save",async function(next){
   if(this.isModified("password")){

    // console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10)
    // console.log(`the current password is ${this.password}`);

    this.confirmpassword = undefined;
   }
    
    next();
})

//creation of collection
const Employee = new mongoose.model("Employee",employeeSchema)

module.exports = Employee;