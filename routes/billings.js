var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');
const https = require('https');


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
      var dir = __dirname;
      var p = path.resolve( dir, "../public/pages/", "billings");
      req.session.activeLink = "billings"

      res.render(p, { activeLink: "billings", session: req.session, sessionstring: JSON.stringify(req.session), config: JSON.stringify(getConfig(req)) } )
    }
});



module.exports = router;