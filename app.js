require('./config/config');

var express = require('express');
var hbs = require('hbs');
var bodyParser  = require("body-parser");
var {mongoose} = require('./db/mongoose');
var {Candidate} = require('./models/candidate');
const _ = require('lodash');

var app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;


app.get("/", function(req, res){
    var count;
    Candidate.find().then((candidates)=>{
        // console.log("Length of Candidates "+ candidates.length)
        count = candidates.length;

        res.status(200).render("home", {count: count});
        })
 
    
});

app.get("/signups", (req, res)=>{
    Candidate.find({}).then((candidates)=>{
        res.status(200).send({candidates});
    })

});

app.get("/count", (req, res) =>{
    
});

app.post("/register", function(req, res){
    var body = _.pick(req.body, ['email', 'name', 'location']);

    console.log(JSON.stringify(body, undefined,2));

    var candidate = new Candidate(body);

    candidate.save().then(()=>{
        res.status(200).send({
            status: "successfully created candidate",
            name: body.name,
            email: body.email,
            location: body.location
        });
    }).catch((e)=>{
        res.status(400).send({errorMsg: e});
    });
});


app.listen(port, ()=>{
    console.log(`Server up on Port ${port}`);
});