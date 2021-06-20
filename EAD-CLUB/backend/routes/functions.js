const express = require("express");
const Record = require('../models/data-object');
const Increment = require('../models/auto');
const jwt = require("jsonwebtoken");

const router = express.Router();
/* auto increment uid and insert user */
function insertUser( req , res ){
  let seq_val = 0;
  Increment.findOne({name:"pranesh"}).then(result => {
    if( result ) {
      console.log(`Successfully found document: ${result}.`);
      var str = JSON.stringify(result);
      var myarray = str.split(':');
      var seq = myarray[2].split(',');
      console.log('Value is :  ' + seq[0]);
      if( seq[0] )
      {
        Increment.findOneAndUpdate({ name : "pranesh" }, { sequence_value : parseInt(seq[0]) + 1 } )
          .then(updatedDocument => {
            if(updatedDocument) {
              console.log(`Successfully updated document: ${updatedDocument}.`)
              seq_val =  parseInt( seq[0] ) + 1
                console.log("Inside insertUser" +  seq_val + req + res )
                if (seq_val) {
                  const user = new Record({
                    uid: seq_val,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                  });

                  user.save((error, registeredUser) => {
                    if (error) {
                      console.log(error)
                      res.status(401).send(error.error)
                    } else {
                      let payload = {subject: registeredUser._id}
                      let token = jwt.sign(payload, 'secretKey')
                      res.status(200).send({token})
                    }
                  })
                }
            } else {
              console.log("No document matches the provided query.")
            }
          })
          .catch(err => console.error(`Failed to find and update document: ${err}`))
      }
    } else {
      console.log("No document matches the provided query.");
    }
  }) .catch(err => console.error(`Failed to find document: ${err}`));

 }
/* auto increment uid  and insert user ends*/
/* Token Verifier */
function verifyToken( req , res , next ) {
  if( !req.headers.authorization ){
    return res.status(401).send( "Unauthorized request ")
  }
  console.log( req )
  let token = req.headers.authorization.split(' ')[1]
  if( token === 'null' )
  {
    return res.status(401).send( "Unauthorized req ")
  }
  let payload = jwt.verify( token,'secretKey')
  console.log( "Payload is : " + payload )
  if( !payload ){
    return res.status(401).send( "Unauthorized user ")
  }
  req.userId = payload.subject
  next()
}
/* END Token Verifier */
/* start signup */
router.post("/signup", (req, res, next) => {
      insertUser( req , res )

});

/* sign Up */

/* Login API */
router.post( '/login' ,  (req,res)=>{
  let userData = req.body
  Record.findOne({email:userData.email},(error,user)=>{
    if( error ){
      console.log("Error in login :  "+error )
    }
    else{
      if( !user )
      {
        res.status(401).send( "Invalid Email")
      }
      else{
        if( user.password !== userData.password ){
          res.status(401).send( "Invalid Password")
        }
        else{
          console.log("In Login :")
          let payload = { subject : user._id }
          let token = jwt.sign( payload, 'secretKey')
          res.status(200).send({token} )
        }
      }
    }
  })
})
/* End Login API */
/* Api for news */
router.get( '/news' , verifyToken, (req ,res )=> {
  // events has Name City Country
  let specials = [
    {
      "Name": "Alfreds Futterkiste",
      "City": "Berlin",
      "Country": "Germany"
    }
  ]
  res.json( specials )
})
/* Api news ends */
module.exports = router;
