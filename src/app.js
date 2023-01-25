const express = require("express")
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;


//Requiring database
const Employee = require("./models/registration")

//connect database
require("./db/conn")

//for json data on pages
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//serving files ejs
//loading static file
// app.use('../public',express.static('public'));
app.set("view engine","ejs");
app.use(express.static(__dirname+'../asset'))

// get index page
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const employeeData = new Employee(req.body);
            const createEmployeeData = await employeeData.save();
            res.status(201).render("login")
        }else{
            res.send("password not matched.")
        }
    }catch(e){
        res.status(400).send(e);
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Employee.findOne({email:email});
        
        // console.log(userEmail,userEmail.password);
        if(userEmail.password === password){
            res.status(201).send("You are successfully logged in. ")
        }else{
            res.send("emailid or password doesn't matched.")
        }
    }catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log(`Connection successfull at port ${port}`);
})