



























/*
const express = require("express")
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


require("dotenv").config();
const app = express();

app.use(express.static("fileX"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/Signup.html");
})

app.post("/",function(req,res){

  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.Email;
console.log(firstName, lastName, email);

const data ={
  members: [
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME: firstName,
            LNAME: lastName
            }
        }
      ]
    };

 const jsonData = JSON.stringify(data);

console.log(jsonData);

//const url="https://us8.api.mailchimp.com/3.0/lists/3ade061ad2";
//const url = "https://us8.api.mailchimp.com/3.0/lists/3ade061ad2";
const url = "https://" + process.env.REG_ID + ".api.mailchimp.com/3.0/lists/" + process.env.AUD_ID; // This will come from the main mail-chimp 'endpoint'

const options = {
  method:"POST",
  auth: process.env.AUTH_KEY
}
const request = https.request(url,options,function(response){
response.on("data",function(data){
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();
});


app.listen(3000,function(){
  console.log("Server is on at port : 3000");
})



//mailchimp key -  bc54dc7d73da4ea0f7cf3aeb369de743-us8

//Audience id - 3ade061ad2


*/
