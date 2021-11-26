// this is older style importing before ES6 imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");

if(process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Instantiate a new express application
const app = express();
const port = process.env.PORT || 5000;

app.use(compression());

// Tells our server to process any incoming requests by converting their
// body tag to JSON so that we can use it
app.use(bodyParser.json());
// Checks if the urls are in acceptable format
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "production"){
    // serve all the static files in our build
    // __dirname tells us what directory we are currently in
    app.use(express.static(path.join(__dirname, "client/build")));
    // If the user hits ANY route do the following for the response 
    // req is the request and res is the response we sent back
    //  i.e. we send the index.html file which contains the entry 
    // point of our REACT application
    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, "client/build", "index.html"))
    });
}

// listen on port 
app.listen(port, error => {
    // throw error if any error comes up
    if(error) throw error;
    // otherwise just log out port
    console.log("Server is running on port: " + port);
});

app.post("/payment", (req, res) => {
    
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "gbp"
    };

    stripe.charges.create(body, (stripeError, stripeResponse) => {
        if(stripeError){
            res.status(500).send({ error: stripeError });
        } else{
            res.status(200).send({ success: stripeResponse });
        }
    });
})