const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname)); //to avoid sending static files using res.send file
let alert = require('alert');


mongoose.connect("mongodb+srv://shree:netcentric@cluster0.hwa3rtn.mongodb.net/chelsea")

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get("/admin", function (req, res) {
    res.sendFile(__dirname + '/admin.html')
})
app.get("/update", function (req, res) {
    res.sendFile(__dirname + '/updel.html')
})

app.post("/login", function (req, res) {
    const user = newUser.find({
        "email": req.body.uname,
        "pwd": req.body.pwd
    }, (err, data) => {
        if (err) {
            console.log(err);
            //return res.status(500).send(err)
        }
        else if (data.length) {
            console.log(data);
            res.redirect("/");
        }
        else {
            alert("User details invalid");
            res.redirect("/login.html")
        }
    });

})

const userSchema = {
    fname: String,
    lname: String,
    email: String,
    pwd: String,
    country: String,
    phno: String,
}
const newUser = mongoose.model("registers", userSchema)
app.post("/insertUserData", function (req, res) {
    let insert = new newUser({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.emailid,
        pwd: req.body.pwd,
        country: req.body.country,
        phno: req.body.phno,
    })
    insert.save();
    res.redirect("/");
})

const matchSchema = {
    logo1: String,
    logo2: String,
    name1: String,
    name2: String,
    league: String,
    date: String,
    time: String,
    venue: String,
}
const match = mongoose.model("match", matchSchema)
app.get("/load", (req, res) => {
    match.find((err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        else {
            return res.status(200).send(data)
        }
    })
})



app.post("/matchDet", function (req, res) {
    var l1, l2, n1, n2;
    if (req.body.match == "Away") { l1 = req.body.oppimg; n1 = req.body.oppname; l2 = imglink; n2 = "Chelsea"; }
    else { l2 = req.body.oppimg; n2 = req.body.oppname; l1 = imglink; n1 = "Chelsea"; }
    let insert = new match({
        logo1: l1,
        logo2: l2,
        name1: n1,
        name2: n2,
        league: req.body.league,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
    })
    console.log(insert)
    insert.save();
    res.redirect("/");
})


app.post("/updateMat", function (req, res) {
    var l1, l2, n1, n2;
    var query={},update={};
    if (req.body.match == "Away") {
        l1 = req.body.oppimg;
        n1 = req.body.oppname;
        query = {
            name1: n1,
            league: req.body.league
        }
        update = {
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
        }
        

    }
    else {
        l2 = req.body.oppimg;
         n2 = req.body.oppname; 
           query = {
            name2: n2,
            league: req.body.league
        }
         update = {
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
        }
    }
    
    match.updateOne(query,update, function (err, result) {
        if (err){
            console.log(err)
        }else{
            console.log("Result :", result) 
        }
    });

    res.redirect("/");
})


const player = {
    img: String,
    name: String,
    jersey: String
}
const pl1 = mongoose.model("mens", player)
const pl2 = mongoose.model("womens", player)
app.post("/playerDet", function (req, res) {

    if (req.body.gender == "men") { pl = pl1 }
    else { pl = pl2 }
    let insert = new pl({
        img: req.body.img,
        name: req.body.name,
        jersey: req.body.jersey
    })

    pl.find({ "name": insert.name, "jersey": insert.jersey }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else if (data.length) {
            alert("Player details already present")
            res.redirect("/admin")
        }
        else {
            insert.save();
            if (pl == pl1) res.redirect("/mens.html")
            else res.redirect("/womens.html")
        }
    })

})


app.post("/updatePlay", function (req, res) {



    if (req.body.gender == "men") { pl = pl1 }
    else { pl = pl2 }
    

    pl.find({ "name": req.body.name, "jersey": req.body.jersey }).deleteOne( (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (pl == pl1) res.redirect("/mens.html")
            else res.redirect("/womens.html")
        }
    })

})

app.get("/loadMen", (req, res) => {
    pl1.find((err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        else {
            return res.status(200).send(data)
        }
    })
})

app.get("/loadWomen", (req, res) => {
    pl2.find((err, data) => {
        if (err) {
            return res.status(500).send(err)
        }
        else {
            return res.status(200).send(data)
        }
    })
})

app.listen(3000, function () {
    console.log("server is running on 3000")
})






























































































































































const imglink = "data:image/jpeg;base64,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";