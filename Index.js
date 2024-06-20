var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');
var multiparty = require('multiparty');


var app = express();

app.use(express.static(__dirname + '/public'));

app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);

app.get('/', function(req, res){
  res.sendfile('Index.html', { root: __dirname + "/public" } );
});




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
          
          GetProfileJSON(element.ProfileName).then(function(w){
            res.send(w);
          })
          //res.send(v);
          profileFound = true;
        }

      });
      if (!profileFound){
        res.send("Nope");
      }

    })


  })

  //res.send('Hey');
})



app.listen(8080)

  //var qdata = q.query;
  //console.log(qdata.csv);
  //var csv = qdata.csv.toString();
  //res.sendFile(path.join(__dirname, '/public/Index.html'));