const express = require("express");
const app = express();

//Requiring database
const Employee = require("../models/registration")

// Creating a router
const router = new express.Router();

//for json data on pages
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get("/",(req,res)=>{
    res.send("hi bro");
})

module.exports = router;