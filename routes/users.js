var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');
const https = require('https');
const axios = require('axios').default;



function getConfig(req)
{
    var config = {};
    config.PROJECT = process.env.PROJECT;
    config.GCS_UPLOAD_BUCKET = process.env.GCS_UPLOAD_BUCKET;
    config.GCS_PDF_FOLDER = process.env.GCS_PDF_FOLDER;
    config.GCS_IMAGE_FOLDER = process.env.GCS_IMAGE_FOLDER;
    config.UPLOAD_URL = process.env.UPLOAD_URL;
    config.LEVENSHTEIN_API = process.env.LEVENSHTEIN_API;
    config.LEVENSHTEIN_UM_API = process.env.LEVENSHTEIN_UM_API;
    config.CURRENT_USER =  { email : req.session.email, name : req.session.name };
    console.log(config);
    return config;
}

router.get("/add", function(req, res){
  
  //req.session.login = false;
  if(req.session.login != true)
    res.redirect("/login")
  else
  {
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "add-edit-user");
    req.session.activeLink = "users"

    res.render(p, { activeLink: "users", session: req.session, sessionstring: JSON.stringify(req.session), user_id: null, profile: false, config: JSON.stringify(getConfig(req)) } )
  }
});

router.get("/edit", function(req, res){
  
    //req.session.login = false;
    if(req.session.login != true)
        res.redirect("/login")
    else
    {
        let user_id = req.query.user_id
        console.log("here " + user_id)
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "add-edit-user");
        req.session.activeLink = "users"

        res.render(p, { activeLink: "users", session: req.session, sessionstring: JSON.stringify(req.session), user_id: user_id, profile: false, config: JSON.stringify(getConfig(req)) } )
    }
});

router.get("/profile", function(req, res){
  
  //req.session.login = false;
  if(req.session.login != true)
      res.redirect("/login")
  else
  {
      let user_id = req.session.user_id;
      console.log("here " + user_id)
      var dir = __dirname;
      var p = path.resolve( dir, "../public/pages/", "add-edit-user");
      req.session.activeLink = "profile"

      res.render(p, { activeLink: "profile", session: req.session, sessionstring: JSON.stringify(req.session), user_id: user_id, profile: true, config: JSON.stringify(getConfig(req)) } )
  }
});

router.get("/delete", function(req, res){
  
    //req.session.login = false;
    if(req.session.login != true)
        res.redirect("/login")
    else
    {
        let user_id = req.params.user_id
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "delete-user");
        req.session.activeLink = "users"

        res.render(p, { activeLink: "users",  session: req.session, sessionstring: JSON.stringify(req.session), user_id: user_id, config: JSON.stringify(getConfig(req)) } )
    }
});



router.get("", function(req, res){
  
    //req.session.login = false;
    if(req.session.login != true)
      res.redirect("/login")
    else
    {
      var dir = __dirname;
      var p = path.resolve( dir, "../public/pages/", "users");
      req.session.activeLink = "users"
      res.render(p, { activeLink: "users",  session: req.session, sessionstring: JSON.stringify(req.session), config: JSON.stringify(getConfig(req)) } )
    }
});

router.get("/view", function(req, res){
  
  //req.session.login = false;
  if(req.session.login != true)
    res.redirect("/login")
  else
  {
    let id = req.query.id;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "detail-user");
    req.session.activeLink = "users"
    res.render(p, { activeLink: "users", session: req.session, sessionstring: JSON.stringify(req.session), id: id, config: JSON.stringify(getConfig(req)) } )
  }
});

router.post("/login", function(req, res){
  console.log("login")
  let config = getConfig(req);

  console.log(config)
  let url = config.LEVENSHTEIN_API + "/users/login";
  let user = req.body;

  console.log("goto " + url)
  console.log(user)

  axios.post(url, user ).then((response)=>{
    console.log(response)
    if(response.data.success)
    {
      let loggedUser = response.data.payload;
      console.log("loggedUser")
      console.log(loggedUser)
      req.session.user_id = loggedUser.id;
      req.session.login = true;
      req.session.email = loggedUser.email;
      req.session.name = loggedUser.firstname;
      req.session.role = loggedUser.role;
      req.session.lastLogin = loggedUser.lastLogin;
      req.session.sessionID = loggedUser.sessionID;
      req.session.idleTimeout = loggedUser.idleTimeout;
      res.send({ success: true })
    }
    else 
    {
      res.send({ success: false, message: response.data.message })
    }
  })

})




module.exports = router;