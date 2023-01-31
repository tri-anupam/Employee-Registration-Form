const express = require("express")
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcryptjs")


//Requiring database
const Employee = require("./models/registration")

//connect database
require("./db/conn")

//for json data on pages
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//serving files ejs
//loading static file
// app.use('../public',express.static('public'));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '../asset'))

// get index page
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})

//registration page
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const employeeData = new Employee(req.body);
            const createEmployeeData = await employeeData.save();
            res.status(201).render("login")
        } else {
            res.send("password not matched.")
        }
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

//login page
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Employee.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userEmail.password)

        if (isMatch) {
            res.status(201).send("You are successfully logged in. ")
        } else {
            res.send("emailid or password doesn't matched.")
        }
    } catch (e) {
        res.status(500).send(e)
    }
})


// const bcrypt = require("bcryptjs")

// const securePassword = async (password) =>{

//     const passwordHash = await bcrypt.hash(password,10)
//     console.log(passwordHash);

//     const passwordMatch = await bcrypt.compare(password,passwordHash)
//     console.log(passwordMatch);
// }

// securePassword("anupam")



const jwt = require("jsonwebtoken")

const createToken = async() =>{
    const token = await jwt.sign({_id:"63d689e5a5c5f37aa9d82cd7"}, "anupam234wertyhb678ujht54chtyr79kih8")
    console.log(token);
}
createToken()

app.listen(port, () => {
    console.log(`Connection successfull at port ${port}`);
})