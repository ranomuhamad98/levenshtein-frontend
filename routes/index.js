var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');
const https = require('https');


function getConfig()
{
    var config = {};
    config.PROJECT = process.env.PROJECT;
    config.GCS_BUCKET = process.env.GCS_BUCKET;
    config.GCS_PDF_FOLDER = process.env.GCS_PDF_FOLDER;
    config.GCS_IMAGE_FOLDER = process.env.GCS_IMAGE_FOLDER;
    config.GCS_JSON_FOLDER = process.env.GCS_JSON_FOLDER;
    config.GCS_CSV_FOLDER = process.env.GCS_CSV_FOLDER;
    config.UPLOAD_BASE_URL = process.env.UPLOAD_BASE_URL;
    config.OCR_URL = process.env.OCR_URL;
    return config;
}

router.get("", function(req, res){
  
  //req.session.login = false;
  if(req.session.login != true)
    res.redirect("/login")
  else
  {
    var dir = __dirname;
    //var p = path.resolve( dir, "../public/pages/", "index");
    res.redirect("/documents")
    //res.render(p, { config: getConfig() } )
  }
});


module.exports = router;