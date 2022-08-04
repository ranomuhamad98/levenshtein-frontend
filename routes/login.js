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

router.post('/callback', function(req,res){
    
    /*var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "index");
    res.render(p, { config: getConfig() } )*/

    console.log("here")
})



router.get('/callback', function(req,res){
    console.log("asdfasd")
    //console.log(req)
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "index");
    res.render(p, { config: getConfig() } )

})

router.get('/authenticate/:email/:name', function(req,res){
    //console.log(req)

    let email = req.params.email;
    let name = req.params.name;

    
    req.session.login = true;
    req.session.email = email;
    req.session.name = name;

    res.redirect("/")

})


router.get('/signout', function(req,res){
    //console.log(req)
    
    req.session.login = false;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "signout");
    res.render(p, { config: getConfig() } )

})


router.get("", function(req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "login");
    res.render(p, { config: getConfig() } )
});


module.exports = router;