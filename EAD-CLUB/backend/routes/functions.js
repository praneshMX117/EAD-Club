const express = require("express");
const Record = require('../models/data-object');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('',(req,res,next) => {
  const record = new Record({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  record.save().then(createdRecord => {
    res.status(201).json({ //everything is ok and new resources where created.
      message: 'Record added successfully',
      postId: createdRecord._id
      });
  });
});

 /*router.post('/find',(req,res,next) => {
  //Record.find()
    Record.find({
      'name': req.body.name,
      'email': req.body.email,
      'password': req.body.password
    })
    .then(documents => {
      res.status(200).json({ //everything is ok.
        message: 'Details fetched successfully!',
        details: documents
      });
      console.log(documents);
    });
  });*/

router.get('',(req,res,next) => {
  Record.find({name:"aru"})
    .then(documents => {
      res.status(200).json({ //everything is ok.
        message: 'Details fetched successfully!',
        details: documents
      });
      console.log(documents);
    });
});

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password,10)
    .then(hash => {
      const record = new Record({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });

      record.save().then(result => {
        res.status(201).json({
          message: "User Registered",
          result: result
        })
      }).catch( err => {
        res.status(500).json({
          //error: err
          message: "User Already Exists"
        });
      })
    });
  });

router.post("/login", (req,res,next) => {
  let fetchedUser;
  Record.findOne({email: req.body.email})
    .then( user => {
      if(!user) {
        return res.status(401).json({
          message : "Auth failed"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then( result => {
      if(!result){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},'secret',{expiresIn: "1h"});
      res.status(200).json({
        message: "Auth Successful",
        token: token,
        id : fetchedUser._id,
        name: fetchedUser.name,
        email: fetchedUser.email
      });
    })
    .catch( err => {
      console.log("Auth Failed")
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;
