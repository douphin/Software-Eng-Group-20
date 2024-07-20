var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');
var multiparty = require('multiparty');
require('dotenv').config({ path: "./secrets.env" });

var app = express();

app.use(express.static(__dirname + '/src/public'));

app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);

app.get('/', function(req, res){
  res.sendFile('Index.html', { root: __dirname + "/src" } );
});


var apikey = process.env.API_KEY_TOMORROW_WEATHER;

function GetProfiles() {
  return new Promise(function (resolve, reject) {
    fs.readFile('ProfileList.json', 'utf8', function (err, data) {
      if (err) {console.log(err); throw err; }
      var obj2 = JSON.parse(data);
      resolve(obj2);
    });
  });
}

function GetProfileJSON(profileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile('profileJSONs\\'+profileName +'.json', 'utf8', function (err, data) {
      if (err) {console.log(err); throw err; }
      var obj2 = JSON.parse(data);
      resolve(obj2);
    });
  });
}


function CheckUserAvailable(profileName){
  return new Promise(function (resolve, reject) {
    fs.readFile('profileJSONs\\'+profileName +'.json', 'utf8', function (err, data) {
      if (err) {resolve(false); }

      resolve(true);
    });
  });
}



app.get("/HomePage", function(req, res){
  res.sendFile('HomePage.html', { root: __dirname + "/src" } );
})

app.get("/Calendar", function(req, res){
  res.sendFile('Calendar.html', { root: __dirname + "/src" } );
})

app.get("/Weather", function(req, res){
  res.sendFile('Weather.html', { root: __dirname + "/src" } );
})

app.get("/NewProfile", function(req, res){
  res.sendFile('NewProfile.html', { root: __dirname + "/src" } );
})

app.post("/CheckUser", function(req,res){
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files){
    var user = String(fields.Username);
    fs.readFile('profileJSONs\\'+user +'.json', 'utf8', function (err, data) {
      if (err) {console.log("uhh"); res.send(false); }
      else 
      {
        console.log("err");
        res.send(true);
      }
    });
  })
})

app.post("/addprofile", function(req,res){

  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files){
    

    GetProfiles().then(function (v) {
      var user = String(fields.Username);
      var pass = String(fields.Password1);

      var profileData = {
        Username : user,
        Password : pass,
      }
      v.Profiles.push(profileData);
      let newJSON = JSON.stringify(v, undefined, 4);
      fs.writeFile('ProfileList.json', newJSON, function(err){return;} );

      var newProf = {
        ProfileName : user,
        TodoItems : []
      }

      let newProfJSON = JSON.stringify(newProf, undefined, 4);

      fs.writeFile('profileJSONs/' + user + '.json', newProfJSON, function(err){
        //GetProfileJSON(user).then(function (w){
        //  res.send(w);
        //})
        return;
      } );

      
    })

  

  })
})



app.post("/login", function(req, res){
  //var q = url.parse(req.url, true);
  //var qdata = q.query;
  //console.log(qdata.Username); 
  //console.log("hey");
  //res.setHeader('Status', 'Error');
  //res.json({ message: 'Hello, this is a JSON response!', status: 'success' });
  //return res.redirect('/Index.html');



  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files){
    var user = fields.Username;
    var pass = fields.Password;

    GetProfiles().then(function (v) {
      var profileFound = false;
      v.Profiles.forEach(element => {
        if (element.Username == user && element.Password == pass){
          
          GetProfileJSON(element.Username).then(function(w){
            res.send(w);
          })
          //res.send(v);
          profileFound = true;
        }

      });
      if (!profileFound){
        res.send("NoProfile");
      }

    })

    return;
  })

  //res.send('Hey');
})



app.listen(8081)

  //var qdata = q.query;
  //console.log(qdata.csv);
  //var csv = qdata.csv.toString();
  //res.sendFile(path.join(__dirname, '/public/Index.html'));