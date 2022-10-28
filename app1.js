
require('dotenv').config()  // to mantain the secrecy of the key and important data
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

//New instance of Express()
const app = express();

app.use(express.static("public"));

//if not used , it will show deprecated in hyper
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+ "/Signup.html");
})

app.post("/",function(req, res){
    const fn = req.body.fName;
    const ln = req.body.lName;
    const email = req.body.eMail;

    //javascipt data object to be sent to the mailchimp servers
    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME : fn,
            LNAME : ln
          }
        }
      ]
    };

    //since we need to pass this data to mailchimp in JSON format, conversion is done doing so-into flatpacked JSON
    const jsonData = JSON.stringify(data);


    //Making the request to mailchimp using https.request()

    const url = "https://us8.api.mailchimp.com/3.0/lists/3ade061ad2"  //coming from main MailChimp endpoint.
    const authenticate = "ab:"+ process.env.API_KEY;
    const options = {
      method: "POST",
      auth: authenticate//acc. to mailchimp some form of authentication menthod in the form of anystring:ApiKey is req. to authenticate
    }

    // we can save out request in a constant and later we can use,
    //  this constatnt request to send things over to the MailChimp server by calling request.write()
    const request = https.request(url, options, function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));
        if(response.statusCode === 200){
          res.sendFile(__dirname+ "/success.html");
        }
        else {
          res.sendFile(__dirname+ "/failure.html");
        }
      });
    });

    request.write(jsonData);
    request.end(); //to specify you are done with this.
});

app.post("/failure",function(req, res){
  res.redirect("/");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
