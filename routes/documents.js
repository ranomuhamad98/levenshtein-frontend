var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');
const https = require('https');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};



function getConfig(req)
{
    var config = {};
    config.PROJECT = process.env.PROJECT;
    config.GCS_UPLOAD_BUCKET = process.env.GCS_UPLOAD_BUCKET;
    config.GCS_PDF_FOLDER = process.env.GCS_PDF_FOLDER;
    config.GCS_IMAGE_FOLDER = process.env.GCS_IMAGE_FOLDER;
    config.UPLOAD_URL = process.env.UPLOAD_URL;
    config.LEVENSHTEIN_API = process.env.LEVENSHTEIN_API;
    config.CURRENT_USER =  { email : req.session.email, name : req.session.name };
    console.log(config);
    return config;
}

router.get("", function(req, res){
  
  //req.session.login = false;
  if(req.session.login != true)
    res.redirect("/login")
  else
  {
    console.log("req.session")
    console.log(req.session)
    var dir = __dirname;
    console.log(dir)
    var p = path.resolve( dir, "../public/pages/", "documents");
    console.log(p)
    res.render(p, { session: req.session, sessionstring: JSON.stringify(req.session), config: JSON.stringify(getConfig(req)) } )
  }
});

router.get("/upload", function(req, res){
  
    //req.session.login = false;
    if(req.session.login != true)
      res.redirect("/login")
    else
    {
      
      var dir = __dirname;
      var p = path.resolve( dir, "../public/pages/", "documents-upload");
      res.render(p, {session: req.session, sessionstring: JSON.stringify(req.session), config: JSON.stringify(getConfig(req)) } )
    }
});

router.get('/download/:url', function(req,res){
  var url = req.params.url;
  console.log(url)
  url = decodeURIComponent(url);
  console.log(url)
  let temp = url.split("/")
  temp = temp[temp.length - 1];

  let ext = path.extname(temp);
  console.log(ext);

  download(url, "/tmp/temp" + ext, ()=>{
      var data =fs.readFileSync('/tmp/temp' + ext);
      let sdata = new Buffer(data).toString('ascii');
      //console.log(sdata);
      //res.contentType("application/" + ext);
      res.send(data);
  });

})


module.exports = router;